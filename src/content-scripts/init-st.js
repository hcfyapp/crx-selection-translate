import Vue from 'vue';
import interact from 'interact.js';
import storage from 'chrome-storage-wrapper';

import client from './client';
import widget from '../public/widget/index';
import util from '../public/util';

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
      st.selection = util.isHostEnabled( location , excludeDomains );
      delete items.excludeDomains;
    }

    if ( defaultApi ) {
      defApi = defaultApi;
      delete items.defaultApi;
    }

    Object.assign( st , items );
  }
}

/**
 * 让翻译窗口可拖动
 * @param st
 */
function draggable( st ) {
  const {boxPos,$els} = st;
  interact( $els.stDrag )
    .draggable( {
      onmove : event => {
        boxPos.translateX += event.dx;
        boxPos.translateY += event.dy;
      }
    } );
}

let st;
export default async ()=> {
  if ( !st ) {
    st = new Vue( widget( client ) );
    await bindStorage( st );
    draggable( st );
    st.$appendTo( 'body' );
  }
  return st;
};
