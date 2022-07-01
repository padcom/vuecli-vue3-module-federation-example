const { defineConfig } = require('@vue/cli-service')

const { ModuleFederationPlugin } = require('webpack').container
const { dependencies } = require('./package.json')

module.exports = defineConfig({
  // transpileDependencies: true,

  chainWebpack(config) {
    // config.optimization.delete('splitChunks')
    config
      .plugin('module-federation-plugin')
      .use(ModuleFederationPlugin, [{
        name: 'host',
        remotes: {
          library1: 'library1@http://localhost:8081/remoteEntry.js',
        },
        shared: dependencies,
      }])
  },

  devServer: {
    port: 8080,
  }
})
