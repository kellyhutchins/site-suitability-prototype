const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
    entry: {
        bundle: [
            './src/ts/app.tsx'
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.scss'],
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
        new ExtractTextPlugin('bundle.css'),
        new CopyWebpackPlugin([
            { from: 'src/config', to: 'config' },
            { from: 'src/application-base-js/ApplicationBase.js', to: 'application-base-js' },
            { from: 'src/application-base-js/declareDecorator.js', to: 'application-base-js' }
        ])
    ],

    devServer: {
        contentBase: __dirname + '/dist',
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 8000
    }
};