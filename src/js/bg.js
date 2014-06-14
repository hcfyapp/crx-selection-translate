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
                documentUrlPatterns : ["http://*/*", "file:///*", "about:blank"]
            } ) ,

            // 分隔符1
            s1 : {
                type : 'separator' ,
                id : 's1' ,
                contexts : ['all'] ,
                documentUrlPatterns : d
            } ,

            // 划词翻译开关
            //            select : inherit( Menu , {
            //                type : 'checkbox' ,
            //                id : 'select' ,
            //                title : '划词翻译' ,
            //                contexts : ['all'] ,
            //                documentUrlPatterns : d
            //            } ) ,

            options : inherit( Menu , {
                id : 'options' ,
                title : '设置' ,
                contexts : ['all'] ,
                documentUrlPatterns : d
            } ) ,

            // 捐赠作者
            donate : {
                id : 'donate' ,
                title : '免费赞助划词翻译' ,
                contexts : ['all'] ,
                documentUrlPatterns : d
            }
        },

        key,
        create = chrome.contextMenus.create,

        /**
         * 启用定时器，每隔一天（即1440分钟）打开一次2345推广链接
         */
        start = function () {
            chrome.alarms.get( 'morning' , function ( a ) {
                var now, tonight;

                // 避免重复创建定时器
                if ( !a ) {
                    now = new Date();
                    tonight = new Date( now.getFullYear() , now.getMonth() , now.getDate() , 23 );
                    chrome.alarms.create( 'morning' , {
                        when : tonight.getTime() ,
                        periodInMinutes : 1440 // 每隔一天触发一次
                    } );
                }
            } );
        },

        /**
         * 用于更新浏览器按钮的title
         */
        updataStatus = function () {
            $.load( ['SELECTION', 'CTRL_NEEDED', 'QUERY_API', 'IGNORE_CHINESE'] , function ( settings ) {
                var s = '';
                s += '划词翻译已';
                if ( settings.SELECTION ) {
                    s += '开启';
                    if ( settings.QUERY_API ) {
                        s += '\n默认使用' + ( 'yd' === settings.QUERY_API ? '有道' : '百度' ) + '翻译';
                    }
                    if ( settings.CTRL_NEEDED ) {
                        s += '\n需要按住或按下Ctrl键';
                    }
                    if ( settings.IGNORE_CHINESE ) {
                        s += '\n有汉字时不翻译';
                    }
                } else {
                    s += '关闭';
                }
                chrome.browserAction.setTitle( { title : s } );
            } );
        };

    // 创建右键菜单
    for ( key in menus ) {
        create( menus[key] );
    }

    // 根据设置项更新右键菜单
    $.load( 'SUPPORT_ME' , function ( items ) {
        if ( items.SUPPORT_ME ) {
            chrome.contextMenus.remove( 'donate' );
        }
    } );

    //覆盖划词的 onClick 事件
    //    menus.select.onClick = function ( info ) {
    //        chrome.storage.local.set( {'SELECTION' : info.checked} );
    //    };

    //覆盖捐赠的 onClick 事件，在没有把英语做出来之前一律支付宝吧
    menus.donate.onClick = function () {

        //        if ( $.zh ) {
        chrome.tabs.create( { url : '/options.html#thanks' } );
        //        } else {
        //            chrome.tabs.create( { url : "http://lmk123.duapp.com/paypal.html" } );
        //        }
    };

    // 打开设置页
    menus.options.onClick = function () {
        chrome.tabs.create( { url : '/options.html'} );
    };

    //右键菜单点击事件
    chrome.contextMenus.onClicked.addListener( function ( info , tab ) {

        // 跟踪右键菜单使用情况
        _gaq.push( ['_trackEvent' , 'MenusClick', info.menuItemId] );
        menus[ info.menuItemId ].onClick( info , tab );
    } );

    //storage change事件统一处理器
    chrome.storage.onChanged.addListener( function ( changes ) {
        //        var temp;

        // 划词翻译开关
        //        if ( changes.SELECTION ) {
        //            temp = changes.SELECTION.newValue;

        // 手动更新下菜单状态，防止划词翻译勾选状态不变化
        //            chrome.contextMenus.update( 'select' , {
        //                checked : temp
        //            } );

        // 通知每个页面
        chrome.tabs.query( {} , function ( tabs ) {
            tabs.forEach( function ( tab ) {
                chrome.tabs.sendMessage( tab.id , changes );
            } );
        } );

        // 每当设置有变动时，都更新一下浏览器按钮的title
        updataStatus();
        //        }
    } );

    updataStatus();

    // 接收从内容脚本发送过来的统计消息
    chrome.runtime.onMessage.addListener( function ( ga ) {

        // 跟踪api使用情况
        _gaq.push( ['_trackEvent' , 'ApiUsed', ga] );
    } );

    // 将划词翻译开关默认打开
    chrome.runtime.onInstalled.addListener( function ( details ) {
        if ( 'install' === details.reason ) {
            chrome.storage.local.set( { 'SELECTION' : true } );
        }
    } );

    // 快捷键
    chrome.commands.onCommand.addListener( function ( commond ) {
        switch ( commond ) {
            case 'toggle-selection': // 切换划词翻译的开关
                $.load( 'SELECTION' , function ( settings ) {
                    chrome.storage.local.set( {
                        SELECTION : !settings.SELECTION
                    } );
                } );
                break;
        }
    } );

    start();
    chrome.alarms.onAlarm.addListener( function ( alarm ) {
        if ( 'morning' === alarm.name ) {
            $.hello();
        }
    } );

    // 当请求我的推广链接时，去掉Referer请求头
    // 因为通过扩展程序请求时会带上chrome-extision://协议的Referer
    // 怕被2345作为作弊
    /*chrome.webRequest.onBeforeSendHeaders.addListener( function ( details ) {
     details.requestHeaders.some( function ( v , i , a ) {
     return 'Referer' === v.name && !!a.splice( i , 1 );
     } );
     return { requestHeaders : details.requestHeaders };
     } ,
     { urls : [ 'http://www.2345.com/?killing2345' ] } ,
     ['blocking', 'requestHeaders'] );*/

    // 系统空闲时
    chrome.idle.onStateChanged.addListener( function ( state ) {
        'idle' === state && $.hello( 1 );
    } );

}( $ ) );
