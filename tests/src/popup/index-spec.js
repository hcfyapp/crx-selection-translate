import storage from 'chrome-storage-wrapper';
import util from '../../../src/public/util';

import main from '../../../src/popup/index';

describe( '弹出页' , ()=> {

  describe( '无论当前 tab 能否 inject，总是' , ()=> {
    let app , st;

    beforeEach( async done => { // 异步函数内仍然需要结合 done 来使用
      spyOn( storage , 'get' ).and.returnValue( Promise.resolve( {
        excludeDomains : [] ,
        defaultApi : 'BaiDu'
      } ) );
      spyOn( util , 'getTabLocation' ).and.returnValue( Promise.resolve() );
      app = await main();
      st = app.$refs.st;
      done();
    } );

    it( 'inline 模式' , ()=> {
      expect( st.inline ).toBe( true );
    } );

    it( '会调整 st 的初始翻译引擎' , ()=> {
      expect( st.query.api ).toBe( 'BaiDu' );
    } );
  } );

  describe( '在一个无法 inject 的网页里打开时' , ()=> {
    let app , st;

    beforeEach( async done => {
      spyOn( storage , 'get' ).and.returnValue( Promise.resolve( {
        excludeDomains : [] ,
        defaultApi : 'BaiDu'
      } ) );
      spyOn( util , 'getTabLocation' ).and.returnValue( Promise.resolve() );
      app = await main();
      st = app.$refs.st;
      done();
    } );

    it( '不会显示是否对此网站启用的提示信息' , ()=> {
      expect( app.canInject ).toBe( false );
    } );
  } );

  describe( '在一个可以 inject 的网页里打开时' , ()=> {

    beforeEach( ()=> {
      spyOn( util , 'getTabLocation' ).and.returnValue( Promise.resolve( {
        host : 'www.limingkai.cn'
      } ) );
    } );

    it( '会显示是否在当前网站开启的提示信息' , async done => {
      spyOn( storage , 'get' ).and.returnValue( Promise.resolve( {
        excludeDomains : [] ,
        defaultApi : ''
      } ) );
      const app = await main();
      expect( app.canInject ).toBe( true );
      done();
    } );

    describe( '若 tab 不在禁用列表内' , ()=> {
      let app;

      beforeEach( async done => { // 异步函数内仍然需要结合 done 来使用
        spyOn( storage , 'get' ).and.returnValue( Promise.resolve( {
          excludeDomains : [ 'y' ] ,
          defaultApi : 'BaiDu'
        } ) );
        app = await main();
        done();
      } );

      it( '会提示在当前网站启用' , ()=> {
        expect( app.enabled ).toBe( true );
      } );

      it( '能切换为禁用状态' , async done => {
        spyOn( storage , 'set' );
        await app.switchEnable();
        expect( storage.set ).toHaveBeenCalledWith( 'excludeDomains' , [ 'y' , 'www.limingkai.cn' ] );
        done();
      } );
    } );

    describe( '若 tab 在禁用列表内' , ()=> {
      let app;

      beforeEach( async done => { // 异步函数内仍然需要结合 done 来使用
        spyOn( storage , 'get' ).and.returnValue( Promise.resolve( {
          excludeDomains : [ 'y' , 'www.limingkai.cn' ] ,
          defaultApi : 'BaiDu'
        } ) );
        app = await main();
        done();
      } );

      it( '会提示在当前网站禁用' , async done => {
        expect( app.enabled ).toBe( false );
        done();
      } );

      it( '能切换为启用状态' , async done => {
        spyOn( storage , 'set' );
        await app.switchEnable();
        expect( storage.set ).toHaveBeenCalledWith( 'excludeDomains' , [ 'y' ] );
        done();
      } );
    } );

  } );
} );
