#!/usr/bin/env node

/**
 * 因为 pdfjs-dist.zip 内有近 400 个文件,
 * 而我不想将数量如此多的文件上传在 git 里,
 * 所以写了这个脚本将 pdfjs-dist.zip 从 GitHub 上下载到当前项目并自动对其中的文件做一些处理.
 * 详情见 https://github.com/lmk123/crx-selection-translate/pull/159
 */

const fs = require( 'fs' );
const Download = require( 'download' );

main();

function main() {
  console.log( '开始下载 pdfjs-dist.zip 至 ./src/pdf-viewer/ 目录……' );
  new Download( { mode: '755', extract: true } )
    .get( 'https://github.com/mozilla/pdf.js/releases/download/v1.4.20/pdfjs-1.4.20-dist.zip' )
    .dest( './src/pdf-viewer' )
    .run( function ( err ) {
      if ( err ) {
        throw err;
      }
      console.log( '下载完成.' );
      Promise.all( [
        injectCode(),
        removeLines()
      ] ).then( ()=> console.log( '文件处理完成.' ) );
    } );
}

/**
 * 给 viewer.html 注入内容脚本
 */
function injectCode() {
  return new Promise( function ( resolve ) {
    fs.readFile( './src/pdf-viewer/web/viewer.html', { encoding: 'utf8' }, ( err, data )=> {
      if ( err ) {
        throw err;
      }

      data = data.replace( '</body>',
        '<link rel="stylesheet" href="../../bundle/commons1.js.css">'
        + '<script src="../../bundle/commons3.js"></script>'
        + '<script src="../../bundle/commons2.js"></script>'
        + '<script src="../../bundle/commons1.js"></script>'
        + '<script src="../../bundle/content.js"></script>'
        + '</body>' );

      fs.writeFile(
        './src/pdf-viewer/web/viewer.html',
        data,
        ( err )=> {
          if ( err ) {
            throw err;
          }
          resolve();
        } );
    } );
  } );
}

/**
 * 删除 viewer.js 中判断不同源文件的代码
 */
function removeLines() {
  return new Promise( ( resolve )=> {
    fs.readFile( './src/pdf-viewer/web/viewer.js', { encoding: 'utf8' }, ( err, data )=> {
      if ( err ) {
        throw err;
      }

      data = data.replace( /if\s\(fileOrigin\s!==\sviewerOrigin\)\s\{[\s\S]+?\}/, '/* REMOVED */' );

      fs.writeFile(
        './src/pdf-viewer/web/viewer.js',
        data,
        ( err )=> {
          if ( err ) {
            throw err;
          }
          resolve();
        } );
    } );
  } );
}
