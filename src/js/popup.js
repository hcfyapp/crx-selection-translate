require( [ 'js/lib/jquery' ] , function ( $ ) {
    /**
     * 保存页面上所有有 id 属性的节点
     */
    var uis = (function () {
        var u = {} ,
            ids = document.querySelectorAll( '[id]' );
        [].forEach.call( ids , function ( n ) {
            u[ n.id ] = $( n );
        } );
        return u;
    }());

    // 需要等 popup 的滑动效果结束后才能输入焦点
    setTimeout( function () {
        uis.translateText.trigger( 'focus' );
    } , 200 );

    // 语言选择下拉框
    require( [ 'js/module/languages' ] , function ( langs ) {
        langs.attach( '#from,#to' , function ( choosed , targetInput ) {
            targetInput.value = choosed.textContent;
            $.data( targetInput , 'lang' , choosed.dataset.value );
        } );
    } );

    // 显示翻译结果
    require( [ 'js/module/apis' , 'js/lib/doT' , 'js/module/clipboard' ] , function ( apis , dot , clipboard ) {

        /**
         * @params {object} it
         * @types {function}
         * @return {string}
         */
        var tplFunc = dot.template( uis.template.html() ) ,
        textInBoard = clipboard.read();

        uis.translateForm.on( 'submit' , function ( e ) {
            e.preventDefault();
            translate();
        } );

        if ( textInBoard ) {
            uis.translateText.val( textInBoard );
            translate();
        }

        uis.translateText.on( 'keydown' , function ( e ) {
            if ( e.ctrlKey && 13 === e.keyCode ) {
                translate();
            }
        } );

        function translate() {
            var queryObj = {
                text : uis.translateText.val() ,
                apiId : uis.chooseApi.val() ,
                from : uis.from.data( 'lang' ) || '' ,
                to : uis.to.data( 'lang' ) || ''
            };
            uis.translate.text( '翻译中…' ).prop( 'disabled' , true );
            apis.ts( queryObj , function ( resultObj ) {
                uis.result.html( tplFunc( resultObj ) );
                uis.translate.text( '翻译' ).prop( 'disabled' , false );
            } );
        }
    } );

    // 切换开关
    require( [ 'js/module/storage' ] , function ( storage ) {
        var $switch = $( '#switch' );

        storage.get( 'enable' ).done( function ( i ) {
            if ( i.enable ) {
                $switch.removeClass( 'now-is-close' );
            } else {
                $switch.addClass( 'now-is-close' );
            }
        } );

        $switch.on( 'click' , function () {
            storage.get( 'enable' ).done( function ( i ) {
                storage.set( 'enable' , !i.enable );
                if ( !i.enable ) {
                    $switch.removeClass( 'now-is-close' );
                } else {
                    $switch.addClass( 'now-is-close' );
                }
            } );
        } );
    } );

    // 复制与朗读按钮
    require( [ 'js/module/clipboard' , 'js/module/apis' ] , function ( clipboard , apis ) {
        $( document ).on( 'click' , '[data-action]' , function () {
            var $action = $( this ) ,
                text = $action.parent().prev( '.text' ).text() ,
                action = $action.data( 'action' );

            switch ( action ) {
                case 'copy':
                    clipboard.write( text );
                    $action.text( '已复制' );
                    setTimeout( function () {
                        $action.text( '复制' );
                    } , 3000 );
                    break;
                case 'read':
                    apis.speak( {
                        text : text ,
                        apiId : uis.chooseApi.val() ,
                        from : uis.from.data( 'lang' ) || ''
                    } );
                    break;
            }
        } );

        uis.read.on( 'click' , function () {
            var v = uis.translateText.val().trim();
            if ( v ) {
                apis.speak( {
                    text : v ,
                    apiId : uis.chooseApi.val() ,
                    from : uis.from.data( 'lang' ) || ''
                } );
            } else {
                uis.translate.trigger( 'click' );
            }
        } );
    } );

} );
