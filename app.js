const express = require("express");
const app = express();
require('dotenv').config()
const PORT = process.env.PORT;
const router = require("./routes/routes.js");
const bodyParser = require("body-parser");
const rateLimiter = require('./middleware/rateLimiter.js');
const proxyServer = require("./middleware/proxy.js");
const swaggerUI = require("swagger-ui-express");
swaggerDocument = require("./swagger.json");

app.use("/search", proxyServer);
app.use(rateLimiter);
app.use(bodyParser.json());
app.use(
    '/didModule',
    swaggerUI.serve, 
    swaggerUI.setup(swaggerDocument)
  );
app.use(router);

app.listen(PORT || 3000, ()=>{
    console.log("Server is running at port", PORT);
});