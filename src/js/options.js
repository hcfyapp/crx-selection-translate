require( [ 'js/lib/L' ] , function ( L ) {
    'use strict';
    function c() {
        var dom_hash = L( 'a[href="' + location.hash + '"]' ) , last;
        if ( dom_hash ) {
            last = L( 'nav li a.on' );
            if ( last ) {
                last.classList.remove( 'on' );
            }
            dom_hash.classList.add( 'on' );
        } else {
            dom_hash = L( 'a[href="#settings"]' );
            dom_hash.click();
        }
    }

    window.addEventListener( 'hashchange' , c );
    c();
} );

require( [ 'js/lib/L' , 'js/module/settings' , 'js/module/languages' ] , function ( L , sts , l ) {
    'use strict';
    var keys = [];
    L.forEach( L( '[name]' , true ) , function ( node ) {
        keys.push( node.name );
    } );

    // 读取设置
    sts.option( keys , function ( i ) {
        L.forIn( i , function ( key ) {
            var n = L( '[name="' + key + '"]' );
            if ( n ) {
                n[ 'checkbox' === n.type ? 'checked' : 'value' ] = i[ key ];
            }
        } );

        L( '#defaultTo' ).textContent = (l.languages[ i.defaultTo ] || '自动选择_zdxz').split( '_' )[ 0 ];
    } );

    L.on( document , 'change,submit' , function ( e ) {
        var t , n;
        if ( 'submit' === e.type ) {
            e.preventDefault();
        } else {
            t = e.target;
            n = t.name;
            if ( n ) {
                sts.option( n , 'checkbox' === t.type ? t.checked : t.value );
            }
        }
    } );

} );

require( [ 'js/lib/L' , 'js/module/settings' , 'js/module/languages' ] , function ( L , sts , l ) {
    'use strict';
    var dom_langs = L( '#langs' );
    l.attach( dom_langs , function ( chooseItem ) {
        var des = chooseItem.textContent ,
            i18n = chooseItem.dataset.value;
        L( '#defaultTo' ).textContent = des;
        dom_langs.value = '';
        dom_langs.focus();
        sts.option( 'defaultTo' , i18n );
    } );
} );
