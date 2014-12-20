(function ( root , factory ) {
    'use strict';
    if ( typeof define === 'function' && define.amd ) {
        define( [ './lib/jquery' , './lib/doT' ] , factory );
    } else {
        root.Select = factory( jQuery , doT );
    }
}( this , function ( $ , doT ) {
    'use strict';
    var single;

    function Selection( config ) {
        if ( single ) {
            return single;
        } else {
            single = this;
            this.config = $.extend( {
                alwaysShow : false , // 如果这个值是true，那么在别处点击时不会隐藏翻译框
                enable : true , // 是否开启网页划词翻译
                autoPlay : false , // 当翻译单词和短语（即翻译结果有detailed的时候）自动发音
                ignoreChinese : false , // 是否忽略中文
                ignoreNumLike : true , // 忽略数字与符号的组成
                showTranslateButton : false , // 是否在划词后显示一个按钮，点击它才翻译
                waitText : '正在翻译，请稍候……' ,  // 翻译中的提示语
                needCtrl : false ,
                template : '没有提供模板！'
            } , config );

            this.position = {
                left : 0 ,
                top : 0
            };

            this.loading = false;

            this.curQuery = null;
            this.curResult = null;

            this.dom_result = initDom();
        }
    }

    /**
     * 包装一层 chrome.runtime.sendMessage
     * 主要是为了统一处理可能出现的 chrome.runtime.lastError
     * @param obj 数据
     * @returns {*} 一个 jQuery Promise 对象
     * @see http://api.jquery.com/deferred.promise/
     */
    Selection.send = function ( obj ) {
        var def = $.Deferred();
        try { // 连接到背景页时可能会报错：{ message : 'Error connecting to extension dioiaffcokhckchgknklgafcpjpbaibj' }
            chrome.runtime.sendMessage( obj , function ( res ) {
                var le = chrome.runtime.lastError;
                if ( le || !res ) { // 不知道为何，偶尔res会是一个undefined
                    def.reject( '获取查询结果时发生了错误，请尝试刷新网页或重启浏览器后重试。' , le );

                    // 一些方法不处理这个错误，所以在控制台打印出来，可供用户反馈
                    console.error( le );
                } else {
                    def.resolve( res );
                }
            } );
        }
        catch ( e ) {
            def.reject( '连接到翻译引擎时发生了错误，请尝试刷新网页或重启浏览器后重试。' , e );
        }
        return def.promise();
    };

    $.extend( Selection.prototype , {

        /**
         * 获取页面上选中的文本
         * @returns {string}
         */
        getText : function () {
            return getSelection().toString().trim();
        } ,

        /**
         * 一个由 doT 根据模板编译出来的函数
         * 注意：此方法只会在第一次调用的时候编译模板，
         *        如果此后 template 属性更改了，
         *        模板不会重新编译，
         *        因为接下来调用的是 Selection 对象本身的render方法，
         *        而不是继承自这里的render方法了
         * @returns {string} 根据数据生成的html字符串
         */
        render : function () {
            this.render = doT.template( this.config.template );
            return this.render.apply( null , arguments );
        } ,

        /**
         * 计算翻译框下次显示的位置，相对于“视口”
         * @param e 包含下面两个属性的对象，实际上可以直接将事件对象传进去
         * @param e.pageX
         * @param e.pageY
         * @returns {Selection}
         */
        offset : function ( e ) {
            this.position = {
                left : e.pageX + 10 - window.pageXOffset ,
                top : e.pageY + 10 - window.pageYOffset
            };
            return this;
        } ,

        /**
         * 显示翻译窗口。这是一个懒加载方法。
         * @returns {Selection}
         */
        show : function () {
            document.body.appendChild( this.dom_result );

            /**
             * 真正的用于显示翻译窗口的方法
             * @param {object} templateObj
             * @param {boolean=} keepPosition 是否要保持翻译框的位置，默认为否
             * @returns {Selection}
             */
            this.show = function ( templateObj , keepPosition ) {
                var pos = this.position , dom_result = this.dom_result;
                if ( !this.config.alwaysShow && !keepPosition ) {
                    dom_result.style.top = pos.top + 'px';
                    dom_result.style.left = pos.left + 'px';
                }
                templateObj.config = $.extend( {} , this.config );
                dom_result.innerHTML = this.render( templateObj );
                dom_result.classList.add( 'lmk-show' );
                return this;
            };
            return this.show.apply( this , arguments );
        } ,

        /**
         * 隐藏翻译窗口
         * @returns {Selection}
         */
        hide : function () {
            if ( !this.loading && !this.config.alwaysShow ) { // 加载过程中不隐藏。由于加入了超时时间，所以这没什么大不了的
                this.dom_result.classList.remove( 'lmk-show' );
            }
            return this;
        } ,

        /**
         * 判断某个元素是否是翻译窗口或者在翻译窗口中
         * @param {HTMLElement} target
         * @returns {boolean}
         */
        isInDom : function ( target ) {
            return $.contains( this.dom_result , target );
        } ,

        /**
         * 检查一次翻译行为是否可翻译
         * @param {{}} event 可以直接把触发事件时的事件对象传进来
         * @param {HTMLElement} event.target 触发翻译行为的元素
         * @param {boolean} event.ctrlKey 触发翻译行为时是否有按下 Ctrl 键
         * @param {number} event.button 鼠标按键对应的数字，0表示鼠标左键
         * @param {string=} text 待检查的文本
         * @returns {boolean} 结果
         */
        check : function ( event , text ) {
            var config = this.config;
            if ( !text ) {
                text = this.getText();
            }

            if ( text && config.enable && !this.isInDom( event.target ) ) {

                // 忽略中文
                if ( config.ignoreChinese ) {
                    if ( /[\u4e00-\u9fa5]/.test( text ) ) {
                        return false;
                    }
                }

                // 忽略类数字组合
                if ( config.ignoreNumLike ) {
                    if ( /^[\s.\-0-9()•+]+$/.test( text ) ) {
                        return false;
                    }
                }

                // 使用Ctrl键配合
                if ( config.needCtrl ) {
                    if ( !event.ctrlKey ) {
                        return false;
                    }
                }

                // 鼠标左键才触发翻译
                if ( event.button === 0 ) {
                    return true; // 执行到这里才返回 true
                }
            }

            return false;
        } ,

        /**
         * 翻译方法
         * @param {{}} queryObj
         * @param {boolean=} keepPosition 是否保持翻译框位置不变
         * @returns {Selection}
         */
        translate : function ( queryObj , keepPosition ) {

            var that , type = typeof queryObj;

            if ( 'string' === type ) {
                queryObj = {
                    text : queryObj
                };
            } else if ( !queryObj ) {
                queryObj = {
                    text : this.getText()
                };
            }

            if ( queryObj.text && !this.loading ) {
                this.loading = true;
                this.curQuery = queryObj;
                that = this;
                this.show( { wait : this.config.waitText } , keepPosition )
                    .getResult( queryObj )
                    .always( function () {
                        that.loading = false;
                    } )
                    .done( function ( resultObj ) {
                        that.curResult = resultObj;
                        that.show( resultObj , keepPosition );

                        // 自动阅读功能
                        if ( that.config.autoPlay ) {
                            var play = document.querySelector( 'lmk-icon-play' );
                            if ( play ) {
                                play.click();
                            }
                        }
                    } )
                    .fail( function ( errMessage ) {
                        that.show( {
                            error : errMessage
                        } , keepPosition );
                    } );
            }

            return this;
        } ,

        /**
         * 获取查询结果
         * @param queryObj
         * @see http://api.jquery.com/deferred.promise/
         * @returns {*} 一个jQuery Promise对象
         */
        getResult : function ( queryObj ) {
            return Selection.send( {
                from : 'content' ,
                to : 'background' ,
                action : 'translate' ,
                data : queryObj
            } );
        } ,

        /**
         * 复制文本进剪切板
         * @param text
         * @returns {Selection}
         */
        copy : function ( text ) {
            Selection.send( {
                from : 'content' ,
                to : 'background' ,
                action : 'copy' ,
                data : text
            } );
            return this;
        } ,

        /**
         * 朗读文本
         * @param type
         * @returns {Selection}
         */
        play : function ( type ) {
            Selection.send( {
                from : 'content' ,
                to : 'background' ,
                action : 'play' ,
                data : {
                    text : this.curQuery[ type ] || this.curResult[ type ] ,
                    from : 'text' === type ? this.curResult.from : this.curResult.to ,
                    apiId : this.curQuery.apiId
                }
            } );
            return this;
        } ,

        /**
         * 网页翻译
         * @returns {Selection}
         */
        web : function () {
            if ( !$( '#OUTFOX_JTR_CDA' ).length ) {
                var h = "https://fanyi.youdao.com/web2" , o = document , b = o.body , d , k , a , l , g , c , f;
                if ( !window.OUTFOX_JavascriptTranslatoR ) {
                    d = o.createElement( 'script' );
                    d.src = chrome.extension.getURL( '' ) + 'js/lib/ydwa.js';
                    d.async = true;
                    o.head.appendChild( d );
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

    /**
     * 初始化一个翻译框节点并返回它
     * @returns {HTMLElement}
     */
    function initDom() {
        var doc = document ,
            view = doc.createElement( 'lmk-container' ) ,

            //用来保存鼠标按下时，鼠标与view的相对坐标
            original = {} ,

            // 注册在document上的鼠标移动事件
            mousemove = function ( e ) {
                var left = e.pageX - original.x ,
                    top = e.pageY - original.y;

                //防止用户过快的移动导致文本被选中
                e.preventDefault();

                if ( left < 0 ) {
                    left = 0;
                }
                if ( top < 0 ) {
                    top = 0;
                }

                view.style.left = left + 'px';
                view.style.top = top + 'px';
            } ,

            // 注册在document上的鼠标弹起事件，其中 this === document
            mouseup = function () {
                this.removeEventListener( 'mousemove' , mousemove , true );
                this.removeEventListener( 'mouseup' , mouseup , true );
            } ,

            // 鼠标按下事件
            mousedown = function ( e ) {

                // 当在结果框上点击时，不隐藏它，所以阻止事件传播
                e.stopPropagation();

                // 为节点注册 mousemove 事件
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
    }

    return Selection;
} ));

// 应用
(function ( $ , Selection , storage ) {
    'use strict';
    var selection = new Selection();

    /**
     * 数据准备完之后再注册事件
     * @see https://github.com/lmk123/crx-selection-translate/issues/19
     */
    storage.get( selection.config )
        .done( function ( items ) {
            $.extend( selection.config , items );

            //document.addEventListener( 'mousedown' , function ( e ) {
            //    if ( selection.isInDom( e.target ) ) {
            //        e.preventDefault(); // 在翻译结果框内点击防止划选的文本消失掉
            //    }
            //} , true ); // 必须使用捕获才能阻止

            $( document )
                .on( 'mouseup' , function ( e ) {
                    selection.offset( e );

                    if ( selection.check( e ) ) {
                        selection.translate();
                    }
                } )
                .on( 'mousedown' , function ( e ) {
                    if ( !selection.isInDom( e.target ) ) {
                        selection.hide();
                    }
                } )
                .on( 'click' , '[data-lmk123-action]' , function () {
                    switch ( this.dataset.lmk123Action ) {
                        case 'translate':
                            selection.translate( {
                                text : selection.curQuery.text ,
                                apiId : this.dataset.apiId
                            } , true );
                            break;
                        case 'web':
                            selection.web();
                            break;
                    }
                } )
                .on( 'click' , 'lmk-icon-pin' , function () {
                    this.classList.toggle( 'lmk-pined' );
                    selection.config.alwaysShow = this.classList.contains( 'lmk-pined' );
                } )
                .on( 'click' , 'lmk-icon-setting' , function () {
                    Selection.send( {
                        action : 'createTab' ,
                        data : { url : '/options.html' }
                    } );
                } )
                .on( 'click' , 'lmk-footer lmk-a' , function () {
                    Selection.send( {
                        action : 'createTab' ,
                        data : { url : selection.curResult.linkToResult }
                    } );
                } )
                .on( 'click' , 'lmk-icon-play' , function () {
                    selection.play( this.dataset.lmk123Play );
                } )
                .on( 'click' , 'lmk-icon-copy' , function () {
                    selection.copy( this.parentNode.textContent.trim() );
                    this.classList.add( 'lmk-copy' );
                } )
                .on( 'click' , 'lmk-switch' , function () {
                    this.classList.toggle( 'lmk-close' );
                    chrome.storage.local.set( {
                        enable : !this.classList.contains( 'lmk-close' )
                    } );
                } );

            // 接收来自背景页的消息
            chrome.runtime.onMessage.addListener( function ( info ) {
                switch ( info.action ) {
                    case 'translate': // 快捷键：翻译网页上选中的文本
                        selection.translate();
                        break;

                    case 'web': // 快捷键：翻译网页
                        selection.web();
                        break;
                }
            } );

            // 设置变更时
            storage.onChange( function ( changes ) {
                $.extend( selection.config , changes );
            } , selection.config );
        } );
}( jQuery , Select , storage ));
