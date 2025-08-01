// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");

// module.exports = {
//   mode: "production",
//   entry: "./src/main.js",
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "js/[name].[contenthash].js",
//     chunkFilename: "js/[name].[contenthash].chunk.js",
//     publicPath: "/claudio-games/",
//     clean: true,
//   },
//   optimization: {
//     minimize: true,
//     minimizer: [
//       new TerserPlugin({
//         terserOptions: {
//           compress: {
//             drop_console: true,
//           },
//         },
//       }),
//       new CssMinimizerPlugin(),
//     ],
//     splitChunks: {
//       chunks: "all",
//       cacheGroups: {
//         vendors: {
//           test: /[\\/]node_modules[\\/]/,
//           name: "vendors",
//           chunks: "all",
//         },
//       },
//     },
//   },
//   devtool: "source-map",
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: [
//               [
//                 "@babel/preset-env",
//                 {
//                   useBuiltIns: "usage",
//                   corejs: 3,
//                 },
//               ],
//             ],
//           },
//         },
//       },
//       {
//         test: /\.css$/,
//         use: [MiniCssExtractPlugin.loader, "css-loader"],
//       },


//       {
//         test: /\.(mp3|wav|ogg)$/i,
//         type: "asset/resource",
//         generator: {
//           filename: "assets/audio/[name].[hash][ext]",
//         },
//       },

//       {
//         test: /\.(mp4|webm)$/i,
//         type: "asset/resource",
//         generator: {
//           filename: "assets/video/[name].[hash][ext]",
//         },
//       },

//       {
//         test: /\.(woff|woff2|eot|ttf|otf)$/i,
//         type: "asset/resource",
//         generator: {
//           filename: "assets/fonts/[name].[hash][ext]",
//         },
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: "./public/index.html",
//       filename: 'index.html',
//       minify: {
//         removeComments: true,
//         collapseWhitespace: true,
//         removeRedundantAttributes: true,
//         useShortDoctype: true,
//         removeEmptyAttributes: true,
//         removeStyleLinkTypeAttributes: true,
//         keepClosingSlash: true,
//         minifyJS: true,
//         minifyCSS: true,
//         minifyURLs: true,
//       },
      
//     }),
//     new CopyWebpackPlugin({
//       patterns: [
//         { from: "assets/img", to: "img" },
//         { from: "assets/favicon", to: "favicon" },
//       ],
//     }),
//         new CopyWebpackPlugin({
//       patterns: [
//         { from: "assets/img", to: "img" },
//         { from: "assets/favicon", to: "favicon" },
//         { from: "public/404.html", to: "404.html" }, // <-- NUOVA RIGA
//       ],
//     }),
//   ],
//   resolve: {
//     extensions: [".js"],
//   },
// };

// File: webpack.prod.js (versione FINALE e CORRETTA)

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash].js",
    chunkFilename: "js/[name].[contenthash].chunk.js",
    publicPath: "/",
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
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
          options: {
            presets: [
              ["@babel/preset-env", { useBuiltIns: "usage", corejs: 3 }],
            ],
          },
        },
      },
      // Questa regola ha bisogno del plugin qui sotto
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(mp3|wav|ogg)$/i,
        type: "asset/resource",
        generator: { filename: "assets/audio/[name].[hash][ext]" },
      },
      {
        test: /\.(mp4|webm)$/i,
        type: "asset/resource",
        generator: { filename: "assets/video/[name].[hash][ext]" },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: { filename: "assets/fonts/name.[hash][ext]" },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    // ***** MODIFICA 1: REINSERITO IL PLUGIN MANCANTE *****
    // Questo plugin è necessario per estrarre il CSS in file separati.
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[id].[contenthash].css",
    }),

    // ***** MODIFICA 2: UNITO E CORRETTO COPYWEBPACKPLUGIN *****
    // Ora copia tutto quello che serve in una sola operazione.
    new CopyWebpackPlugin({
      patterns: [
        { from: "assets/img", to: "img" },
        { from: "assets/favicon", to: "favicon" },
        { from: "public/404.html", to: "404.html" },
      ],
    }),
  ],
  resolve: {
    extensions: [".js"],
  },
};