const path = require( 'path' ) ,
  webpack = require( 'webpack' ) ,
  c = require( './webpack.test.config.js' );

module.exports = function ( config ) {
  const options = {
    basePath : '../' ,
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
    browsers : [ 'PhantomJS' ] ,
    singleRun : true
  };

  if ( process.env.TRAVIS ) {
    options.reporters.push( 'coveralls' );
    options.singleRun = true;
  } else {
    options.browsers = options.browsers.concat( [ 'Firefox' , 'Chrome' , 'IE' , 'Safari' ] );
  }

  config.set( options );
};
