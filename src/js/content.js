(function ( L , selection , doc , win ) {
    "use strict";

    // todo it's just a test,need delete
    selection.settings.template = '{{= it[0].result }}';
    selection.settings.cssText = 'lmk-container { position: absolute; }';

    L.shallowCopy( selection , {

        root : chrome.extension.getURL( '' ) ,

        /**
         * 设置
         * @param {String} setting storage key，前缀应该是 content:
         * @param value 值
         * @returns {*}
         */
        setSetting : function ( setting , value ) {
            this.settings[ setting.slice( 8 ) ] = value;
            return this;
        } ,

        getSettings : function () {
            var settings = this.settings, keys = [], selection = this;
            L.forIn( settings , function ( key ) {
                keys.push( 'content:' + key );
            } );

            // get 方法只会返回在storage中存在的键；如果没有，就不会返回
            chrome.storage.local.get( keys , function ( items ) {
                L.forIn( items , function ( itemKey ) {
                    selection.setSetting( itemKey , items[ itemKey ] );
                    //                    settings[ itemKey.slice( 8 ) ] = items[ itemKey ];
                } );
            } );
            return this;
        } ,

        /**
         * 检测标签页是否在 iframe 中运行
         * 需要使用这个属性来过滤从后台页面发送过来的消息
         */
        frameUrl : (function () {
            return win.top === win.self ? null : location.href;
        }()) ,

        /**
         * 有道网页翻译的方法
         */
        web : function () {

            if ( !L( '#OUTFOX_JTR_CDA' ) ) {

                var h = "https://fanyi.youdao.com/web2", o = document, b = o.body, d, k , a, l, g, c, f;
                if ( !window.OUTFOX_JavascriptTranslatoR ) {
                    d = doc.createElement( 'script' );
                    d.src = this.root + 'js/ydwa.js';
                    d.async = true;
                    doc.head.appendChild( d );
                } else {
                    k = "https://fanyi.youdao.com";
                    a = "/web2/conn.html";
                    l = h + "/index.do";
                    g = k + "/jtr";
                    c = h + "/rl.do";
                    f = h + "/styles/all-packed.css";
                    J.loadCSS( o , f );
                    window.OUTFOX_JavascriptTranslatoR = new J.TR.UI( b , {domain : k , update : false , updateTipMsg : "增加关闭按钮" , updateDate : "2011-3-15" , cssURL : f , tipsURL : l , transURL : g , logURL : c , connFilePath : a , reqSize : 20} );
                }
            }
            return this;
        }
    } );

    /**
     * 统一接收消息
     * 接收的消息目前有两种：
     * 1）bd、yd、ydw，这三种是翻译命令，需要匹配到具体的 frame
     * */
    chrome.runtime.onMessage.addListener( function ( info ) {
        var menuId = info.menuItemId;

        //        console.dir( info );

        // 如果有这个属性，说明这个消息是从右键菜单传来的，属于 yd、bd、ydw中的一个
        if ( menuId ) {

            /**
             * 由于每个页面（包括 iframe）都有内容脚本
             * 所以一个页面可能会执行多次请求
             * 下面的判断保证请求只会在点击的页面上发生
             */
            if ( info.frameUrl ? selection.frameUrl === info.frameUrl : !selection.frameUrl ) {
                if ( menuId === 'ydw' ) {
                    selection.web();
                } else {
                    selection.translate( menuId );
                }
            }
        }
    } );

    selection.getSettings(); // 读取设置

    // 处理设置变更
    chrome.storage.onChanged.addListener( function ( changes ) {
        L.forIn( changes , function ( key ) {
            //            var setting;

            // 仅处理内容脚本相关的设置，前面一律带一个 content: 命名空间
            if ( 0 === key.indexOf( 'content:' ) ) {
                selection.setSetting( key , changes[ key ].newValue );
            }
        } );
    } );
}( L , Selection , document , window ));
