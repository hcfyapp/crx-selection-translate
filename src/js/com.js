/**
 * 把这个函数作为查询的开始
 * @param query
 */
var $ = function ( query ) {
    "use strict";

    // 读取配置，使用哪个 api 进行查询；如果没有配置，则自动选择
    $[$.QUERY_API || (query.length > 200 ? 'bd' : 'yd')].query( query );
};

/**
 * 一个更高级的用于替换 typeof 运算符的方法
 * 根据 [[Class]] 标识返回类型
 * 由于$.extend依赖于它，所以优先定义
 * @param test
 * @returns {string}
 */
$.type = function ( test ) {
    "use strict";
    return {}.toString.call( test ).slice( 8 , -1 ).toLowerCase();
};

/**
 * 深复制的方法
 * @returns {*}
 */
$.extend = function () {
    'use strict';

    // 第一个参数是目标对象
    var target ,

    // 读取参数个数
        l = arguments.length,

    // 循环用变量
        i ,

    // 这个变量用于临时的保存参数对象
        temp,

    // 临时的键值
        name,

    // 缓存函数
        type = $.type,

    //用于保存临时属性
        attr;

    // 如果参数的个数只有一个
    if ( l === 1 ) {

        // 则把 this 作为被扩展的对象
        target = this;
        i = 0;
    } else {
        target = arguments[0];
        i = 1;
    }

    /*
     * 循环变量
     * 从第二个参数开始循环，排在后面的对象会覆盖前面对象的同名属性
     * 之所以在初始化条件里写一个 i ，是为了不让 JSLint 报错。。。
     * */
    for ( i ; i < l ; i += 1 ) {

        // 临时保存参数
        temp = arguments[i];

        // 每个参数都应该是一个对象，所以使用 for...in 进行枚举
        for ( name in temp ) {

            // 这里没有检测原型链，原因在于 混入 模式
            attr = temp[name];

            // 检测这个属性是否对象
            switch ( type( attr ) ) {

                //如果这个属性是对象或者数组
                case 'object':

                    // 则递归的调用自身把属性给添加进去
                    $.extend( target[name] = {} , attr );
                    break;

                case 'array':
                    $.extend( target[name] = [] , attr );
                    break;

                default :

                    //否则直接复制
                    target[name] = attr;
                    break;
            }

        }

    }
    return target;
};

