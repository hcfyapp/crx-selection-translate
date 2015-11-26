const config = {
  src : './src' ,
  dist : './dist' ,
  files : {
    js : [ 'bundle/*.js' ] ,
    css : [ 'bundle/*.css' ] ,
    html : [ '*/index.html' ] ,
    json : [ 'manifest.json' ] ,
    copy : [ 'logo.png' ]
  }
};

const del = require( 'del' ) ,
  gulp = require( 'gulp' ) ,
  htmlmin = require( 'gulp-htmlmin' ) ,
  minifyCss = require( 'gulp-minify-css' ) ,
  uglify = require( 'gulp-uglify' ) ,
  jsonmin = require( 'gulp-jsonmin' );

gulp.task( 'clean' , clean );
gulp.task( 'js' , [ 'clean' ] , js );
gulp.task( 'css' , [ 'clean' ] , css );
gulp.task( 'html' , [ 'clean' ] , html );
gulp.task( 'json' , [ 'clean' ] , json );
gulp.task( 'copy' , [ 'clean' ] , copy );
gulp.task( 'default' , [ 'js' , 'css' , 'html' , 'json' , 'copy' ] );

function clean() {
  return del( config.dist );
}

function js() {
  return gulp.src( wrapSrc( config.files.js ) , { base : config.src } )
    .pipe( uglify().on( 'error' , function ( e ) {
      console.log( e );
    } ) )
    .pipe( gulp.dest( config.dist ) );
}

function css() {
  return gulp.src( wrapSrc( config.files.css ) , { base : config.src } )
    .pipe( minifyCss() )
    .pipe( gulp.dest( config.dist ) );
}

function html() {
  return gulp.src( wrapSrc( config.files.html ) , { base : config.src } )
    .pipe( htmlmin( {
      removeComments : true ,
      collapseWhitespace : true ,
      processScripts : [ 'text/html' ]
    } ) )
    .pipe( gulp.dest( config.dist ) );
}

function json() {
  return gulp.src( wrapSrc( config.files.json ) )
    .pipe( jsonmin() )
    .pipe( gulp.dest( config.dist ) );
}

function copy() {
  return gulp.src( wrapSrc( config.files.copy ) )
    .pipe( gulp.dest( config.dist ) );
}

function wrapSrc( arr ) {
  return arr.map( url => config.src + '/' + url )
}
