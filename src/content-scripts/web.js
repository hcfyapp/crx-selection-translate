/**
 * 网页翻译集合。
 * 网页翻译的原理大多是在当前网页中插入一段 js 脚本，所以不需要单元测试
 */

/**
 * 有道网页翻译。注意：它不支持 https 网站
 * @see http://fanyi.youdao.com/web2/
 */
/* istanbul ignore next */
export function youdao() {
  if ( 'https:' === location.protocol ) {
    return alert( '有道网页翻译不支持 https 网站。' );
  }

  const element = document.createElement( 'script' );
  element.id = 'outfox_seed_js';
  element.charset = 'utf-8';
  element.src = 'http://fanyi.youdao.com/web2/seed.js?' + Date.parse( new Date() );
  document.body.appendChild( element );
}

/**
 * 必应翻译窗口小部件
 * @see http://www.bing.com/widget/translator
 */
/* istanbul ignore next */
export function bing() {
  const alreadyHasBing = document.getElementById( 'TranslateSpan' );
  if ( alreadyHasBing ) {
    alreadyHasBing.click();
    return;
  }

  const msw = document.createElement( 'div' );
  msw.id = 'MicrosoftTranslatorWidget';
  msw.classList.add( 'Dark' );
  msw.style.cssText = 'color:white;background-color:#555555;position:fixed;top:-99999px;';
  document.body.appendChild( msw );

  setTimeout( function () {
    var s = document.createElement( 'script' );
    s.charset = 'UTF-8';
    s.src = ((location && location.href && location.href.indexOf( 'https' ) == 0) ? 'https://ssl.microsofttranslator.com' : 'http://www.microsofttranslator.com') + '/ajax/v3/WidgetV3.ashx?siteData=ueOIGRSKkd965FeEGM5JtQ**&ctf=True&ui=true&settings=Auto&from=';
    var p = document.getElementsByTagName( 'head' )[ 0 ] || document.documentElement;
    p.insertBefore( s , p.firstChild );
  } , 0 );
}
