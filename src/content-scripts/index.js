import 'babel-polyfill';
import './server';

import client from './client';
import initST from './initST';

const main = async ()=> {

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
        const st = await init();
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

  client.on( 'translate' , ()=> {
    init().then( st => {
      removeFirstMouseUp();
      st.translate();
    } );
  } );

  let p;

  /**
   * 只初始化一次
   * @returns {Promise}
   */
  function init() {
    return p || (p = initST());
  }
};

/* istanbul ignore if */
if ( !TEST ) {
  main();
}

/* istanbul ignore next */
export default TEST ? main : undefined;
