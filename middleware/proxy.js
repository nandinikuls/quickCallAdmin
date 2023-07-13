const { createProxyMiddleware } = require("http-proxy-middleware");

const proxy = createProxyMiddleware({
  target: "http://localhost:8081/getAgentData",
  changeOrigin: true,
  pathRewrite: {
    [`^/search`]: "",
  }
});
module.exports = proxy;
