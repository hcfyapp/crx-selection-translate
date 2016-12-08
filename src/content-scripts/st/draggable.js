/**
 * @files 让翻译窗口可拖动
 */

import interact from 'interact.js';
import restrictBox from './restrict';

export default function ( st ) {

  function restrict() {
    restrictBox( st );
  }

  function onMove( event ) {
    const {boxPos} = st;
    boxPos.translateX += event.dx;
    boxPos.translateY += event.dy;
  }

  /* istanbul ignore next */
  if ( process.env.NODE_ENV === 'testing' ) {
    st.__restrict = restrict;
    st.__onMove = onMove;
  } else {
    st.$on( 'after translate' , ()=> {
      st.$nextTick( restrict );
    } );

    // todo 等待官方解决此问题后删除这个黑魔法
    // 由于 interact 的问题导致会在控制台不断的报错，
    // 但官方迟迟没有解决，
    // 所以这里黑一波。
    // 内容脚本里的 window 对象跟普通网页的 window 对象不同，
    // 所以不会影响到普通网页
    // https://github.com/Selection-Translator/crx-selection-translate/issues/228
    window.addEventListener('error', (err)=> {
      err.preventDefault()
    })

    interact( st.$els.stDrag )
      .styleCursor( false )
      .draggable( {
        onmove : onMove ,
        onend : restrict
      } );
  }
}
