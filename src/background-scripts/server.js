/**
 * @files 用于处理其他页面发送过来的命令
 */
import {Server} from 'connect.io';
import chromeCall from 'chrome-call';
import ts from '../public/my-ts';
import {write} from '../public/clipboard';

const server = new Server();

/**
 * 获取翻译结果
 * @param {Query} queryObj
 * @param {Function} resolve
 */
export async function onGetTranslateResult( queryObj , resolve ) {
  try {
    resolve( await ts.translate( queryObj ) );
  }
  catch ( errorMsg ) {
    let error = errorMsg;
    if ( 'GoogleCN' === queryObj.api ) {
      error += '小提示：使用谷歌翻译（国内）时请确保你没有开启某高科技软件。';
    }
    resolve( { error } );
  }
}
/**
 * 播放语音
 * @param {Query} queryObj
 * @param {Function} resolve
 * @param {Function} reject
 */
export async function onPlay( queryObj , resolve , reject ) {
  let {from} = queryObj;

  if ( !from ) {
    try {
      from = await ts.detect( queryObj );
    }
    catch ( e ) {
      queryObj.api = 'Google';
      try {
        from = await ts.detect( queryObj );
      }
      catch ( e ) {
        return reject();
      }
    }
  }

  try {
    resolve( await chromeCall( 'tts.speak' , queryObj.text , {
      lang : from
    } ) );
  }
  catch ( e ) {
    reject( e );
  }
}

/**
 * 复制文本到剪切板
 * @param {String} text
 */
export function onCopy( text ) {
  clipboard.write( text );
}

/**
 * 打开新网页
 * @param {chrome.tabs.CreateProperties} tabOptions
 */
export function onOpenTab( tabOptions ) {
  return chromeCall( 'tabs.create' , tabOptions );
}

export function onConnect( client ) {
  client.on( 'get translate result' , onGetTranslateResult );
  client.on( 'play' , onPlay );
  client.on( 'copy' , onCopy );
  client.on( 'openTab' , onOpenTab );
}

server.on( 'connect' , onConnect );
export default server;
