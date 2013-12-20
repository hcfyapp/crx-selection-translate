/**
 * 定义全局变量 $ ，以及一些常用的工具函数
 */
var $ = {

    /**
     * 封装一层 Object.create，避免每次都手动书写描述符的 value 属性
     * @param inheritObj
     * @param selfProperties
     * @returns {object}
     */
    inherit : function ( inheritObj , selfProperties ) {
        'use strict';
        var key , desObj = {}, temp;

        for ( key in selfProperties ) {
            if ( selfProperties.hasOwnProperty( key ) ) {
                desObj[key] = {
                    value : selfProperties[key] ,
                    writable : true ,
                    enumerable : true ,
                    configurable : true
                };
            }
        }

        return Object.create( inheritObj , desObj );
    } ,

    //扩展程序根目录
    rootPath : chrome.extension.getURL( "/" ) ,

    /**
     * 当DOM准备完成时执行的函数
     * @param f
     */
    ready : function ( f ) {
        'use strict';
        document.addEventListener( 'DOMContentLoaded' , f );
    } ,

    /**
     * 测试 target 节点是否是 source 的子节点
     * @param source
     * @param target
     */
    contains : function ( source , target ) {
        'use strict';
        var x;
        for ( x = target ; x.nodeType === 1 ; x = x.parentNode ) {
            if ( x === source ) {
                return true;
            }
        }
        return false;
    } ,

    /**
     * 扩展对象的方法，浅复制
     * @param o
     * @param t
     * @returns {*}
     */
    extend : function ( o , t ) {
        'use strict';
        var name;
        for ( name in t ) {
            if ( t.hasOwnProperty( name ) ) {
                o[name] = t[name];
            }
        }
        return o;
    } ,

    /**
     * 将对象转换为 HTTP请求字符串
     * 例如 传入{ test : '测试' , test2 : 'good job' } 则返回 'test=测试&test2=good job'
     * 若参数为字符串则直接返回参数
     * 多用于 $.ajax 函数
     * @param data
     * @param {boolean=} convertToObj 当第一个参数是字符串时，是否将字符串转换成对象
     * @returns {*}
     */
    encode : function ( data , convertToObj ) {
        'use strict';
        var name, result;

        //如果参数是对象，就转换成字符串；如果是字符串就转换成对象
        switch ( typeof data ) {
            case 'object':
                result = [];

                for ( name in data ) {

                    //跳过继承属性
                    if ( data.hasOwnProperty( name ) ) {
                        result.push( name + '=' + data[name] );
                    }
                }

                return result.join( '&' );

            case  'string':

                //如果是字符串且第二个参数是true，则返回对象，否则直接返回参数
                if ( convertToObj ) {
                    result = {};

                    data.split( '&' ).forEach( function ( v ) {
                        var kv = v.split( '=' );
                        result[kv[0]] = kv[1];
                    } );
                } else {
                    result = data;
                }

                return result;

            default :
                throw new Error( '$.encode()：参数必须是对象或者字符串！' );
        }
    } ,

    /**
     * 封装请求函数
     * @param requestObj
     * @param requestObj.url
     * @param requestObj.data
     * @param requestObj.method
     * @param callback
     * @returns {$}
     */
    ajax : function ( requestObj , callback ) {
        'use strict';
        var x = $.extend( {} , requestObj ), r = new XMLHttpRequest();
        x.method = requestObj.method || 'GET';
        x.data = $.encode( requestObj.data );

        //GET请求的参数写在 url 后面
        if ( x.method === 'GET' ) {
            x.url += '?' + x.data;
        }

        r.open( x.method , x.url );

        if ( x.method === 'POST' ) {
            r.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" );
        }

        if ( callback ) {
            r.onreadystatechange = function ( e ) {

                //将请求对象与事件对象传递给回调函数
                callback( r , e );
            };
        }

        //如果是 POST 请求，则发送 data
        r.send( x.method === 'POST' ? x.data : null );
        return this;
    }
};

/**
 * 在全局变量上添加事件模块
 */
$.extend( $ , (function () {
    "use strict";

    //在闭包内存储注册的事件
    var callbacks = {};

    return {
        sub : function ( eventName , callback ) {

            //如果这个事件还没被注册过，则为它初始化一个数组
            if ( callbacks[eventName] === undefined ) {
                callbacks[eventName] = [];
            }

            callbacks[eventName].push( callback );

            return this;

        } ,
        pub : function () {
            var args = Array.prototype.slice.call( arguments , 0 ),
                eventName = args.shift(),
                a = callbacks[eventName];

            if ( a && a.length !== 0 ) {
                a.forEach( function ( v ) {
                    v.apply( this , args );
                } );
            }
            return this;
        }
    };
}()) );

/**
 * 新增 tts 模块，用于进行阅读
 * @type {{support: Array, detect: Function, audio: HTMLElement, play: Function, transform: Function}}
 */
