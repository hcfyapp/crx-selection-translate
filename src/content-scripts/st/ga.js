/**
 * @files 发送翻译结果展示事件到谷歌分析
 */

import client from '../client';

/* istanbul ignore next */
function ga( ...args ) {
  try {
    client.send( 'ga' , args );
  }
  catch ( e ) {}
}

export default function ( st ) {
   /* istanbul ignore next */
  st.$watch( 'boxPos.show' , ( value )=> {
    if ( value ) {
      ga( 'send' , 'event' , '翻译窗口' , '展示' );
    }
  } );
}
