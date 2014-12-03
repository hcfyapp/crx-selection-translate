// 接收查询请求
require( [ 'js/module/apis' , 'js/module/clipboard' , 'js/module/ga' ] , function ( api , clipboard , ga ) {
    "use strict";
    chrome.runtime.onMessage.addListener( function ( msgObj , sender , response ) {
        var data = msgObj.data;
        switch ( msgObj.action ) {
            case 'translate':
                api.ts( data.apiId , data , function ( resultObj ) {
                    response( resultObj );
                } );
                return true; // 看了 chrome 对消息传递的源码实现才知道要返回 true 才能异步发送消息 extensions::messaging 126行

            case 'play': // 阅读
                api.speak( data.apiId , data.text , data.lang );
                break;

            case 'copy':
                clipboard.copy( data );
                break;

            case 'createTab':
                chrome.tabs.create( data );
                if ( data.url.indexOf( '.linktech.cn/' ) > 0 ) { // 记录广告点击
                    ga.track( 'ad_click' , decodeURIComponent( data.url.slice( data.url.lastIndexOf( '=' ) + 1 ) ) );
                }
                break;

            // 没有其它类型的 action 了，所以无需default
        }
    } );
} );

// 默认设置
chrome.runtime.onInstalled.addListener( function ( d ) {
    "use strict";
    var r = d.reason;
    if ( 'install' === r || ('update' === r && 5 > Number( d.previousVersion.slice( 0 , 3 ) )) ) {
        require( [ 'js/module/settings' ] , function ( settings ) {
            settings.restore();
        } );
    }

    // 安装时打开设置页
    if ( 'install' === r ) {
        chrome.tabs.create( { url : '/options.html' } );
    }

    require( [ 'js/module/settings' ] , function ( settings ) {
        settings.updateTemplate();
    } );

} );

//require( [ 'js/module/donate' ] );

// 浏览器按钮只是用来切换开关的
require( [ 'js/module/browserAction' ] );

chrome.commands.onCommand.addListener( function ( command ) {
    switch ( command ) {
        case 'translate':
            chrome.tabs.query( { active : true } , function ( tabs ) {
                chrome.tabs.sendMessage( tabs[ 0 ].id , {
                    from : 'background' ,
                    to : 'content' ,
                    action : 'translate' ,
                    data : null
                } );
            } );
            break;

        case 'web':
            chrome.tabs.query( { active : true } , function ( tabs ) {
                chrome.tabs.sendMessage( tabs[ 0 ].id , {
                    from : 'background' ,
                    to : 'content' ,
                    action : 'web' ,
                    data : null
                } );
            } );
            break;
    }
} );
