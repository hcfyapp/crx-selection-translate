const webpack = require( 'webpack' ) ,
  CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin ,
  ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

module.exports = {
  entry : {
    bg : './src/background-scripts/' ,
    content : './src/content-scripts/' ,
    options : './src/options/' ,
    popup : './src/popup/' ,
    'bs-lite' : './src/public/bootstrap-lite.scss'
  } ,
  output : {
    // 内容脚本引用了扩展里的字体文件，所以在 css 文件里需要带上下面的前缀
    // @see https://developer.chrome.com/extensions/manifest/web_accessible_resources
    // @see https://developer.chrome.com/extensions/i18n#overview-predefined
    // @see http://webpack.github.io/docs/configuration.html#output-publicpath
    publicPath : 'chrome-extension://__MSG_@@extension_id__/bundle/' ,
    filename : '[name].js'
  } ,
  module : {
    loaders : [
      {
        test : /\.js$/ ,
        exclude : [ /node_modules(?!(\/|\\?\\)(translation\.js|selection-widget|connect\.io|chrome\-env)\1)/ ] ,
        loader : 'babel-loader'
      } ,
      {
        test : /\.woff$/ ,
        loader : 'file-loader' ,
        query : {
          name : '[name].[ext]'
        }
      } ,
      {
        test : /\.html$/ ,
        loader : 'vue-html-loader'
      } ,
      {
        test : /\.css$/ ,
        loader : ExtractTextPlugin.extract( 'style-loader' , 'css-loader?sourceMap' )
      } ,
      {
        test : /\.scss$/ ,
        loader : ExtractTextPlugin.extract( 'style-loader' , 'css-loader?sourceMap!sass-loader?sourceMap' )
      }
    ]
  } ,
  plugins : [

    // 模块依赖分布表：
    // bg      : babel-polyfill connect.io
    // options : babel-polyfill vue public/locales.js
    // content : babel-polyfill vue public/locales.js selection-widget interact.js connect.io
    // popup   : babel-polyfill vue public/locales.js selection-widget connect.io

    // 所以：
    // commons3.js 包含 babel-polyfill chrome-storage-wrapper
    // commons2.js 包含 vue public/locales.js
    // commons1.js 包含 selection-widget connect.io
    new CommonsChunkPlugin( 'commons1.js' , [ 'content' , 'popup' ] ) ,
    new CommonsChunkPlugin( 'commons2.js' , [ 'commons1.js' , 'options' ] ) ,
    new CommonsChunkPlugin( 'commons3.js' , [ 'bg' , 'commons2.js' ] ) ,

    new ExtractTextPlugin( '[name].css' )
  ]
};

