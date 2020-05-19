var path = require('path');
var webpack = require('webpack')
var BUILD_DIR = path.resolve(__dirname, 'dist/');
var APP_DIR = path.resolve(__dirname, 'src/');
var SERVER= path.resolve(__dirname, 'cms/');
module.exports = {
    entry: APP_DIR+'/main.js',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ],
    module: {
        rules: [
          {
            test: /\.(css|sass|scss)$/,
            use: [
            {
              loader: 'style-loader', // inject CSS to page
            }, {
              loader: 'css-loader', // translates CSS into CommonJS modules
            }, {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: function () { // post css plugins, can be exported to postcss.config.js
                  return [
                    require('precss'),
                    require('autoprefixer'),
                    require('cssnano')
                  ];
                }
              }
            }, {
              loader: 'sass-loader' // compiles SASS to CSS
            },
            ],
          },
          {
            test: /\.ico$/,
            include: APP_DIR,
            use: [{
                loader: 'file-loader?name=[name].[ext]'
            }],
          },
          {
            test: /\.(ttf|eot|svg|gif|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            include: APP_DIR,
            use: [{
                loader: 'file-loader',
                options: {
                  name: "[name].[ext]",
                  outputPath: 'fonts',
                  publicPath: './src/fonts'
                }
            }]
          },
          {
            test: /\.(jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            include: APP_DIR,
            use: [{
                loader: 'file-loader',
                options: {
                  name: "[name].[ext]",
                  outputPath: 'images',
                  publicPath: './src/images'
                },
            }]
          }
        ],
      },
};