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

  describe( '在插入到 document.body 之前，若检测到 "true" === document.body.contentEditable' , ()=> {
    beforeEach( ()=> {
      spyOn( getSelection() , 'toString' ).and.returnValue( 'test' );
      spyOn( st , '$appendTo' );
      spyOn( st , '$emit' );
      spyOn( st , '$destroy' );
      spyOn( chrome.storage.local , 'get' );
      document.body.contentEditable = 'true';
    } );

    afterEach( ()=> {
      document.body.contentEditable = 'false';
    } );

    it( '若用户启用了在邮件区域禁用划词翻译的选项则毁掉此 vue 对象' , async ( done )=> {
      chrome.storage.local.get.and.callFake( ( x , cb )=> cb( { disableInEditable : true } ) );
      await main.firstMouseUp();
      expect( st.$destroy ).toHaveBeenCalled();
      expect( st.$appendTo ).not.toHaveBeenCalled();
      done();
    } );

    it( '若用户没有启用在邮件区域禁用划词翻译的选项则照常初始化' , async ( done )=> {
      chrome.storage.local.get.and.callFake( ( x , cb )=> cb( { disableInEditable : false } ) );
      await main.firstMouseUp();
      expect( st.$destroy ).not.toHaveBeenCalled();
      expect( st.$appendTo ).toHaveBeenCalled();
      done();
    } );
  } );
} );
