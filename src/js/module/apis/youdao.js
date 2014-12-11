define( [ '../../lib/jquery' , './baidu' ] , function ( $ , baidu ) {
    "use strict";
    var config = {

        method : 'GET' ,
        url : 'https://fanyi.youdao.com/openapi.do' ,

        data : {
            keyfrom : "chrome" ,
            key : "1361128838" ,
            type : "data" ,
            doctype : "json" ,
            version : "1.1" ,
            q : ''
        } ,
        error : {
            20 : '有道翻译服务一次性只能翻译200个字符哦，长文本就用百度翻译吧！' ,
            30 : '你查询的文本太难了，有道翻译不出来  :( 试试百度翻译吧！' ,
            40 : '有道翻译不支持这种语言哦，用百度翻译试试！' ,
            50 : '天呐！由于使用右键翻译的人数过多，导致有道翻译封禁了翻译功能！请火速发送邮件至 milk.lee@qq.com 通知作者！'
        } ,

        /**
         * 这个方法是为了把各个翻译引擎返回的结果处理成划词翻译统一的结果对象
         * 方便划词翻译显示结果
         * @param result
         * @param query 查询对象
         * @returns {{}}
         */
        result2obj : function ( result , query ) {
            var obj = {};

            obj.response = result;

            if ( result.errorCode === 0 ) {

                obj.linkToResult = config.linkToResult.replace( '{{query}}' , query.text );

                /*
                 * 对于单词和短语，有道翻译有详细的解释，但对于长文本则没有
                 * result.basic.explains 是一个数组，每个元素都是对查询的文本的详细解释
                 * result.basic下还有一个 phonetic 字符串属性，表示查询单词的音标
                 */
                if ( result.basic ) {
                    if ( Array.isArray( result.basic.explains ) ) {
                        obj.detailed = result.basic.explains.join( '<br>' );
                    }

                    // 如果有音标
                    if ( result.basic.phonetic ) {
                        obj.phonetic = '/' + result.basic.phonetic + '/';
                    }
                }

                //翻译结果，虽然这是一个数组，但至今只有一个元素
                if ( Array.isArray( result.translation ) ) {
                    obj.result = result.translation.join( '<br>' );
                } else {
                    obj.result = '啊哦，有道翻译返回了一个奇怪的东西，稍后再重新试试看吧。';
                }

                /*
                 * 有道翻译还提供相关的单词或短语
                 * web 是一个数组，每个数组元素都是一个对象
                 * 这种对象有一个字符串属性 key，是相关的单词或短语
                 * 另有一个数组属性 value ，包含对相关单词的解释，一般有三个解释
                 * 暂不考虑网络释义
                 */
                //                        if ( result.web ) {
                //                            obj.related = result.web;
                //                        }
            } else {
                obj.error = this.error[ result.errorCode ];
            }
            return obj;
        } ,
        ttsLink : 'http://tts.youdao.com/fanyivoice?keyfrom=fanyi%2Eweb%2Eindex&le={{lang}}&word={{query}}' ,
        linkToResult : 'http://fanyi.youdao.com/translate?i={{query}}'

    } , youdao = Object.freeze( {
        id : 'youdao' ,

        name : '有道翻译' ,

        link : 'http://fanyi.youdao.com/' ,

        /**
         * 有道的翻译方法
         * @param {{}} query
         * @param {Function} callback
         * @returns {*}
         */
        translate : function ( query , callback ) {
            var data = $.extend( {} , config.data );
            data.q = query.text;

            $.ajax( {
                url : config.url ,
                type : config.method ,
                data : data ,
                timeout : 3000
            } )
                .done( function ( response ) {
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
                } )
                .fail( function ( jqXhr , textStatus ) {
                    var message;
                    if ( 'timeout' === textStatus ) {
                        message = '查询时间超过了4秒，为避免发生错误已取消此次查询，请稍后重试。';
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
         * 有道返回的结果没有语种，只能每次都判断
         * @param text
         * @param lang
         * @param cb
         * @returns {youdao}
         */
        speakUrl : function ( text , lang , cb ) {

            // 首先，判断文本的语种。使用谷歌的来判断
            baidu.detectLanguage( text , function ( lang ) {
                var src;

                // 使用百度的标准检测的语言类型
                lang = {
                    en : 'eng' ,
                    jp : 'jap' ,
                    kor : 'ko' ,
                    fra : 'fr'
                }[ lang ];

                //lang = config.map[ lang ];

                if ( lang ) {
                    src = encodeURI( config.ttsLink.replace( '{{lang}}' , lang ).replace( '{{query}}' , text ) );
                    cb( src );
                } else {
                    cb( false );
                }
            } );
            return this;
        }
    } );

    return youdao;
} );

