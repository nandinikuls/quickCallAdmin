const { sql, poolPromise } = require("../database/dbConnection.js");
const fs = require("fs");
var rawData = fs.readFileSync("./query/queries.json");
let queries = JSON.parse(rawData);
const logger = require("../src/logger.js");
var dateTime = require("node-datetime");
var dt = dateTime.create();
var formatted = dt.format("Y-m-d H:M:S");
const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 2048 });
const jwt = require("jsonwebtoken");

class Did {
  async updateBoth(req, res) {
    const pool = await poolPromise;
    try {
      const result = await pool
        .request()
        .input("BrCode", req.body.BrCode)
        .input("City", req.body.City)
        .input("EmpCode", req.body.EmpCode)
        .input("EmpName", req.body.EmpName)
        .input("ContactNumber", req.body.ContactNumber)
        .input("DIDNO", req.body.DIDNO)
        .input("CampaignID", req.body.CampaignID)
        .input("SiteCode", req.body.SiteCode)
        .input("Active", req.body.Active)
        .input("Comment", req.body.Comment)
        .input("CreatedOn", formatted)
        .query(queries.modifyDid);
      const results = await pool
        .request()
        .input("AgentID", req.body.EmpCode)
        .input("DIDNO", req.body.DIDNO)
        .query(queries.modifyAgent);

      logger.info("Data updated successfully");
      res.status(200).json({
        returnCode: 200,
        response: "Success",
        message: "Updated successfully!",
      });
      console.log("Tables updated successfully!");
    } catch (error) {
      logger.error(error.message);
      res.status(202).json({
        returnCode: 202,
        response: "Failed",
        error: error.message,
      });
    }
  }

  async getAgentData(req, res) {
    const pool = await poolPromise;
    try {
      const result = await pool
        .request()
        .input("AgentID", req.body.AgentID)
        .query(queries.getData);
      var public_key = key.exportKey("public");
      var private_key = key.exportKey("private");
      let publicKey = new NodeRSA(public_key);
      let privateKey = new NodeRSA(private_key);
      const text = result.recordset;
      const encrypted = publicKey.encrypt(text, "base64");
      const decrypted = privateKey.decrypt(encrypted, "utf8");

      logger.info("View the data in Postman!");
      res.status(200).json({
        returnCode: 200,
        response: "Success",
        message: "Data is encrypted!",
        encryptedData: encrypted,
        // decryptedData: JSON.parse(decrypted)
      });
      console.log("View data in postman!");
    } catch (error) {
      logger.error(error.message);
      res.status(202).json({
        returnCode: 202,
        response: "Failed",
        error: error.message,
      });
    }
  }

  async didActiveUsers(req, res) {
    const pool = await poolPromise;
    try {
      const result = await pool
        .request()
        .input("Active", req.body.Active)
        .query(queries.didActiveList);
      var public_key = key.exportKey("public");
      var private_key = key.exportKey("private");
      let publicKey = new NodeRSA(public_key);
      let privateKey = new NodeRSA(private_key);
      const text = result.recordset;
      const encrypted = publicKey.encrypt(text, "base64");
      const decrypted = privateKey.decrypt(encrypted, "utf8");

      logger.info("DIDNO and SiteCode appears!");
      res.status(200).json({
        returnCode: 200,
        response: "Success",
        message: "Data is encrypted!",
        encryptedData: encrypted,
        // decryptedData: JSON.parse(decrypted)
      });
      console.log("View data in postman!");
    } catch (error) {
      logger.error(error.message);
      res.status(202).json({
        returnCode: 202,
        response: "Failed",
        error: error.message,
      });
    }
  }

  async didActiveStatus(req, res) {
   
    try {
      const pool = await poolPromise;
      const didQuery = queries.didStatus;
      var SiteCode =  req.body.SiteCode;
      if (SiteCode == "") {
        var data = didQuery;
      } else {
        var data = didQuery + " where SiteCode='" + SiteCode + "'";
      }
      const result = await pool.query(data);
      var public_key = key.exportKey("public");
      var private_key = key.exportKey("private");
      let publicKey = new NodeRSA(public_key);
      let privateKey = new NodeRSA(private_key);                     // console.log(public_key + '/n' + private_key);
      const text = result.recordset;
      const encrypted = publicKey.encrypt(text, "base64");           // console.log("encrypted: ", encrypted);
      const decrypted = privateKey.decrypt(encrypted, "utf8");       // console.log("decrypted: ", decrypted);

      logger.info("Active status of SiteCode appears!");
      res.status(200).json({
        returnCode: 200,
        response: "Success",
        message: "Data is encrypted!",
        encryptedData: encrypted,
        // decryptedData: JSON.parse(decrypted)
      });
    } catch (error) {
      logger.error(error.message);
      res.status(202).json({
        returnCode: 202,
        response: "Failed",
        error: error.message,
      });
    }
  }

  async updateDid(req, res) {
    const pool = await poolPromise;
    try {
      const result = await pool
        .request()
        .input("BrCode", req.body.BrCode)
        .input("City", req.body.City)
        .input("EmpCode", req.body.EmpCode)
        .input("EmpName", req.body.EmpName)
        .input("ContactNumber", req.body.ContactNumber)
        .input("DIDNO", req.body.DIDNO)
        .input("CampaignID", req.body.CampaignID)
        .input("SiteCode", req.body.SiteCode)
        .input("Active", req.body.Active)
        .input("Comment", req.body.Comment)
        .input("CreatedOn", formatted)
        .query(queries.updateDid);

      logger.info("Data updated successfully");
      res.status(200).json({
        returnCode: 200,
        response: "Success",
        message: "Updated successfully!",
      });
      console.log("DID Table updated successfully!");
    } catch (error) {
      logger.error(error.message);
      res.status(202).json({
        returnCode: 202,
        response: "Failed",
        error: error.message,
      });
    }
  }

  async deactivateDid(req, res) {
    const pool = await poolPromise;
    try {
      const result = await pool
        .request()
        .input("Active", req.body.DIDStatus)
        .input("DeactivatedOn", formatted)
        .input("DIDNO", req.body.DIDNO)
        .query(queries.deactivateQuery);

      logger.info("DID deactivated successfully");
      res.status(200).json({
        returnCode: 200,
        response: "Success",
        message: "DID deactivated successfully!",
      });
    } catch (error) {
      logger.error(error.message);
      res.status(202).json({
        returnCode: 202,
        response: "Failed",
        error: error.message,
      });
    }
  }

  async inboundCampaign(req, res) {
    const pool = await poolPromise;
    try {
      const result = await pool
        .request()
        .input("sitecode", req.body.SiteCode)
        .query(queries.getInboundCamp);
      var public_key = key.exportKey("public");
      var private_key = key.exportKey("private");
      let publicKey = new NodeRSA(public_key);
      let privateKey = new NodeRSA(private_key);
      const text = result.recordset;
      const encrypted = publicKey.encrypt(text, "base64");
      const decrypted = privateKey.decrypt(encrypted, "utf8");

      logger.info("DIDNO and SiteCode appears!");
      res.status(200).json({
        returnCode: 200,
        response: "Success",
        message: "Data is encrypted!",
        encryptedData: encrypted,
        decryptedData: JSON.parse(decrypted)
      });
      console.log("View data in postman!");
    } catch (error) {
      logger.error(error.message);
      res.status(202).json({
        returnCode: 202,
        response: "Failed",
        error: error.message,
      });
    }
  }
}

const classObj = new Did();
module.exports = classObj;
