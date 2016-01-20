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
      'needCtrl' , 'defaultApi' , 'excludeDomains' , 'autoPlay'
    ] ,
    options = await storage.get( storageKeys );

  st.$on( 'beforeQuery' , function () {
    if ( !this.boxPos.show && defApi ) {
      this.query.api = defApi;
    }
  } );

  st.$on( 'after translate' , function () {
    const {query} = this ,
      {text} = query;

    if ( this.autoPlay && text.length < 50 ) {
      this.play( text , query.from );
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
 * 保证翻译窗口总是在浏览器视口内
 * @this st
 */
function restrictBox( st ) {
  /**
   * @prop {Number} width - 元素的宽度
   * @prop {Number} height - 元素的高度
   * @prop {Number} top - 元素的上边线距视口的上边的距离，若为负数则说明超出视口
   * @prop {Number} left - 元素的左边线距视口的左边的距离，若为负数则说明超出视口
   * @prop {Number} right - 元素的右边线距视口的**左**边的距离，即 left + width，若 right - window.innerWidth > 0 则说明超出视口
   * @prop {Number} bottom - 元素的底边线距视口的**上**边的距离，即 top + height，若 bottom - window.innerHeight > 0 则说明超出视口
   * @type {ClientRect}
   */
  const rect = st.$els.stBox.getBoundingClientRect() ,
    {boxPos} = st;

  // 左边
  const {left} = rect;
  if ( left < 0 ) {
    boxPos.translateX -= left;
  }

  // 上边
  const {top} = rect;
  if ( top < 0 ) {
    boxPos.translateY -= top;
  }

  // 右边
  const rightDiff = rect.right - window.innerWidth;
  if ( rightDiff > 0 ) {
    boxPos.translateX -= rightDiff;
  }

  // 下边
  const bottomDiff = rect.bottom - window.innerHeight;
  if ( bottomDiff > 0 ) {
    boxPos.translateY -= bottomDiff;
  }
}

/**
 * 让翻译窗口可拖动
 * @param st
 */
function draggable( st ) {

  const {boxPos} = st;

  st.$on( 'after translate' , ()=> restrictBox( st ) );

  interact( st.$els.stDrag )
    .draggable( {
      onmove : event => {
        boxPos.translateX += event.dx;
        boxPos.translateY += event.dy;
      } ,
      onend : ()=> restrictBox( st )
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
