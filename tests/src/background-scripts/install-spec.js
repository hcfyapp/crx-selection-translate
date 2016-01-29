import {onInstalled} from '../../../src/background-scripts/install';

describe( '扩展' , ()=> {
  describe( '' , ()=> {
    beforeEach( ()=> {
      spyOn( chrome.storage.local , 'set' ).and.callFake( ( x , cb )=> cb() );
      spyOn( chrome.storage.local , 'get' ).and.callFake( ( x , cb )=> cb( {} ) );
      spyOn( chrome.storage.local , 'clear' ).and.callFake( ( cb )=> cb() );
    } );

    it( '在安装时会写入默认设置' , async ( done )=> {
      await onInstalled( { reason : 'install' } );
      expect( chrome.storage.local.set ).toHaveBeenCalled();
      done();
    } );

    it( '在从 v5.x 升级至 v6.x 时会改写设置' , async ( done )=> {
      await onInstalled( { reason : 'update' , previousVersion : '5.0' } );
      expect( chrome.storage.local.get ).toHaveBeenCalled();
      expect( chrome.storage.local.clear ).toHaveBeenCalled();
      expect( chrome.storage.local.set ).toHaveBeenCalled();
      done();
    } );
  } );

  describe( '在从 v6.0.0 升级至最新版时' , ()=> {
    beforeEach( async ( done )=> {
      spyOn( chrome.storage.local , 'set' ).and.callFake( ( x , cb )=> cb() );
      spyOn( chrome.storage.local , 'get' ).and.callFake( ( x , cb )=> cb( {} ) );
      await onInstalled( { reason : 'update' , previousVersion : '6.0.0' } );
      done();
    } );
    it( 'v6.0.1 会添加两个新的设置项' , ()=> {
      expect( chrome.storage.local.set ).toHaveBeenCalledWith( {
        disableInEditable : false ,
        defaultWeb : 'youdao'
      } , jasmine.any( Function ) );
    } );

    it( 'v6.0.2 会转换一下 v5.x 的翻译接口名称' , ()=> {
      expect( chrome.storage.local.set ).toHaveBeenCalledWith( { defaultApi : 'YouDao' } , jasmine.any( Function ) );
    } );
  } );
} );
