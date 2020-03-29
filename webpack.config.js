const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        index: './src/index.js',
        game: './src/game.js',
        welcome: './src/welcome.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/asset'),
        publicPath: '/asset/'
    },
    externals: {
        jquery: 'jQuery',
        Vue: 'Vue',
        jweixin: 'wx'
    },
    devServer: {
        port: 8080,
        compress: true,
        contentBase: path.resolve(__dirname, 'dist'),
        // proxy: {
        //     '/activity': {
        //         target: 'http://e1.weiwuapp.cn',
        //         changeOrigin: true,
        //     }
        // }
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify(process.env.NODE_ENV)
        })
    ]
}

if (process.env.NODE_ENV === 'prod') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ])
}