// 扩展全局变量 $，添加一些公用的工具函数及对象父类
$.extend( {

    // 与 chrome.storage 一致的默认配置项
    QUERY_API : '' , // 使用哪个 api 进行翻译，默认是自动选择

    // 扩展程序的根目录
    root : chrome.extension.getURL( '/' ) ,

    // 浏览器使用的语言，简单的通过这个判断是不是外国人
    zh : navigator.language.indexOf( 'zh' ) >= 0 ,

    /**
     * 封装一层 Object.create，避免每次都手动书写描述符的 value 属性
     * @param superObj
     * @param selfProperties
     * @returns {object}
     */
    inherit : function ( superObj , selfProperties ) {
        'use strict';
        var key , desObj = {};

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
        return Object.create( superObj , desObj );
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
        switch ( this.type( data ) ) {
            case 'object':
                result = [];

                for ( name in data ) {
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
                throw new TypeError( '$.encode()：参数必须是对象或者字符串！' );
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
        var x = $.extend( {
            method : 'GET' ,
            data : ''
        } , requestObj ), r = new XMLHttpRequest(), sender = null;

        // 将对象编码
        x.data = this.encode( x.data );

        //GET请求的参数写在 url 后面
        if ( x.method === 'GET' ) {
            x.url += '?' + x.data;
        }

        r.open( x.method , x.url );

        if ( x.method === 'POST' ) {
            r.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" );
            sender = x.data;
        }

        if ( callback ) {

            // 不要直接将事件直接设为 callback ，方便外部函数使用 bind 方法自定义回调函数内部的 this
            r.onreadystatechange = function ( e ) {
                callback( r , e );
            };
        }

        //如果是 POST 请求，则发送 data
        r.send( sender );
        return this;
    } ,

    /**
     * 封装一层读取数据的方法
     * @param key
     * @param callback
     */
    load : function ( key , callback ) {
        "use strict";
        chrome.storage.local.get( key , callback );
        return this;
    } ,

    /**
     * 封装一层读取对应语言字符串的方法
     * @param key
     * @returns {string}
     */
    i18n : function ( key ) {
        "use strict";
        return chrome.i18n.getMessage( key );
    } ,

    /**
     * chrome不会对html文件使用i18n，所以使用js变通实现
     * 不能直接用document.documentElement.innerHTML替换，会导致页面被重写,js失效
     * 约定：所有需要转换文本的节点都需要加一个 data-i18n=key
     * 但这种方法只能更改节点的 textContent，节点属性要怎么办。。
     *
     * 节点属性的文本暂时用一些不太涉及语言的方法来表示吧。。或者使用少量的英语
     */
    i18nForHtml : function () {
        "use strict";
        var i18n = $.i18n;
        Array.prototype.forEach.call( document.querySelectorAll( '[data-i18n]' ) , function ( v ) {
            v.textContent = i18n( v.dataset.i18n );
        } );
        return this;
    } ,

    /**
     * 语音播放的方法
     */
    play : (function () {
        "use strict";
        var audio = new Audio(),
            support = ['zh', 'jp', 'kor', 'en', 'fra'],
            bd = 'http://tts.baidu.com/text2audio?pid=101&ie=UTF-8&spd=3&lan={{lang}}&text={{text}}',
            yd = 'http://tts.youdao.com/fanyivoice?keyfrom=fanyi%2Eweb%2Eindex&le={{lang}}&word={{text}}';
        return function ( query , lang ) {
            var src, a = audio;

            if ( lang === 'zh' ) {
                src = encodeURI( bd.replace( '{{lang}}' , 'zh' ).replace( '{{text}}' , query ) );
            } else {
                switch ( lang ) {
                    case 'en':
                        lang = 'eng';
                        break;
                    case 'jp':
                        lang = 'jap';
                        break;
                    case 'kor':
                        lang = 'ko';
                        break;
                    case 'fra':
                        lang = 'fr';
                        break;
                }
                src = encodeURI( yd.replace( '{{lang}}' , lang ).replace( '{{text}}' , query ) );
            }

            /*
             * bug：有些较短的单词（例如test）如果不重置src（即使URL一样）
             * 则无法播放第二次（第二次调用audio.play()的时候没有声音）
             *
             * fix：无法重复播放的原因，是因为有道接口的问题
             * （具体原因是在于有道的语音接口返回的是一个文件，而不是流。它的响应头里有一个 video.mp3）
             * 百度的接口也有问题。。简单点说，如果浏览器没有使用 206 缓存，就无法重复播放。。
             * 所以也不考虑那么多了，每次阅读的时候都老老实实的直接改变 src 吧
             * */
            a.src = src;
            a.play();
        };
    }()) ,

    /**
     * API 对象的父类，属于 Model 层
     */
    TranslateAPI : {

        /**
         * 查询方法，查询结束后会使用实例的 handleTemplate() 方法处理模板
         * @param queryString
         * @param options 不同的查询api有不同的设置
         * @returns {object}
         */
        query : function ( queryString , options ) {
            'use strict';
            var data = $.extend( {} , this.data ), temp;

            // 发送统计消息
            chrome.runtime.sendMessage( null , this.id );

            //如果传入的是字符串，则默认为查询内容
            data.q = queryString;

            // 百度有多语言
            if ( options && this.id === 'bd' ) {
                temp = options.from;
                if ( temp ) {
                    data.from = temp;
                }
                temp = options.to;
                if ( temp ) {
                    data.to = temp;
                }
            }

            $.ajax( {
                url : this.url ,
                method : this.method ,
                data : data
            } , function ( r , e ) {
                if ( r.readyState === 4 && r.status === 200 ) {

                    //第一个参数是翻译结果，第二个参数是用于查询的api对象
                    this.result2obj( r.responseText , data.q );
                }
            }.bind( this ) );

            return this;
        } ,

        /**
         * 将查询结果转换为同一的模板对象。
         * 由于每个接口的查询结果不同，所以每个接口都应该实现一个自己的方法
         */
        result2obj : function ( fuck , you ) {
            "use strict";
            throw new ReferenceError( 'result2obj：每个api对象都应该有自己的转换方法！' );
        }
    } ,

    /**
     * 每个页面的控制器父类。。
     * 虽然没有什么值得添加进去的方法，还是先留一个吧
     */
    Controller : {} ,

    /**
     * 每个页面的视图父类
     */
    View : {}

} );

// 将 $ 包装为 订阅/发布 模式
$.extend( (function () {
    'use strict';

    // 私有事件
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
                a = callbacks[args.shift()];

            if ( a && a.length !== 0 ) {
                a.forEach( function ( v ) {
                    v.apply( this , args );
                } );
            }
            return this;
        }
    };
}()) );

