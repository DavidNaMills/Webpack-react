const glob = require ('glob-all');
const path = require('path');

const PurifyCSS = require('purifycss-webpack');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs');
var CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');


module.exports = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.ModuleConcatenationPlugin(),   //enables scope hoisting
    new PurifyCSS({
        paths: glob.sync(path.join(__dirname, 'dist/*.html')),
        minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
            warnings: false,
            screw_ie8: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true
          },
          output: {
            comments: false
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