/**
 * @files 用于处理其他页面发送过来的命令
 */
import {Server} from 'connect.io';
import ts from '../public/my-ts';
import clipboard from '../public/clipboard';

const {runtime,tabs,tts} = chrome ,
  server = new Server();

server.on( 'translate' ,
  /**
   * 获取翻译结果
   * @param {Query} queryObj
   * @param {Function} sendResponse
   */
  ( queryObj , sendResponse )=> {
    sendResponse( ts.translate( queryObj ) );
  } );

server.on( 'play' ,
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

server.on( 'copy' ,
  /**
   * 复制文本到剪切板
   * @param {String} text
   * @param {Function} sendResponse
   */
  ( text , sendResponse )=> {
    clipboard.write( text );
    sendResponse();
  } );

server.on( 'openTab' ,
  /**
   * 打开新网页
   * @param {chrome.tabs.CreateProperties} tabOptions
   * @param {Function} sendResponse
   */
  ( tabOptions , sendResponse )=> {
    tabs.create( tabOptions , sendResponse );
  } );

export default server;
