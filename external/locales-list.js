/**
 * 所有区域及其区域 id 的列表:
 *   http://www.lingoes.cn/zh/translator/langcode.htm
 *
 * 将下面的代码粘贴到此网页的控制台可以收集这一列表到剪切板.
 *
 * 参考维基百科后补充一个语种:
 *   https://zh.wikipedia.org/wiki/区域设置#.E5.88.97.E8.A1.A8
 *
 * en-IN 英语-印度
 *
 * 谷歌之后补充一种:
 *
 * es-US 西班牙语-美国
 *
 * 完整的语种列表见 ../src/public/locale.js
 */

(function () {
  var localesTr = document.querySelectorAll( 'table tr' ) ,
    localesTrArray = Array.prototype.slice.call( localesTr , 1 ) ,
    locales = [];

  localesTrArray.forEach( function ( tr ) {
    var tds = tr.children;

    locales.push( {
      localeId : tds[ 0 ].textContent.trim() ,
      'zh-CN' : tds[ 1 ].textContent.trim()
    } );
  } );

  copy( JSON.stringify( locales ) );
}());
