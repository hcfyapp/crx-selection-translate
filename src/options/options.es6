/**
 * @typedef {Object} StorageData - 用一个类型来描述设置里都有哪些设置项。星号（*）开头的设置项是跟 select-widget 项目有关的
 * @property {Boolean} [autoPlay=false] - 自动朗读
 * @property {Boolean} [showMenu=true] - 是否启用右键菜单
 * @property {Boolean} [autoClipboard=true] - 打开翻译盒子时自动翻译剪切板里的文本
 * @property {Boolean} [defaultApi="GoogleCn"] - 默认的翻译引擎
 * @property {Boolean} [defaultTo="auto"] - 默认的目标语言
 *
 * @property {Boolean} [needCtrl=false] - *是否需要 Ctrl 键配合。todo 在 Mac 上换成 Command 键
 * @property {Boolean} [showBtn=true] - *是否显示翻译按钮。之前它的名字是 showTranslateButton，需要做一个转换
 * @property {Boolean} [ignoreChinese=true] - *忽略中文
 * @property {Boolean} [ignoreNumLike=true] - *忽略类数字组合
 *
 * 弃用的设置项：enable
 *
 * 准备加入的设置项：
 * @property {String[]} excludeDomains - 在哪些网站下不要启用划词翻译，并且在这些网站下把图标变灰。这个功能抄袭自 Ad Blocker
 * @property {RegExp[]} ignoresText - *匹配这些正则表达式的文本不要翻译
 * @property {String} [defaultAudio="Google"] - 默认的语音引擎。在上一版本中这个设置项叫 defaultSpeak，但是没有开放出来
 * */

/**
 * 设置页
 * @requires chromeStorage
 * @requires Vue
 */
//(( storage , Vue )=> {
const Vue = require( 'vue' );
const storage = require('chrome-storage-wrapper');
  Vue.config.debug = true;

  storage
    .getAll()
    .then( options => {
      const manifest = chrome.runtime.getManifest();

      new Vue( {
        el : 'body' ,
        data : {
          options ,
          version : manifest.version ,
          showAdd : false ,
          tmpDomain : ''
        } ,
        watch : {
          options : {
            handler : newVal => storage.set( newVal ) ,
            deep : true
          }
        }
      } );
    } );
//})( chromeStorage , Vue );
