// File: webpack.prod.js (versione finale e corretta)

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin"); // Già presente, ottimo!
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
    publicPath: "/claudio-games/",
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
      // Le regole per gli assets vanno bene, ma è meglio gestirle con CopyPlugin se sono in /public o /assets
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

    // ===================================================================
    // =========== BLOCCO CORRETTO PER COPY-WEBPACK-PLUGIN ===============
    // ===================================================================
    new CopyWebpackPlugin({
      patterns: [
        // Copia tutto il contenuto della cartella 'public' nella 'dist',
        // tranne il file index.html che è già gestito da HtmlWebpackPlugin.
        // Questo copierà automaticamente 404.html, redirect.js, e qualsiasi altra cosa (es. favicon, immagini).
        {
          from: "public",
          to: ".", // Copia nella radice di 'dist'
          globOptions: {
            ignore: ["**/index.html"], // Fondamentale per non avere un conflitto
          },
        },
        // Se hai una cartella 'assets' separata fuori da 'public', puoi aggiungerla qui.
        // Esempio: { from: "assets", to: "assets" }
      ],
    }),
    // ===================================================================
    // ===================================================================
  ],
  resolve: {
    extensions: [".js"],
  },
};