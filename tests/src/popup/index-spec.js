import storage from 'chrome-storage-wrapper';
import util from '../../../src/public/util';

import main from '../../../src/popup/index';

describe( '弹出页' , ()=> {

  describe( '' , ()=> {
    let app;

    beforeEach( async done => { // 异步函数内仍然需要结合 done 来使用
      spyOn( storage , 'get' ).and.returnValue( Promise.resolve( {
        excludeDomains : [] ,
        defaultApi : 'BaiDu'
      } ) );
      spyOn( util , 'getTabLocation' ).and.returnValue( Promise.resolve() );
      app = await main();
      done();
    } );

    it( '里的 st widget 应该是 inline 模式' ,()=> {
      expect( app.$refs.st.inline ).toBe( true );
    } );

    it( '在一个无法 inject 的 网页打开时不要显示是否对此网站启用的提示信息' , ()=> {
      expect( app.canInject ).toBe( false );
    } );
  } );
} );
