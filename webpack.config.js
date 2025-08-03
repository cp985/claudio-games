const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webpack = require('webpack'); 

const BASE_URL = process.env.BASE_URL || ''; // Legge la variabile o usa '/'

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "App.js",
    publicPath: "/",
    clean: true,
  },
  devServer: {
    static: "./dist",
    hot: true,
    open: true,
    port: 3008,
    historyApiFallback: true,
    watchFiles: ["src/**/*", "public/**/*", "index.html"],
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash][ext]'
        }
      },
      {
        test: /\.(mp3|wav|ogg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/audio/[name][ext]",
        },
      },

      {
        test: /\.(mp4|webm)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/video/[name][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CopyWebpackPlugin({ // <-- MODIFICA: AGGIUNTO COPYWEBPACKPLUGIN QUI PER LO SVILUPPO
      patterns: [
        { from: "assets/img", to: "img" }, // Copia le immagini anche in sviluppo
        { from: "assets/favicon", to: "favicon" }, // Copia i favicon anche in sviluppo
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
