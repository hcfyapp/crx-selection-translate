import {onInstalled} from '../../../src/background-scripts/install';

describe( '扩展' , ()=> {
  describe( '' , ()=> {
    beforeEach( ()=> {
      spyOn( chrome.storage.local , 'set' ).and.callFake( ( x , cb )=> cb() );
      spyOn( chrome.storage.local , 'get' ).and.callFake( ( x , cb )=> cb( {} ) );
      spyOn( chrome.storage.local , 'clear' ).and.callFake( ( cb )=> cb() );
    } );

    it( '在从 v5.x 升级至 v6.x 时会改写设置' , async ( done )=> {
      await onInstalled( { reason : 'update' , previousVersion : '5.0' } );
      expect( chrome.storage.local.get ).toHaveBeenCalled();
      expect( chrome.storage.local.clear ).toHaveBeenCalled();
      expect( chrome.storage.local.set ).toHaveBeenCalled();
      done();
    } );
  } );
} );
