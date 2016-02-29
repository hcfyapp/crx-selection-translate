const config = {
  src : './src' ,
  dist : './dist' ,
  files : {
    html : [ './src/*/index.html' ] ,
    json : [ './src/manifest.json' ] ,
    js : [ './src/content-scripts/web/embed/*.js' ] ,
    copy : [ './src/logo.png' ]
  }
};

const webpack = require( 'webpack' ) ,
  del = require( 'del' ) ,
  gulp = require( 'gulp' ) ,
  htmlmin = require( 'gulp-htmlmin' ) ,
  jsonmin = require( 'gulp-jsonmin' ) ,
  jsmin = require( 'gulp-uglify' ) ,
  zip = require( 'gulp-zip' );

gulp.task( 'clean' , clean );
gulp.task( 'html' , [ 'clean' ] , html );
gulp.task( 'js' , [ 'clean' ] , js );
gulp.task( 'json' , [ 'clean' ] , json );
gulp.task( 'webpackP' , [ 'clean' ] , webpackP );
gulp.task( 'copy' , [ 'webpackP' ] , copy );
gulp.task( 'default' , [ 'html' , 'js' , 'json' , 'copy' ] , ( done )=> {
  del( config.dist + '/bundle/bs-lite.js' )
    .then( ()=> {
      zipPack().on( 'finish' , ()=> done() );
    } );
} );

/**
 * 删除上一次生成的文件夹
 * @returns {Promise}
 */
function clean() {
  return del( config.dist );
}

/**
 * 使用 webpack 来精简 js、css 及模板
 * @param {Function} done
 */
function webpackP( done ) {
  webpack( require( './webpack.build.config' ) , err => {
    if ( err ) {
      throw err;
    } else {
      done();
    }
  } );
}

/**
 * 精简网页翻译功能需要嵌入到标签页内的脚本。
 * 因为这部分脚本不是 webpack 的一部分，所以得单独拿出来精简
 * @returns {*}
 */
function js() {
  return gulp.src( config.files.js , { base : config.src } )
    .pipe( jsmin() )
    .pipe( gulp.dest( config.dist ) );
}

/**
 * 精简 html。其实只精简了 index.html ，模板都由 webpack 负责精简。
 */
function html() {
  return gulp.src( config.files.html , { base : config.src } )
    .pipe( htmlmin( {
      removeComments : true ,
      removeAttributeQuotes : true ,
      collapseWhitespace : true ,
      processScripts : [ 'text/html' ]
    } ) )
    .pipe( gulp.dest( config.dist ) );
}

/**
 * 精简 json。目前只有 manifest.json 用到了。
 */
function json() {
  return gulp.src( config.files.json )
    .pipe( jsonmin() )
    .pipe( gulp.dest( config.dist ) );
}

/**
 * 复制文件。这个函数负责将 webpack 精简过后的 js 与 css 复制到 dist 文件夹。
 */
function copy() {
  return gulp.src( config.files.copy , { base : config.src } )
    .pipe( gulp.dest( config.dist ) );
}

/**
 * 打包文件为一个压缩包
 */
function zipPack() {
  return gulp.src( config.dist + '/**/*' )
    .pipe( zip( 'build.zip' ) )
    .pipe( gulp.dest( './' ) );
}
