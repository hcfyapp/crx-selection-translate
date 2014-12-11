/**
 * @file 谷歌分析
 */

var _gaq = _gaq || [];
_gaq.push( [ '_setAccount' , 'UA-43276752-1' ] );

// 不要把 ga.js 作为依赖加载，否则一些加载慢的地区会导致后台准备时间过长
require( [ 'https://ssl.google-analytics.com/ga.js' ] );

define( function () {
    "use strict";
    var ver = chrome.runtime.getManifest().version;
    return Object.freeze( {
        push : function ( argsArr ) {

            // 为事件追踪加上默认的标签，即第四个参数
            if ( '_trackEvent' === argsArr[ 0 ] && 3 === argsArr.length ) {
                argsArr.push( ver );
            }
            _gaq.push( argsArr );
            return this;
        } ,

        /**
         * 事件追踪，省略了总是要输入 _trackEvent 的麻烦
         * @param type
         * @param value
         * @returns {*}
         */
        track : function ( type , value ) {
            return this.push( [ '_trackEvent' , type , value ] );
        }
    } );
} );
