const path = require( 'path' ) ,
  webpack = require( 'webpack' ) ,
  c = require( './webpack.config.js' );

c.entry = {}; // 清空 entry
delete c.watch; // 关闭 watch 模式

c.plugins.splice( 0 , 3 ); // 清空 webpack 优化
c.plugins.pop(); // 清空开发模式定义
c.plugins.push( new webpack.DefinePlugin( { // 切换为测试模式，此模式下会 export 很多函数出来以供测试
  DEBUG : false ,
  TEST : true
} ) );

module.exports = function ( config ) {
  config.set( {
    basePath : '' ,
    frameworks : [ 'jasmine' ] ,
    files : [
      'tests/index.js'
    ] ,
    preprocessors : {
      'tests/index.js' : [ 'webpack' ]
    } ,
    webpack : c ,
    reporters : [ 'progress' ] ,
    port : 9876 ,
    colors : true ,
    logLevel : config.LOG_INFO ,
    autoWatch : false ,
    browsers : [ 'Firefox' , 'Chrome' , 'IE' , 'PhantomJS' ] ,
    singleRun : true
  } )
};
