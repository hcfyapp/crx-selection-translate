import drag from '../../../../src/content-scripts/st/draggable';

describe( '让翻译窗口可以拖动的函数' , ()=> {
  let fakeSt , getBoundingClientRectSpy;
  beforeEach( ()=> {
    getBoundingClientRectSpy = jasmine.createSpy( 'getBoundingClientRectSpy' );
    fakeSt = {
      $els : {
        stBox : {
          getBoundingClientRect : getBoundingClientRectSpy
        }
      } ,
      boxPos : {
        translateX : 0 ,
        translateY : 0
      }
    };
    getBoundingClientRectSpy.and.returnValue( {
      left : 0 ,
      top : 0 ,
      right : 0 ,
      bottom : 0
    } );
    drag( fakeSt );
  } );

  it( '在翻译或移动后都会重设位置以保证翻译窗口总是在视口内' , ()=> {
    fakeSt.__restrict();
    expect( getBoundingClientRectSpy ).toHaveBeenCalled();
  } );

  it( '移动时会设置翻译窗口的位置' , ()=> {
    fakeSt.__onMove( { dx : 1000 , dy : 200 } );
    expect( fakeSt.boxPos.translateX ).toBe( 1000 );
    expect( fakeSt.boxPos.translateY ).toBe( 200 );
  } );
} );
