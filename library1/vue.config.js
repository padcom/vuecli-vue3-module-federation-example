const { defineConfig } = require('@vue/cli-service')

const { ModuleFederationPlugin } = require('webpack').container
const { dependencies } = require('./package.json')

module.exports = defineConfig({
  publicPath: 'auto',

  chainWebpack(config) {
    config.optimization.delete('splitChunks')
    config
      .plugin('module-federation-plugin')
      .use(ModuleFederationPlugin, [{
        name: 'library1',
        filename: 'remoteEntry.js',
        exposes: {
          './root': './src/index.js',
        },
        shared: dependencies,
      }])
  },

  devServer: {
    port: 8081,
    headers: {
      'access-control-allow-origin': '*',
    }
  }
})
