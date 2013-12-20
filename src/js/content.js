/*
 * 内容脚本是在 DOM 完成时执行的
 */

(function () {
    "use strict";

    //先声明控制器实例
    var c, doc = document;

    //扩展 View 类
    this.extend( this.View , {

            //仅在有查询请求时才在页面中插入视图
            viewInserted : false ,
            template : '<div class="_tip_">{{tip}}</div><div class="_query_">{{query}}</div><div><span class="_pronunciation_">{{pronunciation}}</span><a class="_play_" href="#" title="播放功能暂不完善，将就用吧。= =">播放</a></div><div><div class="_title_">详细解释</div><ul class="_content_">{{base}}</ul></div><div><div class="_title_">翻译结果</div><div class="_content_">{{result}}</div></div><div class="_from_">via&nbsp;<a target="_blank" href="{{viaLink}}" title="详细释义">{{via}}</a></div><div><div class="_title_">出错啦！</div><div class="_content_">{{error}}</div></div>' ,
            view : (function () {

                var view = doc.createElement( 'section' ),

                //用来保存s鼠标按下时，鼠标与节点的相对坐标
                    pos = {},

                // 注册在document上的鼠标移动事件
                    mousemove = function ( e ) {
                        var v = view;

                        //防止用户过快的移动导致文本被选中
                        e.preventDefault();

                        //更改元素定位
                        v.style.left = e.pageX - pos.x + 'px';
                        v.style.top = e.pageY - pos.y + 'px';
                    },

                // 注册在document上的鼠标弹起事件
                    mouseup = function ( e ) {
                        this.removeEventListener( 'mousemove' , mousemove , true );
                        this.removeEventListener( 'mouseup' , mouseup , true );
                    },

                //鼠标按下事件
                    mousedown = function ( e ) {

                        //当在结果框上点击时，不隐藏它
                        e.stopPropagation();

                        // 一旦鼠标左键点下，就为节点注册 mousemove 事件
                        if ( e.button === 0 && e.target.className === '_query_' ) {

                            //保存元素初始位置信息
                            pos.x = e.pageX - view.offsetLeft;
                            pos.y = e.pageY - view.offsetTop;

                            // 在document对象上注册鼠标事件，以免鼠标移动过快，移出翻译框后不触发
                            doc.addEventListener( 'mousemove' , mousemove , true );
                            doc.addEventListener( 'mouseup' , mouseup , true );
                        }
                    };

                view.id = '_container_';

                //使 view 可拖动
                view.addEventListener( 'mousedown' , mousedown , true );

                //播放按钮
                view.addEventListener( 'click' , function ( e ) {
                    var t = e.target;
                    if ( t.className === '_play_' ) {
                        getSelection().empty();
                        e.preventDefault();
                        $.tts.detect( view.querySelector( '._query_' ).textContent );
                    }

                } , true );

                return view;

            }()) ,

            // 用于保存鼠标点击时的位置，供视图显示
            pos : { left : 0 , top : 0 } ,

            /**
             * 根据对象生成 html 模板
             * @param templateObj
             * @param templateObj.query 查询字符串，必有
             * @param templateObj.tip 用于在查询前给出用户的提示
             * @param templateObj.errorCode 查询时的错误码
             * @param {Array=} templateObj.detailedExplains 详细解释，只有有道翻译才会有
             * @param {String} templateObj.translateResult 翻译结果，必有
             * @param {Array=} templateObj.relatedWords 相关内容，由有道提供。它是一个数组，每个数组元素都是一个对象。
             *                  这种对象有一个字符串属性 key，是相关的单词或短语；
             *                  另有一个数组属性 value ，包含对相关单词的解释，一般有三个解释（即value有三个元素）。
             */
            generate : function ( templateObj ) {

                var template = this.template;

                template = template.replace( '{{via}}' , this.viaName ) //替换接口名称
                    .replace( '{{viaLink}}' , this.viaLink ) //替换接口链接
                    .replace( /\{\{query\}\}/g , templateObj.query ) //替换标头与接口链接里面的查询字符串。因为有两个{{query}}所以用了全局的正则，否则replace方法只会替换第一个
                    .replace( '{{from}}' , templateObj.from || 'auto' ) //接口链接里面的源语言
                    .replace( '{{to}}' , templateObj.to || 'auto' ); //接口链接里面的目标语言

                if ( templateObj.errorCode ) { //如果有错误状态
                    template = template.replace( '{{error}}' , this.errorMsg[ templateObj.errorCode] );

                } else if ( templateObj.tip ) { //如果是提示
                    template = template.replace( '{{tip}}' , templateObj.tip );

                } else { //处理一般情况

                    if ( templateObj.detailedExplains ) { //如果有详细解释

                        template = template.replace( '{{base}}' , function () {
                            var s = '';

                            templateObj.detailedExplains.forEach( function ( v ) {
                                s += '<li>' + v + '</li>';
                            } );

                            return s;
                        } );

                    } else {

                        //在标签页里，有详细解释就不要翻译结果了
                        template = template.replace( '{{result}}' , templateObj.translateResult );
                    }

                    //如果有发音
                    if ( templateObj.phonetic ) {
                        template = template.replace( '{{pronunciation}}' , templateObj.phonetic );
                    }

                    //相关内容（templateObj.relatedWords），在标签页中不处理，以免结果框过长

                    //将没有的内容去除，这样 css 的 :empty{display:none} 规则会隐藏它们
                    template = template.replace( /\{\{[^}]+\}\}/g , '' );

                    //显示模板
                    this.show( template , this.pos );

                    return this;
                }
            } ,
            show : function ( htmlStr , pos ) {
                var view = this.view, position;

                //仅在有查询时才插入模板
                if ( !this.viewInserted ) {
                    doc.body.appendChild( view );
                    this.viewInserted = true;
                }

                //此时 view 节点是隐藏的，所以多次修改不会触发浏览器的重排和重绘
                view.innerHTML = htmlStr;
                Array.prototype.forEach.call( view.querySelectorAll( '#_container_ :empty' ) , function ( v ) {
                    var parent = v.previousElementSibling;
                    if ( parent ) {
                        parent.style.display = 'none';
                    }
                } );
                view.style.top = pos.top + 'px';
                view.style.left = pos.left + 'px';
                view.style.display = 'block';

                //如果翻译框的水平位置超出了浏览器的右边
                //仅当view显示在页面中时才能用 getBoundingClientRect 方法查询元素位置
                position = view.getBoundingClientRect();
                if ( position.left + position.width > window.innerWidth ) {
                    view.style.right = '0';
                    view.style.left = 'auto';
                }

                return this;
            }
        }
    );

    //扩展完 View 父类了，再创建控制器实例，并保存各自的 view 实例
    c = Object.create( this.Controller , {

        /**
         * 判断当前内容脚本是否在 iframe 里
         */
        isFrame : { value : (function () {
            return window.top === window ? null : location.href;
        }())} ,

        //默认开启划词翻译
        isOpenSelection : { value : true , writable : true} ,

        /**
         * 页面上选中的文本对象
         */
        selectText : { value : window.getSelection() } ,

        /**
         * 有道网页翻译的方法
         */
        web : { value : function () {
            var e;
            if ( !doc.getElementById( 'OUTFOX_JTR_CDA' ) ) {
                e = doc.createElement( 'script' );
                e.id = 'outfox_seed_js';
                e.charset = "utf-8";
                e.src = $.rootPath + 'js/ydw.js';
                doc.getElementsByTagName( 'script' )[0].parentNode.appendChild( e );
            }
        } }
    } );

    //注册 query 事件，由 query 函数触发
    this.sub( 'query' , function ( templateObj , via ) {
        c.v[via].generate( templateObj );
    } );

    //注册划词翻译事件
    doc.addEventListener( 'mouseup' , function ( e ) {

        /*
         * bug：当鼠标点击选中的区域后，翻译框会再弹起来一次
         * 为此只能延后0毫秒，待浏览器默认将选中词取消后再查询
         * （每次鼠标mousedown事件，chrome就会清空页面上的选中文本）
         */
        setTimeout( function () {

            //缓存本地控制器
            var lc = c , s = lc.selectText.toString().trim();

            // 如果页面上存在选中文本，则记录鼠标up时的位置，供翻译结果显示
            if ( s ) {
                $.View.pos = {
                    left : e.pageX + 10 ,
                    top : e.pageY + 10
                };

                // 如果起来的是鼠标左键，则执行划词翻译
                if ( e.button === 0 && c.isOpenSelection ) {

                    //每次查询都读取配置项，使用哪种接口查询
                    lc.getStorage( 'queryWith' , function ( item ) {
                        var q = item.queryWith;

                        switch ( q ) {
                            case 'bd':
                            case 'yd':
                                lc.m[q].query( s );
                                break;

                            //默认是自动模式
                            default:

                                //长文本使用百度，否则用有道
                                lc.m[s.length > 200 ? 'bd' : 'yd'].query( s );
                                break;
                        }

                    } );

                }
            }
        } , 0 );

    } , true );

    // 注册自动隐藏翻译框事件
    // 注意结果框本身注册了一个捕获来阻止mousedown事件的冒泡
    // 以防止在结果框上点击时被隐藏
    doc.addEventListener( 'mousedown' , function () {
        var v = $.View.view;

        //隐藏结果框
        v.style.display = 'none';

        //避免后面的结果框显示时仍附带这个状态
        v.style.right = 'auto';
    } );

    //读取配置
    c.getStorage( null , function ( items ) {

        //是否开启划词翻译
        c.isOpenSelection = items.isSelection;

        //是否自动进行网页翻译
        if ( c.isAutoWeb ) {
            c.web();
        }
    } );

    chrome.runtime.onMessage.addListener( function ( info ) {

        console.dir( info );

        /*
         * 由于每个页面（包括 iframe）都有内容脚本
         * 所以一个页面可能会执行多次请求
         * 下面的判断保证请求只会在点击的页面上发生
         */
        if ( info.frameUrl ) {

            //通过地址判断是否是同一个frame
            if ( c.isFrame !== info.frameUrl ) {
                return;
            }
        } else {

            //判断自身是否是子窗口
            if ( c.isFrame ) {
                return;
            }
        }

        debugger;

        switch ( info.menuItemId ) {

            //以下三种命令直接处理
            case 'yd':
            case 'bd':
                c.m[info.menuItemId].query( c.selectText.toString().trim() );
                break;
            case 'ydw':
                c.web();
                break;
        }

        c.isOpenSelection = info.isSelection;
    } );

}.bind( $ )());
