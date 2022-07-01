const { defineConfig } = require('@vue/cli-service')

const { ModuleFederationPlugin } = require('webpack').container
const { dependencies } = require('./package.json')

module.exports = defineConfig({
  chainWebpack(config) {
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
