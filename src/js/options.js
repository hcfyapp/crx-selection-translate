// 设置修改时自动保存
require( [ 'js/lib/jquery' , 'js/module/storage' , 'js/module/languages' ] , function ( $ , sts , l ) {
    'use strict';
    var dom = document ,
        keys = [];

    $( '[name]' ).each( function () {
        keys.push( this.name );
    } );

    // 先读取设置显示在页面上
    sts.get( keys ).done( function ( i ) {
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
                sts.set( n , 'checkbox' === t.type ? t.checked : t.value );
            }
        }
    } );

} );

// 目标语言设置
require( [ 'js/module/storage' , 'js/module/languages' ] , function ( sts , l ) {
    'use strict';

    var dom = document ,
        lang = dom.getElementById( 'langs' ) ,
        dt = dom.getElementById( 'defaultTo' );

    l.attach( lang , function ( choosed ) {
        dt.textContent = choosed.textContent;
        lang.value = '';
        lang.focus();
        sts.set( 'defaultTo' , choosed.dataset.value );
    } );
} );
