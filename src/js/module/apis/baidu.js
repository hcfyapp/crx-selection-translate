define( [ '../../lib/L' ] , function ( L ) {
    "use strict";

    var config = {

        ERROR_NETWORK : '网络错误，请稍后重试' ,
        ERROR_RESPONSE : '服务器返回了错误的数据类型' ,

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

            //API Key
            client_id : 'Hs18iW3px3gQ6Yfy6Za0QGg4' ,

            //源语种，默认自动检测
            from : 'auto' ,

            //目标语种，默认自动设置
            to : 'auto' ,

            //需要翻译的内容
            q : ''
        } ,
        ttsLink : 'http://fanyi.baidu.com/gettts?lan={{lang}}&text={{query}}&spd=2&source=web' ,

        /**
         * 将百度的翻译结果转换为统一的对象
         * @param result
         * @param query
         * @returns {{}}
         */
        result2obj : function ( result , query ) {
            var obj = {};

            //查询的字符串
            //                    obj.query = query;

            //如果有错误码则直接处理错误
            if ( result.error_code ) {
                obj.error = config.error[ result.error_code ];
            } else {

                //百度翻译接口有源语种，有道翻译没有
                // from 永远设为auto
                //                        obj.from = result.from;

                //百度翻译接口需要有目标语种，有道翻译不需要
                obj.to = result.to;

                obj.from = result.from;

                obj.query = query.text;

                obj.response = result;

                //百度 API 仅有翻译结果
                result.trans_result.forEach( (function () {

                    /*
                     * 为了不使最后一个段落总是包含换行符
                     * 改用数组.join()方法来进行字符串连接
                     * 在闭包里保存一个临时数组
                     */
                    var arr = [];

                    return function ( v , i , a ) {

                        /*
                         * 百度API的翻译结果在 trans_result 数组中，每个数组元素都是一个对象
                         * 每个对象包含属性 src（段落的查询文本）和 dst（对应段落的翻译结果）
                         * 有多少个段落，就会有多少个数组元素
                         * 所以需要使用 \n 把它们拼起来
                         */
                        arr.push( v.dst );

                        //最后一次循环时赋值给对象
                        if ( i + 1 === a.length ) {
                            obj.result = arr.join( '\n' );
                        }
                    };
                }()) );
            }

            return obj;
        }
    } , baidu = Object.freeze( {
        id : 'baidu' ,
        name : '百度翻译' ,

        link : 'http://fanyi.baidu.com/' ,

        linkToResult : 'http://fanyi.baidu.com/#auto/{{to}}/{{query}}' ,

        /**
         * 百度检测语言的方法
         * @param test
         * @param {Function} success
         * @param {Function=} fail
         * @returns {baidu}
         */
        detectLanguage : function ( test , success , fail ) {
            L.ajax( {
                url : 'http://fanyi.baidu.com/langdetect' ,
                method : 'POST' ,
                data : 'query=' + test.slice( 0 , 73 ) ,
                load : function ( response ) {

                    if ( 'object' === typeof response ) {
                        if ( 0 === response.error ) {
                            success( response.lan );
                        } else {
                            fail && fail( {
                                code : -3 ,
                                message : config.ERROR_RESPONSE ,
                                response : response
                            } );
                        }
                    } else {
                        fail && fail( {
                            code : -1 ,
                            message : config.ERROR_RESPONSE ,
                            response : response
                        } );
                    }
                } ,
                error : function () {
                    fail && fail( {
                        code : -2 ,
                        message : config.ERROR_NETWORK
                    } );
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
            var data = L.shallowCopy( config.data );

            data.q = encodeURI( query.text );

            data.to = config.map[ query.to ] || 'auto';

            L.ajax( {
                url : config.url ,
                method : config.method ,
                data : data ,
                timeout : 3000 , // 4秒
                ontimeout : function () {
                    callback( {
                        api : baidu ,
                        error : '查询时间超过了3秒，为避免出现错误已取消此次查询，请稍后重试。'
                    } );
                } ,
                load : function ( response ) {
                    var result;
                    if ( 'object' === typeof response ) {
                        result = config.result2obj( response , query );
                        result.api = baidu;
                    } else {
                        result = {
                            error : config.ERROR_RESPONSE ,
                            response : response ,
                            api : baidu
                        };
                    }

                    callback( result );
                } ,
                error : function () {
                    callback( {
                        api : baidu ,
                        error : config.ERROR_NETWORK
                    } );
                }
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
