/**
 * @files 用于处理其他页面发送过来的命令
 */
import {Server} from 'connect.io';
import ts from '../public/my-ts';
import clipboard from '../public/clipboard';

const {runtime,tabs,tts} = chrome ,
  server = new Server();

server.on( 'connect' , client => {

  client.on( 'translate' ,
    /**
     * 获取翻译结果
     * @param {Query} queryObj
     * @param {Function} sendResponse
     */
    ( queryObj , sendResponse )=> {
      console.log( '收到翻译请求：' , queryObj );
      ts.translate( queryObj ).then(
        data => sendResponse( null , data ) ,
        e => sendResponse( e )
      );
    } );

  client.on( 'play' ,
    /**
     * 播放语音
     * @param {Query} queryObj
     * @param {Function} sendResponse
     */
    ( queryObj , sendResponse )=> {
      // todo 如果没有 queryObj.from,则使用 google 检测语种
      tts.speak( queryObj.text , {
        lang : queryObj.from
      } , ()=> {
        const {lastError} = runtime;
        if ( lastError ) {
          sendResponse( lastError );
        } else {
          sendResponse();
        }
      } );
    } );

  client.on( 'copy' ,
    /**
     * 复制文本到剪切板
     * @param {String} text
     */
    ( text )=> {
      clipboard.write( text );
    } );

  client.on( 'openTab' ,
    /**
     * 打开新网页
     * @param {chrome.tabs.CreateProperties} tabOptions
     */
    ( tabOptions )=> {
      tabs.create( tabOptions );
    } );
} );
export default server;
