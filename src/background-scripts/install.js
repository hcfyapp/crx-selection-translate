/**
 * 扩展从旧版升级至新版或安装时要写入默认设置
 */
import chromeCall from 'chrome-call';

const chromeLocalStorage = chromeCall.scope( chrome.storage.local );

const {runtime} = chrome ,
  defaultConfig = {
    disableInEditable : false , // 是否在 document.body 可编辑的情况下禁用划词翻译
    autoPlay : false , // 自动朗读
    showMenu : true , // 是否将划词翻译添加到右键菜单
    autoClipboard : true , // 打开弹出页时是否自动翻译剪切板内的文本
    defaultApi : 'YouDao' , // 默认使用的翻译接口
    defaultWeb : 'YouDao' , // Alt + Z 时默认使用的网页翻译
    needCtrl : false , // 网页划词翻译是否要配合 Ctrl（Mac 下为 Command）使用
    showBtn : true , // 网页划词翻译是否显示翻译按钮
    ignoreChinese : false , // 网页划词翻译是否忽略中文
    ignoreNumLike : true , // 网页划词翻译是否忽略无意义的文本组合，例如电话号码、密码符号等
    excludeDomains : [] , // 以这些域名结尾的网址下会禁用网页划词翻译
    ignoresText : [] // todo 匹配这些正则表达式的文本不要翻译
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
