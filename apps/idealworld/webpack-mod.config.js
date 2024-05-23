const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const path = require('path');

const sourcePath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

const projectPath = '/Users/lupe.rios/WebstormProjects/examples/nx-migrate-angularjs-example-alt1'

module.exports = (env, argv) => {
  // console.log('env', env);
  // console.log('argv', argv);
  // console.log('__dirname', __dirname);
  // console.log('path', path);
  // console.log('sourcePath', sourcePath);
  // console.log('distPath', distPath);
  // console.log('projectPath', projectPath);

  // const isProd = argv.mode === 'production';

  const plugins = [
    new HtmlWebPackPlugin({
      template: sourcePath + '/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:4].css',
      chunkFilename: '[id].[contenthash:4].css'
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: projectPath + '/apps/idealworld/tsconfig.app.json'
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ];

  // if (isProd) {
  //   plugins.push(
  //     new webpack.NormalModuleReplacementPlugin(
  //       /\/environments\/environment\.ts/,  `${sourcePath}/environments/environment.prod.ts`
  //     ),
  //     // new UglifyJsPlugin({ sourceMap: true })
  //     new TerserPlugin({ })
  //   );
  // } else {
  //   // plugins.push(new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin());
  //   plugins.push(new webpack.HotModuleReplacementPlugin());
  // }

  const config = {
    entry: {
      app: sourcePath + '/main.ts',
    },
    output: {
      // path: distPath,
      path: projectPath + '/dist',
      filename: '[name].bundle.[hash:4].js',
    },
    module: {
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
                configFile: projectPath + '/apps/idealworld/tsconfig.app.json',
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
        }
      ],
    },
    resolve: {
      extensions: ['.js', '.ts'],
      modules: [
        // path.resolve(__dirname, 'node_modules'),
        path.resolve(projectPath + '/', 'node_modules'),
        sourcePath
      ]
    },
    plugins,
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    // devtool: 'eval-source-map',
    devServer: {
      static: projectPath + '/dist',
      hot: true
    }
  };

  // if (!isProd) {
  //   config.devtool = 'source-map';
  // }
  config.devtool = 'source-map';

  // console.log('config', config);
  return config;
};


// const path = require('path');
// const sourcePath = path.resolve(__dirname, '/');
//
// module.exports = (config, context) => {
//   console.log('config', config);
//   console.log('context', context);
//   console.log('__dirname', __dirname);
//   console.log('sourcePath', sourcePath);
//   console.log('path', path);
//   return {
//     ...config,
//     module: {
//       strictExportPresence: true,
//       rules: [
//         {
//           test: /\.html$/,
//           use: [{ loader: 'raw-loader' }],
//         },
//
//         // {
//         //   test: /\.html$/,
//         //   loader: 'html-loader',
//         //   options: { minimize: true }
//         // },
//
//         // Load ts files through Babel
//
//         // {
//         //   test: /\.(ts|tsx)$/,
//         //   loader: 'babel-loader',
//         //   options: {
//         //     presets: ['@babel/preset-env'],
//         //     plugins: ['angularjs-annotate'],
//         //   },
//         // },
//         // app.module.ts: Support for the experimental syntax 'decorators-legacy' isn't currently enabled (7:1):
//
//         // {
//         //   test: /\.(ts|tsx)$/,
//         //   use: [
//         //     { loader: 'ng-annotate-loader' },
//         //     { loader: 'babel-loader' },
//         //   ]
//         // },
//         // error: couldn't process source due to parse error,'import' and 'export' may appear only with 'sourceType: module'
//
//         // {
//         //   test: /\.ts$/,
//         //   exclude: /node_modules/,
//         //   use: [
//         //     {
//         //       loader: 'ng-annotate-loader',
//         //       options: {
//         //         ngAnnotate: 'ng-annotate-patched',
//         //         sourcemap: true,
//         //       },
//         //     },
//         //   ]
//         // },
//         // NonErrorEmittedError: (Emitted value instead of an instance of Error) error: couldn't process source due to parse error,Unexpected character '@'
//
//         {
//           test: /\.ts$/,
//           exclude: /node_modules/,
//           use: [
//             {
//               loader: 'ng-annotate-loader',
//               options: {
//                 ngAnnotate: 'ng-annotate-patched',
//                 sourcemap: true,
//               },
//             },
//             {
//               loader: 'ts-loader',
//               options: {
//                 configFile: context.buildOptions.tsConfig,
//                 // configFile: sourcePath + '/tsconfig.app.json',
//                 // disable type checker - we will use it in fork plugin
//                 transpileOnly: true,
//               }
//             }
//           ]
//         },
//         // {
//         //   test: /\.(ts|tsx)$/,
//         //   loader: 'babel-loader',
//         //   options: {
//         //     presets: ['@babel/preset-env'],
//         //     plugins: ['ng-annotate-loader'],
//         //   },
//         //   // use: [
//         //   //   {
//         //   //     loader: 'ng-annotate-loader',
//         //   //     options: {
//         //   //       ngAnnotate: 'ng-annotate-patched',
//         //   //       sourcemap: true,
//         //   //     },
//         //   //   },
//         //   //   // {
//         //   //   //   loader: 'ts-loader',
//         //   //   //   options: {
//         //   //   //     configFile: sourcePath + '/tsconfig.app.json',
//         //   //   //     // disable type checker - we will use it in fork plugin
//         //   //   //     transpileOnly: true,
//         //   //   //   }
//         //   //   // }
//         //   // ]
//         //     // loaders: ['ng-annotate-loader?ngAnnotate=ng-annotate-patched']
//         // },
//       ],
//     },
//   };
// };
