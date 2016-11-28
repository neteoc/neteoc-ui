const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const htmlBuilder = new HtmlWebpackPlugin({
  template: path.resolve('index.html')
});

const providerPlugin = new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery",
  "window.jQuery": "jquery",
  _: 'lodash',
  'P': 'bluebird',
  'Promise': 'bluebird'
});

module.exports = {
  devtool: "source-map",
  context: path.resolve('.'),
  entry: "./index.js",
  output: {
    //path: path.resolve('../neteoc-server/public/'),
    path: path.resolve('./dist/'),
    publicPath: '/',
    filename: "[hash]-bundle.js"
  },

  module: {
    loaders: [
       // the url-loader uses DataUrls.
      // the file-loader emits files.
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=100&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {
       test: /\.js$/,
       exclude: /(node_modules|bower_components)/,
       loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
       query: {
         presets: ['es2015']
       }
     },
     { test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]},
        {
        test: /\.html$/,
        include: [
          path.resolve(__dirname, 'client/plugins/'),
        ],
        loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './client/plugins/')) + '/!html'
      }
   ]
  },

  plugins: [
    htmlBuilder,
    providerPlugin
  ],

  devServer: {
      contentBase: '/',
      historyApiFallback: true,
      inline: true
  },

};
