const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // Путь к вашему основному JS-файлу
    output: {
        filename: 'main.js', // Имя файла, куда будет собран JS
        path: path.resolve(__dirname, 'dist'), // Путь, куда будет сборка
        clean: true // Очищать папку dist перед каждой сборкой
    },
    module: {
        rules: [
            {
                test: /\.css$/, // Регулярное выражение для CSS-файлов
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/, // Регулярное выражение для JS-файлов
                exclude: /node_modules/, // Исключить папку node_modules
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2|woff)$/i, // Регулярное выражение для картинок и шрифтов
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]' // Сохранять исходные имена файлов
                        }
                    }
                ]
            },
            {
            test: /\.html$/i,
            loader: 'html-loader',
          },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css', // Имя файла, куда будет собран CSS
        }),
       new HtmlWebpackPlugin({
         template: './src/index.html' // Путь к вашему HTML файлу
       }),
    ],
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
      },
};