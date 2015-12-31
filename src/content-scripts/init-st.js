import Vue from 'vue';
import interact from 'interact.js';
import storage from 'chrome-storage-wrapper';

import client from './client';
import widget from '../public/widget/index';

/**
 * 将翻译窗口与扩展的 storage “绑定”起来
 * @param st
 */
async function bindStorage( st ) {
  let defApi = '';
  const {host} = location ,
    storageKeys = [
      'ignoreChinese' , 'ignoreNumLike' , 'showBtn' ,
      'needCtrl' , 'defaultApi' , 'excludeDomains'
    ] ,
    options = await storage.get( storageKeys );

  st.$on( 'beforeQuery' , function () {
    if ( !this.boxPos.show && defApi ) {
      this.query.api = defApi;
    }
  } );

  storageChanged( options );

  st.query.api = defApi;

  // 在设置变更时保持同步
  storage.addChangeListener( storageChanged , { keys : storageKeys } );

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
}

// 将 interact 注册在全局对象上,这样 ST 初始化时就能读取到了
window.interact = interact;
let st;
export default async ()=> {
  if ( !st ) {
    st = new Vue( widget( client ) );
    await bindStorage( st );
    st.$appendTo( 'body' );
  }
  return st;
};
