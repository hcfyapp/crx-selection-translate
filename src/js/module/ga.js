/**
 * @file 谷歌分析
 */

var _gaq = _gaq || [];
_gaq.push( [ '_setAccount' , 'UA-43276752-1' ] );
define( [ 'https://ssl.google-analytics.com/ga.js' ] , function () {
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
