import 'babel-polyfill';

import chromeCall from 'chrome-call';

import st from './st';
import server from './server';
import {noop} from '../public/util';
import client from './client';

const MOUSE_UP = 'ontouch' in window
  /* istanbul ignore next */ ? 'touchend'
  /* istanbul ignore next */ : 'mouseup'
  , selection = getSelection();

/**
 * mouseup 事件监听函数，用于检测用户第一次产生拖蓝的动作
 * @param {MouseEvent} e
 */
export async function firstMouseUp( e ) {
  if ( selection.toString().trim() ) {
    removeFirstMouseUp();

    if ( 'true' === document.body.contentEditable ) {
      client.send( 'ga' , [ 'send' , 'event' , 'body 可编辑的情况' ] );
      const {disableInEditable} = await chromeCall( 'storage.local.get' , 'disableInEditable' );
      if ( disableInEditable ) {
        st.$destroy();
        client.send( 'ga' , [ 'send' , 'event' , 'body 可编辑的情况' , '在 body 可编辑的情况下停用了' ] );
        return;
      }
    }

    st.$appendTo( 'body' );
    st.$emit( 'mouseup' , e );
  }
}

/**
 * 取消对上面的 mouseUp 事件的监听。
 * 用户的其他操作启动了 st 之后就不需要继续监听 mouseup 事件了
 */
export function removeFirstMouseUp() {
  removeFirstMouseUp = noop;
  document.removeEventListener( MOUSE_UP , firstMouseUp );
}

export function onTranslate() {
  removeFirstMouseUp();
  st.$appendTo( 'body' );
  server.removeListener( 'connect' , onConnect );
}

/**
 * 第一次收到翻译命令时解除 mouse up 事件的检测检测
 * @param client
 */
/* istanbul ignore next */
function onConnect( client ) {
  client.once( 'translate' , onTranslate );
}

/* istanbul ignore if */
if ( process.env.NODE_ENV !== 'testing' ) {
  server.on( 'connect' , onConnect );
  document.addEventListener( MOUSE_UP , firstMouseUp );
}

