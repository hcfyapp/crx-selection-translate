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
    path : './src/bundle' ,
    filename : '[name].js'
  } ,
  module : {
    loaders : [
      {
        test : /\.js$/ ,
        exclude : /node_modules(?!(\/|\\?\\)(translation\.js|selection-widget)\1)/ ,
        loader : 'babel' ,
        query : {
          presets : [ 'es2015' , 'stage-3' ] ,
          plugins : [ 'transform-runtime' ]
        }
      } ,
      {
        test : /\.html$/ ,
        loader : 'html'
      } ,
      {
        test : /\.scss$/ ,
        loader : ExtractTextPlugin.extract( 'style-loader' , 'css-loader?sourceMap!sass-loader?sourceMap' )
      }
    ]
  } ,
  plugins : [

    // 模块依赖分布表：
    // bg      : babel-polyfill chrome-storage-wrapper
    // options : babel-polyfill chrome-storage-wrapper vue public/locales.js
    // content : babel-polyfill chrome-storage-wrapper vue public/locales.js selection-widget interact.js
    // popup   : babel-polyfill chrome-storage-wrapper vue public/locales.js selection-widget

    // 所以：
    // commons3.js 包含 babel-polyfill chrome-storage-wrapper
    // commons2.js 包含 vue public/locales.js
    // commons1.js 包含 selection-widget
    new CommonsChunkPlugin( 'commons1.js' , [ 'content' , 'popup' ] ) ,
    new CommonsChunkPlugin( 'commons2.js' , [ 'commons1.js' , 'options' ] ) ,
    new CommonsChunkPlugin( 'commons3.js' , [ 'bg' , 'commons2.js' ] ) ,

    new ExtractTextPlugin( '[name].css' ) ,

    new webpack.DefinePlugin( {
      DEBUG : true
    } )
  ] ,
  watch : true ,
  devtool : '#source-map'
};
