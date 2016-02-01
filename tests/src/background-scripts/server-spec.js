import * as main from '../../../src/background-scripts/server';
import ts from '../../../src/public/my-ts';

// todo 在 chrome-env 中添加 speak 方法
chrome.tts.speak = ()=> {};
// todo 在 chrome-env 中创建此方法
chrome.tabs.create = ()=> {};

describe( '后台网页' , ()=> {
  describe( '在接收到翻译消息时' , ()=> {
    beforeEach( ()=> {
      spyOn( ts , 'translate' );
    } );

    it( '若翻译成功则返回翻译结果' , async ( done )=> {
      const spy = jasmine.createSpy( 'spy1' );
      const translateResult = {};
      ts.translate.and.returnValue( translateResult );
      await main.onGetTranslateResult( {} , spy );
      expect( spy ).toHaveBeenCalledWith( translateResult );
      done();
    } );

    describe( '若翻译失败' , ()=> {
      it( '会显示错误信息' , async ( done )=> {
        const spy = jasmine.createSpy( 'spy2' );
        ts.translate.and.returnValue( Promise.reject( '错误消息' ) );
        await main.onGetTranslateResult( {} , spy );
        expect( spy ).toHaveBeenCalledWith( { error : '错误消息' } );
        done();
      } );

      it( '且失败的翻译借口是谷歌中国，则会显示额外的错误消息' , async ( done )=> {
        const spy = jasmine.createSpy( 'spy3' );
        ts.translate.and.returnValue( Promise.reject( '错误消息。' ) );
        await main.onGetTranslateResult( { api : 'GoogleCN' } , spy );
        expect( spy ).toHaveBeenCalledWith( { error : '错误消息。小提示：使用谷歌翻译（国内）时请确保你没有开启某高科技软件。' } );
        done();
      } );
    } );
  } );

  it( '在接收到复制消息时会复制文本' , ()=> {
    spyOn( document , 'execCommand' );
    main.onCopy( 'test' );
    expect( document.execCommand ).toHaveBeenCalledWith( 'copy' );
  } );

  it( '在接收到打开标签页的消息时会打开标签页' , async ( done )=> {
    spyOn( chrome.tabs , 'create' ).and.callFake( ( x , cb )=> cb( {} ) );
    await main.onOpenOptions();
    expect( chrome.tabs.create ).toHaveBeenCalledWith( { url : 'options/index.html' } , jasmine.any( Function ) );
    done();
  } );

  describe( '在接收到播放命令时' , ()=> {
    let resolve;
    beforeEach( ()=> {
      spyOn( ts , 'detect' ).and.returnValue( Promise.resolve( 'y' ) );
      spyOn( ts , 'audio' ).and.returnValues( Promise.reject() , Promise.resolve( 'hi' ) );
      spyOn( Audio.prototype , 'play' );
      resolve = jasmine.createSpy( 'resolve' );
    } );

    it( '若没有源语种则会使用谷歌翻译检测语种' , async ( done )=> {
      const q = { text : 'x' };
      try {
        await main.onPlay( q , resolve );
      }
      catch ( e ) {
        console.log( e );
      }
      expect( ts.detect ).toHaveBeenCalledWith( {
        api : 'Google' ,
        text : 'x'
      } );
      expect( q.from ).toBe( 'y' );
      done();
    } );

    it( '会先尝试使用翻译接口、然后尝试使用谷歌朗读' , async ( done )=> {
      const q = { text : 'x' , api : 'wtf' };
      await main.onPlay( q , resolve );
      expect( resolve ).toHaveBeenCalledWith( 'hi' );
      expect( q.api ).toBe( 'Google' );
      expect( Audio.prototype.play ).toHaveBeenCalled();
      done();
    } );
  } );
} );
