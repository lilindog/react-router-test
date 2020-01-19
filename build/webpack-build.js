/**
 * @summary 打包模式webpack配置
 */

const base = require("./webpack-base");
const merge = require("webpack-merge");
const path = require('path');
const miniCssPlugin = require("mini-css-extract-plugin");//分离css文件插件
const ocawp = require("optimize-css-assets-webpack-plugin");//压缩css文件插件
const cleanPlugin = require("my-webpack-clearDir-plugin");//打包前删除ouput目录之前的打包文件的插件
const CopyWebpackPlugin = require("copy-webpack-plugin");//拷贝插件
const CopyPlugin = require("my-webpack-copy-plugin");

const build_config = merge(base, {
  // webpack4新增属性，默认返回production,提供一些默认配置，例如cache:true
  mode: process.env._WEBPACK_MODE_, 
  devtool: 'source-map',
  // source-map每个module生成对应的map文件
  // eval 每一个module模块执行eval，不生成map文件，在尾部生成一个sourceURL对应前后关系，所以更快
  // cheap 列信息 VLQ编码
  // module 包含了模块之间的sourcemap

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", {
            loader: miniCssPlugin.loader,
          }, "css-loader"]
      }, 
      {
        test: /\.less$/,
        use: ["style-loader", {
            loader: miniCssPlugin.loader,
          }, "css-loader", "less-loader"]
      }
    ],
  },
  plugins: [
    //分离css
    new miniCssPlugin({
      filename: "css/[name]-[hash].css",
      chunkFilename: "[id].css"
    }),
    //压缩css
    new ocawp({
      assetNameRegExp: /\.css$/,
      cssProcessor: require('cssnano'),
    }),
    //每次编译先清除上一次编译生成的文件
    new cleanPlugin(path.resolve("./dist")),
    //拷贝public
    new CopyWebpackPlugin([
      {
          from: './public',
          to: './public', //这个路径是以webpack配置的输出目录
          // ignore: ['.*']
      }
    ]),
    new CopyPlugin({from: "./dist/font", to: "./dist/css/font"})
  ]
});

module.exports = build_config;