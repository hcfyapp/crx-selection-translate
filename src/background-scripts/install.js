/**
 * 扩展从旧版升级至新版或安装时要写入默认设置
 */
import chromeCall from 'chrome-call';

const chromeLocalStorage = chromeCall.scope( chrome.storage.local );
const {assign} = Object;

const {runtime} = chrome ,
  defaultConfig = {
    disableSelection : false , // since v6.0.6 - 全局开关
    disableInEditable : false , // since v6.0.1 - 是否在 document.body 可编辑的情况下禁用划词翻译
    defaultWeb : 'youdao' , // since v6.0.1 - Alt + Z 时默认使用的网页翻译
    showBtn : true , // since v6.0.0 - 原本叫 showTranslateButton。网页划词翻译是否显示翻译按钮
    autoPlay : false , // 自动朗读
    showMenu : true , // 是否将划词翻译添加到右键菜单
    autoClipboard : true , // 打开弹出页时是否自动翻译剪切板内的文本
    defaultApi : 'BaiDu' , // 默认使用的翻译接口
    needCtrl : false , // 网页划词翻译是否要配合 Ctrl（Mac 下为 Command）使用
    ignoreChinese : false , // 网页划词翻译是否忽略中文
    ignoreNumLike : true , // 网页划词翻译是否忽略无意义的文本组合，例如电话号码、密码符号等
    excludeDomains : [] , // 以这些域名结尾的网址下会禁用网页划词翻译
    ignoresText : [] // todo 匹配这些正则表达式的文本不要翻译
  };

/* istanbul ignore if */
if ( process.env.NODE_ENV !== 'testing' ) {
  runtime.onInstalled.addListener( onInstalled );
}

/**
 * 添加新设置项及其默认值的方法
 * @param {...String} options
 * @returns {Promise}
 */
export async function addNewOptions( ...options ) {
  const defaultNewOptions = {};
  options.forEach( ( key )=> {
    defaultNewOptions[ key ] = defaultConfig[ key ];
  } );
  return chromeLocalStorage( 'set' , defaultNewOptions );
}

export async function onInstalled( details ) {
  const {reason} = details;

  if ( reason === 'install' ) { // 安装新版
    await chromeLocalStorage( 'set' , defaultConfig );
    return;
  }

  if ( reason === 'update' ) {
    const {previousVersion} = details;

    if ( previousVersion[ 0 ] === '5' ) { // 从 v5.x 升级
      const items = await chromeLocalStorage( 'get' , [
        'autoClipboard' , 'autoPlay' , 'defaultApi' ,
        'defaultTo' , 'ignoreChinese' , 'ignoreNumLike' ,
        'needCtrl' , 'showMenu' , 'showTranslateButton'
      ] );

      items.showBtn = items.showTranslateButton;
      delete items.showTranslateButton;

      // v5.x 的 defaultApi 的格式是全小写字母，如 youdao baidu google google_cn bing，
      // 但是自 v6.0 起我将它换成了首字母大写的形式：YouDao BaiDu Google GoogleCN Bing，
      // 需要做一次转换
      // @see https://github.com/lmk123/crx-selection-translate/blob/5.x-master/src/options.html#L69
      // @see https://github.com/lmk123/translation.js/blob/master/lib/translation.js#L150
      items.defaultApi = {
          youdao : 'YouDao' ,
          baidu : 'BaiDu' ,
          google : 'Google' ,
          google_cn : 'GoogleCN' ,
          bing : 'Bing'
        }[ items.defaultApi ] || 'YouDao';

      await chromeLocalStorage( 'clear' );
      await chromeLocalStorage( 'set' , assign( defaultConfig , items ) );
      return;
    }

    switch ( previousVersion ) {
      case '6.0.0':
        addNewOptions( 'defaultWeb' , 'disableInEditable' );
      case '6.0.1':
        // 从 6.0.0 或 6.0.1 升级的用户都需要转换一下翻译接口的名字
        let {defaultApi} = await chromeLocalStorage( 'get' , 'defaultApi' );
        defaultApi = {
            youdao : 'YouDao' ,
            baidu : 'BaiDu' ,
            google : 'Google' ,
            google_cn : 'GoogleCN' ,
            bing : 'Bing'
          }[ defaultApi ] || 'YouDao';
        chromeLocalStorage( 'set' , { defaultApi } );
      case '6.0.2':
      case '6.0.3':
      case '6.0.4':
      case '6.0.5':
        addNewOptions( 'disableSelection' );
      // 这里故意没有写 break;
      // 这是因为如果日后的版本添加了新的设置项可以这样写：
      // case '6.0.0':
      //   addNewOptions( 'x' );
      // case '6.0.1':
      //   addNewOptions( 'y' );
      //
      // 这样就能保证无论用户从哪个版本升级到最新版，都不会错失新添加的设置项及其默认值
    }
  }
}
