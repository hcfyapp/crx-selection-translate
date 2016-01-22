import 'babel-polyfill';

import st from './st';
import server from './server';

// 在用户第一次产生有拖蓝的 mouseup 事件时启动 st
const MOUSE_UP = 'ontouch' in window ? 'touchend' : 'mouseup' ,
  selection = getSelection();

/**
 * mouseup 事件监听函数，用于检测用户第一次产生拖蓝的动作
 * @param {MouseEvent} e
 */
export async function firstMouseUp( e ) {
  if ( selection.toString().trim() ) {
    removeFirstMouseUp();
    st.$appendTo( 'body' );
    st.$emit( 'mouseup' , e );
  }
}

/**
 * 取消对上面的 mouseUp 事件的监听。
 * 用户的其他操作启动了 st 之后就不需要继续监听 mouseup 事件了
 */
export function removeFirstMouseUp() {
  removeFirstMouseUp = ()=> {};
  document.removeEventListener( MOUSE_UP , firstMouseUp );
}

/**
 * 第一次收到翻译命令时解除 mouse up 事件的检测检测
 * @param client
 */
export function onConnect( client ) {
  client.once( 'translate' , onTranslate );
}

export function onTranslate() {
  removeFirstMouseUp();
  server.removeListener( 'connect' , onConnect );
}

/* istanbul ignore if */
if ( process.env.NODE_ENV !== 'testing' ) {
  server.on( 'connect' , onConnect );
  document.addEventListener( MOUSE_UP , firstMouseUp );
}

