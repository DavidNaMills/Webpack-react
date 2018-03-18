const path = require('path');


const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require ('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require ('html-webpack-plugin');

const ABSOLUTEPATH = path.join(__dirname, 'dist');



const extractPlugin = new ExtractTextPlugin({
    filename: 'css/test.css',

});

console.log(process.env.NODE_ENV);
let PLUGINS = process.env.NODE_ENV === 'production' ? require('./webpack_Configs/production') : [];

module.exports={
    context: path.resolve(__dirname, 'src'),
    entry:{
        app: './app.js'
    },
    output :{
        path: ABSOLUTEPATH,
        filename: 'scripts/bundle.js'
    },

    devServer: {
        contentBase: path.resolve(__dirname, "dist/public"),
        stats: "errors-only",
        open: true,
        port: 12000,
        compress: true
    },
    devtool: 'inline-source-map',

    module: {
        noParse: /jquery|lodash/,
        rules: [
            {
                test: /\.js$/,
                include: /src/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader",
                    options: {
                        presets: ['env']
                    }
                }
            },

            {
                test: /\.html$/,
                use: ['html-loader']
            },

            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, 'src', 'css')],
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.(jpg|png|gif|svg)$/,
                use:[
                    "file-loader?name=[name].[ext]&outputPath=img/",
                    "image-webpack-loader"
                ],
            },

            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }

        ]
    },

    plugins:[
        new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        extractPlugin,
        ...PLUGINS
    ]
};