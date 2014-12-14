(function ( root , factory ) {

    if ( 'function' === typeof define && define.amd ) {
        define( [ '../lib/jquery' ] , factory );
    } else {
        root.storage = factory( jQuery );
    }

}( this , function ( $ ) {
    var ls = chrome.storage.local ,
        changeCallbacks = $.Callbacks( 'unique' ) ,
        storage = {

            /**
             * 封装一层获取方法
             * @param keys
             * @returns {Deferred} jQuery Promise
             */
            get : function ( keys ) {
                var def = $.Deferred();
                ls.get( keys , function ( items ) {
                    var err = chrome.runtime.lastError;
                    if ( err ) {
                        def.reject( err );
                        console.error( err );
                    } else {
                        def.resolve( items );
                    }
                } );
                return def.promise();
            } ,

            /**
             * 封装一层设置方法
             * 不同的是多了一种设置方式 .set( 'key' , 'value' );
             * @param key
             * @param {=} value
             * @returns {*}
             */
            set : function ( key , value ) {
                var def = $.Deferred() , obj;

                if ( 2 === arguments.length ) {
                    obj = {};
                    obj[ key ] = value;
                } else {
                    obj = key;
                }

                ls.set( obj , function () {
                    var err = chrome.runtime.lastError;
                    if ( err ) {
                        def.reject( err );
                        console.error( err );
                    } else {
                        def.resolve();
                    }
                } );
                return def.promise();
            } ,

            /**
             * 注册 change 事件
             *   注意，回调里面的第一个参数仅包含最新值，
             *   而不是一个有newValue和oldValue的对象
             *   见下面的事件监听函数
             * @param {function} listener
             * @param {object=} caseOf 关心哪些设置。
             *            如果changes里面没有任何一个在 caseOf 对象里列出的 key ，就不会触发事件
             * @returns {storage}
             */
            onChange : function ( listener , caseOf ) {
                var cb;
                if ( caseOf ) {
                    cb = function ( changes , area ) {
                        var myChanges = {};

                        $.each( changes , function ( key , value ) {
                            if ( caseOf.hasOwnProperty( key ) ) {
                                myChanges[ key ] = value;
                            }
                        } );

                        if ( !$.isEmptyObject( myChanges ) ) {
                            listener( myChanges , area );
                        }
                    };
                } else {
                    cb = listener;
                }
                changeCallbacks.add( cb );
                return this;
            } ,

            /**
             * 还原默认设置
             * @returns {Deferred}
             */
            restore : function () {

                // 默认设置，升级到5.0的时候需要
                return storage.set( {
                    enable : true , // 是否开启划词翻译
                    autoPlay : false , // 翻译之后是否自动阅读单词或短语
                    ignoreChinese : false , // 是否忽略中文
                    ignoreNumLike : true , // 忽略类纯数字组合，即由 数字、横线、点、括号、反括号 组成的
                    showTranslateButton : true , // 划词后是否显示翻译按钮，点击之后再翻译
                    needCtrl : false , // 是否需要配合 Ctrl 键使用
                    waitText : "正在翻译，请稍候……" , // 翻译过程中的文本
                    //showMenu : true , // 是否显示右键菜单
                    defaultApi : 'youdao' , // 默认的翻译引擎
                    defaultSpeak : 'google' ,
                    defaultTo : 'auto' // 默认翻译为
                } );
            } ,

            /**
             * 更新模板
             * @param {function=} cb
             * @returns {storage}
             */
            updateTemplate : function ( cb ) {

                // 加载默认模板
                $.ajax( '/theme/selection.dot?' + Date.now() )
                    .done( function ( dot ) {
                        ls.set( { template : dot } , cb );
                    } );
                return this;
            } ,

            /**
             * 使用中的存储对象，便于直接操作
             */
            storage : ls
        };

    chrome.storage.onChanged.addListener( function ( changes , area ) {
        var customChanges = {};
        $.each( changes , function ( key , value ) { // 多数情况下都只关心新值
            customChanges[ key ] = value.newValue;
        } );

        // 防止对象在回调里被修改，因为这会导致其它回调也收到修改后的对象
        changeCallbacks.fire( Object.freeze( customChanges ) , area );
    } );

    return Object.freeze( storage );
} ));
