const webpack = require( 'webpack' ) ,
  CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin ,
  ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

module.exports = {
  entry : {
    bg : './src/background-scripts/' ,
    content : './src/content-scripts/' ,
    options : './src/options/' ,
    popup : './src/popup/'
  } ,
  output : {
    path : './src/bundle' ,
    filename : '[name].js'
  } ,
  module : {
    loaders : [
      {
        test : /\.js$/ ,
        exclude : /node_modules/ ,
        loader : 'babel' ,
        query : {
          presets : [ 'es2015' , 'stage-3' ]
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

    // bg      : chrome-storage-wrapper
    // options : chrome-storage-wrapper vue                  bootstrap-lite.scss
    // content : chrome-storage-wrapper vue selection-widget interact.js
    // popup   : chrome-storage-wrapper vue selection-widget bootstrap-lite.scss
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
