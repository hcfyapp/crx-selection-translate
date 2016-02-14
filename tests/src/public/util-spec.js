import * as util from '../../../src/public/util';
import {Client} from 'connect.io';

describe( '读取当前标签页的 location 对象的方法' , ()=> {
  beforeEach( ()=> {
    spyOn( Client.prototype , 'send' );
    spyOn( chrome.tabs , 'query' ).and.callFake( ( options , cb )=> {
      cb( [ { id : 88 } ] );
    } );
  } );

  it( '如果没有传 tabId 参数，则会读取一次' , async ( done )=> {
    Client.prototype.send.and.returnValue( Promise.resolve( { url : 'x' } ) );
    const location = await util.getTabLocation();
    expect( location ).toEqual( { url : 'x' } );
    expect( Client.prototype.send ).toHaveBeenCalledWith( 'get location' , undefined , true );
    done();
  } );

  it( '若无法读取到 location，则 resolved 为 null' , async ( done )=> {
    Client.prototype.send.and.returnValue( Promise.reject() );
    const location = await util.getTabLocation();
    expect( location ).toBeNull();
    expect( Client.prototype.send ).toHaveBeenCalledWith( 'get location' , undefined , true );
    done();
  } );
} );

describe( '判断当前是否应该启用划词翻译的方法' , ()=> {
  it( '若全局禁用了划词翻译则判断为禁用' , async ( done )=> {
    spyOn( chrome.storage.local , 'get' ).and.callFake( ( x , cb )=> {
      cb( { disableSelection : true } );
    } );
    expect( await util.isHostEnabled() ).toBe( false );
    done();
  } );

  it( '若无权获取当前标签页的 location 则判断为禁用，但是返回值为 null' , async ( done )=> {
    spyOn( chrome.storage.local , 'get' ).and.callFake( ( x , cb )=> {
      cb( { disableSelection : false } );
    } );
    expect( await util.isHostEnabled( null ) ).toBeNull();
    done();
  } );
} );
