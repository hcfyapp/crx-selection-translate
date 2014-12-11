// 页面内跳转
( function () {
    'use strict';
    var linkTo = function () {
        var dom = document ,
            dom_hash = dom.querySelector( 'a[href="' + location.hash + '"]' ) ,
            last;
        if ( dom_hash ) {
            last = dom.querySelector( 'nav li a.on' );
            if ( last ) {
                last.classList.remove( 'on' );
            }
            dom_hash.classList.add( 'on' );
        } else {
            dom.querySelector( 'a[href="#settings"]' ).click();
        }
    };

    window.addEventListener( 'hashchange' , linkTo );
    linkTo();
}() );

// 设置修改时自动保存
require( [ 'js/lib/jquery' , 'js/module/settings' , 'js/module/languages' ] , function ( $ , sts , l ) {
    'use strict';
    var dom = document ,
        keys = [];

    $( '[name]' ).each( function () {
        keys.push( this.name );
    } );

    // 先读取设置显示在页面上
    sts.option( keys , function ( i ) {
        $.each( i , function ( k , v ) {
            var n = dom.querySelector( '[name="' + k + '"]' );
            if ( n ) {
                n[ 'checkbox' === n.type ? 'checked' : 'value' ] = v;
            }
        } );

        dom.getElementById( 'defaultTo' ).textContent = ( l.languages[ i.defaultTo ] || '自动选择_zdxz' ).split( '_' )[ 0 ];
    } );

    $( dom ).on( 'change submit' , function ( e ) {
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

// 目标语言设置
require( [ 'js/module/settings' , 'js/module/languages' ] , function ( sts , l ) {
    'use strict';

    var dom = document ,
        lang = dom.getElementById( 'langs' ) ,
        dt = dom.getElementById( 'defaultTo' );

    l.attach( lang , function ( choosed ) {
        dt.textContent = choosed.textContent;
        lang.value = '';
        lang.focus();
        sts.option( 'defaultTo' , choosed.dataset.value );
    } );
} );
