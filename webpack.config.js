const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const fs = require('fs');

function getEntries() {
    return fs.readdirSync('./Scripts/Pages/')
        .filter(
            (file) => file.match(/.*\.js$/)
        )
        .map((file) => {
            return {
                name: file.substring(0, file.length - 3),
                path: './Scripts/Pages/' + file
            }
        })
        .reduce((memo, file) => {
            memo[file.name] = file.path
            return memo;
        }, {})
}

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        alias: {
            'inferno': 'inferno/dist/index.dev.esm.js',
        },
    },
    entry: getEntries,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'wwwroot/assets'),
        clean: true
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                resolve: {
                    fullySpecified: false
                }
            },
            {
                test: /\.wwwroot\.s?css$/i,
                use: [MiniCssExtractPlugin.loader, 'style-loader', "css-loader", "sass-loader"],
            },
            {
                test: /\.wwwroot\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: 'asset'
            },
            {
                test: /\.wwwroot\.(eot|woff(2)?|ttf|otf|svg)$/i,
                type: 'asset'
            }

        ]
    },
    performance: {
        hints: false
    },
    optimization: {
        minimizer: [
            process.env.NODE_ENV === 'production' ? new TerserPlugin({
                minify: TerserPlugin.uglifyJsMinify,
                terserOptions: {
                    mangle: true,
                    compress: {
                        sequences: true,
                        dead_code: true,
                        conditionals: true,
                        booleans: true,
                        unused: true,
                        if_return: true,
                        join_vars: true,
                        drop_console: true
                    }
                },
            }) : null,
            new CssMinimizerPlugin(),
        ],
        minimize: process.env.NODE_ENV === 'production',
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new CopyPlugin({
            patterns: [
                {from: 'node_modules/devextreme/dist/css/fonts', to: 'css/fonts'},
                {from: 'node_modules/devextreme/dist/css/icons', to: 'css/icons'},
                {from: 'node_modules/devextreme/dist/css/dx.fluent.saas.light.css', to: 'css'},
                {from: 'node_modules/devextreme/dist/css/dx.fluent.saas.dark.css', to: 'css'},
                {from: 'node_modules/bootstrap-icons/font/bootstrap-icons.css', to: 'css/icons'},
                {from: 'node_modules/bootstrap-icons/font/fonts', to: 'css/icons/fonts'},
                {from: 'Styles', to: 'css'}
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ]
};