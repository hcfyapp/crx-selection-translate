/**
 * @files 当用户按下 esc 键时隐藏翻译窗口
 */

export default function ( st ) {
  function onKeyUp( e ) {
    if ( 27 === e.keyCode ) { // keyCode 虽然已被弃用，但目前几乎没有浏览器实现了 e.key
      st.boxPos.show = st.btnPos.show = false;
    }
  }

  /* istanbul ignore next */
  if ( process.env.NODE_ENV === 'testing' ) {
    st.__onKeyUp = onKeyUp;
  } else {
    document.addEventListener( 'keyup' , onKeyUp );
  }
}
