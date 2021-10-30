const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js' // release 会自动创建
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html' // bundle.js 会自动注入
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, './dist'), // 根目录
    open: true, // 自动打开浏览器
    port: 9000, // 端口
    proxy: {
      '/api/*': {
        target: 'http://localhost:8880',
        pathRewrite: { '^/api': '/src/api/' }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  }
};
