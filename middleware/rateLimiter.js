const rateLimit = require("express-rate-limit");

const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  handler: function (req, res) {
    return res.status(429).json({
      response: "error",
      statusCode: "429",
      error: "You have sent too many requests.",
    });
  },
});

module.exports = apiRequestLimiter;
