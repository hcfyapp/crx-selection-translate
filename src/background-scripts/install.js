/**
 * @files 扩展从旧版升级至新版时要转换一下设置
 */
import chromeCall from 'chrome-call';

const chromeLocalStorage = chromeCall.scope( chrome.storage.local );

/* istanbul ignore if */
if ( process.env.NODE_ENV !== 'testing' ) {
  chrome.runtime.onInstalled.addListener( onInstalled );
}

export async function onInstalled( details ) {
  if ( details.reason === 'update' && details.previousVersion[ 0 ] === '5' ) { // 从 v5.x 升级
    const items = await chromeLocalStorage( 'get', [
      'autoClipboard', 'autoPlay', 'defaultApi',
      'defaultTo', 'ignoreChinese', 'ignoreNumLike',
      'needCtrl', 'showMenu', 'showTranslateButton', 'showShanbay'
    ] );

    items.showBtn = items.showTranslateButton;
    delete items.showTranslateButton;

    // v5.x 的 defaultApi 的格式是全小写字母，如 youdao baidu google google_cn bing，
    // 但是自 v6.0 起我将它换成了首字母大写的形式：YouDao BaiDu Google GoogleCN Bing，
    // 需要做一次转换
    // @see https://github.com/lmk123/crx-selection-translate/blob/5.x-master/src/options.html#L69
    // @see https://github.com/lmk123/translation.js/blob/master/lib/translation.js#L150
    items.defaultApi = {
      youdao: 'YouDao',
      baidu: 'BaiDu',
      google: 'Google',
      google_cn: 'GoogleCN',
      bing: 'Bing'
    }[ items.defaultApi ] || 'YouDao';

    await chromeLocalStorage( 'clear' );
    chromeLocalStorage( 'set' , items );
  }
}
