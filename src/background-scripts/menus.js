/**
 * 划词翻译在网页上的右键菜单，目前只有一个菜单项，并且只会在选中单词的右键菜单里出现
 */

import storage from 'chrome-storage-wrapper';
import chromeCall from 'chrome-call';
import {send} from 'connect.io';

const {contextMenus} = chrome;

export let created = false;

export function onChromeLocalStorageChanged( items ) {
  const {showMenu} = items;
  if ( showMenu ) {
    if ( showMenu.newValue ) {
      createMenus();
    } else {
      removeAll();
    }
  }
}

export async function onContextMenusClicked() {
  const tabs = await chromeCall( 'tabs.query' , { active : true } );
  send( {
    tabId : tabs[ 0 ].id ,
    name : 'translate'
  } );
}

if ( process.env.NODE_ENV !== 'testing' ) {
  chrome.storage.local.addChangeListener( onChromeLocalStorageChanged );
  contextMenus.onClicked.addListener( onContextMenusClicked );
  chromeCall( 'storage.local.get' , 'showMenu' )
    .then( items => {
      if ( items.showMenu ) {
        createMenus();
      }
    } );
}

/**
 * 创建菜单
 */
function createMenus() {
  if ( !created ) {
    created = true;
    contextMenus.create( {
      id : 'menu-translate' ,
      title : '翻译“%s”' ,
      contexts : [ 'selection' ] ,
      documentUrlPatterns : [ 'http://*/*' , 'https://*/*' , 'file:///*' , 'about:blank' ] // 不要让菜单出现在 chrome-* 页面下
    } );
  }
}

/**
 * 删除所有菜单
 */
function removeAll() {
  created = false;
  contextMenus.removeAll();
}
