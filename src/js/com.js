var $ = function () {
    "use strict";

};

$.extend = function () {
    'use strict';

    // 第一个参数是目标对象
    var target = arguments[0],

    // 读取参数个数
        i = arguments.length,

    // 这个变量用于临时的保存参数对象
        temp,

    // 临时的键值
        name,

    // 缓存函数
        isArray = Array.isArray,

    //用于保存临时属性
        attr,

        type,

        src;

    /*
     * 循环变量
     * 之所以在这里 减等于一 是因为数组中最后一个元素是  arr[ arr.length - 1 ]
     * 同时在每次循环结束后自减
     * 之所以不等于零，是因为第一个参数被用作目标对象，所以不用处理
     * */
    while ( (i -= 1) > 0 ) {

        // 保存临时对象
        temp = arguments[i];

        // 每个参数都应该是一个对象，所以使用 for...in 进行枚举
        for ( name in temp ) {

            //检查原型链
            if ( temp.hasOwnProperty( name ) ) {
                attr = temp[name];
                type = typeof attr;

                // 检测这个属性是否对象或者函数
                switch ( type ) {
                    case 'object':

                        //如果是数组
                        if ( Array.isArray( attr ) ) {
                            target[name] = [];
                        } else {
                            target[name] = {};
                        }

                        $.extend( target[name] , attr );
                        break;

                    default :
                        target[name] = attr;
                        break;
                }
            }

        }

    }

    return target;
};

$.extend( $ , {

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
} );

var test = {};

var ddddddd = $.extend( test , {

    dddddd : ['test']

} , {
    dfsfdsf : 'dfsdfsdf'
} );
