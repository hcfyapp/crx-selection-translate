define( [ '../../lib/jquery' ] , function ( $ ) {
    "use strict";

    var config = {

        ERROR_NETWORK : '网络错误，请稍后重试' ,
        ERROR_RESPONSE : '服务器返回了错误的数据类型' ,

        ttsLink : 'https://translate.googleapis.com/translate_tts?ie=UTF-8&q={{query}}&tl={{lang}}&client=gtx' ,
        method : 'GET' ,
        url : 'https://translate.googleapis.com/translate_a/single' ,
        data : {
            client : 'gtx' ,
            sl : 'auto' , // 源语言
            tl : 'auto' , // 目标语言
            hl : 'zh-CN' ,
            dt : [ 't' , 'bd' ] ,
            dj : 1 ,
            source : 'icon' ,
            q : ''
        } ,

        /**
         * 解析谷歌翻译数据
         * @param result
         * @param query
         * @returns {{}}
         */
        result2obj : function ( result , query ) {
            var obj = {};

            obj.to = query.to || 'auto';

            obj.from = result.src;
            obj.response = result;
            obj.linkToResult = config.linkToResult.replace( '{{to}}' , obj.to ).replace( '{{query}}' , query.text );

            if ( Array.isArray( result.dict ) ) {
                obj.detailed = [];
                result.dict.forEach( function ( v ) {
                    obj.detailed.push( v.pos + '：' + ( v.terms.slice( 0 , 3 ) || []).join( ',' ) );
                } );
                obj.detailed = obj.detailed.join( '<br>' );
            }

            if ( Array.isArray( result.sentences ) ) {

                // 翻译结果，每一段是一个数组项
                obj.result = [];
                result.sentences.forEach( function ( v ) {
                    obj.result.push( v.trans );
                } );
                obj.result = obj.result.join( '<br>' );
            } else {
                obj.result = '啊哦，谷歌翻译返回了一个奇怪的东西，稍后再试试看吧。';
            }
            return obj;
        } ,

        linkToResult : 'https://translate.google.com/#auto/{{to}}/{{query}}'
    } , google = Object.freeze( {
        id : 'google' ,
        name : '谷歌翻译' ,
        link : 'https://translate.google.com/' ,

        /**
         * 翻译方法
         * @param {{}} query
         * @param {Function} callback
         * @returns {google}
         */
        translate : function ( query , callback ) {
            var data = $.extend( {} , config.data );

            data.q = query.text;

            data.tl = query.to || 'auto';

            $.ajax( {
                url : config.url ,
                type : config.method ,
                data : $.param( data , true ) , // 因为google的查询里面有一个数组 dt:[ 't','tl' ]，如果不设置true，会被错误的转换为 &dt[]=t&dt[]=tl
                timeout : 5000 // 谷歌很慢，稍长一点
            } ).done( function ( response ) {
                var result;

                // 谷歌出错的原因在于文本过长
                if ( 'string' === typeof response ) {
                    result = { error : '谷歌翻译发生了一个错误，可能是因为查询文本过长造成的。' };
                } else {
                    result = config.result2obj( response , query );
                }

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
         * 谷歌检测语种的方法很特别：翻译它，从结果中拿
         * 为了不触发翻译事件，所以只能复制过来修改
         * @param text
         * @param success
         * @param {=} fail
         */
        detectLanguage : function ( text , success , fail ) {
            google.translate( { text : text } , function ( result ) {
                if ( result.error ) {
                    fail( result );
                } else {
                    success( result.from );
                }
            } );
            return this;
        } ,

        /**
         * 谷歌朗读
         * @param {String} text
         * @param {String} lang 谷歌的语言类型，有可能为空
         * @param {Function} cb
         * @returns {google}
         */
        speakUrl : function ( text , lang , cb ) {
            var src = config.ttsLink.replace( '{{query}}' , text );
            if ( lang && 'auto' !== lang ) {
                src = src.replace( '{{lang}}' , lang );
                cb( encodeURI( src ) );
            } else {
                google.detectLanguage( text , function ( lang ) {
                    src = src.replace( '{{lang}}' , lang );
                    cb( encodeURI( src ) );
                } );
            }
            return this;
        }
    } );

    return google;
} );


