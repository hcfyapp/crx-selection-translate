/**
 * 懒启动的方法。只在用户第一次产生有拖蓝的 mouse up 事件、或者在右键菜单里接收到命令时才会初始化翻译窗口。
 */

import server from './server';
import getST from './init-st';

const main = ()=> {

  // 在用户第一次产生有拖蓝的 mouseup 事件时启动 st
  /* istanbul ignore next */
  const MOUSE_UP = 'ontouch' in window ? 'touchend' : 'mouseup' ,
    selection = getSelection() ,

    /**
     * mouseup 事件监听函数，用于检测用户第一次产生拖蓝的动作
     * @param {MouseEvent} e
     */
    firstMouseUp = async e => {
      if ( selection.toString().trim() ) {
        removeFirstMouseUp();
        const st = await getST();
        st.$emit( 'mouseup' , e );
      }
    };

  /**
   * 取消对上面的 mouseUp 事件的监听。
   * 用户的其他操作启动了 st 之后就不需要继续监听 mouseup 事件了
   */
  let removeFirstMouseUp = ()=> {
    removeFirstMouseUp = ()=> {};
    document.removeEventListener( MOUSE_UP , firstMouseUp );
  };

  document.addEventListener( MOUSE_UP , firstMouseUp );

  // 第一次收到翻译命令时就解除 mouse up 检测
  server.once( 'translate' , ()=> {
    removeFirstMouseUp();
  } );
};

/* istanbul ignore if */
if ( !TEST ) {
  main();
}

/* istanbul ignore next */
export default TEST ? main : undefined;

