//import main from '../../../src/background-scripts/commands';
import {Client} from 'connect.io';

xdescribe( '后台在接收到快捷键命令时' , ()=> {
  let onCommandsCb , queryTabCb;
  beforeAll( ()=> {
    spyOn( chrome.commands.onCommand , 'addListener' ).and.callFake( cb => onCommandsCb = cb );
    spyOn( chrome.tabs , 'query' ).and.callFake( ( options , cb )=> queryTabCb = cb );
  } );

  beforeEach( main );

  it( '如果是翻译命令,则通知选中标签页的内容脚本翻译' , ()=> {
    onCommandsCb( 'translate' );
    expect( chrome.tabs.query ).toHaveBeenCalledWith( { active : true } , queryTabCb );
    spyOn( Client.prototype , 'send' );
    queryTabCb( [ { id : 0 } ] );
    expect( Client.prototype.send ).toHaveBeenCalledWith( 'translate' , undefined , undefined ); // data 与 needResponse 都是 undefined
  } );
} );
