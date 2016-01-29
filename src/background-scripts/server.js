/**
 * @files 用于处理其他页面发送过来的命令
 */
import {Server} from 'connect.io';
import chromeCall from 'chrome-call';
import ts from '../public/my-ts';
import {write} from '../public/clipboard';
import ga from '../public/ga';

const server = new Server();

/**
 * 获取翻译结果
 * @param {Query} queryObj
 * @param {Function} resolve
 */
export async function onGetTranslateResult( queryObj , resolve ) {
  const {api} = queryObj;
  ga( 'send' , 'event' , '翻译' , api );
  try {
    resolve( await ts.translate( queryObj ) );
    ga( 'send' , 'event' , '翻译成功' , api );
  }
  catch ( errorMsg ) {
    let error = errorMsg;
    if ( 'GoogleCN' === queryObj.api ) {
      error += '小提示：使用谷歌翻译（国内）时请确保你没有开启某高科技软件。';
    }
    ga( 'send' , 'event' , '翻译失败' , api );
    resolve( { error } );
  }
}

/**
 * 播放语音
 * @param {Query} queryObj
 * @param {Function} resolve
 */
export async function onPlay( queryObj , resolve ) {
  ga( 'send' , 'event' , '语音播放' );
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
  ga( 'send' , 'event' , '复制文本' );
  write( text );
}

export const onOpenOptions =
  chrome.runtime.openOptionsPage
    ? ()=> chromeCall( 'runtime.openOptionsPage' )
    : ()=> chromeCall( 'tabs.create' , { url : 'options/index.html' } );

/**
 * 接收从内容脚本发送过来的谷歌分析数据
 * @param args
 */
/* istanbul ignore next */
export function onGA( args ) {
  ga.apply( null , args );
}

/* istanbul ignore if */
if ( process.env.NODE_ENV !== 'testing' ) {
  server.on( 'connect' , ( client )=> {
    client.on( 'get translate result' , onGetTranslateResult );
    client.on( 'play' , onPlay );
    client.on( 'copy' , onCopy );
    client.on( 'open options' , onOpenOptions );
    client.on( 'ga' , onGA );
  } );
}

export default server;
