import * as clipboard from '../../../src/public/clipboard';

describe( '剪切板模块' , ()=> {
  beforeEach( ()=> {
    spyOn( document , 'execCommand' );
  } );

  it( '读取剪切板时会执行 paste 命令' , ()=> {
    clipboard.read();
    expect( document.execCommand ).toHaveBeenCalledWith( 'paste' );
  } );

  it( '写入剪切板时会执行 copy 命令' , ()=> {
    clipboard.write( 'x' );
    expect( document.execCommand ).toHaveBeenCalledWith( 'copy' );
  } );

} );
