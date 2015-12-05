import storage from 'chrome-storage-wrapper';

import initST from '../../../src/content-scripts/initST';

describe( '内容脚本里' , ()=> {
  beforeEach( ()=> {
    spyOn( storage , 'get' ).and.returnValue( {} );
  } );

  describe( '若更改了禁用列表设置' , ()=> {

    it( '且当前域名在禁用列表中则禁用划词翻译' , async done => {
      spyOn( storage , 'addChangeListener' ).and.callFake( cb => {
        cb( {
          excludeDomains : [ location.host ]
        } );
      } );

      const st = await initST();
      expect( st.selection ).toBe( false );
      done();
    } );

    it( '且当前域名不在禁用列表中则启用划词翻译' , async done => {
      spyOn( storage , 'addChangeListener' ).and.callFake( cb => {
        cb( {
          excludeDomains : [ 'x' ]
        } );
      } );

      const st = await initST();
      expect( st.selection ).toBe( true );
      done();
    } );
  } );

  describe( '若更改了默认翻译引擎设置' , ()=> {
    beforeEach( ()=> {
      spyOn( storage , 'addChangeListener' ).and.callFake( cb => {
        cb( {
          defaultApi : 'hello'
        } );
      } );
    } );

    it( '会保存此设置并在下次翻译前设置为此翻译引擎' , async done => {
      const st = await initST();
      st.$emit( 'beforeQuery' );
      expect( st.query.api ).toBe( 'hello' );
      done();
    } );

  } );
} );
