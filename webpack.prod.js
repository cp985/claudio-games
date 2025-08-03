const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin"); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const webpack = require('webpack'); 

const BASE_URL = process.env.BASE_URL || '/'; 

module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash].js",
    chunkFilename: "js/[name].[contenthash].chunk.js",
    publicPath: BASE_URL,
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()], // Terser non necessita di opzioni per rimuovere i console.log in produzione
    splitChunks: {
      chunks: "all",
    },
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
            {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash][ext]'
        }
      },
      {
        test: /\.(mp3|wav|ogg|mp4|webm|woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: { filename: "assets/[name].[hash][ext]" },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: true, // true è sufficiente per le ottimizzazioni standard
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: ".", // Copia nella radice di 'dist'
          globOptions: {
            ignore: ["**/index.html"], // Fondamentale per non avere un conflitto
          },
        },
      ],
    }),
      new webpack.DefinePlugin({
    '__BASE_URL__': JSON.stringify(BASE_URL)
  })
  ],
  resolve: {
    extensions: [".js"],
  },
};