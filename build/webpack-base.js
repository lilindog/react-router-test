/**
 * @summary webpack基础配置
 */

const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html模板的插件
const parseEnv = require("parseenv"); //解析自定义.env文件的模块

module.exports = {
  entry: {
    home: path.resolve('./src/index.tsx'),
  },
  output: {
    filename: 'js/[name]-[hash:4].js',
    path: path.resolve('dist'), 
  },
  module: { // 配置loader
    rules: [
      {
        test: /(\.tsx|\.ts)$/,
        include: path.resolve('src'), // 只解析src下面的文件,不推荐用exclude
        use: ["babel-loader", "ts-loader"]
      },
      //字体处理
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
        include: path.resolve("./src/assets/fonts"),
        use: [{
             loader: "file-loader",
             options:{
                limit: 80000,
                outputPath: "font",
                name: "[name]-[hash:4].[ext]"
             }
         }]
      },
      //图片处理
      {
          test: /\.(png|jpg|gif|svg)$/,
          exclude: path.resolve("./src/assets/fonts"),
          use: [{
              loader: "file-loader",
              options:{
                  outputPath: "img",
                  name: "[name]-[hash:4].[ext]"
              }
          }]
      }
    ],
  },
  resolve: {
    extensions: [".jsx", ".js", ".ts", ".tsx",".less"],
    alias: {
      '@':  path.resolve('src')
    }
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve("./dist/index.html"), // 生成的html文件存放的地址和文件名
      template: path.resolve("./index.html"), // 基于index.html模板进行生成html文件
    }),
    new webpack.DefinePlugin({
      _WEBPACK_MODE_: process.env._WEBPACK_MODE_ ? JSON.stringify(process.env._WEBPACK_MODE_) : console.log("没有_WEBPACK_DEV_环境变量！"),
      _ENV_: JSON.stringify(parseEnv(
        process.env._WEBPACK_MODE_ === "production" ?
        "./env/production.env" :
        process.env._WEBPACK_MODE_ === "development" ?
        "./env/development.env" : console.log("没有读取到.env文件！")
      ))
    })   
  ]
}