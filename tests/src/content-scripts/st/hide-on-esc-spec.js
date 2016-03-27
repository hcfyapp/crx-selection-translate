import hideOnEsc from '../../../../src/content-scripts/st/hide-on-esc';

describe( '在网页中按下 Esc 键时' , ()=> {
  let fakeSt;
  beforeEach( ()=> {
    fakeSt = {
      boxPos : {
        show : true
      } ,
      btnPos : {
        show : true
      }
    };
    hideOnEsc( fakeSt );
  } );

  it( '会隐藏翻译结果' , ()=> {
    fakeSt.__onKeyUp( {
      keyCode : 27
    } );

    expect( fakeSt.boxPos.show ).toBe( false );
    expect( fakeSt.btnPos.show ).toBe( false );
  } );
} );
