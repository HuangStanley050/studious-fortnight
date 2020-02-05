const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/oauth/google", { target: "http://localhost:8000" }));
  // app.use(proxy("/auth/local/login", { target: "http://localhost:8000" }));
  app.use(proxy("/oauth/facebook", { target: "http://localhost:8000" }));
  // app.use(proxy("/auth/local/register", { target: "http://localhost:8000" }));
  app.use(proxy("/api/**", { target: "http://localhost:8000" }));
};
