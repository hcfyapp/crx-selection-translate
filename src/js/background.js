// 谷歌分析
var _gaq = _gaq || [];
_gaq.push( ['_setAccount', 'UA-43276752-1'] );

(function ( L , win ) {
    "use strict";
    var back = {

        settings : {
            enableMenu : true , // 是否创建右键菜单
            defaultMenu : { // 默认的菜单设置项
                contexts : ['all'] ,
                documentUrlPatterns : ['http://*/*', 'https://*/*', 'file:///*', 'about:blank']
            }
        } ,

        // 需要创建的菜单，位置右上至下
        menus : {

            youdao : { // 有道翻译
                id : 'youdao' ,
                title : '用 有道 翻译“%s”' ,
                contexts : ['selection']
            } ,

            baidu : { // 百度翻译
                id : 'baidu' ,
                title : '用 百度 翻译“%s”' ,
                contexts : ['selection']
            } ,

            google : { // 谷歌翻译
                id : 'google' ,
                title : '用 谷歌 翻译“%s”' ,
                contexts : ['selection']
            } ,

            ydw : { // 有道网页翻译，不能在https下使用
                id : 'ydw' ,
                title : '翻译网页'// ,
                //documentUrlPatterns : ['http://*/*', 'file:///*', 'about:blank']
            } ,

            // 分隔符1
            s1 : {
                type : 'separator' ,
                id : 's1'
            } ,

            // 划词翻译开关
            selectionOpen : {
                type : 'radio' ,
                id : 'selectionOpen' ,
                title : '开启划词翻译'
            } ,

            selectionClose : {
                type : 'radio' ,
                id : 'selectionClose' ,
                title : '关闭划词翻译'
            } ,

            options : {
                id : 'options' ,
                title : '设置'
            }
        } ,

        /**
         * 创建右键菜单
         * @param {Function=} alreadyCreateCallback 当菜单已经创建过时，会为这个菜单调用这个函数，并传入菜单的menuId
         * @returns {back}
         */
        createMenus : function ( alreadyCreateCallback ) {
            var defaultMenu = this.settings.defaultMenu;
            L.forIn( this.menus , function ( key ) {

                chrome.contextMenus.create( L.shallowCopy( L.shallowCopy( defaultMenu ) , this[key] ) , function () {
                    if ( alreadyCreateCallback ) {
                        alreadyCreateCallback( key );
                    }
                } );

            } );
            return this;
        } ,

        /**
         * 删除所有菜单项
         * @param {Function=} callback
         * @returns {back}
         */
        removeAllMenus : function ( callback ) {
            chrome.contextMenus.removeAll( callback );
            return this;
        } ,

        /**
         * 设置
         * @param {String} setting storage key，前缀应该是 content:
         * @param value 值
         * @returns {*}
         */
        setSetting : function ( setting , value ) {
            var key = setting.slice( 5 );
            this.settings[ key ] = value;

            if ( 'enableMenu' === key && !value ) {
                this.removeAllMenus();
            }

            return this;
        } ,

        /**
         * 切换右键菜单里面的划词翻译开关
         * @param value
         * @returns {back}
         */
        switchSelectionEnable : function ( value ) {
            var open = (value === true || value === undefined) ? 'selectionOpen' : 'selectionClose',
                close = 'selectionOpen' === open ? 'selectionClose' : 'selectionOpen';
            chrome.contextMenus.update( open , { checked : true } );
            chrome.contextMenus.update( close , { checked : false } );
            return this;
        }
    };

    chrome.storage.local.get( ['back:enableMenu', 'content:enable'] , function ( storages ) {
        var temp = storages[ 'back:enableMenu' ];
        if ( undefined !== temp ) {
            back.settings.enableMenu = temp;
        }

        if ( back.settings.enableMenu ) {
            back.createMenus().switchSelectionEnable( storages[ 'content:enable'] );

            //temp = storages[ 'content:enable'];
            //console.dir( storages );
            //chrome.contextMenus.update( (temp === true || temp === undefined) ? 'selectionOpen' : 'selectionClose' , { checked : true } );
        }
    } );

    // 处理设置变更
    chrome.storage.onChanged.addListener( function ( changes ) {
        L.forIn( changes , function ( key ) {

            // 仅处理后台脚本相关的设置，前面一律带一个 back: 命名空间
            if ( 0 === key.indexOf( 'back:' ) ) {
                back.setSetting( key , changes[ key ].newValue );
            } else if ( 'content:enable' === key ) {
                back.switchSelectionEnable( changes[ key ].newValue );
            }

        } );
    } );

    // 将划词翻译开关默认打开
    chrome.runtime.onInstalled.addListener( function ( details ) {
        if ( 'install' === details.reason ) {
            chrome.storage.local.set( { 'content:enable' : true , 'back:enableMenu' : true } );
        }
    } );

}( L , window ));

//右键菜单点击事件
chrome.contextMenus.onClicked.addListener( function ( info , tab ) {
    'use strict';
    var menuId = info.menuItemId;

    // 跟踪右键菜单使用情况
    _gaq.push( ['_trackEvent' , 'MenusClick', menuId] );

    switch ( menuId ) {

        case 'options':
            chrome.tabs.create( { url : '/options.html' } );
            break;

        case 'selectionOpen':
        case 'selectionClose':

            chrome.storage.local.set( { 'content:enable' : 'selectionOpen' === menuId } );
            break;

        default :
            chrome.tabs.sendMessage( tab.id , info );
            break;
    }
} );

// 需要在后台处理的情况
chrome.runtime.onMessage.addListener( function ( msgObj , sender , response ) {
    "use strict";

    var data = msgObj.data;

    switch ( msgObj.action ) {
        case 'translate':
            Apis[data.apiId || 'youdao'].translate( data , function ( resultObj , api ) {
                //console.log( resultObj );
                response( [resultObj, api] );
            } );

            return true; // 尼玛，看了 chrome 对消息传递的源码实现才知道要返回 true 才能异步发送消息 extensions::messaging 126行

        case 'play': // 阅读
            Apis[data.apiId || 'youdao'].speak( data.text );
            return;
    }
} );
