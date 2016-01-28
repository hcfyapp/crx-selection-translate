import {youdao,bing,google} from '../../../src/content-scripts/web';

describe( '网页翻译里的' , ()=> {
  beforeEach( ()=> {
    spyOn( document , 'getElementById' );
    spyOn( document , 'querySelector' );
    spyOn( Node.prototype , 'appendChild' );
    spyOn( window , 'alert' );
  } );

  describe( '有道网页翻译' , ()=> {

    describe( '如果当前网页已有有道网页翻译' , ()=> {
      let clickSpy , fakeBtn;

      beforeEach( ()=> {
        clickSpy = jasmine.createSpy( 'click' );
        fakeBtn = {
          textContent : '取消翻译' ,
          click : clickSpy
        };
        document.getElementById.and.returnValue( {
          contentWindow : {
            document : {
              getElementById() {
                return fakeBtn;
              }
            }
          }
        } );
      } );

      it( '则不会重新插入 script' , ()=> {
        youdao();
        expect( Node.prototype.appendChild ).not.toHaveBeenCalled();
      } );

      it( '且翻译按钮的文本不是“重新翻译”则不会翻译' , ()=> {
        youdao();
        expect( clickSpy ).not.toHaveBeenCalled();
      } );

      it( '且翻译按钮的文本是“重新翻译”则翻译一遍' , ()=> {
        fakeBtn.textContent = '重新翻译';
        youdao();
        expect( clickSpy ).toHaveBeenCalled();
        fakeBtn.textContent = '取消翻译';
      } );

    } );

    it( '若当前网页没有有道翻译则会插入脚本' , ()=> {
      document.getElementById.and.returnValue( null );
      youdao();
      expect( Node.prototype.appendChild ).toHaveBeenCalled();
    } );
  } );

  describe( '必应网页翻译' , ()=> {
    it( '若已经嵌入到网页中则不会重新插入脚本' , ()=> {
      const spy = jasmine.createSpy( 'bing click' );
      document.getElementById.and.returnValue( { click : spy } );
      bing();
      expect( spy ).toHaveBeenCalled();
      expect( Node.prototype.appendChild ).not.toHaveBeenCalled();
    } );

    it( '若没有嵌入到网页中则会插入脚本' , ()=> {
      bing();
      expect( Node.prototype.appendChild ).toHaveBeenCalled();
    } );
  } );

  describe( '谷歌网页翻译' , ()=> {
    it( '若已嵌入网页中则触发一次翻译' , ()=> {
      const spyObj = jasmine.createSpyObj( 'google dispatchEvent' , [ 'dispatchEvent' ] );
      document.querySelector.and.returnValue( spyObj );
      google();
      expect( spyObj.value ).toBe( 'zh-CN' );
      expect( spyObj.dispatchEvent ).toHaveBeenCalled();
    } );

    it( '若潜入的网页选择过语种则不会设置默认的中文语种' , ()=> {
      const spyObj = jasmine.createSpyObj( 'google dispatchEvent' , [ 'dispatchEvent' ] );
      spyObj.value = '已经选择过语种了';
      document.querySelector.and.returnValue( spyObj );
      google();
      expect( spyObj.value ).toBe( '已经选择过语种了' );
      expect( spyObj.dispatchEvent ).toHaveBeenCalled();
    } );

    it( '若不在网页中则会插入两段脚本和一个 div' , ()=> {
      google();
      expect( Node.prototype.appendChild.calls.count() ).toBe( 3 );
    } );
  } );
} );
