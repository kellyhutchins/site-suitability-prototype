const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: [
            './src/ts/app.tsx'
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        library: 'react-arcgis',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx'],
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        }
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' },
            {
                test: /\.scss$/, 
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            { test: /\.(ico|jpg|jpeg|gif|png|woff|woff2|eot|ttf|svg)$/i, use: 'file-loader?name=assets/[name].[ext]'}
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: 'src/index.html'
        }),
        new ExtractTextPlugin('bundle.css')
    ],

    devServer: {
        contentBase: __dirname + '/dist',
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 8000
    }
};