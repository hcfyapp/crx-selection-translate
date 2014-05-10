/**
 * content.js
 * 运行于标签页中的脚本，依赖 js 目录下的 com.js 文件
 */

    // 将全局变量 $ 引入局部作用域中，避免跨作用域读取
(function ( $ ) {
    "use strict";

    var doc = document,

    // 继承公共的控制器类，并自定义标签页中使用的属性
        c = $.inherit( $.Controller , {

            // chrome.storage 中的应用于内容脚本的设置项
            SELECTION : true , // 划词翻译默认开启

            CTRL_NEEDED : false , // 是否需要按住ctrl键时才显示翻译结果，默认不需要

            /*
             * 检测标签页是否在 iframe 中运行
             * 需要使用这个属性来过滤从后台页面发送过来的消息
             * */
            frame : (function () {
                return window.top === window ? null : location.href;
            }()) ,

            /**
             * 保存一个页面中选中文本的引用
             * 这个对象是动态的，无需多次获取
             */
            text : getSelection() ,

            /**
             * 网页翻译的方法
             */
            web : function () {
                var e;
                if ( location.protocol === 'https:' ) {
                    alert( '网页翻译无法在 https 页面下使用，这时候就使用划词翻译或者翻译盒子吧 ;)' );
                } else if ( !doc.getElementById( 'OUTFOX_JTR_CDA' ) ) {
                    e = doc.createElement( 'script' );
                    e.id = 'outfox_seed_js';
                    e.charset = "utf-8";
                    e.src = $.root + 'js/ydw.js';
                    doc.body.appendChild( e );
                }
            }
        } ),

    // 视图类
        v = $.inherit( $.View , {
            Content_TEMPLATE : "<div class='_tip_'>{{tip}}</div><div class='_query_'>{{query}}</div><div><span class='_pronunciation_'>{{pronunciation}}</span></div><div><div class='_title_'>" +
                $.i18n( 'ContentDetailed' ) + "</div><ul class='_content_'>{{base}}</ul></div><div><div class='_title_'>" +
                $.i18n( 'ContentResult' ) + "</div><div class='_content_'>{{result}}</div></div><div><div class='_title_ _error_'>" +
                $.i18n( 'ContentError' ) + "</div><div class='_content_'>{{error}}</div></div><div class='_from_'>via&nbsp;<a target='_blank' href='{{viaLink}}' title='" +
                $.i18n( 'ContentMore' ) + "'>{{via}}</a></div>" , // 标签页的模板

            // 用于记录弹出层显示位置
            pos : {left : 0 , top : 0} ,

            // 元素是否已被插入到了文档中。仅当发生第一次查询时，才把它插入文档。
            inserted : false ,

            // 弹层的 dom 对象
            dom : (function () {
                var view = doc.createElement( 'section' ),

                //用来保存s鼠标按下时，鼠标与节点的相对坐标
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

                        // 当在结果框上点击时，不隐藏它
                        e.stopPropagation();

                        // 一旦鼠标左键点下，就为节点注册 mousemove 事件
                        if ( e.button === 0 && e.target.className === '_query_' ) {

                            //保存元素初始位置信息
                            original.x = e.pageX - view.offsetLeft;
                            original.y = e.pageY - view.offsetTop;

                            // 在document对象上注册鼠标事件，以免鼠标移动过快，移出翻译框后不触发
                            doc.addEventListener( 'mousemove' , mousemove , true );
                            doc.addEventListener( 'mouseup' , mouseup , true );
                        }
                    };

                view.id = '_container_';

                // 使 dom 可拖动
                view.addEventListener( 'mousedown' , mousedown , true );
                return view;
            }()) ,

            /**
             * 将对象转换为 html 字符串的方法
             * @param obj
             * @param api
             */
            obj2html : function ( obj , api ) {

                var t = this.Content_TEMPLATE;

                t = t.replace( '{{via}}' , api.viaName ); //替换接口名称

                if ( obj.error ) { //如果有错误状态
                    t = t.replace( '{{error}}' , api.errorMsg[ obj.error] )
                        .replace( "<a target='_blank' href='{{viaLink}}' title='" +
                            $.i18n( 'ContentMore' ) + "'>" + api.viaName + "</a>" , api.viaName );  // 错误状态下没有更多信息

                } else { //处理一般情况

                    t = t.replace( '{{viaLink}}' , api.viaLink ) //替换接口链接
                        .replace( /\{\{query\}\}/g , obj.query ) //替换标头与接口链接里面的查询字符串。因为有两个{{query}}所以用了全局的正则，否则replace方法只会替换第一个
                        .replace( '{{from}}' , obj.from || 'auto' ) //接口链接里面的源语言
                        .replace( '{{to}}' , obj.to || 'auto' ); //接口链接里面的目标语言

                    if ( obj.detailed ) { //如果有详细解释

                        t = t.replace( '{{base}}' , function () {
                            var s = '';
                            obj.detailed.forEach( function ( v ) {
                                s += '<li>' + v + '</li>';
                            } );
                            return s;
                        } );

                    } else {

                        //在标签页里，有详细解释就不要翻译结果了
                        t = t.replace( '{{result}}' , obj.result );
                    }

                    //如果有发音
                    if ( obj.phonetic ) {
                        t = t.replace( '{{pronunciation}}' , obj.phonetic );
                    }

                    //相关内容（templateObj.relatedWords），在标签页中不处理，以免结果框过长
                }

                //将没有的内容去除，这样 css 的 :empty{display:none} 规则会隐藏它们
                t = t.replace( /\{\{[^}]+\}\}/g , '' );

                //显示模板
                //bugfix：错误消息不显示
                return this.show( t , this.pos );
            } ,

            show : function ( htmlStr , pos ) {
                var dom = this.dom, position;

                // 仅在有查询时才插入模板
                if ( !this.viewInserted ) {
                    doc.body.appendChild( dom );
                    this.viewInserted = true;
                }

                // 此时 dom 节点是隐藏的，所以多次修改不会触发浏览器的重排和重绘
                dom.innerHTML = htmlStr;
                Array.prototype.forEach.call( dom.querySelectorAll( '#_container_ :empty' ) , function ( v ) {
                    var parent = v.previousElementSibling;
                    if ( parent ) {
                        parent.style.display = 'none';
                    }
                } );
                dom.style.top = pos.top + 'px';
                dom.style.left = pos.left + 'px';
                dom.style.display = 'block';

                //如果翻译框的水平位置超出了浏览器的右边
                //仅当view显示在页面中时才能用 getBoundingClientRect 方法查询元素位置
                position = dom.getBoundingClientRect();
                if ( position.left + position.width > window.innerWidth ) {
                    dom.style.right = '0';
                    dom.style.left = 'auto';
                }
                return this;
            }
        } );

    // 注册 query 事件，通知视图完成结果显示
    $.sub( 'query' , v.obj2html.bind( v ) );

    //注册划词翻译事件
    doc.addEventListener( 'mouseup' , function ( event ) {

        /*
         * bugfix：当鼠标点击选中的区域后，翻译框会再弹起来一次
         * 为此只能延后0毫秒，待浏览器默认将选中词取消后再查询
         * （每次鼠标mousedown事件，chrome就会清空页面上的选中文本）
         */
        setTimeout( function () {

            //缓存本地控制器
            var lc = c , e = event, s = lc.text.toString().trim();

            // 如果页面上存在选中文本，则记录鼠标up时的位置，供翻译结果显示
            if ( s ) {
                v.pos = {
                    left : e.pageX + 10 ,
                    top : e.pageY + 10
                };

                // 如果起来的是鼠标左键且当前开启了划词翻译，则执行划词翻译
                if ( e.button === 0 && lc.SELECTION ) {

                    // 如果开启了必须使用Ctrl键配合
                    if ( lc.CTRL_NEEDED ) {
                        if ( !e.ctrlKey ) {
                            return;
                        }
                    }

                    // 翻译前添加一个提醒
                    v.show( '<div class="_tip_">正在翻译，请稍后……</div>' , v.pos );
                    $( s , lc.QUERY_API );
                }
            }
        } , 0 );

    } , true );

    /*
     * 注册自动隐藏翻译框事件
     * 注意结果框本身注册了一个捕获来阻止mousedown事件的冒泡
     * 以防止在结果框上点击时被隐藏
     * */
    doc.addEventListener( 'mousedown' , function () {
        var d = v.dom;

        //隐藏结果框
        d.style.display = 'none';

        //避免后面的结果框显示时仍附带这个状态
        d.style.right = 'auto';
    } );

    // 根据设置项更新配置
    $.load( ['SELECTION', 'CTRL_NEEDED', 'QUERY_API'] , function ( items ) {
        $.extend( c , items );
    } );

    /**
     * 统一接收消息
     * 接收的消息目前有两种：
     * 1）bd、yd、ydw，这三种是翻译命令，需要匹配到具体的 frame
     * 2）其它的 SELECTION、QUERY_API、CTRL_NEEDED， 这是全局命令，每个frame都需要接收到
     * */
    chrome.runtime.onMessage.addListener( function ( info ) {
        var menuId = info.menuItemId;

        //        console.dir( info );

        // 如果有这个属性，说明这个消息是从右键菜单传来的，属于 yd、bd、ydw中的一个
        if ( menuId ) {

            /*
             * 由于每个页面（包括 iframe）都有内容脚本
             * 所以一个页面可能会执行多次请求
             * 下面的判断保证请求只会在点击的页面上发生
             */
            if ( info.frameUrl ) {

                //通过地址判断是否是同一个frame
                if ( c.frame !== info.frameUrl ) {
                    return;
                }
            } else {

                //判断自身是否是子窗口
                if ( c.frame ) {
                    return;
                }
            }

            if ( menuId === 'ydw' ) {
                c.web();
            } else {
                $[ menuId ].query( c.text.toString().trim() );
            }
        } else {

            // 处理设置变更SELECTION、QUERY_API、CTRL_NEEDED，这一部分每个frame都需要接收到
            //            console.dir( info );
            Object.keys( info ).forEach( function ( v ) {
                c[v] = info[v].newValue;
            } );
            //            if ( info.SELECTION !== undefined ) {
            //                c.SELECTION = info.SELECTION;
            //            }
        }
    } );
}( $ ));


