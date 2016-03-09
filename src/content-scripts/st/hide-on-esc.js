export default function ( st ) {
  document.addEventListener( 'keyup' , ( e )=> {
    if ( 27 === e.keyCode ) { // keyCode 虽然已被弃用，但目前几乎没有浏览器实现了 e.key
      st.boxPos.show = st.btnPos.show = false;
    }
  } );
}
