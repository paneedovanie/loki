module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "^/storage": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
};
