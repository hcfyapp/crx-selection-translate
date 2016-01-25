/**
 * 内容脚本同时也是一个 Server 端，用来执行扩展程序发送过来的命令
 */

import {Server} from 'connect.io';
import * as web from './web';
import st from './st';

const server = new Server();

/**
 * 将自己的 location 对象报告给后台
 * @param data
 * @param {Function} resolve
 */
export function onGetLocation( data , resolve ) {
  if ( self === top ) {
    resolve( JSON.parse( JSON.stringify( location ) ) );
  }
}

/**
 * 接收到翻译命令时，翻译网页上的拖蓝
 */
export function onTranslate() {
  st.query.text = getSelection().toString();
  st.safeTranslate();
}

/**
 * 网页翻译
 * @param {*} data
 * @param {Function} resolve
 * @param {Function} reject
 */
export function onWebTranslate( data , resolve , reject ) {
  const w = web[ data ];
  if ( w ) {
    w();
    resolve();
  } else {
    reject();
  }
}

/* istanbul ignore if */
if ( process.env.NODE_ENV !== 'testing' ) {
  server.on( 'connect' , ( client )=> {
    client.on( 'get location' , onGetLocation );
    client.on( 'translate' , onTranslate );
    client.on( 'web translate' , onWebTranslate );
  } );
}

export default server;
