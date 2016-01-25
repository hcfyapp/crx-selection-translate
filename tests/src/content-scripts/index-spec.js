import * as main from '../../../src/content-scripts';
import st from '../../../src/content-scripts/st';

describe( '内容脚本的 vue 对象' , ()=> {
  describe( '不会在一开始就插入到网页中去，会在' , ()=> {
    beforeEach( ()=> {
      spyOn( st , '$appendTo' );
      spyOn( st , '$emit' );
      spyOn( document , 'removeEventListener' );
    } );

    it( '用户第一次产生带拖蓝的 mouseup 事件时插入' , ()=> {
      spyOn( getSelection() , 'toString' );

      getSelection().toString.and.returnValue( '' );
      main.firstMouseUp( {} );
      expect( st.$appendTo ).not.toHaveBeenCalled();

      getSelection().toString.and.returnValue( 'test' );
      main.firstMouseUp( {} );
      expect( st.$appendTo ).toHaveBeenCalled();
    } );

    it( '第一次收到来自后台网页的翻译命令时（即用户在右键菜单选择了翻译）' , ()=> {
      main.onTranslate();
      expect( st.$appendTo ).toHaveBeenCalled();
    } );
  } );
} );
