// AUTHENTICATION VERIFY MIDDLEWARE

require("dotenv").config();
const jwt = require("jsonwebtoken");

// Managing the jwt error
const error = (err, res) => {
  if (err instanceof jwt.TokenExpiredError)
    return res
      .status(401)
      .json({ message: "Access token expired", response: false });
  return res.status(401).json({ message: "Unauthorized", response: false });
};

exports.verifyAuth = (req, res, next) => {
  const token = req.headers["x-access-token"]; // Getting the token
  try {
    if (!token)
      return res
        .status(403)
        .json({ message: "No token provided", response: false });
    // Verifying the token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return error(err, res);
      }
      next();
    });
  } catch (err) {
    return res.status(404).json({ err, response: false });
  }
};
