define( [ '../../lib/jquery' , '../ga' ] , function ( $ , ga ) {
    "use strict";

    var config = {

        ERROR_NETWORK : '网络错误，请稍后重试' ,
        ERROR_RESPONSE : '服务器返回了错误的数据类型' ,

        linkToResult : 'http://cn.bing.com/dict/search?q={{query}}' ,
        ttsLink : false , // todo tts for bing
        method : 'POST' ,
        url : 'http://dict.bing.com.cn/io.aspx' ,
        data : {
            t : 'dict' ,
            ut : 'default' ,
            ulang : 'ZH-CN' ,
            tlang : 'EN-US' ,
            q : ''
        } ,

        /**
         * transform raw data from bing
         * @param result
         * @param query
         * @returns {{}}
         */
        result2obj : function ( result , query ) {
            var obj = {};

            obj.to = query.to || 'auto';

            obj.from = result.ROOT.$LANG;
            obj.response = result;
            obj.linkToResult = config.linkToResult.replace( '{{query}}' , query.text );

            try {
                obj.detailed = [];
                result.ROOT.DEF[ 0 ].SENS.forEach( function ( v ) {
                    var s = v.$POS + '. ';
                    if ( Array.isArray( v.SEN ) ) {
                        v.SEN.forEach( function ( j ) {
                            s += j.D.$ + '; ';
                        } );
                    } else {
                        s += v.SEN.D.$;
                    }
                    obj.detailed.push( s );
                } );
                obj.detailed = obj.detailed.join( '<br/><br/>' );
            }
            catch ( e ) {
                obj.detailed = '';
            }
            try {
                obj.result = result.ROOT.SMT.R.$.replace( /\{\d+#|\$\d+\}/g , '' );
            }
            catch ( e ) {
                obj.result = '';
                console.error( '必应返回了错误的数据：' );
                console.error( result );
                // 跟踪此次错误
                ga.track( '必应返回了错误的json结构' , JSON.stringify( result ) );
            }
            return obj;
        }
    } , bing   = Object.freeze( {
        id : 'bing' ,
        name : '必应翻译' ,
        link : 'http://cn.bing.com/dict/' ,

        /**
         * 翻译方法
         * @param {{}} query
         * @param {Function} callback
         * @returns {bing}
         */
        translate : function ( query , callback ) {
            var data = $.extend( {} , config.data );

            data.q = query.text;
            data.ulang = (query.from || 'auto').toUpperCase();
            data.tlang = (query.to || 'auto').toUpperCase();

            $.ajax( {
                url : config.url ,
                type : config.method ,
                data : data ,
                timeout : 4000 ,
                dataType : 'json'
            } )
                .done( function ( response ) {
                    var result;
                    result = config.result2obj( response , query );
                    result.response = response;
                    callback( result );
                } )
                .fail( function ( jqXhr , textStatus ) {
                    var message;
                    if ( 'timeout' === textStatus ) {
                        message = '查询时间超过了5秒，为避免发生错误已取消此次查询，请稍后重试。';
                    } else if ( 'error' === textStatus ) {
                        message = '查询时发生了网络错误，请先检查一下你的网络设置，然后重试。';
                    }
                    callback( {
                        error : message
                    } );
                } );
            return this;
        } ,

        /**
         * 必应检测语种的方法很特别：翻译它，从结果中拿
         * @param text
         * @param success
         * @param {=} fail
         */
        detectLanguage : function ( text , success , fail ) {
            bing.translate( { text : text } , function ( result ) {
                //if ( result.error ) {
                //    fail( result );
                //} else {
                success( result.from );
                //}
            } );
            return this;
        } ,

        /**
         * 必应朗读
         * @param {String} text
         * @param {String} lang 谷歌的语言类型，有可能为空
         * @param {Function} cb
         * @returns {bing}
         */
        speakUrl : function ( text , lang , cb ) {
            cb( false ); // todo bing speak
            return this;
        }
    } );

    return bing;
} );



