/**
 * 划词翻译的划词框
 * @requires chromeStorage
 * @requires ST
 */

(( namespace , storage )=> {
  const renderer = new ST.Renderer() ,
    {runtime} = chrome;

  namespace.st = new ST( {
    renderer ,
    query( queryObj ) {
      return send( {
        action : 'translate' ,
        data : queryObj
      } ).catch( error => {return { error };} );
    }
  } );

  /**
   * 传递消息到后台的方法
   * @param {Object} obj
   * @returns {Promise}
   */
  function send( obj ) {
    return new Promise( ( resolve , reject )=> {
      try { // 连接到背景页时可能会报错：{ message : 'Error connecting to extension ${扩展id}' }
        runtime.sendMessage( obj , res => {
          const le = runtime.lastError;
          if ( le || !res ) { // 不知道为何，偶尔res会是一个undefined
            reject( '获取查询结果时发生了错误，请尝试刷新网页或重启浏览器后重试。' , le );
          } else {
            resolve( res );
          }
        } );
      }
      catch ( e ) {
        reject( '连接到翻译引擎时发生了错误，请尝试刷新网页或重启浏览器后重试。' , e );
      }
    } );
  }
})( typeof CRX !== 'undefined' ? CRX : (window.CRX = {}) , chromeStorage );
