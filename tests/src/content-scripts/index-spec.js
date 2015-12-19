import storage from 'chrome-storage-wrapper';

import main from '../../../src/content-scripts/index';

const selection = getSelection();

describe( '内容脚本里的划词翻译' , ()=> {

  beforeEach( ()=> { // 初始化 ST 时会使用 storage.get 读取设置
    spyOn( storage , 'get' ).and.returnValue( Promise.resolve( {} ) );
  } );

  it( '不会一开始就初始化' , ()=> {
    spyOn( document.body , 'appendChild' );
    main();
    expect( document.body.appendChild ).not.toHaveBeenCalled();
  } );

  describe( '在第一次产生 mouseup 事件时' , ()=> {
    let firstMouseUpHandler;

    beforeEach( ()=> {
      spyOn( document , 'addEventListener' ).and.callFake( ( eventName , cb )=> {
        firstMouseUpHandler = cb;
      } );
      spyOn( document.body , 'appendChild' );
      spyOn( selection , 'toString' );
      spyOn( document , 'removeEventListener' );
      main();
    } );

    it( '如果不带拖蓝则不会初始化' , async done => {
      selection.toString.and.returnValue( '' );
      await firstMouseUpHandler();
      expect( document.removeEventListener ).not.toHaveBeenCalled();
      expect( document.body.appendChild ).not.toHaveBeenCalled();
      done();
    } );

    it( '如果带拖蓝就会初始化' , async done => {
      selection.toString.and.returnValue( '带拖蓝了' );
      await firstMouseUpHandler( { target : document.body , button : 1 } );
      expect( document.removeEventListener ).toHaveBeenCalled();
      expect( document.body.appendChild ).toHaveBeenCalled();
      done();
    } );
  } );

  // todo 这部分测试要更新
  xdescribe( '在接收到来自扩展程序的命令时' , ()=> {
    let onMessageCb;
    beforeEach( async done => {
      spyOn( chrome.runtime.onMessage , 'addListener' )
        .and.callFake( cb => onMessageCb = cb );
      await main();
      done();
    } );

    it( '如果是翻译命令则会初始化划词翻译' , done => {
      spyOn( document.body , 'appendChild' );
      onMessageCb( {
        action : 'translate'
      } );

      // 初始化划词翻译是一个异步过程
      setTimeout( ()=> {
        expect( document.body.appendChild ).toHaveBeenCalled();
        done();
      } , 0 );
    } );

    it( '如果是报告地址的命令则会发送 location 对象' , ()=> {
      const sendResponse = jasmine.createSpy( 'sendResponse' );
      let v;

      window.self = 1; // 模拟当前环境不在顶层
      v = onMessageCb( {
        action : 'get location'
      } , {} , sendResponse );
      expect( sendResponse ).not.toHaveBeenCalled();
      expect( v ).toBeUndefined();

      window.self = window.top; // 模拟当前环境在顶层
      v = onMessageCb( {
        action : 'get location'
      } , {} , sendResponse );
      expect( sendResponse ).toHaveBeenCalled();
      expect( v ).toBe( true );
    } )
  } );
} );
