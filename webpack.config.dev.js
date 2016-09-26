const path    = require('path')
const webpack = require('webpack')

const config =
  { context:     __dirname
  , devtool:     'eval-source-map'
  , entry:       [ 'webpack-hot-middleware/client'
                 , path.join(__dirname, 'src/index.js')
                 ]
  , output:      { path:       '/'
                 , publicPath: '/'
                 }
  , plugins:     [ new webpack.HotModuleReplacementPlugin()
                 , new webpack.optimize.OccurenceOrderPlugin()
                 , new webpack.NoErrorsPlugin()
                 ]
  , module:      { loaders: [ { test:    /\.js$/
                              , include: path.join(__dirname, 'src')
                              , loaders: [ 'babel' ]
                              }
                            , { test:    /\.scss$/
                              , loaders: ['style', 'css', 'sass']
                              }
                            ]
                 }
  , resolve:     { extensions: [ '', '.js' ] }
  , sassLoader:  { includePaths: [ path.join(__dirname, 'src/style') ] }
  }

module.exports = config
