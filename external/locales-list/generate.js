/**
 * 所有区域及其区域 id 的列表:
 *   http://www.lingoes.cn/zh/translator/langcode.htm
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
 * 将下面的代码粘贴到此网页的控制台可以收集这一列表到剪切板.
 *
 * 完整的语种列表见 ../src/public/locale.js
 */

(function () {
  var localeSort = [ 'zh' , 'en' , 'ja' , 'ko' , 'de' , 'fr' , 'ru' , 'th' ] ,

    localesTr = document.querySelectorAll( 'table tr' ) ,
    localesTrArray = Array.prototype.slice.call( localesTr , 1 ) ,
    localesHash = {} ,
    locales = [];

  localesTrArray.forEach( function ( tr ) {
    var tds = tr.children ,
      localeId = tds[ 0 ].textContent.trim() ,
      zhCNName = tds[ 1 ].textContent.trim() ,
      base = getBase( localeId );

    (localesHash[ base ] || (localesHash[ base ] = [])).push( {
      localeId : localeId ,
      'zh-CN' : zhCNName
    } );
  } );

  // 添加 en-IN 与 es-US
  addLocale( {
    localeId : 'en-IN' ,
    'zh-CN' : '英语(印度)'
  } );
  addLocale( {
    localeId : 'es-US' ,
    'zh-CN' : '西班牙语(美国)'
  } );

  // 在优先排序列表里的区域先排序
  localeSort.forEach( function ( baseName ) {
    locales = locales.concat( localesHash[ baseName ] );
    delete localesHash[ baseName ];
  } );

  // 剩余的按照默认顺序排序
  Object.keys( localesHash ).forEach( function ( baseName ) {
    locales = locales.concat( localesHash[ baseName ] );
  } );

  document.getElementById( 'copyMe' ).value = '/*\n * 注意：不要直接编辑这份文件，它是由 ../../external/locales-list/index.html 生成的！\n */\nexport default ' + JSON.stringify( locales ) + ';';

  /**
   * 将语种加入到区域列表中
   * @param locale
   */
  function addLocale( locale ) {
    var base = getBase( locale.localeId );
    localesHash[ base ].push( locale );
  }

  /**
   * 获取地区的基本区域，例如输入 zh-CN 返回 zh
   * @param {String} localeId
   * @returns {String}
   */
  function getBase( localeId ) {
    var i = localeId.indexOf( '-' );
    if ( i > 0 ) {
      return localeId.slice( 0 , localeId.indexOf( '-' ) );
    } else {
      return localeId;
    }
  }
}());
