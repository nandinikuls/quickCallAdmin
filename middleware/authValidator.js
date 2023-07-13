const validator = require("./validator.js");

const loginValidation = async (req, res, next) => {
    const validationRule = {
      Email: "required|string",
      Password: "required|string",
    };
  
    await validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          returncode: 412,
          status: "failed",
          message: "Validation failed",
          data: err,
        });
      } else {
        next();
      }
    }).catch((err) => console.log(err));
  };
  
  const authValidation = {
    loginValidation: loginValidation,
  };
  module.exports = authValidation;
  