const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    context: path.resolve(__dirname, 'dev'),
    entry: {
        main: ['@babel/polyfill', './index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].[contenthash].js',
        publicPath: '/'
    },
    mode: NODE_ENV,
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        port: 8080,
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.js', '.json', 'TTF', '.jpg', '.css'],
        alias: {
            '@comp': path.resolve(__dirname, 'dev/components'),
            '@assets': path.resolve(__dirname, 'dev/assets'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(devMode),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }, {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                ],
            }, {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[hash].[ext]',
                        },
                    },
                ],
            }, {
                test: /\.svg$/,
                loader: 'svg-url-loader',
                query: {
                    limit: '10000',
                }
            }, {
                test: /\.(ttf|TTF|woff|woff2|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[hash].[ext]',
                        },
                    },
                ],
            },]
    }
};