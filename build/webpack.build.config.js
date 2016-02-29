const webpack = require( 'webpack' ) ,
  config = require( './webpack.base.config' );

config.output.path = './dist/bundle';
config.plugins.push( new webpack.DefinePlugin( {
  'process.env.NODE_ENV' : "'production'"
} ) );
config.plugins.push( new webpack.optimize.UglifyJsPlugin( {
  compress : {
    warnings : false
  }
} ) );
config.plugins.push( new webpack.optimize.OccurenceOrderPlugin( true ) );

module.exports = config;
