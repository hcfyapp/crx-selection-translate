/**
 * 内容脚本同时也是一个 Server 端，用来执行扩展程序发送过来的命令
 */

import {Server} from 'connect.io';
import * as web from './web';
import getST from './init-st';

const server = new Server();

server.on( 'connect' , client => {

  // 报告标签页的地址给扩展程序
  client.on( 'get location' , ( data , resolve )=> {
    if ( self === top ) {
      resolve( JSON.parse( JSON.stringify( location ) ) );
    }
  } );

  // 翻译网页上选中文本的命令
  client.on( 'translate' , ()=> {
    getST().then( st => {
      st.query.text = getSelection().toString();
      st.translate();
    } );
  } );

  // 网页翻译的命令。data 为指定的网页翻译名称
  client.on( 'web translate' , ( data , resolve , reject )=> {
    const w = web[ data ];
    if ( w ) {
      w();
      resolve();
    } else {
      reject();
    }

  } );
} );

export default server;
