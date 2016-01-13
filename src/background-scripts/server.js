/**
 * @files 用于处理其他页面发送过来的命令
 */
import {Server} from 'connect.io';
import chromeCall from 'chrome-call';
import ts from '../public/my-ts';
import clipboard from '../public/clipboard';

const {tabs} = chrome ,
  server = new Server();

server.on( 'connect' , client => {

  client.on( 'get translate result' ,
    /**
     * 获取翻译结果
     * @param {Query} queryObj
     * @param {Function} resolve
     */
    ( queryObj , resolve )=> {
      ts.translate( queryObj ).then( resolve , ( errorMsg )=> {
        let error = errorMsg;
        if ( 'GoogleCN' === queryObj.api ) {
          error += '小提示：使用谷歌翻译（国内）时请确保你没有开启某高科技软件。';
        }
        resolve( { error } );
      } );
    } );

  client.on( 'play' ,
    /**
     * 播放语音
     * @param {Query} queryObj
     * @param {Function} resolve
     * @param {Function} reject
     */
    async ( queryObj , resolve , reject )=> {
      let {from} = queryObj;

      if ( !from ) {
        try {
          from = await ts.detect( queryObj );
        }
        catch ( e ) {
          return reject();
        }
      }

      chromeCall( 'tts.speak' , queryObj.text , {
        lang : from
      } ).then( resolve , reject );
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
