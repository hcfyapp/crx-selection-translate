/**
 * @files 划词翻译的内容脚本里使用的 ST
 * @requires CRX.renderer
 * @requires chromeStorage
 */

(( namespace , storage )=> {
  const {runtime} = chrome ,
    {host} = location ,
    st = new ST( {
      renderer : namespace.renderer ,
      query( queryObj ) {
        return send( {
          action : 'translate' ,
          data : queryObj
        } ).catch( error => ({ error }) );
      }
    } ) ,

    storageKeys = Object.keys( st.config ).concat( 'defaultApi' , 'excludeDomains' );

  // 初始化设置
  storage
    .get( storageKeys )
    .then( storageChanged );

  // 在设置变更时保持同步
  storage.addChangeListener( storageChanged , { keys : storageKeys } );

  // 接收来自后台的消息，见 /background-scripts/commands.es6
  runtime.onMessage.addListener( msg => {
    switch ( msg.action ) {
      case 'translate': // 快捷键：翻译网页上选中的文本
        st.translate();
        break;
    }
  } );

  /**
   * 处理设置变化
   * @param {StorageData} items
   */
  function storageChanged( items ) {
    const {defaultApi,excludeDomains} = items;

    if ( excludeDomains ) {
      const hasExclude = excludeDomains.some( domain => {
        if ( domain === host ) {
          st.config.selection = false;
          return true;
        }
      } );

      if ( !hasExclude ) {
        st.config.selection = true;
      }
      delete items.excludeDomains;
    }

    if ( defaultApi ) {
      // todo 划词之后需要把 query 里面的翻译引擎设置为默认的翻译引擎
      delete items.defaultApi;
    }

    Object.assign( st.config , items );
  }

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
