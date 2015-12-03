const path = require( 'path' ) ,
  c = require( './webpack.config.js' );

c.entry = {};
delete c.watch;
c.module.loaders[ 0 ].exclude.push( './src/' );
c.module.loaders.push(
  {
    test : /\.js$/ ,
    include : './src/' ,
    loader : 'isparta'
  } );

c.plugins.splice( 0 , 3 );

module.exports = function ( config ) {
  config.set( {
    basePath : '' ,
    frameworks : [ 'jasmine' ] ,
    files : [
      'tests/index.js'
    ] ,
    exclude : [] ,
    preprocessors : {
      'tests/index.js' : [ 'webpack' ]
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
    browsers : [ /*'Firefox' , 'Chrome' , 'IE' ,*/ 'PhantomJS' ] ,
    singleRun : true
  } )
};