$.tts = {

    // 右键翻译支持的发音语言
    support : ['zh', 'jp', 'kor', 'en', 'fra'] ,

    /**
     * 检测语言类型的函数
     * @param query
     * @param callback
     */
    detect : function ( query , callback ) {
        'use strict';

        //使用百度的接口检测
        //有道的太复杂了
        $.ajax( {
            method : 'POST' ,
            url : 'http://fanyi.baidu.com/langdetect' ,
            data : 'query=' + query
        } , function ( r ) {
            var lan, isSupport;
            if ( r.readyState === 4 ) {
                lan = JSON.parse( r.responseText ).lan;
                isSupport = this.support.indexOf( lan ) >= 0;
                if ( callback ) {
                    callback( isSupport , lan , query );
                } else if ( isSupport ) {
                    this.transform( lan , query );
                }
            }
        }.bind( this ) );
        return this;
    } ,

    audio : document.createElement( 'audio' ) ,

    //播放语音
    play : function ( url ) {
        'use strict';
        var audio = this.audio;
        if ( audio.src !== url ) {
            audio.src = url;
        }
        audio.play();
    } ,

    //将支持的语言转换为对应的tts接口
    transform : function ( lan , query , callback ) {
        'use strict';
        var url, that = this;
        switch ( lan ) {

            //英文很麻烦，有道中 tts 为eng，百度中分两种：美式en，英式uk
            case 'en':

                //读取一下设置
                $.Controller.getStorage( 'englishAudio' , function ( item ) {
                    var key = item.englishAudio, url;
                    switch ( key ) {

                        //百度美式与英式英语
                        case 'en':
                        case 'uk':
                            url = 'http://tts.baidu.com/text2audio?pid=101&ie=UTF-8&spd=3&lan=' + key + '&text=' + query;
                            break;

                        //默认使用有道读
                        default :
                            url = 'http://tts.youdao.com/fanyivoice?keyfrom=fanyi%2Eweb%2Eindex&le=eng&word=' + query;
                            break;
                    }
                    if ( callback ) {
                        callback( url );
                    } else {
                        that.play( url );
                    }
                    return that;
                } );
                break;

            //中文只有百度支持，tts 中的语言为 zh
            case 'zh':
                url = 'http://tts.baidu.com/text2audio?pid=101&ie=UTF-8&spd=3&lan=zh&text=' + query;
                break;

            //日文只有有道支持，tts 中的语言为 jap
            case 'jp':
                url = 'http://tts.youdao.com/fanyivoice?keyfrom=fanyi%2Eweb%2Eindex&le=jap&word=' + query;
                break;

            //韩语只有有道支持，tts中的语言为 ko
            case 'kor':
                url = 'http://tts.youdao.com/fanyivoice?keyfrom=fanyi%2Eweb%2Eindex&le=ko&word=' + query;
                break;

            //法语只有有道支持，tts 中的语言为 fr
            case 'fra':
                url = 'http://tts.youdao.com/fanyivoice?keyfrom=fanyi%2Eweb%2Eindex&le=fr&word=' + query;
                break;
        }
        if ( callback ) {
            callback( url );
        } else {
            this.play( url );
        }
        return this;
    }
};

/**
 * 由于使用了 .bind( $ )，所以这个局部作用域内的 this === $
 */
