/**
 * @files 扩展程序的“后台”
 * @requires chromeStorage
 * @requires CRX.ts
 * @requires CRX.clipboard
 */
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

  // 安装时提示用户划词翻译已升级至最新版
  runtime.onInstalled.addListener( ()=> {
    storage
      .get( 'reminded' )
      .then( ( {reminded} ) => {
        storage.set( 'reminded' , true );
        reminded || tabs.create( { url : '/index.html#/new-version' } );
      } );
  } );
})( typeof CRX !== 'undefined' ? CRX : (window.CRX = {}) , chromeStorage );

