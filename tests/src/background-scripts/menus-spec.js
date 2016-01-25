import {Client} from 'connect.io';
import * as main from '../../../src/background-scripts/menus';

// todo 在 chrome-env 中添加下面两个方法
chrome.contextMenus.create = chrome.contextMenus.removeAll = ()=> {};
describe( '右键菜单' , ()=> {

  describe( '在设置里的 showMenu 值变化时' , ()=> {
    beforeEach( ()=> {
      spyOn( chrome.contextMenus , 'create' );
      spyOn( chrome.contextMenus , 'removeAll' );
    } );

    it( '如果启用了右键菜单则会创建菜单' , ()=> {
      main.onChromeLocalStorageChanged( { showMenu : true } );
      expect( chrome.contextMenus.create ).toHaveBeenCalled();

      // 再次调用时不会重复创建
      main.onChromeLocalStorageChanged( { showMenu : true } );
      expect( chrome.contextMenus.create.calls.count() ).toBe(1);
    } );

    it( '如果禁用了右键菜单则会删除所有菜单' , ()=> {
      main.onChromeLocalStorageChanged( { showMenu : false } );
      expect( chrome.contextMenus.removeAll ).toHaveBeenCalled();
    } );
  } );

  it( '点击菜单项时会发送消息给内容脚本' , ()=> {
    spyOn( Client.prototype , 'send' );
    // todo chrome-env 应该有自动调用回调的能力
    spyOn( chrome.tabs , 'query' ).and.callFake( ( x , cb )=> cb( [ { id : 88 } ] ) );
    main.onContextMenusClicked();
  } );
} );
