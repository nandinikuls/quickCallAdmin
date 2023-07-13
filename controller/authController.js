const { sql, poolPromise } = require("../database/dbConnection.js");
const fs = require("fs");
var rawData = fs.readFileSync("./query/queries.json");
let queries = JSON.parse(rawData);
const jwt = require("jsonwebtoken");

class auth {
  async loginUser(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("Email", req.body.Email)
        .input("Password", req.body.Password)
        .query(queries.loginUser);
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
      let data = {
        Email: req.body.Email,
        Password: req.body.Password,
      };
      const token = jwt.sign(data, jwtSecretKey, { expiresIn: "24h" });
      const count = result.recordset.length;
      console.log(count, "record exists.");
      if (count >= 1) {
        res.status(201).json({
          returncode: 201,
          response: "Success",
          token: token, 
          message:"User loggedin successfully",
        });
        console.log(token);
      }
      else{
        res.status(404).json({
          returncode: 404,
          response: "Failed",
          message: "Invalid data"
        });
      }
    } catch (error) {
      res.status(400).json({
        returncode: 400,
        response: "Failed",
        message: error.message,
      });
      console.log(error);
    }
  }
}

const authClass = new auth();
module.exports = authClass;
