//谷歌分析
var _gaq = _gaq || [], $ = {
    /**
     * 扩展程序根目录
     */
    rootPath : chrome.extension.getURL( "/" ) ,
    /**
     * 写一些不方便异步获取的硬性配置
     */
    config : {
        apis : {
            youdao : {
                method : 'GET' ,
                url : 'http://fanyi.youdao.com/openapi.do?keyfrom=chrome&key=1361128838&type=data&doctype=json&version=1.1&q={query}' ,
                data : null
            } ,
            baidu : {
                method : 'POST' ,
                url : 'http://openapi.baidu.com/public/2.0/bmt/translate' ,
                data : 'client_id=ZGoZqZPUPtSXCmdlCrtqEKFz&from={from}&to={to}&q={query}'
            }
        } ,
        menus : function () {
            var documentUrlPatterns = [
                "http://*/*", "https://*/*", "file:///*", "about:blank"
            ], sendCommand = function ( info , tab ) {
                //统计右键api使用情况
                _gaq.push( ['_trackEvent', info.menuItemId, 'context'] );
                //直接把整个info发过去，用于辨别frame的问题
                chrome.tabs.sendMessage( tab.id , info );
            };
            return {
                youdao : {
                    id : 'youdao' ,
                    title : '用 有道 翻译“%s”' ,
                    contexts : ['selection'] ,
                    documentUrlPatterns : documentUrlPatterns ,
                    //当右键菜单被点击时，直接发送命令（即ID）至内容脚本
                    onclick : sendCommand ,
                    //内容脚本收到命令时的处理函数
                    onmessage : function () {
//                        console.log('收到几次？');
                        //$.selection与$.handleResult仅在内容脚本中才有
                        $.query( {api : 'youdao' , q : $.selection} , $.handleResult );
                    }
                } ,
                baidu : {
                    id : 'baidu' ,
                    title : '用 百度 翻译“%s”' ,
                    contexts : ['selection'] ,
                    documentUrlPatterns : documentUrlPatterns ,
                    onclick : sendCommand ,
                    //内容脚本收到命令时的处理函数
                    onmessage : function () {
                        //$.selection与$.handleResult仅在内容脚本中才有
                        $.query( {api : 'baidu' , q : $.selection} , $.handleResult );
                    }
                } ,
                youdaoweb : {
                    id : 'youdaoweb' ,
                    title : '翻译网页' ,
                    contexts : ['all'] ,
                    documentUrlPatterns : documentUrlPatterns ,
                    onclick : sendCommand ,
                    //内容脚本收到命令时的处理函数
                    onmessage : function () {
                        //统计右键网页翻译使用情况
                        _gaq.push( ['_trackEvent', 'youdaoweb', 'context'] );
                        if ( document.getElementById( 'OUTFOX_JTR_CDA' ) ) {return;}
                        var e = document.createElement( 'script' );
                        e.id = 'outfox_seed_js';
                        e.charset = "utf-8";
                        e.setAttribute( 'src' , $.rootPath + 'js/youdaoweb.js' );
                        document.body.appendChild( e );
                    }
                } ,
                s1 : {
                    type : 'separator' ,
                    id : 's1' ,
                    contexts : ['all'] ,
                    documentUrlPatterns : documentUrlPatterns
                } ,
                select : {
                    type : 'checkbox' ,
                    id : 'select' ,
                    title : '划词翻译' ,
                    contexts : ['all'] ,
                    documentUrlPatterns : documentUrlPatterns ,
                    onclick : function ( info , tab ) {
                        //通过存储来触发onChanges事件，写在背景页js里
                        chrome.storage.local.set( {'isSelection' : info.checked} );
                    }
                } ,
                s2 : {
                    type : 'separator' ,
                    id : 's2' ,
                    contexts : ['all'] ,
                    documentUrlPatterns : documentUrlPatterns
                } ,
                donate : {
                    id : 'donate' ,
                    title : '支持作者' ,
                    contexts : ['all'] ,
                    documentUrlPatterns : documentUrlPatterns ,
                    onclick : function ( info , tab ) {
                        //统计捐赠情况
                        _gaq.push( ['_trackEvent', info.menuItemId, 'context'] );
                        //打开我的捐赠页面
                        chrome.tabs.create( {url : "https://me.alipay.com/lmk123"} );
                    }
                }
            }
        }()
    } ,
    /**
     * 异步请求的方法
     * @param {object} config
     * @param {string|undefined} config.method 请求的方法，GET or POST
     * @param {string|undefined} config.url 要请求的地址
     * @param {object|undefined} config.data 用于POST请求的数据字符串
     * @param {function=} callback 回调函数，传递r作为参数
     */
    ajax : function ( config , callback ) {
        var r = new XMLHttpRequest();
        r.open( config.method || 'GET' , config.url );
        if ( config.method === 'POST' ) r.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" );
        r.onreadystatechange = function ( e ) {
            if ( r.readyState === 4 ) {
                callback && setTimeout( callback , 0 , r );
            }
        };
        r.send( config.data || null );
        return this;
    } ,
    /**
     * 复制对象 e 中的属性至 o。同名的属性会被 e 的值覆盖。
     * @param {object} o 待扩展的对象
     * @param {object} e 需要被扩展进去的对象
     * @returns {object}
     */
    extend : function ( o , e ) {
        for ( var temp in e ) {
            //不要获取e中的继承属性
            if ( e.hasOwnProperty( temp ) ) {
                o[temp] = e[temp];
            }
        }
        return o;
    } ,
    /**
     * 主要的翻译函数
     * @param {object} config
     * @param {'youdao'|'baidu'} config.api 使用哪种查询接口
     * @param {string} config.q 待翻译的文本
     * @param {string|undefined} config.from 要从哪种语言
     * @param {string|undefined} config.to 翻译到哪种语言
     * @param {function} callback 回调函数，传递查询结果作为参数
     */
    query : function ( config , callback ) {
        //暂时把查询接口信息写死
        var apis = this.config.apis, api = apis[ config.api || 'youdao'], text;
        if ( typeof config === 'string' ) return this.ajax( {url : api.url.replace( '{query}' , encodeURI( config ) )} , callback );
        text = encodeURI( config.q );
        if ( typeof api.data === 'string' ) {
            api.data = api.data.replace( '{query}' , text ).replace( '{from}' , config.from || 'auto' ).replace( '{to}' , config.to || 'auto' );
        } else {
            api.url = api.url.replace( '{query}' , text ).replace( '{from}' , config.from || 'auto' ).replace( '{to}' , config.to || 'auto' );
        }
        return this.ajax( {
            method : api.method ,
            url : api.url ,
            data : api.data
        } , callback );
    }
};
_gaq.push( ["_setAccount", "UA-43276752-1"] );
_gaq.push( ["_trackPageview"] );