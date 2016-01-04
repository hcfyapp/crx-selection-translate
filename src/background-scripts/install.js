/**
 * 扩展从旧版升级至新版或安装时要写入默认设置
 */
import storage from 'chrome-storage-wrapper';

const {runtime} = chrome ,
  defaultConfig = {
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

// 安装时提示用户划词翻译已升级至最新版
runtime.onInstalled.addListener( async details => {
  const {reason} = details;

  if ( reason === 'install' ) { // 安装新版
    storage.set( defaultConfig );
  } else if ( reason === 'update' && details.previousVersion[ 0 ] === '5' ) { // 从旧版升级
    const items = await storage.get( [
      'autoClipboard' , 'autoPlay' , 'defaultApi' ,
      'defaultTo' , 'ignoreChinese' , 'ignoreNumLike' ,
      'needCtrl' , 'showMenu' , 'showTranslateButton'
    ] );

    items.showBtn = items.showTranslateButton;
    delete items.showTranslateButton;

    await storage.clear();
    storage.set( Object.assign( defaultConfig , items ) );
  }
} );
