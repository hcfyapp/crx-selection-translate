/**
 * 内容脚本同时也是一个 Server 端，用来报告自己的 location 给扩展程序
 */

import {Server} from 'connect.io';

const server = new Server();

server.on( 'connect' , client => {
  client.on( 'get location' , ( data , sendResponse )=> {
    if ( self === top ) {
      sendResponse( JSON.parse( JSON.stringify( location ) ) );
    }
  } );
} );

export default server;
