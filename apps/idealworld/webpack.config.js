const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (config, context) => {
  const updatedConfig = { ...config };

  updatedConfig.plugins = [
    new HtmlWebPackPlugin({
      template: context.buildOptions.root + '/' + context.buildOptions.index,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:4].css',
      chunkFilename: '[id].[contenthash:4].css'
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: context.buildOptions.tsConfig
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ];

  updatedConfig.module = {
    strictExportPresence: true,
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: { minimize: true }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'sass-loader']
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ng-annotate-loader',
            options: {
              ngAnnotate: 'ng-annotate-patched',
              sourcemap: true,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: context.buildOptions.tsConfig,
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
    ],
  }

  return updatedConfig;
};
