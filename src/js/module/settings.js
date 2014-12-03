define( [ '../lib/L' ] , function ( L ) {
    "use strict";

    var ls = chrome.storage.local , settings;

    settings = {

        /**
         * 读取或者设置值，这个方法是异步的
         * @param {String|Array|{}} key
         * @param {Object|Function=} value
         * @param {Function=} cb
         * @returns {settings}
         */
        option : function ( key , value , cb ) {
            var data , action , firstType = typeof key , secondType = typeof value;

            // 第一种情况 option( 'key' , function(){}) 或者 option( [ 'key1' , 'key2' ] , function(){} )
            if ( null === key || ('string' === firstType && 'function' === secondType) || Array.isArray( key ) ) {
                action = 'get';
                data = key;
                cb = value;

                // 第二种情况 option( 'key' , 'value' , function(){})
            } else if ( 'string' === firstType && 'function' !== secondType ) {
                action = 'set';
                data = {};
                data[ key ] = value;
            } else { // 第三种情况 option( { key:'value' } , function(){} )
                action = 'set';
                data = key;
                cb = value;
            }

            ls[ action ]( data , cb );
            return this;
        } ,

        /**
         * 还原默认设置
         * @returns {settings}
         */
        restore : function () {

            // 默认设置，升级到5.0的时候需要
            ls.set( {
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
            return this;
        } ,

        /**
         * 更新模板、闹钟
         * @returns {settings}
         */
        updateTemplate : function () {

            // 加载默认模板
            L.ajax( {
                url : 'default/selection.dot?' + Date.now() ,
                load : function ( dot ) {
                    ls.set( {
                        template : dot
                    } );
                }
            } );
            return this;
        }
    };

    return Object.freeze( settings );
} );
