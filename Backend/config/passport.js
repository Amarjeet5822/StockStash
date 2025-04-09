const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../models/user.model");
const dotenv = require("dotenv");
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BE_URL}/auth/google/callback`, // Ensure this is correct!
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const name = profile.displayName;
        const email = profile.emails[0]?.value;
        // Find user by email or Google ID
        let user = await User.findOne({ email });

        if (!user) {
          // If user doesn't exist, create a new one
          user = new User({
            googleId,
            name,
            email,
          });
          await user.save();
        }
        console.log("Authenticated User:", user);
        return done(null, user); // Pass user to req.user
      } catch (error) {
        console.error("Error during Google OAuth:", error);
        return done(error, null);
      }
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user._id); // Store only the user ID in the session
});

// Deserialize user from session (get full user from DB)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); // Attach user to req.user
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
