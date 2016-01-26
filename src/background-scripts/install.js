/**
 * 扩展从旧版升级至新版或安装时要写入默认设置
 */
import chromeCall from 'chrome-call';

const chromeLocalStorage = chromeCall.scope( chrome.storage.local );

const {runtime} = chrome ,
  defaultConfig = {
    disableInEditable : false ,
    autoPlay : false ,
    showMenu : true ,
    autoClipboard : true ,
    defaultApi : 'YouDao' ,
    defaultTo : 'auto' ,
    needCtrl : false ,
    showBtn : true ,
    ignoreChinese : true ,
    ignoreNumLike : true ,
    excludeDomains : [] ,
    ignoresText : []
  };

export async function onInstalled( details ) {
  const {reason} = details;

  if ( reason === 'install' ) { // 安装新版
    await chromeLocalStorage( 'set' , defaultConfig );
    return;
  }

  if ( reason === 'update' && details.previousVersion[ 0 ] === '5' ) { // 从旧版升级
    const items = await chromeLocalStorage( 'get' , [
      'autoClipboard' , 'autoPlay' , 'defaultApi' ,
      'defaultTo' , 'ignoreChinese' , 'ignoreNumLike' ,
      'needCtrl' , 'showMenu' , 'showTranslateButton'
    ] );

    items.showBtn = items.showTranslateButton;
    delete items.showTranslateButton;

    await chromeLocalStorage( 'clear' );
    await chromeLocalStorage( 'set' , Object.assign( defaultConfig , items ) );
  }
}

/* istanbul ignore if */
if ( process.env.NODE_ENV !== 'testing' ) {
  runtime.onInstalled.addListener( onInstalled );
}
