// 处理扩展程序传给内容脚本的消息
chrome.runtime.onMessage.addListener( ( msgObj , sender , response )=> {
  if ( msgObj === 'getUrl' && window === top ) { // 目前只有 getUrl
    response( JSON.parse( JSON.stringify( location ) ) );
    return true;
  }
} );
