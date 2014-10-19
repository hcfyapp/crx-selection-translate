/**
 * @file 这个文件定义了所有的翻译API
 * @requires L L.js
 */
(function ( global , factory ) {
    "use strict";

    if ( typeof module !== 'undefined' && module.exports ) {
        module.exports = factory( require( 'L' ) );
    } else if ( typeof define === 'function' && define.amd ) {
        define( ['L'] , factory );
    } else {
        global.Apis = factory( global.L );
    }
}( this , function ( L ) {
    "use strict";

    var player = document.createElement( 'audio' ), // 播放器

        apis = {
            youdao : {
                id : 'youdao' ,

                name : '有道翻译' ,

                supportTranslate : ['zh', 'en', 'jp', 'kor', 'spa', 'fra', 'ru'] ,

                supportSpeak : ['en', 'jp', 'kor', 'fra'] ,

                ttsLink : 'http://tts.youdao.com/fanyivoice?keyfrom=fanyi%2Eweb%2Eindex&le={{lang}}&word={{query}}' ,

                link : 'http://fanyi.youdao.com/' ,

                linkToResult : 'http://fanyi.youdao.com/translate?i={{query}}' ,

                // 下面一部分是查询的接口
                method : 'GET' ,
                url : 'https://fanyi.youdao.com/openapi.do' ,

                // 有道的使用量较大，所以多使用几个API
                keys : [
                    {
                        keyfrom : "chrome" ,
                        key : "1361128838" ,
                        type : "data" ,
                        doctype : "json" ,
                        version : "1.1" ,
                        q : ''
                    },
                    {
                        keyfrom : "chrome1" ,
                        key : "754679031" ,
                        type : "data" ,
                        doctype : "json" ,
                        version : "1.1" ,
                        q : ''
                    },
                    {
                        keyfrom : "chrome2" ,
                        key : "754679032" ,
                        type : "data" ,
                        doctype : "json" ,
                        version : "1.1" ,
                        q : ''
                    }
                ] ,

                // 错误对象
                error : {
                    20 : '有道翻译服务一次性只能翻译200个字符哦，长文本就用百度翻译吧！' ,
                    30 : '你查询的文本太难了，有道翻译不出来  :( 试试百度翻译吧！' ,
                    40 : '有道翻译不支持这种语言哦，用百度翻译试试！' ,
                    50 : '天呐！由于使用右键翻译的人数过多，导致有道翻译封禁了翻译功能！请火速发送邮件至 milk.lee@qq.com 通知作者！'
                } ,

                /**
                 * 有道的翻译方法
                 * @param {String} query
                 * @returns {*}
                 */
                translate : function ( query , callback ) {
                    var that = this,
                        data = L.shallowCopy( this.keys[0] ); // 暂且仅使用第一个
                    data.q = encodeURI( query.text );

                    L.ajax( {
                        url : this.url ,
                        method : this.method ,
                        data : data ,
                        load : function ( response ) {
                            if ( 'no query' === response ) {
                                response = {
                                    errorCode : 30
                                };
                            }

                            // 如果服务器返回的不是JSON格式数据
                            // 比如长城宽带会修改返回的内容插入广告
                            if ( 'string' === typeof response ) {
                                callback( {
                                    error : '网络错误'
                                } , that );
                            } else {
                                callback( that.result2obj( response , data.q ) , that );
                            }
                        } ,
                        error : function () {
                            callback( {
                                error : '网络错误'
                            } , that );
                        }
                    } );
                    return this;
                } ,

                /**
                 * 这个方法是为了把各个翻译引擎返回的结果处理成划词翻译统一的结果对象
                 * 方便划词翻译显示结果
                 * @param result
                 * @param {String} query
                 * @returns {{}}
                 */
                result2obj : function ( result , query ) {
                    var obj = {};

                    //查询的字符串
                    obj.query = query;

                    if ( result.errorCode === 0 ) {

                        /*
                         * 对于单词和短语，有道翻译有详细的解释，但对于长文本则没有
                         * result.basic.explains 是一个数组，每个元素都是对查询的文本的详细解释
                         * result.basic下还有一个 phonetic 字符串属性，表示查询单词的音标
                         */
                        if ( result.basic ) {
                            obj.detailed = result.basic.explains.join( '\n' );

                            // 如果有音标
                            if ( result.basic.phonetic ) {
                                obj.phonetic = '/' + result.basic.phonetic + '/';
                            }
                        }

                        //翻译结果，虽然这是一个数组，但至今只有一个元素
                        obj.result = result.translation.join( '\n' );

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

                speak : function ( text ) {
                    var that = this;

                    // 首先，判断文本的语种。使用百度的来判断
                    apis.baidu.detectLanguage( text , function ( lang ) {
                        var src;

                        // 有道不是使用的标准语言表示法
                        lang = {
                            en : 'eng' ,
                            jp : 'jap' ,
                            kor : 'ko' ,
                            fra : 'fr'
                        }[ lang ];

                        if ( lang ) { // 有道不支持中文
                            src = encodeURI( that.ttsLink.replace( '{{lang}}' , lang ).replace( '{{query}}' , text ) );
                            player.src = src;
                            player.play();
                        }
                    } );
                    return this;
                }
            } ,

            baidu : {
                id : 'baidu' ,
                name : '百度翻译' ,
                supportTranslate : ['zh', 'en', 'jp', 'kor', 'spa', 'fra', 'th', 'ara', 'ru', 'pt', 'de', 'it'] ,

                // 百度对小语种的阅读是部分支持：长句不支持，单词、短语支持，不好判断。- -
                supportSpeak : ['zh', 'en', 'jp', 'kor', 'spa', 'fra', 'th', 'ara', 'ru', 'pt', 'de', 'it'] ,

                link : 'http://fanyi.baidu.com/' ,

                linkToResult : 'http://fanyi.baidu.com/#auto/{{to}}/{{query}}' ,

                ttsLink : 'http://fanyi.baidu.com/gettts?lan={{lang}}&text={{query}}&spd=2&source=web' ,

                // 下面一部分是查询的接口
                method : 'POST' ,
                url : 'https://openapi.baidu.com/public/2.0/bmt/translate' ,
                keys : [
                    {
                        //API Key
                        client_id : 'Hs18iW3px3gQ6Yfy6Za0QGg4' ,

                        //源语种，默认自动检测
                        from : 'auto' ,

                        //目标语种，默认自动设置
                        to : 'auto' ,

                        //需要翻译的内容
                        q : ''
                    }
                ] ,
                error : {
                    52001 : '百度翻译忙不过来了，稍后再试试看，或者用有道翻译吧。' ,
                    52002 : '百度翻译出错了！用有道试试吧。' ,
                    52003 : '天呐！如果你看见这条错误信息，说明由于使用右键翻译的人数过多，导致百度翻译封禁了翻译功能！请火速发送邮件至 milk.lee@qq.com 反应情况！'
                } ,

                /**
                 * 百度检测语言的方法
                 * @param test
                 * @param {Function} success
                 * @param {Function=} fail
                 * @returns {*}
                 */
                detectLanguage : function ( test , success , fail ) {
                    return L.ajax( {
                        url : 'http://fanyi.baidu.com/langdetect' ,
                        method : 'POST' ,
                        data : 'query=' + test.slice( 0 , 73 ) ,
                        load : function ( response ) {

                            if ( 'string' === response ) {
                                fail && fail( {
                                    code : -1 ,
                                    message : '服务器返回的内容不是JSON'
                                } );
                            } else {
                                if ( 0 === response.error ) {
                                    success( response.lan );
                                } else {
                                    fail && fail( {
                                        code : -3 ,
                                        message : '服务器返回了一个错误'
                                    } );
                                }
                            }
                        } ,
                        error : function () {
                            fail && fail( {
                                code : -2 ,
                                message : '网络错误'
                            } );
                        }
                    } );
                } ,

                /**
                 * 百度的翻译方法
                 * @param {String} query
                 * @param {{}=} options
                 * @returns {*}
                 */
                translate : function ( query , callback ) {
                    var that = this,
                        data = L.shallowCopy( this.keys[0] ); // 暂且仅使用第一个

                    data.q = encodeURI( query.text );
                    // 源语言总是默认自动检测就好了
                    //                    data.from = options.from || 'auto';
                    data.to = query.to || 'auto';

                    L.ajax( {
                        url : this.url ,
                        method : this.method ,
                        data : data ,
                        load : function ( response ) {
                            callback( that.result2obj( response , data.q ) , that );
                        } ,
                        error : function () {
                            callback( {
                                error : '网络错误'
                            } , that );
                        }
                    } );
                    return this;
                } ,

                /**
                 * 将结果转换成统一的对象
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
                        obj.error = this.error[ result.error_code ];
                    } else {

                        //百度翻译接口有源语种，有道翻译没有
                        // from 永远设为auto
                        //                        obj.from = result.from;

                        //百度翻译接口需要有目标语种，有道翻译不需要
                        obj.to = result.to;

                        //百度 API 仅有翻译结果
                        result.trans_result.forEach( (function () {

                            /*
                             * 为了不使最后一个段落总是包含换行符
                             * 改用数组.join()方法来进行字符串连接
                             * 在闭包里保存一个临时数组
                             */
                            var arr = [];

                            return  function ( v , i , a ) {

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

                        return obj;
                    }
                } ,

                /**
                 * 百度的播放引擎
                 * @param text
                 * @returns {apis}
                 */
                speak : function ( text ) {
                    var that = this;

                    // 首先，判断文本的语种
                    this.detectLanguage( text , function ( lang ) {
                        var src = encodeURI( that.ttsLink.replace( '{{lang}}' , lang ).replace( '{{query}}' , text ) );
                        player.src = src;
                        player.play();
                    } );
                    return this;
                }
            } ,

            google : {
                id : 'google' ,
                name : '谷歌翻译' ,
                link : 'https://translate.google.cn/' ,
                linkToResult : 'https://translate.google.cn/#auto/{{to}}/{{query}}' ,
                ttsLink : 'https://translate.google.cn/translate_tts?ie=UTF-8&q={{query}}&tl={{lang}}&total=1&idx=0&textlen=2&client=t' ,
                method : 'GET' ,
                url : 'https://translate.google.cn/translate_a/single' ,
                keys : [
                    {
                        client : 't' ,
                        sl : 'auto' , // 源语言
                        tl : 'auto' , // 目标语言
                        hl : 'zh-CN' ,

                        // 这个数组指定了返回的结果包含哪些部分。我只需要翻译结果和详细释义
                        dt : ['bd' , 'ex' , 'ld' , 'md' , 'qc' , 'rw' , 'rm' , 'ss' , 't' , 'at' , 'sw'] ,
                        ie : 'UTF-8' ,
                        oe : 'UTF-8' ,
                        oc : 1 ,
                        prev : 'btn' ,
                        it : 'tgtd.2092' ,
                        ssel : 3 ,
                        tsel : 0 ,
                        q : ''
                    }
                ] ,

                /**
                 *
                 * @param {String} query
                 * @param {{}=} options
                 * @returns {apis}
                 */
                translate : function ( query , callback ) {
                    var that = this,
                        data = L.shallowCopy( this.keys[0] ); // 暂且仅使用第一个

                    data.q = encodeURI( query.text );
                    // 源语言总是默认自动检测就好了
                    //                    data.sl = options.from || 'auto';
                    data.tl = query.to || 'auto';

                    L.ajax( {
                        url : this.url ,
                        method : this.method ,
                        data : data ,
                        load : function ( response ) {
                            callback( that.result2obj( response , data.q ) , that );
                        } ,
                        error : function () {
                            callback( {
                                error : '网络错误'
                            } , that );
                        }
                    } );
                    return this;
                } ,

                /**
                 * 解析谷歌翻译数据
                 * @param result
                 * @param query
                 * @returns {{}}
                 */
                result2obj : function ( result , query ) {
                    var obj = {}, part;

                    try {
                        // google翻译结果包含很多连续的逗号，导致不能正常JSON.parse
                        // 去除重复逗号解析之后是一个数组，我只关心前三项
                        // 第一项是 obj.result
                        // 如果第二项是字符串，那么就是 源语言
                        // 否则，第二项就是 obj.detailed ，那么第三项就成为源语言了
                        result = JSON.parse( result.replace( /\,{2,}/g , ',' ).replace( '[,' , '[' ).replace( ',]' , ']' ) ).slice( 0 , 3 );
                    }
                    catch ( e ) {
                        return { error : '网络错误' , original : e };
                    }

                    // 第一个数组是解析结果，最后一个元素是发音，前面的每个段落的翻译是一个元素
                    part = result[0];

                    obj.result = '';

                    part.splice( 0 , part.length - 1 ).forEach( function ( v ) {
                        obj.result += v[0]; // 谷歌翻译结果自带换行符
                    } );

                    // 两个以上的空格换成一个
                    obj.result = obj.result.replace( /\s{2,}/g , ' ' );

                    //obj.result = obj.result.join( '\n' ); // 翻译结果

                    obj.phonetic = '/' + part[0][1].replace( /\s{2,}/g , ' ' ) + '/'; // 发音

                    part = result[1];

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
                            s += cixing[0] + '：';
                            cixing[1].forEach( function ( jieshi ) {
                                s += jieshi + '；';
                            } );
                            obj.detailed.push( s );
                        } );
                        obj.detailed = obj.detailed.join( '\n' );
                        obj.from = result[2];
                    } else {
                        obj.from = part;
                    }
                    return obj;
                } ,

                /**
                 * 谷歌检测语种的方法很特别：翻译它，从结果中拿
                 * 为了不触发翻译事件，所以只能复制过来修改
                 * @param text
                 * @param success
                 * @param fail
                 */
                detectLanguage : function ( text , success , fail ) {
                    var that = this,
                        data = L.shallowCopy( this.keys[0] ); // 暂且仅使用第一个

                    data.q = encodeURI( text );

                    L.ajax( {
                        url : this.url ,
                        method : this.method ,
                        data : data ,
                        load : function ( response ) {
                            success( that.result2obj( response , data.q ).from );
                        } ,
                        error : function () {
                            fail && fail( {
                                code : -2 ,
                                message : '网络错误'
                            } );
                        }
                    } );
                    return this;
                } ,

                /**
                 * 谷歌朗读
                 * @param {String} text
                 * @returns {apis}
                 */
                speak : function ( text ) {
                    var that = this;
                    this.detectLanguage( text , function ( lang ) {
                        var src = encodeURI( that.ttsLink.replace( '{{lang}}' , lang ).replace( '{{query}}' , text ) );
                        player.src = src;
                        player.play();
                    } );
                    return this;
                }
            }
        };

    return apis;
} ));
