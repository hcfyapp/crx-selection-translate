/**
 * 定义全局变量 $ ，以及一些常用的工具函数
 */
var $ = {

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
     * 测试target节点是否是source的子节点
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
     * 扩展对象的方法
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
        if ( x.method === 'GET' ) {x.url += '?' + x.data;}

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
 * 定义 Model 层
 * @type {{fn: {}, create: Function, init: Function}}
 */
$.M = {

    //类似构造函数的 prototype 属性，用于实例继承
    fn : {} ,

    /**
     * 创建继承于Model的子类
     */
    create : function () {
        'use strict';
        var obj = Object.create( this );

        //指明它的父类
        obj.parent = this;

        //单独继承父类的 fn，否则当Model的fn对象变动时，子类不会变动
        obj.fn = Object.create( this.fn );

        return obj;
    } ,

    /**
     * 创建类的实例，如果有参数且参数为对象，则将参数中的属性添加进实例中
     * @param attributes 要添加进实例的 名/值 对
     * @returns {object} 创建好的实例对象
     */
    init : function ( attributes ) {
        'use strict';
        var instance = Object.create( this.fn );

        //将自定义属性添加至实例当中
        if ( typeof attributes === 'object' ) {
            $.extend( instance , attributes );
        }

        return instance;
    }
};

/**
 * MVC 中的 View 层
 * @param inculdes
 * @constructor
 */
$.V = function ( inculdes ) {
    'use strict';
    if ( typeof inculdes === 'object' ) {
        $.extend( this , inculdes );
    }
};

/**
 * 针对不同的页面（标签页、弹出页）都应该有不同的生成方法（因为模板可能不同）
 * 所以如果调用到了下面这个generate方法
 * 说明对应的页面没有自定义generate方法
 */
$.V.prototype.generate = function () {
    'use strict';
    throw new Error( 'generate()：没有实现对应的generate方法！' );
};

/**
 * MVC中的 Controller 层
 */
$.C = function ( inculdes ) {
    'use strict';
    if ( typeof inculdes === 'object' ) {
        $.extend( this , inculdes );
    }
};

/**
 * 全局的 Event 类
 * @param inculdes
 * @constructor
 */
$.E = function ( inculdes ) {
    'use strict';
    if ( typeof inculdes === 'object' ) {
        $.extend( this , inculdes );
    }
};

//封闭一个局部作用域，使用全局变量 $ 作为上下文
(function () {
    'use strict';
    //用于管理翻译 api 的 Model 子类
    var Apis = this.M.create();

    //扩展 Apis 的实例方法
    this.extend( Apis.fn , {

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

            //            console.debug( '查询开始' );
        }
    } );

    //在全局变量 $ 上挂载控制器实例
    this.yd = new this.C();
    this.bd = new this.C();
    this.ydw = new this.C();

    //有道网页翻译只有一个方法，就是插入有道的翻译脚本
    this.ydw.m = Apis.init( {
        query : function () {
            var e;
            if ( !document.getElementById( 'OUTFOX_JTR_CDA' ) ) {
                e = document.createElement( 'script' );
                e.id = 'outfox_seed_js';
                e.charset = "utf-8";
                e.src = $.rootPath + 'js/ydw.js';
                document.getElementsByTagName( 'script' )[0].appendChild( e );
            }
        }
    } );

    //百度翻译接口
    this.bd.m = Apis.init( {
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
         * 而后调用视图（$.V）来创建HTML
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

            //交给视图去处理
            $.bd.v.generate( templateObj );

            return this;
        }
    } );

    //百度翻译视图
    this.bd.v = new this.V( {
        viaName : '百度翻译' ,
        viaLink : 'http://fanyi.baidu.com/#{{from}}/{{to}}/{{query}}' ,
        errorMsg : {
            52001 : '百度翻译太忙了，稍后再试试看，或者用有道翻译吧。' ,
            52002 : '百度翻译出错了！用有道试试吧。' ,
            52003 : '天呐！如果你看见这条错误信息，说明由于使用右键翻译的人数过多，导致百度翻译封禁了翻译功能！请火速发送邮件至 i@lmk123.com 反应情况！'
        }
    } );

    //有道翻译接口
    this.yd.m = Apis.init( {
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
         * 当使用有道翻译接口返回结果时，将结果转换为统一的模板对象
         * 而后调用视图实例的 generate() 方法来创建HTML
         * @param result
         * @param query
         */
        handleTemplate : function ( result , query ) {
            var templateObj = {}, r = JSON.parse( result );

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

            //交给视图去处理
            $.yd.v.generate( templateObj );

            return this;
        }
    } );

    //有道翻译视图
    this.yd.v = new this.V( {
        viaName : '有道翻译' ,
        viaLink : 'http://fanyi.youdao.com/translate?i={{query}}' ,
        errorMsg : {
            20 : '有道翻译服务一次性只能翻译200个字符哦，长文本就用百度翻译吧！' ,
            30 : '你查询的文本太难了，有道翻译不出来  :( 试试百度翻译吧！' ,
            40 : '有道翻译不支持这种语言哦，试试百度翻译！' ,
            50 : '天呐！如果你看见这条错误信息，说明由于使用右键翻译的人数过多，导致有道翻译封禁了翻译功能！请火速发送邮件至 i@lmk123.com 反应情况！'
        }
    } );
}.bind( $ ))();
