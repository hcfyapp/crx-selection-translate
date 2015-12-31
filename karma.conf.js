const path = require( 'path' ) ,
  webpack = require( 'webpack' ) ,
  c = require( './webpack.config.js' );

c.entry = {}; // 清空 entry
delete c.watch; // 关闭 watch 模式
c.devtool = '#inline-source-map';

const babelLoaderConfig = c.module.loaders.shift();
babelLoaderConfig.exclude.push( path.resolve( 'src/' ) );

// 必须告诉 isparta 我使用了哪些 babel 设置，见 https://github.com/deepsweet/isparta-loader/issues/10
c.isparta = {
  embedSource : true ,
  noAutoWrap : true ,
  babel : babelLoaderConfig.query
};

c.plugins.splice( 0 , 3 ); // 清空 webpack 优化
c.plugins.pop(); // 清空开发模式定义
c.plugins.push( new webpack.DefinePlugin( { // 切换为测试模式，此模式下会 export 很多函数出来以供测试
  DEBUG : false ,
  TEST : true
} ) );

c.module.preLoaders = [
  babelLoaderConfig ,
  {
    test : /\.js$/ ,
    include : path.resolve( 'src/' ) ,
    loader : 'isparta'
  }
];

module.exports = function ( config ) {
  config.set( {
    basePath : '' ,
    frameworks : [ 'jasmine' ] ,
    files : [
      'tests/index.js'
    ] ,
    preprocessors : {
      'tests/index.js' : [ 'webpack' , 'sourcemap' ]
    } ,
    webpack : c ,
    reporters : [ 'progress' , 'coverage' ] ,
    coverageReporter : {
      dir : 'coverage' ,
      reporters : [
        {
          type : 'html' ,
          subdir : function ( browser ) {
            return 'html/' + browser.toLowerCase().split( /[ /-]/ )[ 0 ];
          }
        } ,
        {
          type : 'lcov' ,
          subdir : 'lcov'
        }
      ]
    } ,
    port : 9876 ,
    colors : true ,
    logLevel : config.LOG_INFO ,
    autoWatch : false ,
    browsers : [ 'Firefox' , 'Chrome' , 'IE' , 'PhantomJS' ] ,
    singleRun : true
  } )
};
