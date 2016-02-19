/**
 * 划词翻译在网页上的右键菜单，目前只有一个菜单项，并且只会在选中单词的右键菜单里出现
 */

import chromeCall from 'chrome-call';
import {send} from 'connect.io';
import {getCurrentTabId} from '../public/util';
import watcher from '../public/storage-watcher';

const callContextMenus = chromeCall.scope( chrome.contextMenus );

export let created = false;

export async function onContextMenusClicked() {
  send( {
    tabId : await getCurrentTabId() ,
    name : 'translate'
  } );
}

export function onChromeLocalStorageChanged( items ) {
  if ( items.showMenu ) {
    createMenus();
  } else {
    removeAll();
  }
}

/* istanbul ignore if */
if ( process.env.NODE_ENV !== 'testing' ) {
  chromeCall( 'storage.local.get' , 'showMenu' ).then( onChromeLocalStorageChanged );
  watcher( 'showMenu' , 'local' , onChromeLocalStorageChanged );
  chrome.contextMenus.onClicked.addListener( onContextMenusClicked );
}

/**
 * 创建菜单
 * @return {Promise}
 */
function createMenus() {
  if ( !created ) {
    created = true;
    return callContextMenus( 'create' , {
      id : 'menu-translate' ,
      title : '翻译“%s”' ,
      contexts : [ 'selection' ] ,
      documentUrlPatterns : [ 'http://*/*' , 'https://*/*' , 'file:///*' , 'about:blank' ] // 不要让菜单出现在 chrome-* 页面下
    } );
  }
}

/**
 * 删除所有菜单
 * @return {Promise}
 */
function removeAll() {
  created = false;
  return callContextMenus( 'removeAll' );
}
