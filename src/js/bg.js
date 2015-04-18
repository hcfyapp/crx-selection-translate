// 接收查询请求
require( [ 'js/module/apis' , 'js/module/clipboard' ] , function ( api , clipboard ) {
    "use strict";
    chrome.runtime.onMessage.addListener( function ( msgObj , sender , response ) {
        var data = msgObj.data;
        switch ( msgObj.action ) {
            case 'translate':
                api.ts( data , function ( resultObj ) {
                    response( resultObj );
                } );
                return true; // 发送回执需要在事件监听里返回 true

            case 'play': // 阅读
                api.speak( data );
                break;

            case 'copy':
                clipboard.write( data );
                break;

            case 'createTab':
                chrome.tabs.create( data );
                break;

            // 没有其它类型的 action 了，所以无需default
        }
    } );
} );

// 安装扩展或者从4.x升级时更新默认设置
chrome.runtime.onInstalled.addListener( function ( d ) {
    "use strict";
    var r         = d.reason ,
        isInstall = 'install' === r;// ,
    //isUpdate  = 'update' === r;

    //if ( isInstall || ( isUpdate && 5 > Number( d.previousVersion.slice( 0 , 3 ) ) ) ) {
    //    require( [ 'js/module/storage' ] , function ( settings ) {
    //        settings.restore();
    //    } );
    //}

    // 安装时打开设置页
    if ( isInstall ) {
        chrome.tabs.create( { url : '/options.html' } );
    }

    require( [ 'js/module/storage' ] , function ( settings ) {
        settings.restore();
        settings.updateTemplate();
    } );

} );

// 浏览器按钮只是用来显示开关状态的
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

require( [ 'js/module/menus' ] );

// 添加github信息
console.log( 'Hi ，你是开发者吗？欢迎你贡献代码：\nhttps://github.com/lmk123/crx-selection-translate' );
