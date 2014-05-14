(function ( w , d ) {
    "use strict";
    var options = ['SELECTION', 'CTRL_NEEDED', 'QUERY_API', 'IGNORE_CHINESE'],
        uis = {
            d_next : d.querySelector( 'section:first-child div' )
        }, load = function () {

            chrome.storage.local.get( options , function ( items ) {
                options.forEach( function ( v ) {
                    var t = d.getElementById( v );

                    if ( t ) {
                        t.checked = items[v];
                    } else {

                        // 没有值或者值是数字的value，在查询时需要加上双引号
                        d.querySelector( '[name=' + v + '][value=' + ( items[v] || '""' ) + ']' ).checked = true;
                    }
                } );

                if ( items.SELECTION ) {
                    uis.d_next.classList.add( 'on' );
                }else{
                    uis.d_next.classList.remove( 'on' );
                }

            } );
        };

    load();

    d.addEventListener( 'change' , function ( e ) {
        var t = e.target,
            id = t.id || t.name,
            value,
            obj = {};

        switch ( id ) {

            // 下面两个都是复选框
            case 'SELECTION':
                uis.d_next.classList.toggle( 'on' );

            // 注意，下面是没有 break 的，这里使用了 case 穿越

            case 'CTRL_NEEDED':
            case 'IGNORE_CHINESE':
                value = t.checked;
                break;

            // 这个是 radio
            case 'QUERY_API':
                value = d.querySelector( '[name=QUERY_API]:checked' ).value;
                break;

            // 没有default
        }
        obj[id] = value;
        //        console.dir( obj );
        chrome.storage.local.set( obj );
    } );

    // 页面打开时，总是接收最新的设置
    chrome.runtime.onMessage.addListener( function () {
        load();
    } );
}( window , document ));
