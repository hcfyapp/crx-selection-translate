import main from '../../../src/background-scripts/commands';

// todo 测试待更新
xdescribe( '后台在接收到快捷键命令时' , ()=> {
  let onCommandsCb , queryTabCb;
  beforeEach( ()=> {
    spyOn( chrome.commands.onCommand , 'addListener' ).and.callFake( cb => onCommandsCb = cb );
    spyOn( chrome.tabs , 'query' ).and.callFake( ( options , cb )=> queryTabCb = cb );
    main();
  } );

  it( '如果是翻译命令,则通知选中标签页的内容脚本翻译' , ()=> {
    onCommandsCb( 'translate' );
    expect( chrome.tabs.query ).toHaveBeenCalledWith( { active : true } , queryTabCb );
    spyOn( chrome.tabs , 'sendMessage' );
    queryTabCb( [ { id : 0 } ] );
    expect( chrome.tabs.sendMessage ).toHaveBeenCalledWith( 0 , { action : 'translate' , data : null } );
  } );
} );
