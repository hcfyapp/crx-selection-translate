/**
 * @files chrome 快捷键的事件监听函数
 */

import {send} from 'connect.io';
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
        id: tabId ,
        name : 'translate'
      } );
      break;
  }
}
