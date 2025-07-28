const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin"); 

module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.[contenthash].js",
    publicPath: "/claudio-games/",
    clean: true,
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
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
        new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "assets/favicon/icofav.ico"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),

  ],
  resolve: {
    extensions: [".js"],
  },
};
