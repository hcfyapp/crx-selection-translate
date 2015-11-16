/**
 * @files 划词翻译的内容脚本里使用的 ST
 * @requires ST
 * @requires chromeStorage
 */

(( namespace , storage )=> {
  let defApi = '';
  const {runtime} = chrome ,
    {host} = location ,
    st = new ST( {
      template : `
      <div>
        <div class="st-box" v-bind:style="boxStyle">
          <header><span>图钉</span>这里是翻译窗口的头部<span>设置</span></header>
          <div>
            <input type="text" v-model="query.text" placeholder="输入要翻译的句子或单词">
            <select v-model="query.from">
              <option value="">自动判断</option>
              <option value="en">英语</option>
            </select>
            <select v-model="query.to">
              <option value="">自动选择</option>
              <option value="zh">中文</option>
            </select>
            <select v-model="query.api">
              <option value="YouDao">有道翻译</option>
              <option value="BaiDu">百度翻译</option>
            </select>
            <button type="submit">翻译</button>
          </div>
          <div>{{result.result}}</div>
        </div>
        <div class="st-btn" v-bind:style="btnStyle">译</div>
      </div>
      ` ,
      _btn : '.st-btn' ,
      _box : '.st-box' ,
      _drag : 'header' ,
      _getResult( queryObj ) {
        queryObj.api = defApi;
        return send( {
          action : 'translate' ,
          data : queryObj
        } ).catch( error => ({ error }) );
      } ,
      data : {
        query : {
          api : '' ,
          from : '' ,
          to : ''
        }
      }
    } ) ,

    storageKeys = [ 'ignoreChinese' , 'ignoreNumLike' , 'showBtn' , 'needCtrl' , 'defaultApi' , 'excludeDomains' ];

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
          st.selection = false;
          return true;
        }
      } );

      if ( !hasExclude ) {
        st.selection = true;
      }
      delete items.excludeDomains;
    }

    if ( defaultApi ) {
      defApi = defaultApi;
      delete items.defaultApi;
    }

    Object.assign( st , items );
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
