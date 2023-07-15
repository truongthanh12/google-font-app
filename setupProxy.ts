const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  dev: {
    "/api": {
      target: "https://www.fonts.google.com",
      rewrite: (path: any) => path.replace(/^\/api/, ""),
      // pathRewrite: { "^/api/": "/" },
    },
  },
};
