$.extend( $ , {
    createMenus : function () {
        var temp, menus = this.config.menus;
        for ( temp in menus ) {
            if ( menus.hasOwnProperty( temp ) ) {
                chrome.contextMenus.create( JSON.parse( JSON.stringify( menus[temp] ) ) );
            }
        }
        //创建完成后，再根据storage配置更新右键菜单
        chrome.storage.local.get( 'isSelection' , function ( items ) {
            chrome.contextMenus.update( 'select' , { checked : !!items['isSelection'] } );
        } );
        return this;
    }
} ).createMenus();
//创建右键菜单
//Object.keys( $.config.menus ).forEach( function ( v ) {
//以下过程会自动过滤掉函数，仅保留数组、字符串、数字等支持的格式
//    v = JSON.parse( JSON.stringify( $.config.menus[v] ) );
//    console.dir( JSON.parse( JSON.stringify( $.config.menus[v] ) ) );
//删除事件，事件统一在onClicked里面处理
//直接删除会导致原对象onclick也被删除，因为它们是同一个引用
//    delete v.onclick;
//    chrome.contextMenus.create( JSON.parse( JSON.stringify( $.config.menus[v] ) ) );
//} );
//右键菜单统一的事件处理器
chrome.contextMenus.onClicked.addListener( function ( info , tab ) {
    $.config.menus[info.menuItemId].onclick( info , tab );
} );
//storage change事件统一处理器
chrome.storage.onChanged.addListener( function ( changes ) {
//    console.dir( changes );
    if ( changes.isSelection ) {
        //统计划词切换的使用情况
        _gaq.push( ['_trackEvent', 'selection', 'context'] );
        chrome.tabs.query( {} , function ( tabs ) {
            tabs.forEach( function ( tab ) {
                chrome.tabs.sendMessage( tab.id , {'isSelection' : changes.isSelection.newValue} );
            } );
        } );
    }
} );
//无法获取内容脚本所在的标签页
//console.dir( chrome.extension.getViews() );