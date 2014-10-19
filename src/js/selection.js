/**
 * @file 所有引入这个文件的页面，都应该支持划词翻译
 * @env 内容脚本
 * @requires doT doT.js
 * @requires L L.js
 */

(function ( global , factory ) {
    "use strict";
    if ( typeof module === 'object' && typeof module.exports === 'object' ) {
        module.exports = factory( /*require( 'L' ) ,*/ require( 'doT' ) );
    } else if ( typeof define === 'function' && define.amd ) {
        define( [/*'L', */'doT'] , factory );
    } else {
        global.Selection = factory( global.doT );
    }

}( this , function ( /*L , */doT ) {
    "use strict";

    var doc = document,
        selection;

    // 定义一系列的自定义元素
    if ( 'function' === typeof doc.registerElement ) {
        ['lmk-container', 'lmk-header'].forEach( function ( custom ) {
            try {
                doc.registerElement( custom );
            }
            catch ( e ) { // 虽然概率微乎其微，但是自定义元素可能已被注册过

            }
        } );
    }

    selection = {

        /**
         * 设置项
         */
        settings : {
            init : function () {
                var template, css;
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
                    } ,

                    cssText : {
                        set : function ( value ) {
                            selection.dom_style.textContent = value;
                            css = value;
                        } ,
                        get : function () {
                            return css;
                        }
                    }
                } );

                return this;
            } ,
            alwaysShow : false , // 如果这个值是true，那么在别处点击时不会隐藏翻译框
            enable : true , // 是否开启网页划词翻译
            autoPlay : false , // 当翻译单词和短语（即翻译结果有detailed的时候）自动发音
            ignoreChinese : false , // 是否忽略中文
            showTranslateButton : false , // 是否在划词后显示一个按钮，点击它才翻译

            template : null ,// 翻译结果的 doT 模板，在 init() 中初始化
            cssText : null , // 样式，在 init() 中初始化

            getResult : function ( queryObj , callback ) { // 用于获取结果的方法

                chrome.runtime.sendMessage( {
                    from : 'content' , // 消息来自内容脚本
                    to : 'background' , // 消息接收方应该是背景页
                    action : 'translate' , // 消息想要执行翻译操作
                    data : queryObj
                } , callback);
            } ,

            waitText : '正在翻译，请稍候……'  // 翻译中的提示语
        } ,

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

        dom_style : doc.createElement( 'style' ) ,

        /**
         * 生成一个可拖动的翻译结果外框，但是它没有内容，也并没有将它插入文档中
         */
        dom_result : (function () {

            var view = doc.createElement( 'lmk-container' ),

            //用来保存s鼠标按下时，鼠标与view的相对坐标
                original = {},

            // 注册在document上的鼠标移动事件
                mousemove = function ( e ) {
                    var v = view;

                    //防止用户过快的移动导致文本被选中
                    e.preventDefault();

                    //更改元素定位
                    v.style.left = e.pageX - original.x + 'px';
                    v.style.top = e.pageY - original.y + 'px';
                },

            // 注册在document上的鼠标弹起事件，其中 this === document
                mouseup = function ( e ) {
                    this.removeEventListener( 'mousemove' , mousemove , true );
                    this.removeEventListener( 'mouseup' , mouseup , true );
                },

            // 鼠标按下事件
                mousedown = function ( e ) {

                    // 当在结果框上点击时，不隐藏它，所以阻止事件传播
                    e.stopPropagation();

                    // 一旦鼠标左键点在 _drag_ 上，就为节点注册 mousemove 事件
                    if ( e.button === 0 && e.target.nodeName === 'LMK-HEADER' ) {

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
            var d_css = this.dom_style,

                showDom = function ( content ) {
                    var dom = this.dom_result, pos = this.position;

                    dom.style.top = pos.top + 'px';
                    dom.style.left = pos.left + 'px';
                    dom.innerHTML = content;
                    dom.style.display = 'block';
                    return this;
                };

            d_css.dataset.hello = '我是由“划词翻译”生成的，不要担心;)';

            if ( !this.dom_result.parentNode ) { doc.body.appendChild( this.dom_result ); }
            doc.head.appendChild( d_css );

            // override
            this.show = showDom;

            return showDom.apply( this , arguments );
        } ,

        /**
         * 隐藏翻译框
         * @returns {selection}
         */
        hide : function () {
            this.dom_result.style.display = 'none';
            return this;
        } ,

        /**
         * 执行翻译动作，不做任何约束性检查
         * @params {String=} apiId 指定要使用的api，否则使用设置里面的
         * @returns {selection}
         */
        translate : function ( apiId ) {

            var text = this.text.toString().trim(),
                that;

            if ( text ) {
                that = this;

                this.show( this.settings.waitText );

                // String.prototype.encodeHTML 方法来自 doT
                this.settings.getResult( {
                    text : text.encodeHTML() ,
                    apiId : apiId
                } , function ( resultObj ) {
                    //                    alert( JSON.stringify( resultObj ) );
                    that.show( that.tF( resultObj ) );
                } );
                //                L.apis[ apiId || this.settings.useApi ].translate( text.encodeHTML() );
            }

            return this;
        } ,

        init : function () {
            delete this.init;
            this.settings.init();
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

                // 鼠标左键才触发翻译。右键可能是因为用户想从菜单里面翻译
                if ( e.button === 0 ) {

                    // 如果开启了必须使用Ctrl键配合
                    // todo 将这个部分使用快捷键来完成
                    //                if ( c.CTRL_NEEDED ) {
                    //                    if ( !e.ctrlKey ) {
                    //                        return;
                    //                    }
                    //                }
                    selection.translate();
                }
            }
        } , 0 );
    } , true );

    /*
     * 注册自动隐藏翻译框事件
     * 注意结果框本身注册了一个捕获来阻止mousedown事件的冒泡
     * 以防止在结果框上点击时被隐藏
     * */
    doc.addEventListener( 'mousedown' , function ( e ) {

        //隐藏结果框
        if ( !selection.settings.alwaysShow ) {
            selection.dom_result.style.display = 'none';
        }
    } );

    return selection;
} ));



