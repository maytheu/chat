const createProxyMiddleware = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3003/",
      changeOrigin: true,
    })
  ),
    app.use(
      "/auth",
      createProxyMiddleware({
        target: "http://localhost:3003/",
      })
    );
};

// const proxy = require("http-proxy-middleware");

// module.exports = function(app) {
//   app.use(proxy("/api", { target: "http://localhost:3003/" }));
//   app.use(proxy("/auth", { target: "http://localhost:3003/" }));
// };