/**
 * @files 初始化 st 对象的方法
 * @requires ST
 * @requires chromeStorage
 */
//(( namespace , storage )=> {
const storage = require( 'chrome-storage-wrapper' );
require( 'vue' );
require( 'interact.js' );

// 下面这个模块依赖上面两个全局变量
const ST = require( 'selection-widget' );
function initST() {
  const storageKeys = [
    'ignoreChinese' , 'ignoreNumLike' , 'showBtn' ,
    'needCtrl' , 'defaultApi' , 'excludeDomains'
  ];

  // 第二步：读取用户设置
  return storage.get( storageKeys )
    .then( options => {

      // 第三步：启动
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
            <button type="button" v-on:click="translate">翻译</button>
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
            if ( !st.boxPos.show && defApi ) {
              queryObj.api = defApi;
            }
            return send( {
              action : 'translate' ,
              data : queryObj
            } ).catch( error => ({ error }) );
          } ,
          data : {
            query : {
              api : options.defaultApi ,
              from : '' ,
              to : ''
            }
          }
        } );

      storageChanged( options );

      // 在设置变更时保持同步
      storage.addChangeListener( storageChanged , { keys : storageKeys } );

      return st;

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
    } );
}

let p;
module.exports = ()=> p || (p = initST());
//})( typeof CRX !== 'undefined' ? CRX : (window.CRX = {}) , chromeStorage );
