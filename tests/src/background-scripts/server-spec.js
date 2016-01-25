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
    const openObj = {};
    spyOn( chrome.tabs , 'create' ).and.callFake( ( x , cb )=> cb( {} ) );
    await main.onOpenTab( openObj );
    expect( chrome.tabs.create ).toHaveBeenCalledWith( openObj , jasmine.any( Function ) );
    done();
  } );

  describe( '在接收到播放命令时' , ()=> {
    let resolve;
    beforeEach( ()=> {
      spyOn( chrome.tts , 'speak' ).and.callFake( ( x , y , cb )=> cb( {} ) );
      resolve = jasmine.createSpy( 'resolve' );
    } );

    it( '若有指定源语种则直接播放' , async ( done )=> {
      await main.onPlay( { text : 'x' , from : 'y' } , resolve  );
      expect( chrome.tts.speak ).toHaveBeenCalledWith( 'x' , { lang : 'y' } , jasmine.any( Function ) );
      done();
    } );

    describe( '若没有源语种' , ()=> {
      const queryObj = { text : 'x' };
      beforeEach( ()=> {
        spyOn( ts , 'detect' );
      } );

      it( '会先尝试从翻译接口检测源语种' , async ( done )=> {
        ts.detect.and.returnValue( Promise.resolve( 'lang' ) );
        await main.onPlay( queryObj , resolve  );
        expect( chrome.tts.speak ).toHaveBeenCalledWith( queryObj.text , { lang : 'lang' } , jasmine.any( Function ) );
        done();
      } );

      it( '若无法从翻译接口检测到语种，则会尝试从 Google 获取' , async ( done )=> {
        ts.detect.and.returnValues( Promise.reject() , Promise.resolve( 'twice' ) );
        await main.onPlay( queryObj , resolve );
        expect( chrome.tts.speak ).toHaveBeenCalledWith( queryObj.text , { lang : 'twice' } , jasmine.any( Function ) );
        expect( queryObj.api ).toBe( 'Google' );
        done();
      } );

      it( '若无法从翻译接口和 Google 检测到语种，则会尝试从 GoogleCN 获取' , async ( done )=> {
        ts.detect.and.returnValues( Promise.reject() , Promise.reject() , Promise.resolve( '3' ) );
        await main.onPlay( queryObj , resolve  );
        expect( chrome.tts.speak ).toHaveBeenCalledWith( queryObj.text , { lang : '3' } , jasmine.any( Function ) );
        expect( queryObj.api ).toBe( 'GoogleCN' );
        done();
      } );

      it( '若全都无法获取，则 reject' , async ( done )=> {
        ts.detect.and.returnValues( Promise.reject() , Promise.reject() , Promise.reject() );
        await main.onPlay( queryObj , resolve );
        expect( queryObj.api ).toBe( 'GoogleCN' );
        done();
      } );
    } );
  } );
} );