// 定义翻译接口
$.extend( {

    // 有道翻译接口
    yd : $.inherit( $.TranslateAPI , {
        id : 'yd' ,

        // 下面一部分是查询的接口
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

        /**
         * 有道的 result2obj 方法
         * @param result
         * @param query
         */
        result2obj : function ( result , query ) {
            'use strict';
            var obj = {}, r;

            if ( result === 'no query' ) {
                obj.error = 30;
            } else {

                r = JSON.parse( result );

                //查询的字符串
                obj.query = query;

                if ( r.errorCode === 0 ) {

                    /*
                     * 对于单词和短语，有道翻译有详细的解释，但对于长文本则没有
                     * result.basic.explains 是一个数组，每个元素都是对查询的文本的详细解释
                     * result.basic下还有一个 phonetic 字符串属性，表示查询单词的音标
                     */
                    if ( r.basic ) {
                        obj.detailed = r.basic.explains;

                        // 如果有音标
                        if ( r.basic.phonetic ) {
                            obj.phonetic = '/' + r.basic.phonetic + '/';
                        }
                    }

                    //翻译结果，虽然这是一个数组，但至今只有一个元素
                    obj.result = r.translation[0];

                    /*
                     * 有道翻译还提供相关的单词或短语
                     * web 是一个数组，每个数组元素都是一个对象
                     * 这种对象有一个字符串属性 key，是相关的单词或短语
                     * 另有一个数组属性 value ，包含对相关单词的解释，一般有三个解释
                     */
                    if ( r.web ) {
                        obj.related = r.web;
                    }
                } else {

                    obj.error = r.errorCode;
                }
            }
            // 在全局对象上触发这个事件
            $.pub( 'query' , obj , $.yd );
            return this;

        } ,

        // 下面一部分用于模板
        viaName : $.i18n( 'YDAPIName' ) ,
        viaLink : 'http://fanyi.youdao.com/translate?i={{query}}' ,
        errorMsg : {
            20 : $.i18n( 'YDError20' ) ,
            30 : $.i18n( 'YDError30' ) ,
            40 : $.i18n( 'YDError40' ) ,
            50 : $.i18n( 'YDError50' )
        }
    } ) ,

    // 百度翻译接口
    bd : $.inherit( $.TranslateAPI , {
        id : 'bd' ,

        // 下面一部分是查询的接口
        method : 'POST' ,
        url : 'http://openapi.baidu.com/public/2.0/bmt/translate' ,
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

        /**
         * 当使用 bd 接口返回结果时，将结果转换为统一的模板对象
         * 而后在全局变量 $ 上触发 query 事件
         * @param result
         * @param query
         */
        result2obj : function ( result , query ) {
            'use strict';
            var obj = {}, r = JSON.parse( result );

            //公用的模板对象由五个部分构成：

            //查询的字符串
            obj.query = query;

            //如果有错误码则直接处理错误
            if ( r.error_code ) {
                obj.error = r.error_code;
            } else {

                //百度翻译接口有源语种，有道翻译没有
                obj.from = r.from;

                //百度翻译接口有目标语种，有道翻译没有
                obj.to = r.to;

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
                            obj.result = arr.join( '\n' );
                        }
                    };
                }()) );
            }

            //在全局对象上触发这个事件
            $.pub( 'query' , obj , $.bd );
            return this;
        } ,

        // 下面一部分用于模板
        viaName : $.i18n( 'BDAPIName' ) ,
        viaLink : 'http://fanyi.baidu.com/#{{from}}/{{to}}/{{query}}' ,
        errorMsg : {
            52001 : $.i18n( 'BDError52001' ) ,
            52002 : $.i18n( 'BDError52002' ) ,
            52003 : $.i18n( 'BDError52003' )
        }
    } )
} );

// 将保存在 chrome.storage 中的公共配置读取至全局变量上
$.load( 'QUERY_API' , function ( items ) {
    "use strict";

    // 保存完配置后，触发 ready 事件
    $.extend( items ).pub( 'ready' );
} );
