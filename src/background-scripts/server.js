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
 */
export async function onPlay( queryObj , resolve ) {
  let {from} = queryObj;

  // todo 优化判断语种的逻辑。读取三次开销太大，等待时间太长了
  if ( !from ) {
    const tryApi = [ queryObj.api , 'Google' , 'GoogleCN' ] ,
      {length} = tryApi;

    for ( let cur = 0 ; cur < length ; cur += 1 ) {
      queryObj.api = tryApi[ cur ];
      try {
        from = await ts.detect( queryObj );
        break;
      }
      catch ( e ) {}
    }
  }

  resolve( chromeCall( 'tts.speak' , queryObj.text , {
    lang : from
  } ) );
}

/**
 * 复制文本到剪切板
 * @param {String} text
 */
export function onCopy( text ) {
  write( text );
}

/**
 * 打开新网页
 * @param {chrome.tabs.CreateProperties} tabOptions
 */
export function onOpenTab( tabOptions ) {
  return chromeCall( 'tabs.create' , tabOptions );
}

/* istanbul ignore if */
if ( process.env.NODE_ENV !== 'testing' ) {
  server.on( 'connect' , ( client )=> {
    client.on( 'get translate result' , onGetTranslateResult );
    client.on( 'play' , onPlay );
    client.on( 'copy' , onCopy );
    client.on( 'openTab' , onOpenTab );
  } );
}

export default server;
