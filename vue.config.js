
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8201',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
};
