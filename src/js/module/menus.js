define( [ './storage' ] , function ( storage ) {
    var cc = chrome.contextMenus ,
        created = false;

    storage.onChange( function ( changes ) {
        if ( changes.showMenu ) {
            createMenus();
        } else {
            removeAll();
        }
    } , { showMenu : null } );

    storage.get( 'showMenu' ).done( function ( items ) {
        if ( items.showMenu ) {
            createMenus();
        }
    } );

    cc.onClicked.addListener( function () {
        sendCommand( 'translate' );
    } );

    function createMenus() {
        if ( !created ) {
            created = true;
            cc.create( {
                id : 'menu-translate' ,
                title : '翻译“%s”' ,
                contexts : [ 'selection' ]
            } );
        }
    }

    function removeAll() {
        created = false;
        cc.removeAll();
    }

    function sendCommand( command ) {
        chrome.tabs.query( { active : true } , function ( tabs ) {
            chrome.tabs.sendMessage( tabs[ 0 ].id , {
                from : 'background' ,
                to : 'content' ,
                action : command ,
                data : null
            } );
        } );
    }

} );
