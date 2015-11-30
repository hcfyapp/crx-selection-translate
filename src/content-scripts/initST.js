/**
 * @files 初始化 st 对象的方法
 */
import Vue from 'vue';
import storage from 'chrome-storage-wrapper';
import interact from 'interact.js';

import widget from '../public/widget/index';

// 将 interact 注册在全局对象上,这样 ST 初始化时就能读取到了
window.interact = interact;

const initST = async ()=> {
  let defApi = '';
  const {host} = location ,
    storageKeys = [
      'ignoreChinese' , 'ignoreNumLike' , 'showBtn' ,
      'needCtrl' , 'defaultApi' , 'excludeDomains'
    ] ,
    options = await storage.get( storageKeys );

  const st = new Vue( widget );

  st.$on( 'beforeQuery' , function () {
    if ( !this.boxPos.show && defApi ) {
      this.query.api = defApi;
    }
  } );

  storageChanged( options );

  st.query.api = defApi;

  st.$appendTo( 'body' );

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
      st.selection = !excludeDomains.some( domain => domain === host );
      delete items.excludeDomains;
    }

    if ( defaultApi ) {
      defApi = defaultApi;
      delete items.defaultApi;
    }

    Object.assign( st , items );
  }
};

let p;
export default ()=> p || (p = initST());
