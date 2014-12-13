define( [ './storage' ] , function ( settings ) {
    "use strict";
    var ba = chrome.browserAction ,

        baObj = {
            changeTo : function ( isEnable ) {
                if ( isEnable ) {
                    ba.setBadgeText( { text : '' } );
                    ba.setTitle( { title : '划词翻译已开启' } );
                } else {
                    ba.setBadgeText( { text : 'off' } );
                    ba.setTitle( { title : '划词翻译已关闭' } );
                }
                return this;
            }
        };

    // 读取设置
    settings.get( 'enable' ).done( function ( i ) {
        baObj.changeTo( i.enable );
    } );

    ba.onClicked.addListener( function () {

        // 改变设置
        settings.get( 'enable' ).done( function ( i ) {
            settings.set( 'enable' , !i.enable ); // 这里设置新值之后，下面的回调函数会自动改变按钮状态
        } );
    } );

    settings.onChange( function ( changes ) {
            baObj.changeTo( changes.enable );
    } , { enable : null } );

    return Object.freeze( baObj );
} );
