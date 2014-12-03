/**
 * @file 所有引入这个文件的页面，都应该支持划词翻译
 * @env 内容脚本
 * @requires doT doT.js
 * @requires L L.js
 */

(function ( global , factory ) {
    "use strict";
    if ( typeof define === 'function' && define.amd ) {
        define( [ 'L' , 'doT' ] , factory );
    } else {
        global.ste = factory( global.L , global.doT );
    }

}( this , function ( L , doT ) {
    "use strict";

    //    var selection;

    //    return function () {
    //        var doc;

    //        if ( !selection ) {
    var selection , doc = document;

    // 定义一系列的自定义元素
    //    if ( 'function' === typeof doc.registerElement ) {
    //        ['lmk-container', 'lmk-move'].forEach( function ( custom ) {
    //            try {
    //                doc.registerElement( custom );
    //            }
    //            catch ( e ) { // 虽然概率微乎其微，但是自定义元素可能已被注册过
    //
    //            }
    //        } );
    //    }

    selection = {

        /**
         * 设置项
         */
        settings : {
            init : function () {
                var template /*, css*/;
                delete this.init;
                Object.defineProperties( this , {
                    template : {
                        set : function ( value ) {
                            selection.tF = doT.template( value );
                            template = value;
                        } ,
                        get : function () {
                            return template;
                        }
                    } /*,

                     css : {
                     set : function ( value ) {
                     selection.dom_style.textContent = value;
                     css = value;
                     } ,
                     get : function () {
                     return css;
                     }
                     }*/
                } );

                return this;
            } ,
            alwaysShow : false , // 如果这个值是true，那么在别处点击时不会隐藏翻译框
            enable : true , // 是否开启网页划词翻译
            autoPlay : false , // 当翻译单词和短语（即翻译结果有detailed的时候）自动发音
            ignoreChinese : false , // 是否忽略中文
            ignoreNumLike : true , // 忽略数字与符号的组成
            showTranslateButton : false , // 是否在划词后显示一个按钮，点击它才翻译
            waitText : '正在翻译，请稍候……' ,  // 翻译中的提示语
            needCtrl : false ,
            template : null ,// 翻译结果的 doT 模板，在 init() 中初始化
            //css : null , // 样式，在 init() 中初始化

            getResult : function ( queryObj , callback ) { // 用于获取结果的方法

                chrome.runtime.sendMessage( {
                    from : 'content' , // 消息来自内容脚本
                    to : 'background' , // 消息接收方应该是背景页
                    action : 'translate' , // 消息想要执行翻译操作
                    data : queryObj
                } , callback );
            } ,

            copy : function ( text ) {
                chrome.runtime.sendMessage( {
                    from : 'content' , // 消息来自内容脚本
                    to : 'background' , // 消息接收方应该是背景页
                    action : 'copy' , // 消息想要执行翻译操作
                    data : text
                } );
            } ,

            play : function ( playObj ) {
                chrome.runtime.sendMessage( {
                    from : 'content' , // 消息来自内容脚本
                    to : 'background' , // 消息接收方应该是背景页
                    action : 'play' , // 消息想要执行翻译操作
                    data : playObj
                } );
            }

        } ,

        //loading : false , // 查询状态

        /**
         * 使用这个对象来保存翻译结果应该出现的位置
         */
        position : {
            left : 0 ,
            top : 0
        } ,

        /**
         * 保存划词对象。这个对象是“单例”的，无需多次获取
         */
        text : getSelection() ,

        tF : function () {
            return '主题加载中，请稍后重试。';
        } ,

        /*dom_style : (function () {
         var d = doc.createElement( 'style' );
         d.title = '我是由划词翻译生成的，别担心 ;)';
         return d;
         }()) ,*/

        //dom_list_languages : doc.createElement( 'datalist' ) , // 一个包含所有语言列表的data-list对象

        /**
         * 生成一个可拖动的翻译结果外框，但是它没有内容，也并没有将它插入文档中
         */
        dom_result : (function () {

            var view = doc.createElement( 'lmk-container' ) ,

                //用来保存s鼠标按下时，鼠标与view的相对坐标
                original = {} ,

                // 注册在document上的鼠标移动事件
                mousemove = function ( e ) {
                    var v = view;

                    //防止用户过快的移动导致文本被选中
                    e.preventDefault();

                    //更改元素定位
                    v.style.left = e.pageX - original.x + 'px';
                    v.style.top = e.pageY - original.y + 'px';
                } ,

                // 注册在document上的鼠标弹起事件，其中 this === document
                mouseup = function ( e ) {
                    this.removeEventListener( 'mousemove' , mousemove , true );
                    this.removeEventListener( 'mouseup' , mouseup , true );
                } ,

                // 鼠标按下事件
                mousedown = function ( e ) {

                    // 当在结果框上点击时，不隐藏它，所以阻止事件传播
                    e.stopPropagation();

                    // 一旦鼠标左键点在 _drag_ 上，就为节点注册 mousemove 事件
                    if ( e.button === 0 && e.target.nodeName === 'LMK-MOVE' ) {

                        //保存元素初始位置信息
                        original.x = e.pageX - view.offsetLeft;
                        original.y = e.pageY - view.offsetTop;

                        // 在document对象上注册鼠标事件，以免鼠标移动过快，移出翻译框后不触发
                        doc.addEventListener( 'mousemove' , mousemove , true );
                        doc.addEventListener( 'mouseup' , mouseup , true );
                    }
                };

            view.dataset.hello = '我是由“划词翻译”生成的，不要担心;)';

            // 使 dom_result 可拖动
            view.addEventListener( 'mousedown' , mousedown , true );
            return view;
        }()) ,

        /**
         * 显示翻译结果的方法
         * @returns {selection}
         */
        show : function () {
            var showDom = function ( content , doNotPosition ) {
                var dom = this.dom_result , pos = this.position;

                if ( !doNotPosition ) {
                    dom.style.top = pos.top + 'px';
                    dom.style.left = pos.left + 'px';
                }
                dom.innerHTML = content;
                dom.classList.add( 'lmk-show' );
                return this;
            };

            //initialLink.rel = 'stylesheet';
            //initialLink.href = chrome.extension.getURL( '/' ) + 'css/initial.css';

            //doc.head.appendChild( initialLink );

            //doc.head.appendChild( this.dom_style ); // 样式
            doc.body.appendChild( this.dom_result ); // 结果框
            //doc.body.appendChild( this.dom_list_languages ); // 可选语言表

            // override
            this.show = showDom;

            return showDom.apply( this , arguments );
        } ,

        /**
         * 隐藏翻译框
         * @returns {selection}
         */
        hide : function () {
            this.dom_result.classList.remove( 'lmk-show' );
            return this;
        } ,

        /**
         * 执行翻译动作，不做任何约束性检查
         * @params {String=} apiId 指定要使用的api，否则使用设置里面的
         * @returns {selection}
         */
        translate : function ( apiId , text , doNotPosition ) {

            var that;

            if ( !text ) {
                text = this.text.toString().trim();
            }

            if ( text /*&& !this.loading*/ ) {
                //this.loading = true;
                that = this;

                this.show( this.tF( { wait : this.settings.waitText } ) , doNotPosition );

                // String.prototype.encodeHTML 方法来自 doT
                this.settings.getResult( {
                    text : text/*.encodeHTML()*/ ,
                    apiId : apiId
                } , function ( resultObj ) {

                    that.show( that.tF( resultObj ) , doNotPosition );
                    that.loading = false;

                    // 自动阅读功能
                    if ( selection.settings.autoPlay ) {
                        L( 'lmk-icon-play' )[ 0 ] && L( 'lmk-icon-play' )[ 0 ].click();
                    }
                } );
            }

            return this;
        } ,

        init : function () {
            //var that = this;
            delete this.init;
            this.settings.init();

            // 语言列表
            //L.ajax( {
            //    url : chrome.extension.getURL( '' ) + 'default/languages.json' ,
            //    load : function ( list ) {
            //        var d = that.dom_list_languages ,
            //            s = '';
            //
            //        L.forIn( list , function ( key ) {
            //            s += '<option value="' + key + '">' + list[ key ] + '</option>';
            //        } );
            //
            //        d.id = '_lmk123_languages_list_';
            //        d.innerHTML = s;
            //    }
            //} );
            return this;
        }
    }.init();

    // 下面通过一系列的事件来驱动

    //注册划词翻译事件
    doc.addEventListener( 'mouseup' , function ( e ) {
        var s = selection.text.toString().trim();

        // 记录翻译框显示的位置
        selection.position = {
            left : e.pageX + 10 ,
            top : e.pageY + 10
        };

        /*
         * bugfix：当鼠标点击选中的区域后，翻译框会再弹起来一次
         * 为此只能延后0毫秒，待浏览器默认将选中词取消后再查询
         * （每次鼠标mousedown事件，chrome就会清空页面上的选中文本）
         */
        setTimeout( function () {

            // 在翻译框上划词时不要触发翻译流程
            if ( s && selection.settings.enable && selection.dom_result !== e.target && 20 !== selection.dom_result.compareDocumentPosition( e.target ) ) {

                // 如果开启了忽略中文
                if ( selection.settings.ignoreChinese ) {
                    if ( /[\u4e00-\u9fa5]/.test( s ) ) {
                        return;
                    }
                }

                if ( selection.settings.ignoreNumLike ) {
                    if ( /^[\s.\-0-9()•+]+$/.test( s ) ) {
                        return;
                    }
                }

                // 如果开启了必须使用Ctrl键配合
                if ( selection.settings.needCtrl ) {
                    if ( !e.ctrlKey ) {
                        return;
                    }
                }

                // 鼠标左键才触发翻译。右键可能是因为用户想从菜单里面翻译
                if ( e.button === 0 ) {
                    selection.translate();
                }
            }
        } , 0 );
    } , true );

    // 按下 Ctrl 键翻译的功能会给其他快捷键（例如复制 Ctrl + C）带来冲突
    //doc.addEventListener( 'keyup' , function ( e ) {
    //    var s = selection.text.toString().trim();
    //
    //    // 17是Ctrl键
    //    if ( s && selection.settings.needCtrl && 17 === e.keyCode/* && !selection.dom_result.classList.contains( 'lmk-show' )*/ ) {
    //        selection.translate( null , s );
    //    }
    //} );

    /*
     * 注册自动隐藏翻译框事件
     * 注意结果框本身注册了一个捕获来阻止mousedown事件的冒泡
     * 以防止在结果框上点击时被隐藏
     * */
    doc.addEventListener( 'mousedown' , function () {

        //隐藏结果框
        if ( !selection.settings.alwaysShow ) {
            selection.hide();
        }
    } );

    L.on( doc , 'click' , '[data-lmk123-action]' , function () {
        switch ( this.dataset.lmk123Action ) {
            case 'translate':
                selection.translate( this.dataset.apiId , this.dataset.lmk123Query , true );
                break;
            case 'web':
                selection.web();
                break;
        }
    } );

    //        }
    return selection;
    //    };
} ));



