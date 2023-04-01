const webpack= require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const resolvePath = relativePath => path.resolve(__dirname, relativePath);
let isDev = process.env.NODE_ENV === 'development'
let publicPath = "/"
module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: '[name].[contenthash].js',
    clean: true,
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(isDev ? 'development' : "production"),
      __PATH__: JSON.stringify(isDev ? "/" : publicPath),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: "babel-loader",
        options: {
          "presets": [
            "@babel/preset-react",
            "@babel/preset-typescript",
            [
              "@babel/preset-env",
              {
                "targets": {
                  "chrome": "49",
                  "ios": "10"
                }
              }
            ]
          ],
          "plugins": [
            ["import", {
              "libraryName": "antd-mobile",
              "libraryDirectory": "es/components",
              "style": false
            }]
          ]
        }
      },
      {
        test: /(.css|.less)$/,
        use:["style-loader", "css-loader","postcss-loader","less-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },

    ],
  },
  resolve: {
    extensions: [".tsx", '.ts', '.js'],
    alias: {
      '@': resolvePath('src'),
    }
  },
  devServer: {
    static: './dist',
    hot: true,
    historyApiFallback:true
  }
};
