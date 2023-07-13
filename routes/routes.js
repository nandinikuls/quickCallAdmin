const express = require("express");
const router = express.Router();
const authJwt = require("../middleware/authJwt");
const classObj = require("../controller/didController.js");
const authClass = require("../controller/authController.js");
const authValidation = require("../middleware/authValidator");
const ValidateDID = require("../middleware/didValidator.js");

router.post("/loginUser", [authValidation.loginValidation], authClass.loginUser);
router.post("/modifyBoth", [authJwt.verifyToken, ValidateDID.didValidation], classObj.updateBoth);
router.post("/getAgentData", [authJwt.verifyToken, ValidateDID.getAgentValid], classObj.getAgentData);
router.post("/didActiveUsers", [authJwt.verifyToken, ValidateDID.getActiveValid], classObj.didActiveUsers);
router.post("/didActiveStatus", [authJwt.verifyToken, ValidateDID.getActiveStatusValid], classObj.didActiveStatus);
router.post("/updateDID", [authJwt.verifyToken, ValidateDID.didValidation], classObj.updateDid);
router.post("/deactivateDID", [authJwt.verifyToken, ValidateDID.deactivateValidDID], classObj.deactivateDid);
router.post("/getInboundCampaign", [authJwt.verifyToken], classObj.inboundCampaign);


module.exports = router;