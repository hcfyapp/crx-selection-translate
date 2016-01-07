/**
 * 网页翻译集合。网页翻译的原理大多是在当前网页中插入一段 js 脚本。
 */

/**
 * 有道网页翻译。注意：它不支持 https 网站
 * @see http://fanyi.youdao.com/web2/
 */
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
