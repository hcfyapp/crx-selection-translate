import {onCommand} from '../../../src/background-scripts/commands';
import {Client} from 'connect.io';

describe( '后台在接收到快捷键命令时' , ()=> {

  beforeEach( ()=> {
    spyOn( chrome.tabs , 'query' ).and.callFake( ( x , cb )=> cb( [ { id : 88 } ] ) );
    spyOn( Client.prototype , 'send' );
  } );

  it( '如果是翻译命令，则通知选中标签页的内容脚本翻译' , async ( done )=> {
    await onCommand( 'translate' );
    expect( Client.prototype.send ).toHaveBeenCalledWith( 'translate' , undefined , undefined );
    done();
  } );

  it( '如果是网页翻译命令，则通知选中标签页的内容脚本翻译' , async ( done )=> {
    await onCommand( 'web' );
    expect( Client.prototype.send ).toHaveBeenCalledWith( 'web translate' , 'youdao' , undefined );
    done();
  } );
} );
