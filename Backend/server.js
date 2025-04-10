const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const indexRoute = require("./routes/indexRoute");
const dbConnect = require("./config/dbConnect");
const AppError = require("./utils/AppError");
const User = require("./models/user.model");
require("./config/passport"); 
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// Define the secret key for signing cookies
const cookieParserSecret = process.env.SECRET_KEY;
app.use(cookieParser(cookieParserSecret));

// CORS configuration
const whitelist = [process.env.FE_URL, process.env.DEPLOY_FE_URL];
const corsOptionsDelegate = (req, callback) => {
  const origin = req.header("Origin");
  if (whitelist.includes(origin) || !origin) {
    callback(null, {
      origin: true,
      credentials: true,
      methods: "GET,HEAD,PATCH,POST,PUT,DELETE",
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    });
  } else {
    callback(null, { origin: false });
  }
};
app.use(cors(corsOptionsDelegate));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(indexRoute);

// Google OAuth login route
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const { name, _id } = req.user;
    // console.log("req.user(server.js)", req.user)
    const refreshToken = jwt.sign(
      { userId: _id, user: name },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === "production", // `false` in development, `true` in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax", // `Strict` can block requests in some cases, `Lax` is better for authentication
      maxAge: 7 * 24 * 60 * 60 * 1000, // Seven Days
    });
    req.session.user = req.user;
    res.redirect(`${process.env.FE_URL}/googlecallback`);
  }
);

// Auth status check
app.get("/api/auth/status", async (req, res, next) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return next(
      new AppError(401, "Authentication token not found", {
        isAuthenticated: false,
      })
    );
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: decoded.userId }).select("-password");
    if (!user) {
      return next(
        new AppError(401, "User not found", {
          isAuthenticated: false,
        })
      );
    }

    res.status(200).json({ isAuthenticated: true, user });
  } catch (err) {
    res.clearCookie("refreshToken");
    next(
      new AppError(401, "Invalid or expired token", { isAuthenticated: false })
    );
  }
});

app.post("/logout", (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) {
        return next(new AppError(500, "Logout failed"));
      }
      req.session.destroy((err) => {
        if (err) {
          return next(new AppError(500, "Session destruction failed"));
        }
        res.clearCookie("connect.sid", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
        });
        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
        });
        res
          .status(200)
          .json({ message: "Logout successful", isAuthenticated: false });
      });
    });
  } catch (error) {
    next(new AppError(500, error.message));
  }
});


// // Error handling
// app.all("*", (req, res, next) => {
//   console.log("this line is done")
//   // next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
// });

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: err.status || "error",
    message: err.message || "Internal Server Error",
    ...err.data, // Merge extra data like isAuthenticated
  });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  dbConnect();
  console.log(`App running at http://localhost:${PORT}`);
});
