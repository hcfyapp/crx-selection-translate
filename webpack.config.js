const webpack = require( 'webpack' );
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
  entry : {
    bg : "./src/background-scripts" ,
    content : "./src/content-scripts" ,
    options : "./src/options/options" //,
    //popup : ''
  } ,
  output : {
    path : "./src/scripts" ,
    filename : "[name].js"
  } ,
  resolve : {
    extensions : [ '' , '.es6' , '.js' ]
  } ,
  module : {
    loaders : [
      {
        test : /\.es6?$/ ,
        exclude : /node_modules/ ,
        loader : 'babel' ,
        query : {
          "presets" : [ "es2015" ]
        }
      }
    ]
  } ,
  plugins : [
    new webpack.ProvidePlugin( {
      Vue : 'vue' ,
      interact : 'interact.js' ,
      'window.interact' : 'interact.js'
    } ) ,

    // bg      : chrome-storage-wrapper
    // content : chrome-storage-wrapper vue
    // options : chrome-storage-wrapper vue
    // popup   : chrome-storage-wrapper vue
    new CommonsChunkPlugin( 'commons1.js' , [ 'content' , 'options' ] ) ,
    new CommonsChunkPlugin( 'commons2.js' , [ 'bg' , 'commons1.js' ] )
  ]
};
