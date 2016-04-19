/**
 * @files chrome 快捷键的事件监听函数
 * @see https://crxdoc-zh.appspot.com/extensions/commands
 * 当前划词翻译里只有一个命令 translate，上一版中的 web（网页翻译）命令在这一版被移到 popup 里了
 */

import {send} from 'connect.io';
import getOptions from '../public/default-options';
import {getCurrentTabId} from '../public/util';

/* istanbul ignore if */
if ( process.env.NODE_ENV !== 'testing' ) {
  chrome.commands.onCommand.addListener( onCommand );
}

export async function onCommand( command ) {

  const tabId = await getCurrentTabId();

  switch ( command ) {
    case 'translate':
      send( {
        tabId ,
        name : 'translate'
      } );
      break;

    case 'web':
      const {defaultWeb} = await getOptions( 'defaultWeb' );
      send( {
        tabId ,
        name : 'web translate' ,
        data : defaultWeb
      } );
      break;
  }
}
