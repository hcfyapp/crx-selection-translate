define( [ '../../lib/jquery' ] , function ( $ ) {
    "use strict";

    var config = {

        /**
         * 百度支持的语言
         */
        map : {
            en : 'en' ,
            th : 'th' ,
            ru : 'ru' ,
            pt : 'pt' ,
            de : 'de' ,
            it : 'it' ,
            zh : 'zh' ,
            'zh-CN' : 'zh' ,
            'zh-TW' : 'zh' ,
            ja : 'jp' ,
            ko : 'kor' ,
            es : 'spa' ,
            fr : 'fra' ,
            ar : 'ara'
        } ,

        error : {
            52001 : '百度翻译忙不过来了，稍后再试试看，或者用有道翻译吧。' ,
            52002 : '百度翻译出错了！用有道试试吧。' ,
            52003 : '天呐！如果你看见这条错误信息，说明由于使用右键翻译的人数过多，导致百度翻译封禁了翻译功能！请火速发送邮件至 milk.lee@qq.com 反应情况！'
        } ,
        method : 'GET' ,
        url : 'https://openapi.baidu.com/public/2.0/bmt/translate' ,
        data : {
            client_id : 'Hs18iW3px3gQ6Yfy6Za0QGg4' ,
            from : 'auto' ,
            to : 'auto' ,

            //需要翻译的内容
            q : ''
        } ,
        ttsLink : 'http://fanyi.baidu.com/gettts?lan={{lang}}&text={{query}}&spd=2&source=web' ,
        linkToResult : 'http://fanyi.baidu.com/#auto/{{to}}/{{query}}' ,

        /**
         * 将百度的翻译结果转换为统一的对象
         * @param result
         * @param query
         * @returns {{}}
         */
        result2obj : function ( result , query ) {
            var obj = {};

            //如果有错误码则直接处理错误
            if ( result.error_code ) {
                obj.error = config.error[ result.error_code ];
            } else {
                obj.to = result.to;
                obj.from = result.from;
                obj.response = result;
                obj.linkToResult = config.linkToResult.replace( '{{query}}' , query.text ).replace( '{{to}}' , result.to );
                if ( Array.isArray( result.trans_result ) ) {
                    obj.result = [];

                    //百度 API 仅有翻译结果
                    result.trans_result.forEach( function ( v ) {

                        /*
                         * 百度API的翻译结果在 trans_result 数组中，每个数组元素都是一个对象
                         * 每个对象包含属性 src（段落的查询文本）和 dst（对应段落的翻译结果）
                         * 有多少个段落，就会有多少个数组元素
                         * 所以需要使用 \n 把它们拼起来
                         */
                        obj.result.push( v.dst );
                    } );
                    obj.result = obj.result.join( '\n' );
                } else {
                    obj.result = '啊哦，百度返回了一个奇怪的东西，等一会儿再试试看吧。';
                }
            }

            return obj;
        }
    } , baidu = Object.freeze( {
        id : 'baidu' ,
        name : '百度翻译' ,

        link : 'http://fanyi.baidu.com/' ,

        /**
         * 百度检测语言的方法
         * @param text
         * @param {Function} success
         * @param {Function=} fail
         * @returns {baidu}
         */
        detectLanguage : function ( text , success , fail ) {
            $.ajax( {
                url : 'http://fanyi.baidu.com/langdetect' ,
                type : 'POST' ,
                data : 'query=' + text.slice( 0 , 73 )
            } ).done( function ( response ) {
                if ( 0 === response.error ) {
                    success( response.lan );
                }
            } );
            return this;
        } ,

        /**
         * 百度的翻译方法
         * @param {{}} query
         * @param {Function} callback
         * @returns {baidu}
         */
        translate : function ( query , callback ) {
            var data = $.extend( {} , config.data );

            data.q = query.text;

            data.to = config.map[ query.to ] || 'auto';

            $.ajax( {
                url : config.url ,
                type : config.method ,
                data : data ,
                timeout : 3000
            } ).done( function ( response ) {
                var result;

                // 如果服务器返回的不是JSON格式数据
                // 比如长城宽带会修改返回的内容插入广告
                if ( 'string' === typeof response ) {
                    result = { error : '翻译服务器返回了错误的数据，请稍后重试' };
                } else {
                    result = config.result2obj( response , query );
                }

                result.response = response;
                callback( result );
            } ).fail( function ( jqXhr , textStatus ) {
                var message;
                if ( 'timeout' === textStatus ) {
                    message = '查询时间超过了3秒，为避免发生错误已取消此次查询，请稍后重试。';
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
         * 百度的播放引擎
         * @param {String} text
         * @param {String} lang
         * @param {Function} cb
         * @returns {baidu}
         */
        speakUrl : function ( text , lang , cb ) {
            var src = config.ttsLink.replace( '{{query}}' , text );
            if ( lang ) {
                src = src.replace( '{{lang}}' , lang );
                cb( encodeURI( src ) );
            } else {
                baidu.detectLanguage( text , function ( lang ) {
                    src = src.replace( '{{lang}}' , lang );
                    cb( encodeURI( src ) );
                } );
            }
            return this;
        }
    } );

    return baidu;
} );
