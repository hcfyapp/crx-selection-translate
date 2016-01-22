/**
 * @files chrome 快捷键的事件监听函数
 * @see https://crxdoc-zh.appspot.com/extensions/commands
 * 当前划词翻译里只有一个命令 translate，上一版中的 web（网页翻译）命令在这一版被移到 popup 里了
 */

import {send} from 'connect.io';
import chromeCall from 'chrome-call';

export async function onCommand( command ) {

  const tabId = (await chromeCall( 'tabs.query' , { active : true } ))[ 0 ].id;

  switch ( command ) {
    case 'translate':
      send( {
        tabId ,
        name : 'translate'
      } );
      break;

    case 'web':
      send( {
        tabId ,
        name : 'web translate' ,
        data : 'youdao'
      } );
      break;
  }
}
if ( process.env.NODE_ENV !== 'testing' ) {
  chrome.commands.onCommand.addListener( onCommand );
}
