const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const devMode = process.env.NODE_ENV !== "production";
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    // devtool: 'inline-source-map',
    entry: {
        main: [
            path.resolve(__dirname, './src/index.js'),
            path.resolve(__dirname, './src/assets/scss/main.scss'),
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/bundle.js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader", "postcss-loader"]
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './src/templates/index.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/assets/images", to: "assets/images" },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "assets/css/[name].css"
        }),
    ]
}