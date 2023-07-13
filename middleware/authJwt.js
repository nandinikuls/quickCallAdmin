const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer") ||
      !req.headers.authorization.split(" ")[1]
    ) {
      return res.status(401).json({
        returncode: 401,
        response: "failed",
        message: "Access Denied! Unauthorized User",
      });
    }
    const Token = req.headers.authorization.split(" ")[1];
    if (Token) {
      jwt.verify(Token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(400).json({
            returncode: 400,
            response: "failed",
            message: "Invalid Token.",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
