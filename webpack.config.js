const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require("vue-loader/lib/plugin")

let config = {
  mode: 'none',
  entry: path.join(__dirname, './src/main'),//入口，表示要使用 webpack 打包哪个文件
  output:{//输出文件相关的配置
    path:path.join(__dirname,'./dist'),
    filename:'bundle.js'//指定输出文件的名称
  },
  devServer:{ // 这是配置 dev-server 命令参数的第二种方式，相对来说，麻烦一些
    open: true, //自动打开
    port: 3000, //设置启动时候的运行端口
    contentBase: 'src', // 指定托管的根目录
    hot: true //启用热更新
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(), //new 一个热更新的 模块对象，
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename:'index.html'
    }),
    new VueLoaderPlugin()
  ],
  module:{//这个节点用于 配置 所有的 第三方 加载器
    rules:[ //所有第三方模块的 匹配规则
      {  test:/\.css$/, use:['style-loader', 'css-loader'] },
      {  test:/.less$/,use:['style-loader', 'css-loader','less-loader']},
      //less处理规则
      {  test:/.scss$/,use:['style-loader', 'css-loader','sass-loader']},
      {  test:/\.js$/,use:['babel-loader'],exclude:/node_modules/},
      {  test:/\.vue$/,use:['vue-loader']},
      {  test:/\.(ttf|eot|svg|woff|woff2|otf)$/, use:['url-loader']  },
      
    ]
  },
  resolve:{
      alias:{
        'vue$':"vue/dist/vue.js"
      }
  }
}

module.exports = config
//当我们在控制台,直接输入 webpack 命令执行的时候，webpack做了一下几步:
// 1. 首先，webpack发现，我们并没有通过命令的形式，指定入口和出口
// 2. webpack就回去 项目 的 根目录 下，查找 webpack.config.js 的配置文件
// 3. 当找到配置文件后，webpack就会解析执行这个配置文件，当解析执行完配置文件后，
//    就得到了配置文件，到处的配置对象
// 4. 当webpack 拿到配置对象后，就拿到了配置对象中，指定的入口和出口，然后进行打包

//  使用 webpack-dev-server 这个工具，来实现自动打包编译功能
// 1. 运行npm i wenpack-dev-server -D
// 2. 安装完毕后，这个 工具的用法，和webpack命令的用法一样
// 3. 只有安装全局的才可以在终端执行
// 4. webpack-dev-server 帮我们打包生成的bundle.js,必须在本地安装 webpack 而不是全局
// 5. webapck-dev-server 帮我们打包生成的bundle.js并没有放在实际的物理磁盘中，而是直接托管到了 电脑内存， 所以
//    我们在项目的 根目录 下，根本找不到这个bundle.js
// 6. 我们可以认为，webpack-dev-server 把打包好的 文件，以一种 虚拟 的方式，托管到了 咱们项目
//    的 根目录下，虽然我们看不到它， 但是， 可以认为， 和dist、src平级，有一个我们看不到的文件bundle.js

// webpack默认只能打包 JS 文件,如果需要导入非JS类型的文件 ，我们需要安装一些loader 加载器
// 1. 如果要打包css文件 ，需要安装 cnpm i style-loader css-loader -D
// 2. 打开webpack.config.js 这个配置文件，在里面，新增一个 配置节点，叫做module， 它是一个对象；
//    在这个moudle对象身上，有个 rules 属性， 这是rules属性是个 数组，这个数组中，存放了所有第三方文件的 匹配和 处理规则

//webpack 处理第三方文件类型的规则
// 1. 如果发现这个文件不是 js 文件，然后就去配置文件 webpack.config.js 中查找第三方 loader 规则
// 2. webpack 就去项目 的根目录中，查找一个叫` webpack.config.js  `的配置文件
// 3.当找到这个文件后， webpack就回去解析执行这个配置文件，解析执行完以后，就得到了配置文件中
//    导出的配置对象
// 4.当webpack 拿到配置对象后，就拿到了 配置对象中 指定的出口和入口， 然后进行打包和构建

//class Person(){
//   使用 static 关键字， 定义静态属性
//   所谓静态属性， 就是可以通过 类名 点出来的属性
//   实例属性，就是实例对象中保存的对象
//   static info = { name: '123', age: 20}
//   constructor:{
//       this.name = name //实例属性
//   }
// }
// webpack 只能默认处理一部分 ES6 语法，更高级的语法webpack是处理不了的，这时候 需要装 第三方
// loader 把高级语法转换为 低级语法， 会把结果交给webpack 打包到 bundle.js
// 1. 在webpack中， 安装babel，
// 2. cnpm i babel-core babel-loader babel-plugin-transform-runtime -D
// 2.1  cnpm i babel-preset-env babel-preset-stage-0 -D
// 3. webpack.config.js { test:/\.js$/, use:'babel-loader',exclude:/node_modules/ }
// 4. 注意 在配置babel 的loader 规则的时候， 必须把node_modules 目录 通过exclude排除掉
// 5. 如果不排除 ，babel会把node_module所有的js文件都进行转换，非常消耗性能
//    同时，项目也无法正常运行
// 6. 在 项目 的根目录下 新建一个叫 .babelrc 的Babel配置文件，这个配置文件时JSON格式，不能写注释
// 7. babelrc的配置如下:
// {
//  预设、语法的意思 "presets":["env","stage-0"],
//             插件 'plugins':["transform-runtime"]
// }