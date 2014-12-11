/**
 * 使用的google.cn的翻译接口，问题多多
 * 换用了谷歌官方的翻译接口，但是只能翻墙访问
 * todo 待重新发布
 */

define( [ '../../lib/jquery' ] , function ( $ ) {
    "use strict";

    var config = {

        ERROR_NETWORK : '网络错误，请稍后重试' ,
        ERROR_RESPONSE : '服务器返回了错误的数据类型' ,

        ttsLink : 'https://translate.google.cn/translate_tts?ie=UTF-8&q={{query}}&tl={{lang}}&total=1&idx=0&textlen=2&client=t' ,
        method : 'GET' ,
        url : 'https://translate.google.cn/translate_a/single' ,
        data : {
            client : 't' ,
            sl : 'auto' , // 源语言
            tl : 'auto' , // 目标语言
            hl : 'zh-CN' ,

            // 这个数组指定了返回的结果包含哪些部分。我只需要翻译结果和详细释义
            //dt : [ 'bd' , 'ex' , 'ld' , 'md' , 'qc' , 'rw' , 'rm' , 'ss' , 't' , 'at' , 'sw' ] ,
            dt : [ 'bd' , 'ex' , 'ld' , 'md' , 'qc' , 'rw' , 'rm' , 'ss' , 't' , 'at' , 'sw' ] ,
            ie : 'UTF-8' ,
            oe : 'UTF-8' ,
            oc : 1 ,
            prev : 'btn' ,
            it : 'tgtd.2092' ,
            ssel : 3 ,
            tsel : 0 ,
            q : ''
        } ,
        linkToResult : 'https://translate.google.cn/#auto/{{to}}/{{query}}' ,

        /**
         * 解析谷歌翻译数据
         * @param result
         * @param query
         * @returns {{}}
         */
        result2obj : function ( result , query ) {
            var obj = {} , part;

            // 去除重复逗号解析之后是一个数组，我只关心前三项
            // 第一项是 obj.result
            // 如果第二项是字符串，那么就是 源语言
            // 否则，第二项就是 obj.detailed ，那么第三项就成为源语言了

            // 第一个数组是解析结果，最后一个元素是发音，前面的每个段落的翻译是一个元素
            part = result[ 0 ];

            obj.result = '';

            obj.query = query.text;

            obj.response = result;

            obj.to = query.to || 'auto';

            part.splice( 0 , part.length - 1 ).forEach( function ( v ) {
                obj.result += v[ 0 ]; // 谷歌翻译结果自带换行符
            } );

            // 两个以上的空格换成一个
            obj.result = obj.result.replace( /\s{2,}/g , ' ' );

            //obj.result = obj.result.join( '\n' ); // 翻译结果

            obj.phonetic = '/' + part[ 0 ][ 1 ].replace( /\s{2,}/g , ' ' ) + '/'; // 发音

            part = result[ 1 ];

            // 如果是数组，那么就是详细释义，否则这个就是源语言字符串例如 en
            if ( Array.isArray( part ) ) {
                obj.detailed = [];
                //                        console.dir( part );

                // 详细释义结构如下
                // 详细释义的每个元素都是一个数组，而这个数组的第一个项是单词的词性（例如名词、副词）
                // 这个数组的第二个项也是一个数组，列出了此词性对应的所有解释
                // 第三个项也是数组，这个数组对应第二项的每一个解释有英文的同义词，这个直接跳过
                part.forEach( function ( cixing ) {
                    var s = '';
                    s += cixing[ 0 ] + '：';
                    cixing[ 1 ].forEach( function ( jieshi ) {
                        s += jieshi + '；';
                    } );
                    obj.detailed.push( s );
                } );
                obj.detailed = obj.detailed.join( '<br>' );
                obj.from = result[ 2 ];
            } else {
                obj.from = part;
            }
            return obj;
        }
    } , google = Object.freeze( {
        id : 'google_cn' ,
        name : '谷歌翻译（国内）' ,
        link : 'https://translate.google.cn/' ,

        /**
         * 翻译方法
         * @param {{}} query
         * @param {Function} callback
         * @returns {google}
         */
        translate : function ( query , callback ) {
            var data = L.shallowCopy( config.data );

            data.q = encodeURI( query.text );

            data.tl = query.to || 'auto';

            L.ajax( {
                url : config.url ,
                method : config.method ,
                data : data ,
                load : function ( response ) {
                    var result;

                    try {

                        // google翻译结果包含很多连续的逗号，导致不能正常JSON.parse
                        response = JSON.parse( response.replace( /,{2,}/g , ',' ).replace( '[,' , '[' ).replace( ',]' , ']' ) ).slice( 0 , 3 );
                    }
                    catch ( e ) {
                        result = {
                            error : config.ERROR_RESPONSE ,
                            api : google ,
                            response : response
                        };
                    }

                    if ( !result ) {
                        result = config.result2obj( response , query );
                        result.api = google;
                        result.response = response;
                    }
                    callback( result );
                } ,
                error : function () {
                    callback( {
                        error : config.ERROR_NETWORK ,
                        api : google
                    } );
                }
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