(function () {

    "use strict";

    /**
     * Model 层父类
     * @type {{query: Function, beforeQuery: Function}}
     */
    var Translate = {

            /**
             * 查询方法，查询结束后会使用实例的 handleTemplate() 方法处理模板
             * @param queryObj
             * @returns {object}
             */
            query : function ( queryObj ) {
                var data;

                //调用查询前函数，如果函数返回 false 则取消查询
                if ( this.beforeQuery() !== false ) {

                    data = $.extend( {} , this.data );

                    //如果传入的是字符串，则默认为查询内容
                    data.q = typeof queryObj === 'string' ? queryObj : queryObj.q;

                    $.ajax( {
                        url : this.url ,
                        method : this.method ,
                        data : data
                    } , function ( r , e ) {
                        if ( r.readyState === 4 && r.status === 200 ) {

                            //第一个参数是翻译结果，第二个参数是查询的字符串
                            this.handleTemplate( r.responseText , data.q );
                        }
                    }.bind( this ) );
                }

                return this;
            } ,

            /**
             * 在查询前调用的函数，可以用于给用户提出提示
             * 如果返回 false ，则可以取消这次查询
             */
            beforeQuery : function () {

                console.debug( '查询开始' );
            }
        },

    //缓存 inherit 函数
        inherit = this.inherit;

    /**
     * 我这个是一个简单的应用，每个页面只需要一个控制器实例
     * 这个控制层有一些公用的方法，但在不同的页面（如标签页与弹出页）有不同的实例
     * 由于这一层需要在别的页面用于初始化实例，所以绑在全局变量上
     * @type {{}}
     */
    this.Controller = {

        /**
         * 想到一个好办法，直接把数据层实例放进控制器的父类
         * 让各个页面的控制器实例继承到它们
         * View 层也是如此！
         */
        m : {} ,

        v : {} ,

        /**
         * 封装一层 chrome 的获取数据方法，方便修改
         * 以后可能会出现一个设置项，指示存储区域
         * @param key
         * @param callback
         */
        getStorage : function ( key , callback ) {
            chrome.storage.local.get( key , callback );
        }
    };

    //有道的数据模型实例
    this.Controller.m.yd = inherit( Translate , {
        method : 'GET' ,
        url : 'http://fanyi.youdao.com/openapi.do' ,
        data : {
            keyfrom : "chrome" ,
            key : "1361128838" ,
            type : "data" ,
            doctype : "json" ,
            version : "1.1" ,
            q : ''
        } ,
        handleTemplate : function ( result , query ) {
            var templateObj = {}, r = result;

            if ( r === 'no query' ) {
                templateObj.errorCode = 30;
            } else {

                r = JSON.parse( result );

                //查询的字符串
                templateObj.query = query;

                if ( r.errorCode === 0 ) {

                    /*
                     * 对于单词和短语，有道翻译有详细的解释，但对于长文本则没有
                     * result.basic.explains 是一个数组，每个元素都是对查询的文本的详细解释
                     * result.basic下还有一个 phonetic 字符串属性，表示查询单词的音标
                     */
                    if ( r.basic ) {
                        templateObj.detailedExplains = r.basic.explains;

                        // 如果有音标
                        if ( r.basic.phonetic ) {
                            templateObj.phonetic = '/' + r.basic.phonetic + '/';
                        }
                    }

                    //翻译结果，虽然这是一个数组，但至今只有一个元素
                    templateObj.translateResult = r.translation[0];

                    /*
                     * 有道翻译还提供相关的单词或短语
                     * web 是一个数组，每个数组元素都是一个对象
                     * 这种对象有一个字符串属性 key，是相关的单词或短语
                     * 另有一个数组属性 value ，包含对相关单词的解释，一般有三个解释
                     */
                    if ( r.web ) {
                        templateObj.relatedWords = r.web;
                    }
                } else {

                    templateObj.errorCode = r.errorCode;
                }
            }
            //在全局对象上触发这个事件
            $.pub( 'query' , templateObj , 'yd' );

            return this;

        }
    } );

    //百度的数据模型实例
    this.Controller.m.bd = inherit( Translate , {
        method : 'POST' ,
        url : 'http://openapi.baidu.com/public/2.0/bmt/translate' ,
        data : {

            //API Key
            client_id : 'ZGoZqZPUPtSXCmdlCrtqEKFz' ,

            //源语种，默认自动检测
            from : 'auto' ,

            //目标语种，默认自动设置
            to : 'auto' ,

            //需要翻译的内容
            q : ''
        } ,

        /**
         * 当使用 bd 接口返回结果时，将结果转换为统一的模板对象
         * 而后在全局变量 $ 上触发 query 事件
         * @param result
         * @param query
         */
        handleTemplate : function ( result , query ) {
            var templateObj = {}, r = JSON.parse( result );

            //公用的模板对象由五个部分构成：

            //查询的字符串
            templateObj.query = query;

            //如果有错误码则直接处理错误
            if ( r.error_code ) {
                templateObj.errorCode = r.error_code;
            } else {

                //百度翻译接口有源语种，有道翻译没有
                templateObj.from = r.from;

                //百度翻译接口有目标语种，有道翻译没有
                templateObj.to = r.to;

                //百度 API 仅有翻译结果
                r.trans_result.forEach( (function () {

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
                            templateObj.translateResult = arr.join( '\n' );
                        }
                    };
                }()) );
            }

            //在全局对象上触发这个事件
            $.pub( 'query' , templateObj , 'bd' );

            return this;
        }
    } );

    /**
     * 应用的视图层
     * @type {{}}
     */
    this.View = {

        //给自己一个提醒 ;)
        generate : function () {
            throw new Error( 'generate()：每个页面都应该重载各自的 generate 方法！' );
        }
    };

    //在控制器上定义有道的视图信息
    this.Controller.v.yd = inherit( this.View , {
        viaName : '有道翻译' ,
        viaLink : 'http://fanyi.youdao.com/translate?i={{query}}' ,
        errorMsg : {
            20 : '有道翻译服务一次性只能翻译200个字符哦，长文本就用百度翻译吧！' ,
            30 : '你查询的文本太难了，有道翻译不出来  :( 试试百度翻译吧！' ,
            40 : '有道翻译不支持这种语言哦，试试百度翻译！' ,
            50 : '天呐！由于使用右键翻译的人数过多，导致有道翻译封禁了翻译功能！请火速发送邮件至 i@lmk123.com 通知作者！'
        }
    } );

    //在控制器上定义百度的视图信息
    this.Controller.v.bd = inherit( this.View , {
        viaName : '百度翻译' ,
        viaLink : 'http://fanyi.baidu.com/#{{from}}/{{to}}/{{query}}' ,
        errorMsg : {
            52001 : '百度翻译太忙了，稍后再试试看，或者用有道翻译吧。' ,
            52002 : '百度翻译出错了！用有道试试吧。' ,
            52003 : '天呐！如果你看见这条错误信息，说明由于使用右键翻译的人数过多，导致百度翻译封禁了翻译功能！请火速发送邮件至 i@lmk123.com 反应情况！'
        }
    } );
}.bind( $ )());
