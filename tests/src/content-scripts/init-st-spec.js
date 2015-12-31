import storage from 'chrome-storage-wrapper';

import getST from '../../../src/content-scripts/init-st';

describe( '内容脚本里的翻译窗口' , ()=> {
  let st , onStorageChange;

  beforeAll( async ( done )=> {
    // getST 函数里有一次 storage.get 的调用，但是 chrome-env 永远不会执行回调，所以要打个补丁让 storage.get 尽快返回
    spyOn( storage , 'get' ).and.returnValue( {} );
    spyOn( storage , 'addChangeListener' ).and.callFake( cb => onStorageChange = cb );
    st = await getST();
    done();
  } );

  it( '只会初始化一次' , async ( done )=> {
    const anotherST = await getST();
    expect( anotherST ).toBe( st );
    done();
  } );

  describe( '若更改了禁用列表设置' , ()=> {

    it( '且当前域名在禁用列表中则禁用划词翻译' , ()=> {
      st.selection = true;
      onStorageChange( {
        excludeDomains : [ location.host ]
      } );
      expect( st.selection ).toBe( false );
    } );

    it( '且当前域名不在禁用列表中则启用划词翻译' , ()=> {
      st.selection = false;
      onStorageChange( {
        excludeDomains : [ 'x' ]
      } );
      expect( st.selection ).toBe( true );
    } );
  } );

  describe( '若更改了默认翻译引擎设置' , ()=> {
    it( '会保存此设置并在下次翻译前设置为此翻译引擎' , ()=> {
      st.query.api = '';
      onStorageChange( {
        defaultApi : 'hello'
      } );
      st.$emit( 'beforeQuery' );
      expect( st.query.api ).toBe( 'hello' );
    } );
  } );
} );
