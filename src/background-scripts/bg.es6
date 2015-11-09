/**
 * @files 扩展程序的“后台”
 * @requires chromeStorage
 * @requires CRX.ts
 * @requires CRX.clipboard
 */

  // 处理其它页（特别是内容脚本）发送过来的命令
(( namespace , storage )=> {
  const {ts,clipboard} = namespace ,
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
})( typeof CRX !== 'undefined' ? CRX : (window.CRX = {}) , chromeStorage );

// 安装扩展或从旧版升级至新版时的处理
(( namespace , storage )=> {
  const {runtime} = chrome;

  // 安装时提示用户划词翻译已升级至最新版
  runtime.onInstalled.addListener( ()=> {
    storage
      .get( 'reminded' )
      .then( ( {reminded} ) => {
        storage.set( 'reminded' , true );
        reminded || tabs.create( { url : 'https://www.baidu.com' } ); // todo 要做一个新版提示的网页，就放在 github 上吧
      } );

    // todo 从旧版升级时需要将 storage 数据处理一下
  } );
})( typeof CRX !== 'undefined' ? CRX : (window.CRX = {}) , chromeStorage );
