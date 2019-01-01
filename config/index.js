'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    proxyTable: {

      //本地调试
      '/api': {		//这里是我配置的名字
        target: 'http://m.maoyan.com', //你要请求的第三方接口
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {'^/api': '/'}	//这里重写路径运行后就代理到对应地址

        /*
        想请求接口是 http://m.maoyan.com/ajax/movieOnInfoList?token=

        target  是 目标服务器地址  本地代理服务器请求数据的时候它会把我们本地的 http:localhost:8080 替换成 http://m.maoyan.com
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {'^/api': '/'}	//这里重写路径运行后就代理到对应地址
                如果不写这个.我们本请求的路径是   /api/ajax/movieOnInfoList?token= ,
                本地代理服务器补全路径后 就是  http:localhost:8080/api/ajax/movieOnInfoList?token=
                这和原 接口地址 比较  是 域名不一样(这个在target已经处理过了， 相当于一样了) ， 还多了一个 /api，所
                以我们要把他处理掉， 通过pathRewrite: {'^/api': '/'} ，意思是 把 '/api' 替换成 '/',
                这样 本地代理服务器请求地址就变成  http:localhost:8080//ajax/movieOnInfoList?token=
                (接口于接口之间多写/ 没事会自动处理掉，上面也可以写成  pathRewrite: {'^/api': ''}	)，
                但是这样写不好， 接口于接口之间放个空 语义不强， 所以建议放个 '/'


        */

      },

      //因为我们 登录页的 请求接口 是 https://i.meituan.com 所以我们要在配一个代理：

      //本地调试

      /*
      注意这里不能用 '/api/baidu'  因为 这样当你到调用的时候
      （原始接口：  http://image.baidu.com/search/wisejsonala?tn=wisejsonala&ie=utf8&cur=result&word=%E6%91%84%E5%BD%B1%E5%B8%88%E9%99%88%E7%A3%8A&fr=&catename=&pn=0&rn=3&gsm=1e000000001e  ）
      你调用的是后 会这样写   this.$http.get('/api/baidu/search/wisejsonala?tn=wisejsonala&ie=utf8&cur=result&word=%E6%91%84%E5%BD%B1%E5%B8%88%E9%99%88%E7%A3%8A&fr=&catename=&pn=0&rn=3&gsm=1e000000001e')
      这样就  会先匹配到 '/api' 这个暗号，代理请求到 http://m.maoyan.com， 但这并不是我们想要的，所以我们得重新写一个区别于上上面的暗号。
      因为这个地方因为个人爱好的问题。 要统一写  '/api' 这个形式，可以把 猫眼域名 的暗号 改成  '/api/maoyan', 把 百度域名的暗号  改成 '/api/baidu'  这样就有统一的入口 '/api' 了。
      我这里不统一改了。因为上面 的 '/api' 用的地方挺多的，这里一改，其他地方也要动。

      统一管理的代码：
      '/api/maoyan': {		//这里是我配置的名字
        target: 'http://m.maoyan.com', //你要请求的第三方接口
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {'^/api/maoyan': '/'}	//这里重写路径运行后就代理到对应地址
      },
      '/api/baidu': {		//这里是我配置的名字
        target: 'http://image.baidu.com', //你要请求的第三方接口
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {'^/api/baidu': '/'}	//这里重写路径运行后就代理到对应地址
      }

      使用时：
      1： this.$http.get('/api/maoyan/ajax/movieOnInfoList?token=');
      2:  this.$http.get('/api/baidu/search/wisejsonala?tn=wisejsonala&ie=utf8&cur=result&word=%E6%91%84%E5%BD%B1%E5%B8%88%E9%99%88%E7%A3%8A&fr=&catename=&pn=0&rn=3&gsm=1e000000001e');
      */

      //这一个百度的代理： 与项目 无关，为了练习 解决一个项目中解决 多个域名 跨域问题的
      '/baidu': {		//这里是我配置的名字
        target: 'http://image.baidu.com', //你要请求的第三方接口
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {'^/baidu': '/'}	//这里重写路径运行后就代理到对应地址

      }






    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
