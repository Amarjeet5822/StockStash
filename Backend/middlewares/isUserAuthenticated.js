const jwt = require('jsonwebtoken');

const isUserAuthenticated = (req, res, next) => {
  const token = req.cookies.refreshToken; // Get the token from cookies

  if (!token) {
    next(new AppError(401, 'Authentication token not found', { isAuthenticated: false })); // Handle missing token
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Decode the token
    req.user = decoded; // Insert payload into req.user
    next(); // Proceed to the next middleware
  } catch (error) {
    next(new AppError(401, 'Invalid or expired token', { isAuthenticated: false })); // Handle token verification error
  }
};

module.exports = isUserAuthenticated;