/**
 * @summary 开发模式webpack配置
 */

const base = require("./webpack-base");
const merge = require("webpack-merge");
const webpack = require('webpack');

const dev_config = merge(base, {
  // webpack4新增属性，默认返回production,提供一些默认配置，例如cache:true
  mode: process.env._WEBPACK_MODE_, 
  devtool: 'cheap-module-eval-source-map',
  // source-map每个module生成对应的map文件
  // eval 每一个module模块执行eval，不生成map文件，在尾部生成一个sourceURL对应前后关系，所以更快
  // cheap 列信息 VLQ编码
  // module 包含了模块之间的sourcemap
  module: { 
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }, 
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      }
    ],
  },
  devServer: { // 配置webpack-dev-server， 在本地启动一个服务器运行
    host: '0.0.0.0', // 服务器的ip地址 希望服务器外可以访问就设置 0.0.0.0
    port: 80, // 端口
    // open: true, // 自动打开页面
    disableHostCheck: true,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});

module.exports = dev_config;