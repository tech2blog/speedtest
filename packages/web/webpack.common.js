const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: "./build/app",
    serviceWorker: "./build/serviceWorker"
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 500
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /worker.js$/,
        use: {
          loader: "worker-loader",
          options: {
            name: "[name].js"
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /views\/.*\.html$/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 1024,
          name: "[name].[ext]"
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist/*"], {
      root: __dirname
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      chunks: ["app"]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CopyWebpackPlugin([{ from: "src/assets/", to: "." }]),
    new webpack.DefinePlugin({
      BUILD_DATE: new Date().getTime(),
      VERSION: JSON.stringify(require("./package.json").version)
    })
  ]
};
