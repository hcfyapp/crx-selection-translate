define( [ './settings' ] , function ( settings ) {
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
            }
        };

    // 读取设置
    settings.option( 'enable' , function ( i ) {
        baObj.changeTo( i.enable );
    } );

    ba.onClicked.addListener( function () {

        // 改变设置
        settings.option( 'enable' , function ( i ) {

            settings.option( 'enable' , !i.enable );
            //baObj.changeTo( !i.enable );
        } );
    } );

    chrome.storage.onChanged.addListener( function ( changes ) {

        if ( changes.hasOwnProperty( 'enable' ) ) {
            baObj.changeTo( changes.enable.newValue );
        }
    } );

    return Object.freeze( baObj );
} );
