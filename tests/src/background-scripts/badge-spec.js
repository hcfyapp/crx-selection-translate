import storage from 'chrome-storage-wrapper';
import * as util from '../../../src/public/util';
import main from '../../../src/background-scripts/badge';

xdescribe( '后台网页' , ()=> {
  let onUpdatedCb , onActivatedCb , onStorageChangeCb;

  beforeEach( ()=> {
    spyOn( chrome.tabs.onUpdated , 'addListener' ).and.callFake( cb => onUpdatedCb = cb );
    spyOn( chrome.tabs.onActivated , 'addListener' ).and.callFake( cb => onActivatedCb = cb );
    spyOn( storage , 'addChangeListener' ).and.callFake( cb => onStorageChangeCb = cb );
    spyOn( chrome.browserAction , 'setBadgeText' );
  } );

  describe( '会在这些情况下改变图标的 off 状态' , ()=> {
    beforeEach( ()=> {
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
          expect( chrome.browserAction.setBadgeText ).toHaveBeenCalledWith( { text : 'off' } );
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
        expect( chrome.browserAction.setBadgeText ).toHaveBeenCalledWith( { text : 'off' } );
        done();
      } , 0 );
    } );

    it( '当 storage 里的禁用域名列表变更时' , done => {
      onStorageChangeCb( {
        excludeDomains : []
      } );
      setTimeout( ()=> {
        expect( util.getTabLocation ).toHaveBeenCalledWith( undefined );
        expect( chrome.browserAction.setBadgeText ).toHaveBeenCalledWith( { text : 'off' } );
        done();
      } , 0 );
    } );
  } );

  describe( '会设置不同的图标状态' , ()=> {

    it( '当无法获取当前网页的 url 时会显示 off' , done => {
      spyOn( util , 'getTabLocation' ).and.callFake( ()=> undefined );
      main();
      onActivatedCb( { tabId : 300 } );
      setTimeout( ()=> {
        expect( util.getTabLocation ).toHaveBeenCalledWith( 300 );
        expect( chrome.browserAction.setBadgeText ).toHaveBeenCalledWith( { text : 'off' } );
        done();
      } , 0 );
    } );

    describe( '当能获取当前网页的 url 时' , ()=> {
      beforeEach( ()=> {
        spyOn( util , 'getTabLocation' ).and.returnValue( Promise.resolve( { host : location.host } ) );
        main();
      } );
      it( '若当前网址在禁用列表里则显示 off' , done => {
        onStorageChangeCb( {
          excludeDomains : [ location.host ]
        } );
        setTimeout( ()=> {
          expect( util.getTabLocation ).toHaveBeenCalledWith( undefined );
          expect( chrome.browserAction.setBadgeText ).toHaveBeenCalledWith( { text : 'off' } );
          done();
        } , 0 );
      } );

      it( '若当前网址不在禁用列表里则不显示' , done => {
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
  } );
} );
