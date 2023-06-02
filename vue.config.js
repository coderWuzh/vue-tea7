const { defineConfig } = require('@vue/cli-service')
const path = require("node:path")
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  // devServer: {
  //   // host: "192.168.0.109",
  //   proxy: {
  //     '/api': {
  //       target: "http://localhost:3000",
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': '/api'
  //       }
  //     }
  //   },
  // },
  configureWebpack: (config) => {
    config.resolve = {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    }
  }
})
