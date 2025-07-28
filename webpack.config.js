const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin"); // <--- aggiunto

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
  devtool: "eval-cheap-module-source-map",
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
