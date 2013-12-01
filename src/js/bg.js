(function () {
    'use strict';
    var Menus = $.M.create(), menus = [], d = [
        "http://*/*", "https://*/*", "file:///*", "about:blank"
    ];

    //扩展实例属性
    $.extend( Menus.fn , {

        //右键菜单默认的click事件
        onclick : function ( info , tab ) {

            //直接把整个info发过去，用于辨别 frame 的问题
            chrome.tabs.sendMessage( tab.id , info );
        }
    } );

    //有道翻译右键菜单
    menus[0] = Menus.init( {
        id : 'yd' ,
        title : '用 有道 翻译“%s”' ,
        contexts : ['selection'] ,
        documentUrlPatterns : d
    } );

    //百度翻译右键菜单
    menus[1] = Menus.init( {
        id : 'bd' ,
        title : '用 百度 翻译“%s”' ,
        contexts : ['selection'] ,
        documentUrlPatterns : d
    } );

    //有道网页翻译右键菜单
    menus[2] = Menus.init( {
        id : 'ydw' ,
        title : '翻译网页' ,
        contexts : ['all'] ,
        documentUrlPatterns : d
    } );

    //第一个分隔符
    menus[3] = Menus.init( {
        type : 'separator' ,
        id : 's1' ,
        contexts : ['all'] ,
        documentUrlPatterns : d
    } );

    //划词翻译开关
    menus[4] = Menus.init( {
        type : 'checkbox' ,
        id : 'select' ,
        title : '划词翻译' ,
        contexts : ['all'] ,
        documentUrlPatterns : d
    } );

    //支持作者
    menus[5] = Menus.init( {
        id : 'donate' ,
        title : '支持作者' ,
        contexts : ['all'] ,
        documentUrlPatterns : d
    } );
    
    //创建右键菜单
    menus.forEach( function ( v ) {

        //卧槽。。如果不使用 $.extend 的话，会使onclick执行两次。。
        chrome.contextMenus.create( $.extend( {} , v ) );

        //同时使用它们的id创建一个相同的引用
        menus[v.id] = v;
    } );

    //覆盖划词的 onclick 事件
    menus.select.onclick = function ( info ) {
        chrome.storage.local.set( {'isSelection' : info.checked} );
    };

    //覆盖捐赠的 onclick 事件
    menus.donate.onclick = function () {
        chrome.tabs.create( { url : "https://me.alipay.com/lmk123" } );
    };

    //右键菜单点击事件
    chrome.contextMenus.onClicked.addListener( function ( info , tab ) {
        menus[info.menuItemId].onclick( info , tab );
    } );

    //storage change事件统一处理器
    chrome.storage.onChanged.addListener( function ( changes ) {

        if ( changes.isSelection ) {

            chrome.tabs.query( {} , function ( tabs ) {
                tabs.forEach( function ( tab ) {
                    chrome.tabs.sendMessage( tab.id , { 'isSelection' : changes.isSelection.newValue } );
                } );
            } );
        }
    } );

}.bind( $ ))();
