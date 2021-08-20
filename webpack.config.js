const path = require('path')
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WebpackCleanPlugin = require('clean-webpack-plugin')
let mode = "development";
if (process.env.NODE_ENV === "production"){
    mode = "production";
}

module.exports = {
    mode: mode,
    devtool: "source-map",
    entry: {
        slider: ['./src/index.ts'],


    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, './dist'),
    },
    devServer: {
        hot: true
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/[name].css'
        }),
        new  HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: /\.m?ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
        ]
    }
}