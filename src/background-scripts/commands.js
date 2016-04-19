/**
 * @files chrome 快捷键的事件监听函数
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
