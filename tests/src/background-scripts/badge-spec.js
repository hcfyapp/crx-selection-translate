import {Client} from 'connect.io';
import * as main from '../../../src/background-scripts/badge';

describe( '扩展图标的徽章' , ()=> {
  beforeEach( ()=> {
    spyOn( chrome.storage.local , 'get' ).and.callFake( ( x , cb )=> {
      cb( { disableSelection : false } );
    } );
    spyOn( chrome.browserAction , 'setBadgeText' );
    spyOn( Client.prototype , 'send' ).and.returnValue( Promise.reject() );
  } );

  it( '当标签页更新地址之后会更新' , async ( done ) => {
    await main.onTabsUpdated( 88 , null , { active : false } );
    expect( chrome.browserAction.setBadgeText ).not.toHaveBeenCalled();

    await main.onTabsUpdated( 88 , null , { active : true } );
    expect( chrome.browserAction.setBadgeText ).toHaveBeenCalledWith( { text : 'off' } );
    done();
  } );

  it( '当切换当前标签页时会更新' , async ( done )=> {
    await main.onTabsActivated( { tabId : 88 } );
    expect( chrome.browserAction.setBadgeText ).toHaveBeenCalledWith( { text : 'off' } );
    done();
  } );

  it( '当 location 对象没有匹配到禁用列表中的地址时则不显示徽章' , async ( done )=> {
    main.onStorageChanged( { excludeDomains : [] } );
    Client.prototype.send.and.stub().and.returnValue( Promise.resolve( { host : 'y' } ) );
    await main.updateBadge( 88 );
    expect( chrome.browserAction.setBadgeText ).toHaveBeenCalledWith( { text : '' } );
    done();
  } );
} );
