/**
 * 扩展程序的背景页，同样依赖于 com.js
 */

// 谷歌分析
var _gaq = _gaq || [];
_gaq.push( ['_setAccount', 'UA-43276752-1'] );
_gaq.push( ['_trackPageview'] );

(function ( $ ) {
    "use strict";
    var d = ["http://*/*", "https://*/*", "file:///*", "about:blank"],
        inherit = $.inherit,
        Menu = {

            // 右键菜单默认的click事件
            // 之所以不写成 onclick 是因为一个微妙的bug
            // 事件页面下，写 onclick 同时注册 chrome.onclick 后，这两个事件都会被执行
            onClick : function ( info , tab ) {

                //直接把整个info发过去，用于辨别 frame 的问题
                chrome.tabs.sendMessage( tab.id , info );
            }
        },
        menus = {

            // 有道翻译
            yd : inherit( Menu , {
                id : 'yd' ,
                title : '用 有道 翻译“%s”' ,
                contexts : ['selection'] ,
                documentUrlPatterns : d
            } ) ,

            // 百度翻译
            bd : inherit( Menu , {
                id : 'bd' ,
                title : '用 百度 翻译“%s”' ,
                contexts : ['selection'] ,
                documentUrlPatterns : d
            } ) ,

            // 有道网页翻译
            ydw : inherit( Menu , {
                id : 'ydw' ,
                title : '翻译网页' ,
                contexts : ['all'] ,
                documentUrlPatterns : d
            } ) ,

            // 分隔符1
            s1 : {
                type : 'separator' ,
                id : 's1' ,
                contexts : ['all'] ,
                documentUrlPatterns : d
            } ,

            // 划词翻译开关
            select : inherit( Menu , {
                type : 'checkbox' ,
                id : 'select' ,
                title : '划词翻译' ,
                contexts : ['all'] ,
                documentUrlPatterns : d
            } ) ,

            // 捐赠作者
            donate : {
                id : 'donate' ,
                title : '支持作者' ,
                contexts : ['all'] ,
                documentUrlPatterns : d
            }
        },

        key,
        create = chrome.contextMenus.create;

    // 创建右键菜单
    for ( key in menus ) {
        create( menus[key] );
    }

    // 根据设置项更新右键菜单
    $.load( 'SELECTION' , function ( items ) {
        if ( items.SELECTION !== undefined ) {
            chrome.contextMenus.update( 'select' , {
                checked : items.SELECTION
            } );
        }
    } );

    //覆盖划词的 onClick 事件
    menus.select.onClick = function ( info ) {
        chrome.storage.local.set( {'SELECTION' : info.checked} );
    };

    //覆盖捐赠的 onClick 事件，在没有把英语做出来之前一律支付宝吧
    menus.donate.onClick = function () {

        //        if ( $.zh ) {
        chrome.tabs.create( { url : "https://me.alipay.com/lmk123" } );
        //        } else {
        //            chrome.tabs.create( { url : "http://lmk123.duapp.com/paypal.html" } );
        //        }
    };

    //右键菜单点击事件
    chrome.contextMenus.onClicked.addListener( function ( info , tab ) {

        // 跟踪右键菜单使用情况
        _gaq.push( ['_trackEvent' , 'MenusClick', info.menuItemId] );
        menus[ info.menuItemId ].onClick( info , tab );
    } );

    //storage change事件统一处理器
    chrome.storage.onChanged.addListener( function ( changes ) {
        var temp;

        // 划词翻译开关
        if ( changes.SELECTION ) {
            temp = changes.SELECTION.newValue;

            // 手动更新下菜单状态，防止划词翻译勾选状态不变化
            chrome.contextMenus.update( 'select' , {
                checked : temp
            } );

            // 通知每个页面
            chrome.tabs.query( {} , function ( tabs ) {
                tabs.forEach( function ( tab ) {
                    chrome.tabs.sendMessage( tab.id , { 'SELECTION' : temp } );
                } );
            } );
        }
    } );

    // 接收从内容脚本发送过来的统计消息
    chrome.runtime.onMessage.addListener( function ( ga ) {

        // 跟踪api使用情况
        _gaq.push( ['_trackEvent' , 'ApiUsed', ga] );
    } );

    // 将划词翻译开关默认打开
    chrome.runtime.onInstalled.addListener( function ( details ) {
        var reason = details.reason;
        if ( 'install' === reason || ('update' === reason && '4.0.6' === details.string) ) {
            chrome.storage.local.set( {'SELECTION' : true} );
        }
    } );

}( $ ));
