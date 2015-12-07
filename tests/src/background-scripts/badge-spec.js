import storage from 'chrome-storage-wrapper';
import util from '../../../src/public/util';
import main from '../../../src/background-scripts/badge';

describe( '后台网页会在这些情况下改变图标的 off 状态' , ()=> {
  let onUpdatedCb , onActivatedCb , onStorageChangeCb;

  beforeEach( ()=> {
    spyOn( chrome.tabs.onUpdated , 'addListener' ).and.callFake( cb => onUpdatedCb = cb );
    spyOn( chrome.tabs.onActivated , 'addListener' ).and.callFake( cb => onActivatedCb = cb );
    spyOn( storage , 'addChangeListener' ).and.callFake( cb => onStorageChangeCb = cb );
    spyOn( chrome.browserAction , 'setBadgeText' );
    spyOn( util , 'getTabLocation' ).and.callFake( ()=> undefined );
    main();
  } );

  describe( '当有标签页更新网址时' , ()=> {

    it( '若此标签页不是选中的标签页则不更新图标' , done => {
      onUpdatedCb( 0 , {} , { id : 0 , active : false } );
      setTimeout( ()=> {
        expect( util.getTabLocation ).not.toHaveBeenCalled();
        expect( chrome.browserAction.setBadgeText ).not.toHaveBeenCalled();
        done();
      } , 0 );
    } );

    it( '若此标签页是选中的标签页则更新图标' , done => {
      onUpdatedCb( 0 , {} , { id : 0 , active : true } );
      setTimeout( ()=> {
        expect( util.getTabLocation ).toHaveBeenCalledWith( 0 );
        expect( chrome.browserAction.setBadgeText ).toHaveBeenCalledWith( { text : '' } );
        done();
      } , 0 );
    } );
  } );

  it( '当切换当前标签页时' , done => {
    onActivatedCb( {
      tabId : 100
    } );
    setTimeout( ()=> {
      expect( util.getTabLocation ).toHaveBeenCalledWith( 100 );
      expect( chrome.browserAction.setBadgeText ).toHaveBeenCalledWith( { text : '' } );
      done();
    } , 0 );
  } );

  it( '当 storage 里的禁用域名列表变更时' , done => {
    onStorageChangeCb( {
      excludeDomains : []
    } );
    setTimeout( ()=> {
      expect( util.getTabLocation ).toHaveBeenCalledWith( undefined );
      expect( chrome.browserAction.setBadgeText ).toHaveBeenCalledWith( { text : '' } );
      done();
    } , 0 );
  } );
} );
