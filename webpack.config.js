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
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/favicon.ico",
          to: "favicon.ico",
        }, // <--- aggiunto
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/android-icon-144x144.png",
          to: "android-icon-144x144.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/android-icon-192x192.png",
          to: "android-icon-192x192.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/android-icon-36x36.png",
          to: "android-icon-36x36.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/android-icon-48x48.png",
          to: "android-icon-48x48.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/android-icon-72x72.png",
          to: "android-icon-72x72.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/android-icon-96x96.png",
          to: "android-icon-96x96.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/apple-icon-114x114.png",
          to: "apple-icon-114x114.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/apple-icon-120x120.png",
          to: "apple-icon-120x120.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/apple-icon-144x144.png",
          to: "apple-icon-144x144.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/apple-icon-152x152.png",
          to: "apple-icon-152x152.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/apple-icon-180x180.png",
          to: "apple-icon-180x180.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/apple-icon-57x57.png",
          to: "apple-icon-57x57.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/apple-icon-60x60.png",
          to: "apple-icon-60x60.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/apple-icon-72x72.png",
          to: "apple-icon-72x72.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/apple-icon-76x76.png",
          to: "apple-icon-76x76.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/apple-icon-precomposed.png",
          to: "apple-icon-precomposed.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/apple-icon.png",
          to: "apple-icon.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/favicon-16x16.png",
          to: "favicon-16x16.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/favicon-32x32.png",
          to: "favicon-32x32.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/favicon-96x96.png",
          to: "android-icon-48x48.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/ms-icon-144x144.png",
          to: "ms-icon-144x144.png",
        },

        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/ms-icon-150x150.png",
          to: "ms-icon-150x150.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/ms-icon-310x310.png",
          to: "ms-icon-310x310.png",
        },
        {
          from: "./assets/favicon/d0c3a9cce3bb15ba2fdeea2b0b21ff99.ico/ms-icon-70x70.png",
          to: "ms-icon-70x70.png",
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".js"],
  },
};
