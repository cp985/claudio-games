const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
  
  ],
  resolve: {
    extensions: [".js"],
  },
};
