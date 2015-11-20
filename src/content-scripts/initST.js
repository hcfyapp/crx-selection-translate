/**
 * @files 初始化 st 对象的方法
 */
import storage from 'chrome-storage-wrapper';
import 'interact.js';
import ST from 'selection-widget';
import template from './tpl.html';

let p;
export default ()=> p || (p = initST());

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
          template ,
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
          } ,
          methods : {

            // 打开设置页
            openOptions() {
              send( {
                action : 'openTab' ,
                data : {
                  url : 'options/index.html'
                }
              } );
            } ,

            // 复制文本
            copy( textOrTextArray ) {
              if ( Array.isArray( textOrTextArray ) ) {
                textOrTextArray = textOrTextArray.join( '\n' );
              }
              send( {
                action : 'copy' ,
                data : textOrTextArray
              } );
            } ,

            // 播放
            play( textOrTextArray ) {
              // todo 在后台使用 howler 实现语音播放
              alert( 'todo' );
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
