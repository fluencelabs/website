const webpack = require('webpack');
const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: path.resolve(__dirname, '../assets/js/main.js'),

    devtool: "source-map",

    output: {
        path: path.resolve(__dirname, '../app'),
        filename: "[name].js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.pug$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    'html-loader',
                    {
                        loader: 'pug-html-loader',
                        options: {
                            exports: false
                        }
                    }
                ]
            },
            {
                test: /\.inline.svg$/,
                loader: 'svg-inline-loader',
            },
            {
                test: /^((?!inline).)*.svg$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=static/[name].[ext]'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=static/[name].[ext]'
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            }
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../assets/templates/index.pug')
        }),

        new HtmlWebpackPlugin({
            filename: 'about.html',
            template: path.resolve(__dirname, '../assets/templates/about.pug')
        }),

        new CopyWebpackPlugin([{
          from: path.resolve(__dirname, '../assets/img/favicon.png'),
          to: "static/favicon.png"
        }]),

        extractSass
    ],

    stats: {
        colors: true
    },
};