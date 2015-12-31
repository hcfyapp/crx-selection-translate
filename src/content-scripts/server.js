/**
 * 内容脚本同时也是一个 Server 端，用来执行扩展程序发送过来的命令
 */

import {Server} from 'connect.io';
import getST from './init-st';

const server = new Server();

server.on( 'connect' , client => {
  client.on( 'get location' , ( data , resolve )=> {
    if ( self === top ) {
      resolve( JSON.parse( JSON.stringify( location ) ) );
    }
  } );

  client.on( 'translate' , ()=> {
    getST().then( st => {
      st.query.text = getSelection().toString();
      st.translate();
    } );
  } );
} );

export default server;
