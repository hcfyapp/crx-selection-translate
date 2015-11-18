/**
 * @files 用于处理其他页面发送过来的命令
 * @requires CRX.ts
 * @requires CRX.clipboard
 */
//(( namespace )=> {
//  const {ts,clipboard} = namespace ,
const ts = require( '../public/my-ts' ) ,
  clipboard = require( '../public/clipboard' ) ,
  {runtime,tabs} = chrome ,

  actions = {

    /**
     * 获取翻译结果对象
     * @param {Query} queryObj
     * @returns {Promise}
     */
    translate : queryObj => {
      return ts.translate( queryObj );
    } ,

    /**
     * 播放语音
     * @param {Query} queryObj
     * @returns {Promise}
     */
    play : queryObj => {
      return ts.audio( queryObj );
    } ,

    /**
     * 复制文本到剪切板
     * @param {String} text
     * @returns {Promise}
     */
    copy : text => {
      clipboard.write( text );
      return Promise.resolve();
    } ,

    /**
     * 打开新窗口
     * @param {chrome.tabs.CreateProperties} data
     * @returns {Promise}
     */
    openTab : data => {
      return new Promise( ( resolve , reject )=> {
        tabs.create( data , resolve );
      } );
    }
  };

// 后台用于接收命令的入口，msgObj 有且只有两个属性：
// {String} action - 要进行的操作
// {*} data - 此操作需要的数据
runtime.onMessage.addListener( ( msgObj , sender , response )=> {
  actions[ msgObj.action ]( msgObj.data ).then( response );

  // 发送回执需要在事件监听里返回 true
  return true;
} );
//})( typeof CRX !== 'undefined' ? CRX : (window.CRX = {}) );
