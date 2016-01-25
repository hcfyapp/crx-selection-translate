import restrict from '../../../../src/content-scripts/st/restrict';

describe( '让翻译窗口始终保持在视口内的函数' , ()=> {
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
        translateX : 100 ,
        translateY : 200
      }
    };
  } );

  it( '会计算正确的值' , ()=> {
    getBoundingClientRectSpy.and.returnValue( {
      left : -20 ,
      top : -40 ,
      right : window.innerWidth + 20 ,
      bottom : window.innerHeight + 50
    } );
    restrict( fakeSt );
    expect( fakeSt.boxPos ).toEqual( {
      translateX : 100 ,
      translateY : 190
    } );
  } );
} );
