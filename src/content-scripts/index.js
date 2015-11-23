import initST from './initST';

// 在用户第一次产生有拖蓝的 mouseup 事件时启动 st
const MOUSE_UP = 'ontouch' in window ? 'touchend' : 'mouseup' ,
  selection = getSelection();

document.addEventListener( MOUSE_UP , firstMouseUp );

/**
 * mouseup 事件监听函数，用于检测用户第一次产生拖蓝的动作
 * @param {MouseEvent} e
 */
function firstMouseUp( e ) {
  if ( selection.toString().trim() ) {
    removeFirstMouseUp();
    initST().then( st => st.$emit( 'mouseup' , e ) );
  }
}

/**
 * 取消对上面的 mouseUp 事件的监听。
 * 用户的其他操作启动了 st 之后就不需要继续监听 mouseup 事件了
 */
function removeFirstMouseUp() {
  removeFirstMouseUp = ()=> {};
  document.removeEventListener( MOUSE_UP , firstMouseUp );
}

// 接收来自后台的消息，见 /background-scripts/commands.es6
chrome.runtime.onMessage.addListener( ( msg , sender , sendResponse ) => {
  switch ( msg.action ) {
    case 'translate': // 快捷键：翻译网页上选中的文本
      initST().then( st => {
        removeFirstMouseUp();
        st.translate();
      } );
      break;

    // todo 这里有一个 bug：扩展程序发过来的消息是字符串 'getUrl' 而不是 { action:'getUrl' }，所以这个分支永远走不进来
    case 'getUrl': // 将 tab 的 url 报告给扩展程序
      if ( self === top ) {
        sendResponse( JSON.parse( JSON.stringify( location ) ) );
        return true;
      }
      break;
  }
} );
