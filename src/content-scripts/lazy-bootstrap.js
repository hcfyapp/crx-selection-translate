/**
 * 懒启动的方法。只在用户第一次产生有拖蓝的 mouse up 事件、或者在右键菜单里接收到命令时才会初始化翻译窗口。
 */

import server from './server';
import getST from './init-st';

// 在用户第一次产生有拖蓝的 mouseup 事件时启动 st
const MOUSE_UP = 'ontouch' in window ? 'touchend' : 'mouseup' ,
  selection = getSelection();

/**
 * mouseup 事件监听函数，用于检测用户第一次产生拖蓝的动作
 * @param {MouseEvent} e
 */
async function firstMouseUp( e ) {
  if ( selection.toString().trim() ) {
    removeFirstMouseUp();
    const st = await getST();
    st.$emit( 'mouseup' , e );
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

// 第一次收到翻译命令时就解除 mouse up 检测
server.on( 'connect' , onConnect );
function onConnect( client ) {
  client.once( 'translate' , ()=> {
    removeFirstMouseUp();
    server.removeListener( 'connect' , onConnect );
  } );
}

function main() {
  document.addEventListener( MOUSE_UP , firstMouseUp );
}

/* istanbul ignore if */
if ( process.env.NODE_ENV !== 'testing' ) {
  main();
}

/* istanbul ignore next */
export default process.env.NODE_ENV === 'testing' ? main : undefined;