(function ( L , selection , doc ) {
    "use strict";

    L.shallowCopy( selection , {

        root : chrome.extension.getURL( '' ) ,

        loadSettings : function () {
            var settings = this.settings , keys = Object.keys( settings );

            // get 方法只会返回在storage中存在的键；如果没有，就不会返回
            chrome.storage.local.get( keys , function ( items ) {
                L.forIn( items , function ( itemKey ) {
                    settings[ itemKey ] = items[ itemKey ];
                } );
            } );
            return this;
        } ,

        /**
         * 检测标签页是否在 iframe 中运行
         * 需要使用这个属性来过滤从后台页面发送过来的消息
         */
        //frameUrl : (function () {
        //    return win.top === win.self ? null : location.href;
        //}()) ,

        /**
         * 有道网页翻译的方法
         */
        web : function () {

            if ( !L( '#OUTFOX_JTR_CDA' ) ) {

                var h = "https://fanyi.youdao.com/web2" , o = document , b = o.body , d , k , a , l , g , c , f;
                if ( !window.OUTFOX_JavascriptTranslatoR ) {
                    d = doc.createElement( 'script' );
                    d.src = this.root + 'js/lib/ydwa.js';
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
                    window.OUTFOX_JavascriptTranslatoR = new J.TR.UI( b , {
                        domain : k ,
                        update : false ,
                        updateTipMsg : "增加关闭按钮" ,
                        updateDate : "2011-3-15" ,
                        cssURL : f ,
                        tipsURL : l ,
                        transURL : g ,
                        logURL : c ,
                        connFilePath : a ,
                        reqSize : 20
                    } );
                }
            }
            return this;
        }
    } );

    // 一系列action
    L.on( doc , 'click' , 'lmk-switch,lmk-icon-play,lmk-icon-copy,lmk-a,lmk-icon-setting,lmk-icon-pin' , function ( e ) {

        switch ( this.nodeName.toLowerCase() ) {
            case 'lmk-switch':
                this.classList.toggle( 'lmk-close' );
                chrome.storage.local.set( {
                    enable : !this.classList.contains( 'lmk-close' )
                } );
                break;
            case 'lmk-icon-copy':
                selection.settings.copy( this.parentNode.textContent.trim() );
                this.classList.add( 'lmk-copy' );
                break;
            case 'lmk-icon-play':
                selection.settings.play( {
                    text : this.dataset.playtext ,
                    apiId : this.dataset.apiid ,
                    lang : this.dataset.lang
                } );
                break;
            case 'lmk-a':
                e = e.target.parentNode;
                if ( 'LMK-AD' === e.nodeName ) {
                    chrome.storage.local.set( {
                        clicked : true
                    } );
                    e.parentNode.removeChild( e );
                }
                chrome.runtime.sendMessage( {
                    from : 'content' , // 消息来自内容脚本
                    to : 'background' , // 消息接收方应该是背景页
                    action : 'createTab' , // 消息想要执行翻译操作
                    data : { url : this.dataset.href }
                } );
                break;
            case 'lmk-icon-setting':
                chrome.runtime.sendMessage( {
                    from : 'content' , // 消息来自内容脚本
                    to : 'background' , // 消息接收方应该是背景页
                    action : 'createTab' , // 消息想要执行翻译操作
                    data : { url : '/options.html' }
                } );
                break;
            case 'lmk-icon-pin':
                this.classList.toggle( 'lmk-pined' );
                selection.settings.alwaysShow = this.classList.contains( 'lmk-pined' );
                break;
        }

    } );

    /**
     * 统一接收消息
     * 接收的消息目前有一种：翻译（translate）
     * */
    chrome.runtime.onMessage.addListener( function ( info ) {
        switch ( info.action ) {
            case 'translate':
                selection.translate();
                break;

            case 'web':
                selection.web();
                break;
        }
    } );

    selection.loadSettings(); // 读取设置

    // 处理设置变更
    chrome.storage.onChanged.addListener( function ( changes ) {
        var settings = selection.settings;
        L.forIn( changes , function ( key ) {
            if ( settings.hasOwnProperty( key ) ) {
                settings[ key ] = changes[ key ].newValue;
            }
        } );
    } );
}( L , ste , document ));
