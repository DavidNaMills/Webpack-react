const glob = require ('glob-all');
const path = require('path');

const PurifyCSS = require('purifycss-webpack');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs');
var CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');


module.exports = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '\"production\"',
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),  
    new PurifyCSS({
        paths: glob.sync(path.join(__dirname, 'dist/*.html')),
        minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        beautify:false,
        comments: false, // remove comments
        compress: {
          unused: true,
          dead_code: true, // big one--strip code that will never execute
          warnings: false, // good for prod apps so users can't peek behind curtain
          drop_debugger: true,
          conditionals: true,
          evaluate: true,
          drop_console: true, // strips console statements
          sequences: true,
          booleans: true,
        }
      }),
      new CompressionPlugin({
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8
        }) 
];