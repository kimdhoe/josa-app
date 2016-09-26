const path               = require('path')
const webpack            = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const PATHS = { src:   path.join(__dirname, 'src')
              , build: path.join(__dirname, 'build')
              }

const config =
  { context:    __dirname
  , devtool:    'source-map'
  , entry:      [ PATHS.src ]
  , output:     { path:     PATHS.build
                , filename: 'bundle.js'
                }
  , plugins:    [ new webpack.optimize.OccurenceOrderPlugin()
                , new webpack.optimize.DedupePlugin()
                , new webpack.DefinePlugin(
                    { 'process.env.NODE_ENV': JSON.stringify('production') }
                  )
                , new webpack.optimize.UglifyJsPlugin(
                    { compress: { warnings: false } }
                  )
                , new CleanWebpackPlugin( [ PATHS.build ]
                                        , { root: process.cwd() }
                                        )
                ]
  , module:     { loaders: [ { test:    /\.js$/
                             , include: path.join(__dirname, 'src')
                             , loaders: [ 'babel' ]
                             }
                           , { test:    /\.scss$/
                             , loaders: ['style', 'css', 'sass']
                             }
                           ]
                }
  , resolve:    { extensions: [ '', '.js' ] }
  , sassLoader: { includePaths: [ path.join(__dirname, 'src/style') ] }
  }

module.exports = config
