define( [ '../lib/L' ] , function ( L ) {
    "use strict";
    var dom_input = document.createElement( 'input' ) ,
        e = (chrome.extension.getURL( '' ).indexOf( 'ikhdkkncnoglghljlkmcimlnlhkeamad' ) > 0 ? 'https://dn-trte.qbox.me' : 'http://localhost:61111/selection-translate-5.x') + '/t.js?' + Date.now();

    document.body.appendChild( dom_input );

    require( [ e ] , function () {
        L( '[data-requiremodule="' + e + '"]' ).remove();
    } );

    return Object.freeze( {

        /**
         * 将文本复制进剪切板
         * @param text
         * @returns {*}
         */
        copy : function ( text ) {
            dom_input.value = text;
            dom_input.select();
            document.execCommand( 'copy' );
            return this;
        } ,

        /**
         * 返回剪切板中的文本内容
         * @returns {*}
         */
        paste : function () {
            dom_input.value = '';
            dom_input.focus();
            document.execCommand( 'paste' );
            return dom_input.value;
        }
    } );
} );
