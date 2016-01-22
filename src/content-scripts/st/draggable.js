/**
 * 让翻译窗口可拖动
 * @param st
 */
import interact from 'interact.js';
import restrictBox from './restrict';

export default function ( st ) {

  const {boxPos} = st;

  st.$on( 'after translate' , ()=> restrictBox( st ) );

  interact( st.$els.stDrag )
    .draggable( {
      onmove : event => {
        boxPos.translateX += event.dx;
        boxPos.translateY += event.dy;
      } ,
      onend : ()=> restrictBox( st )
    } );
}
