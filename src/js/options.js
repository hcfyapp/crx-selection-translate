(function ( w , d ) {
    "use strict";
    var options = ['SELECTION', 'CTRL_NEEDED', 'QUERY_API'],
        uis = {
            d_next : d.querySelector( 'section:first-child div' )
        };

    // 恢复设置页状态
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
        }

    } );

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
}( window , document ));
