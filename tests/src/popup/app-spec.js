import {appOptions} from '../../../src/popup/app';
import {Client} from 'connect.io';
import Vue from 'vue';

describe( '弹出页' , ()=> {
  let app;

  beforeEach( ()=> {
    spyOn( chrome.tabs , 'query' ).and.callFake( ( x , cb )=>cb( [ { id : 88 } ] ) );
    spyOn( chrome.storage.local , 'get' ).and.callFake( ( x , cb )=> cb( { excludeDomains : [] } ) );
    spyOn( chrome.storage.local , 'set' ).and.callFake( ( x , cb )=> cb() );
    spyOn( Client.prototype , 'send' ).and.returnValue( Promise.resolve( { host : 'x' } ) );

    const div = document.createElement( 'div' );
    document.body.appendChild( div );
    appOptions.el = div;
    app = new Vue( appOptions );
  } );

  it( '在初始化时会判断划词翻译对当前标签页是否已启用' , ( done )=> {
    setTimeout( ()=> {
      expect( app.$data._host ).toBe( 'x' );
      expect( app.enabled ).toBe( true );
      expect( app.canInject ).toBe( true );
      done();
    } , 0 );
  } );

  it( '网页翻译方法会发送消息到内容脚本' , async ( done )=> {
    spyOn( window , 'close' );
    await app.webTranslate( 'h' );
    expect( Client.prototype.send ).toHaveBeenCalledWith( 'web translate' , 'h' , true );
    expect( window.close ).toHaveBeenCalled();
    done();
  } );

  it( '切换是否启用时会将设置写入 chrome.storage.local' , ( done )=> {
    setTimeout( async ()=> {
      expect( app.enabled ).toBe( true );
      await app.switchEnable();
      expect( chrome.storage.local.set ).toHaveBeenCalledWith( { excludeDomains : [ 'x' ] } , jasmine.any( Function ) );
      expect( app.enabled ).toBe( false );

      spyOn( Array.prototype , 'splice' );
      await app.switchEnable();
      expect( app.enabled ).toBe( true );
      expect( Array.prototype.splice ).toHaveBeenCalledWith( -1 , 1 );
      done();
    } , 0 );
  } );
} );
