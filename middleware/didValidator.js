const validator = require("../middleware/validator");

const didValidation = async (req, res, next) => {
  const validationRule = {
    BrCode: "required|string",
    City: "required|string",
    EmpCode: "required|string",
    EmpName: "required|string",
    ContactNumber: "required|string",
    DIDNO: "required|string",
    CampaignID: "required|string",
    SiteCode: "required|string",
    Active: "required|string",
    Comment: "required|string",
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


const getAgentValid = async (req, res, next) => {
  const validationRule = {
    AgentID: "required|string"
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

const getActiveValid = async (req, res, next) => {
  const validationRule = {
    Active: "required|string"
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

const getActiveStatusValid = async (req, res, next) => {
  const validationRule = {
    SiteCode: "required|string"
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

const deactivateValidDID = async (req, res, next) => {
  const validationRule = {
    DIDStatus: "required|string",
    DIDNO: "required|string"
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

const ValidateDID = {
    didValidation : didValidation,
    getAgentValid : getAgentValid,
    getActiveValid : getActiveValid,
    getActiveStatusValid : getActiveStatusValid,
    deactivateValidDID : deactivateValidDID
};

module.exports = ValidateDID;
