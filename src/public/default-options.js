/**
 * @files 在这个文件里定义 chrome.storage 里所有的设置项及其默认值,
 * 然后使用此模块提供的默认函数替代 chrome.storage.local.get 方法,
 * 这样可以确保即使 chrome.storage 里是空的,
 * 每次获取设置时都能得到默认值
 */

import chromeCall from 'chrome-call';

const defaultOptions = {
  pdf: true, // since v6.1.0 - 是否启用 pdf 翻译
  disableSelection: false, // since v6.0.6 - 全局开关
  disableInEditable: false, // since v6.0.1 - 是否在 document.body 可编辑的情况下禁用划词翻译
  defaultWeb: 'youdao', // since v6.0.1 - Alt + Z 时默认使用的网页翻译
  showBtn: true, // since v6.0.0 - 原本叫 showTranslateButton。网页划词翻译是否显示翻译按钮
  autoPlay: false, // 自动朗读
  showMenu: true, // 是否将划词翻译添加到右键菜单
  autoClipboard: true, // 打开弹出页时是否自动翻译剪切板内的文本
  defaultApi: 'BaiDu', // 默认使用的翻译接口
  needCtrl: false, // 网页划词翻译是否要配合 Ctrl（Mac 下为 Command）使用
  ignoreChinese: false, // 网页划词翻译是否忽略中文
  ignoreNumLike: true, // 网页划词翻译是否忽略无意义的文本组合，例如电话号码、密码符号等
  excludeDomains: [], // 以这些域名结尾的网址下会禁用网页划词翻译
  ignoresText: [] // todo 匹配这些正则表达式的文本不要翻译
};

/**
 * 获取默认设置
 * @param {null|String|String[]} _keys - 要获取的键.为 null 时会返回所有设置项
 * @returns {Object}
 */
export function getDefaultOptions( _keys ) {
  if ( _keys === null ) {
    return Object.assign( {}, defaultOptions );
  }
  const keys = Array.isArray( _keys ) ? _keys : [ _keys ];
  const optionsObj = {};
  keys.forEach( ( key )=> {
    // 如果 keys 里有某个键不是默认设置的一部分,就要给它设为 null,否则 storage.get 不会去读取它的值
    optionsObj[ key ] = defaultOptions.hasOwnProperty( key ) ? defaultOptions[ key ] : null;
  } );
  return optionsObj;
}

/**
 * 使用默认设置读取 storage.local
 * 可以使用这个方法替代 chrome.storage.local.get
 * @param {null|String|String[]} keys
 * @param {String} area - 从哪个存储区域读取设置
 * @returns {Promise}
 */
export default function ( keys , area = 'local' ) {
  return chromeCall( `storage.${area}.get`, getDefaultOptions( keys ) );
}
