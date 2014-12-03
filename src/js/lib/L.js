/**
 * @file 一个HTML5库文件，定义了许多有用的公用方法
 * @author milk.lee@qq.com
 * @version 1.0.4
 * @since 2014/10/19
 */

(function ( global , factory ) {
    "use strict";

    if ( typeof define === 'function' && define.amd ) {
        define( factory );
    } else {
        global.L = factory();
    }

}( this , function () {
    "use strict";
    var L;

    /**
     * 选择器方法。这个方法默认使用querySelectorAll
     * 但如果s的格式是 #id、.class、element这三个中的一个，那么会换用对应的专用方法如getElementById
     * @param {String} s
     * @param {Node|Boolean} context 默认为document
     * @param {Boolean=} chooseAll 是否使用 querySelectorAll。如果没有context，那么这个参数就是第二个
     * @returns {NodeList}
     */
    L = function ( s , context , chooseAll ) {

        var func;

        if ( true === context ) {
            chooseAll = true;
            context = document;
        }

        if ( chooseAll ) {
            chooseAll = 'querySelectorAll';
        }

        s = s.trim();

        // 如果字符串里面不带下面的符号，那么就可以断定它只选择了单个元素
        // 即  #id 、 .class、element这三种
        if ( /^[^:\[\s,>+~][^:\[\s,>+~.#]+$/.test( s ) ) {
            switch ( s[ 0 ] ) {
                case '.':
                    func = 'getElementsByClassName';
                    s = s.slice( 1 );
                    break;

                case '#':
                    func = 'getElementById';
                    s = s.slice( 1 );
                    context = document; // 这个方法只有document有
                    break;

                default:
                    func = 'getElementsByTagName';
                    break;
            }
        } else {
            func = chooseAll || 'querySelector'; // 默认使用这个万能的
        }
        return ( context || document )[ func ]( s );
    };

    /**
     * 一个更高级的用于替换 typeof 运算符的方法
     * 根据 [[Class]] 标识返回类型
     * @param test
     * @returns {string}
     */
    L.type = function ( test ) {
        return Object.prototype.toString.call( test ).slice( 8 , -1 ).toLowerCase();
    };

    /**
     * 封装一层 for in 逻辑。实际上使用Object.keys+forEach实现
     * @param o
     * @param {Function} handle 如果要中断枚举，就在函数中返回true
     * @returns {*}
     */
    L.forIn = function ( o , handle ) {
        Object.keys( o ).some( handle , o );
        //    var name;
        //    for ( name in o ) {
        //        if ( o.hasOwnProperty( name ) ) {
        //            if ( false === handle( name ) ) {
        //                break;
        //            }
        //        }
        //    }
        return o;
    };

    /**
     * 如同方法名，浅复制
     * @param {{}} to 这个对象接收来自参数 from 的属性和值
     * @param {{}=} from 这个对象的自有属性都会被覆盖到参数 to
     * @returns {*}
     */
    L.shallowCopy = function ( to , from ) {

        // 只有一个参数时
        if ( !from ) {
            from = to;
            to = {};
        }

        L.forIn( from , function ( name ) {
            to[ name ] = from[ name ];
        } );
        return to;
    };

    /**
     * 深复制的方法。对数组和对象进行了深复制，其它类型一律直接赋值
     * @param to
     * @param {=} from
     * @returns {*}
     */
    L.deepCopy = function deepCopy( to , from ) {

        // 只有一个参数时
        if ( !from ) {
            from = to;
            to = {};
        }

        L.forIn( from , function ( name ) {
            var v = from[ name ];
            if ( Array.isArray( v ) ) {
                deepCopy( to[ name ] = [] , v );
            } else if ( 'object' === L.type( v ) ) {
                deepCopy( to[ name ] = {} , v );
            } else {
                to[ name ] = v;
            }
        } );
        return to;
    };

    /**
     * 将对象转换为查询字符串，例如 { x:1 , y:[1,2] }转换为 x=1&y=1&y=2，也可以反过来
     * @param {{}|string} o
     * @returns {{}|string}
     */
    L.obj2data = function ( o ) {
        var r , t;
        if ( 'object' === typeof o ) {
            r = [];
            L.forIn( o , function ( name ) {
                var v = o[ name ];
                if ( Array.isArray( v ) ) {
                    v.forEach( function ( mutiValue ) {
                        r.push( name + '=' + mutiValue );
                    } );
                } else {
                    r.push( name + '=' + o[ name ] );
                }
            } );
            return r.join( '&' );
        } else {
            t = o.split( '&' );
            r = {};
            t.forEach( function ( v ) {
                var e = v.indexOf( '=' ) ,
                    key = v.slice( 0 , e ) ,
                    value = v.slice( e + 1 );

                if ( r.hasOwnProperty( key ) ) {

                    // 将它转换为一个数组
                    if ( !Array.isArray( r[ key ] ) ) {
                        e = r[ key ];
                        r[ key ] = [ e ];
                    }

                    r[ key ].push( value );
                } else {
                    r[ key ] = value;
                }

            } );
            return r;
        }
    };

    L.ajax = (function () {

        /**
         * ajax函数。todo 待支持 File 与 Blob
         * @param requestObj
         * @param {String} requestObj.url
         * @param {Object|String=} requestObj.data 默认为空字符串，已支持 FormData
         * @param {Number=} requestObj.timeout 默认为0
         * @param {Function=} requestObj.ontimeout 超时函数
         * @param {String=} requestObj.method 默认为 'GET'
         * @param {String=} requestObj.contentType 默认为空，POST请求时默认为application/x-www-form-urlencoded; charset=UTF-8
         * @param {Function=} requestObj.before 在发起请求前触发的事件
         * @param {Function=} requestObj.load 触发load事件时的处理函数
         * @param {Function=} requestObj.error 触发error事件时的处理函数
         * @param {Function=} requestObj.loadend load和error之后均会触发
         * @returns {XMLHttpRequest}
         */
        var ajax = function ( requestObj ) {
            var x = L.shallowCopy( L.shallowCopy( ajax.defaultOptions ) , requestObj ) ,
                dataType = L.type( x.data ) ,
                r = new XMLHttpRequest() ,
                sender = null;

            r.timeout = x.timeout || 0;
            r.ontimeout = x.ontimeout || null;

            if ( 'object' === dataType ) {

                // 将对象编码
                x.data = L.obj2data( x.data );
            } else if ( 'formdata' === dataType ) { // formdata 会自动设置 Content-Type
                x.contentType = false;
                sender = x.data;
            }

            //GET请求的参数写在 url 后面
            if ( x.method === 'GET' && x.data && 'string' === typeof x.data ) {
                x.url += '?' + x.data; // todo 这里没有考虑 url 里本身自带 ? 的情况
            }

            r.open( x.method , x.url );

            // POST 请求默认带上表格编码
            if ( x.method === 'POST' ) {
                undefined === x.contentType && r.setRequestHeader( 'Content-Type' , 'application/x-www-form-urlencoded; charset=UTF-8' );
                sender || (sender = x.data);
            }

            if ( x.contentType ) {
                r.setRequestHeader( 'Content-Type' , x.contentType );
            }

            //        if ( requestObj.load ) {
            r.onload = function () {
                var response;
                if ( x.load ) {

                    // 现在基本上只做JSON请求，所以尝试转换为JSON
                    // 日后再考虑更多返回类型
                    response = r.responseText;
                    try {
                        response = JSON.parse( response );
                    }
                    catch ( e ) {}
                    x.load( response , r );
                }
                x.loadend && x.loadend( r );
            };
            //        }
            //        if ( requestObj.error ) {
            r.onerror = function () {
                x.error && x.error( r );
                x.loadend && x.loadend( r );
            };
            //        }

            if ( x.before && false === x.before( r ) ) {// 在这个事件里面返回false将不会发起请求
                return r;
            }

            r.send( sender );
            return r;
        };

        /**
         * 默认的设置
         * @type {{method: string, data: string}}
         */
        ajax.defaultOptions = {
            method : 'GET' ,
            data : ''
        };

        return ajax;
    }());

    L.pubsub = (function () {

        /**
         * 当对象的 _callbacks 属性不存在时，为对象创建一个并返回它
         * @param o
         * @returns {{}}
         */
        var defineCallbacks = function ( o ) {
            var newCallbacks = {};
            Object.defineProperty( o , '_callbacks' , {
                value : newCallbacks ,
                writable : false ,
                enumerable : false
            } );
            return newCallbacks;
        } ,

        /**
         * 触发事件
         * @param eventName
         * @returns {fire}
         */
        fire = function ( eventName ) {
            var that ,
                args ,
                events = ( this._callbacks || defineCallbacks( this ) )[ eventName ];
            if ( events && events.length ) {
                that = this;
                args = Array.prototype.slice.call( arguments , 1 );
                events.forEach( function ( handle ) {
                    handle.apply( that , args );
                } );
            }
            return this;
        } ,

        /**
         * 删除事件
         * @param eventName
         * @param handle
         * @returns {off}
         */
        off = function ( eventName , handle ) {
            var callbacks = this._callbacks || defineCallbacks( this ) ,
                events = callbacks[ eventName ];
            if ( events && events.length ) {
                if ( handle ) {
                    callbacks[ eventName ] = events.filter( function ( h ) {
                        return h !== handle;
                    } );
                } else {
                    delete callbacks[ eventName ];
                }
            }
            return this;
        } ,

        /**
         * 注册事件
         * @param {String} eventName
         * @param {Function} handle
         * @returns {*}
         */
        on = function ( eventName , handle ) {
            var callbacks = this._callbacks || defineCallbacks( this );

            ( callbacks[ eventName ] || (callbacks[ eventName ] = []) ).push( handle );

            return this;
        };

        /**
         * 为一个对象添加或者创建一个新的订阅/发布模式并返回这个对象
         * @param {Object=} o 如果没有，则默认为一个新的空对象{}
         * @returns {Object} o
         */
        return function ( o ) {
            //        if ( !o ) {
            //            o = {};
            //        }
            return Object.defineProperties( o || {} , {
                fire : { value : fire , writable : false , enumerable : false } ,
                off : { value : off , writable : false , enumerable : false } ,
                on : { value : on , writable : false , enumerable : false }
            } );
            //        o.fire = fire;
            //        o.off = off;
            //        o.on = on;
            //        return o;
        };
    }());

    /**
     * 用于循环一个类数组对象，例如节点集合、arguments
     * @param like_arr 类数组对象
     * @param {Function} func 回调函数。中止循环就返回 true
     * @param {=} thisArg 用于回调函数的 this 参数，默认为null
     * @returns {*}
     */
    L.forEach = function ( like_arr , func , thisArg ) {
        Array.prototype.some.call( like_arr , func , thisArg || null );
        return like_arr;
    };

    /**
     * DOM方法：根据条件返回第一个匹配的父元素。常用于事件委托。
     * @param {Element} start_node 起始节点
     * @param {String|Function} selector 匹配的选择器字符串，或者一个用于匹配的函数
     * @param {=} thisArg
     * @returns {Element|null}
     */
    L.parent = function ( start_node , selector , thisArg ) {
        var c = typeof selector === 'string' ? function ( t ) {
            return t.matches( selector );
        } : selector;

        //    var t = start_node;
        while ( !c.call( thisArg , start_node ) ) {
            if ( 'HTML' === start_node.nodeName ) { // 循环到html元素则结束
                return null;
            }
            start_node = start_node.parentNode;
        }
        return start_node;
    };

    /**
     * 找到匹配 selector 的所有父元素
     * @param {Element} start_node
     * @param selector
     * @param {Element=} end_node
     * @returns {null|Array}
     */
    L.parents = function ( start_node , selector , end_node ) {
        var result , dom_html = document.documentElement;

        if ( !end_node ) {
            end_node = dom_html;
        }

        for ( result = [] ; start_node && start_node !== end_node && start_node !== dom_html ; start_node = start_node.parentNode ) {
            if ( start_node.matches( selector ) ) {
                result.push( start_node );
            }
        }
        if ( !result.length ) {
            result = null;
        }
        return result;
    };

    /**
     *
     * @param context
     * @param {String} event
     * @param {String|Function} selector
     * @param {Function=} handle
     * @param {Boolean=} capture
     */
    L.on = function ( context , event , selector , handle , capture ) {
        var h;

        if ( 'function' === typeof selector ) {
            capture = !!handle;
            handle = selector;
            selector = null;
        }

        if ( selector ) {
            h = function ( e ) {
                var l = L.parents( e.target , selector , context );
                if ( l ) {
                    l.forEach( function ( node ) {
                        handle.call( node , e );
                    } );
                }
            };
        } else {
            h = handle;
        }
        event.split( /\s*,\s*/ ).forEach( function ( eventName ) {
            context.addEventListener( eventName , h , !!capture );
        } );
    };

    return L;
} ));
