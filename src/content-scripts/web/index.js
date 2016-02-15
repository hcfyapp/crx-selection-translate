const basePath = chrome.runtime.getURL( '/content-scripts/web/embed/' );

/**
 * 向内容脚本所在的网页插入脚本。脚本会在宿主网页的上下文环境中执行。
 * @param {String} src
 * @param {Function} [beforeAppend]
 */
function insertScript( src , beforeAppend ) {
  const script = document.createElement( 'script' );
  script.src = src;
  ('function' === typeof beforeAppend) && beforeAppend( script );
  document.head.appendChild( script );
}

/**
 * 有道网页翻译。注意：它不支持 https 网站
 * @see http://fanyi.youdao.com/web2/
 */
export function youdao() {

  /* istanbul ignore if */
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

  insertScript( basePath + 'youdao.js' , ( script )=> {
    script.id = 'outfox_seed_js';
    script.charset = 'utf-8';
  } );
}

/**
 * 必应翻译窗口小部件
 * @see http://www.bing.com/widget/translator
 */
export function bing() {
  const alreadyHasBing = document.getElementById( 'TranslateSpan' );
  if ( alreadyHasBing ) {
    alreadyHasBing.click();
    return;
  }

  if ( !document.getElementById( 'MicrosoftTranslatorWidget' ) ) {
    const msw = document.createElement( 'div' );
    msw.id = 'MicrosoftTranslatorWidget';
    msw.classList.add( 'Dark' );
    msw.style.cssText = 'color:white;background-color:#555555;position:fixed;top:-99999px;';
    document.body.appendChild( msw );
  }

  insertScript( basePath + 'bing.js' );
}

/**
 * 谷歌网站翻译器
 * @see http://translate.google.com/manager/website/?hl=zh-CN
 */
export function google() {
  const select = document.querySelector( '#google_translate_element .goog-te-combo' );
  if ( select ) {
    if ( !select.value ) {
      select.value = 'zh-CN';
    }
    select.dispatchEvent( new Event( 'change' ) );
    return;
  }

  if ( !document.getElementById( 'google_translate_element' ) ) {
    const div = document.createElement( 'div' );
    div.id = 'google_translate_element';
    div.style.cssText = 'position:fixed;top:-99999px;';
    document.body.appendChild( div );
  }

  insertScript( basePath + 'google-web-cb.js' );
  insertScript( basePath + 'google.js' )
}
