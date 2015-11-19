/**
 * 划词翻译在网页上的右键菜单，目前只有一个菜单项，并且只会在选中单词的右键菜单里出现
 */

import storage from 'chrome-storage-wrapper';
const {contextMenus} = chrome;
let created = false;

storage.addChangeListener( items => {
  if ( items.showMenu ) {
    createMenus();
  } else {
    removeAll();
  }
} , { keys : [ 'showMenu' ] } );

storage
  .get( 'showMenu' )
  .then( items => {
    if ( items.showMenu ) {
      createMenus();
    }
  } );

contextMenus.onClicked.addListener( () => sendCommand( 'translate' ) );

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
      documentUrlPatterns : [ "http://*/*" , "https://*/*" , "file:///*" , "about:blank" ] // 不要让菜单出现在 chrome-* 页面下
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

/**
 * 发送命令到内容脚本
 * @param command
 */
function sendCommand( command ) {
  chrome.tabs.query( { active : true } , function ( tabs ) {
    chrome.tabs.sendMessage( tabs[ 0 ].id , {
      action : command ,
      data : null
    } );
  } );
}
