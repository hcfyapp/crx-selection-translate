import ST from '../../../src/popup/st';
import {input} from '../../../src/public/clipboard';

describe( '弹出页内的翻译窗口' , ()=> {

  it( '在初始化时会设置默认翻译引擎' , ( done )=> {
    spyOn( chrome.storage.local , 'get' ).and.callFake( ( x , cb )=> cb( {
      defaultApi : 'test'
    } ) );
    const st = new ST();
    setTimeout( ()=> {
      expect( st.query.api ).toBe( 'test' );
      done();
    } , 0 );
  } );

  it( '若开启了自动翻译剪切板的朗读功能则会自动翻译' , ( done )=> {
    spyOn( chrome.storage.local , 'get' ).and.callFake( ( x , cb )=> cb( {
      autoClipboard : true
    } ) );

    spyOn( document , 'execCommand' );
    new ST();
    setTimeout( ()=> {
      expect( document.execCommand ).toHaveBeenCalledWith( 'paste' );
      done();
    } , 0 );
  } );
} );
