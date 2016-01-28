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

  const youdaoIframe = document.getElementById( 'OUTFOX_JTR_BAR' );
  if ( youdaoIframe ) {
    const translateButton = youdaoIframe.contentWindow.document.getElementById( 'switch' );
    if ( translateButton.textContent === '重新翻译' ) {
      translateButton.click();
    }
    return;
  }

  insertScript( 'http://fanyi.youdao.com/web2/seed.js?' + Date.now() , ( script )=> {
    script.id = 'outfox_seed_js';
    script.charset = 'utf-8';
  } );
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

  insertScript( ((location.href.indexOf( 'https' ) === 0) ? 'https://ssl.microsofttranslator.com' : 'http://www.microsofttranslator.com') + '/ajax/v3/WidgetV3.ashx?siteData=ueOIGRSKkd965FeEGM5JtQ**&ctf=True&ui=true&settings=Auto&from=' );
}

/**
 * 谷歌网站翻译器
 * @see http://translate.google.com/manager/website/?hl=zh-CN
 */
/* istanbul ignore next */
export function google() {
  const select = document.querySelector( '#google_translate_element .goog-te-combo' );
  if ( select ) {
    if ( !select.value ) {
      select.value = 'zh-CN';
    }
    select.dispatchEvent( new Event( 'change' ) );
    return;
  }

  const div = document.createElement( 'div' );
  div.id = 'google_translate_element';
  div.style.cssText = 'position:fixed;top:-99999px;';
  document.body.appendChild( div );

  insertScript( null , ( script )=> {
    script.textContent = require( 'raw!./raw/google-web-cb.js' );
    script.async = false;
  } );

  insertScript( 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit' )
}

/**
 * 向内容脚本所在的网页插入脚本。脚本会在宿主网页的上下文环境中执行。
 * @param {String} src
 * @param {Function} [beforeAppend]
 */
/* istanbul ignore next */
function insertScript( src , beforeAppend ) {
  const script = document.createElement( 'script' );
  if ( src ) {
    script.src = src;
  }
  script.async = true;
  ('function' === typeof beforeAppend) && beforeAppend( script );
  document.head.appendChild( script );
}
