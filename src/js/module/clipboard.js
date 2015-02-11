define( function () {
    "use strict";
    var dom_input = document.createElement( 'input' );
    dom_input.style.position = 'absolute';
    dom_input.style.top = '-99999px';
    document.body.appendChild( dom_input );

    return Object.freeze( {

        /**
         * 将文本复制进剪切板
         * @param text
         * @returns {*}
         */
        write : function ( text ) {
            dom_input.value = text;
            dom_input.select();
            document.execCommand( 'copy' );
            return this;
        } ,

        /**
         * 返回剪切板中的文本内容
         * @returns {*}
         */
        read : function () {
            dom_input.value = '';
            dom_input.focus();
            document.execCommand( 'paste' );
            return dom_input.value;
        }
    } );
} );
