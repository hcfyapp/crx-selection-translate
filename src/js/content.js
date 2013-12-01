/**
 * 这个文件是内容脚本，*仅在*标签页运行
 */

$.extend( $.V.prototype , {

    //仅在有查询请求时才在页面中插入视图
    viewInserted : false ,
    template : '<div class="_tip_">{{tip}}</div><div class="_query_">{{query}}</div><div><div class="_title_">详细解释</div><ul class="_content_">{{base}}</ul></div><div><div class="_title_">翻译结果</div><div class="_content_">{{result}}</div></div><div class="_from_">via&nbsp;<a target="_blank" href="{{viaLink}}" title="详细释义">{{via}}</a></div><div><div class="_title_">出错啦！</div><div class="_content_">{{error}}</div></div>' ,
    view : (function () {
        'use strict';
        var view = document.createElement( 'section' );
        view.id = '_container_';
        return view;
    }()) ,

    //结果框要显示的位置
    pos : {left : 0 , top : 0} ,

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
        'use strict';

        //        console.dir( templateObj );

        var template = this.template;
        //        debugger
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

            //相关内容（templateObj.relatedWords），在标签页中不处理，以免结果框过长

            //将没有的内容去除
            template = template.replace( /\{\{[^}]+\}\}/g , '' );

            //显示模板
            this.show( template , this.pos );

            return this;
        }
    } ,
    show : function ( innerHTML , pos ) {
        'use strict';

        //        console.log( pos );

        var view = this.view, position;

        //仅在有查询时才插入模板
        if ( !this.viewInserted ) {
            document.getElementsByTagName( 'body' )[0].appendChild( view );
            this.viewInserted = true;
        }

        view.innerHTML = innerHTML;
        [].forEach.call( view.querySelectorAll( '#_container_ :empty' ) , function ( v ) {
            var parent = v.previousElementSibling;
            if ( parent ) {
                parent.style.display = 'none';
            }
        } );
        view.style.top = pos.top + 'px';
        view.style.left = pos.left + 'px';
        view.style.display = 'block';

        //如果翻译框的水平位置超出了浏览器的右边
        //仅当view显示在页面中时才能用getBoundingClientRect方法查询元素位置
        position = view.getBoundingClientRect();
        if ( position.left + position.width > window.innerWidth ) {
            view.style.right = '0';
            view.style.left = 'auto';
        }

        return this;
    }
} );

$.extend( $.C.prototype , {

    //为每个控制器的实例添加一个选中文本属性
    selection : window.getSelection()
} );

//执行逻辑写在这里
$.ready( function () {
    'use strict';

    this.extend( $.E , {

        //鼠标按键up事件
        mouseup : function ( e ) {

            /*
             * bug：当鼠标点击选中的区域后，翻译框会再弹起来一次
             * 为此只能延后0毫秒，待浏览器默认将选中词取消后再查询
             * （每次鼠标mousedown事件，浏览器就会清空页面上的选中文本）
             */
            setTimeout( function () {
                var s = $.C.prototype.selection.toString().trim();

                //如果页面上存在选中文本，则记录鼠标up时的位置，供翻译结果显示
                if ( s ) {
                    $.V.prototype.pos.left = e.pageX + 10;
                    $.V.prototype.pos.top = e.pageY + 10;

                    // 如果起来的是鼠标左键，则执行划词翻译
                    if ( e.button === 0 && $.isOpenSlection ) {
                        $[s.length > 200 ? 'bd' : 'yd'].m.query( s );
                    }
                }
            } , 0 );

        } ,

        //鼠标按键down事件
        mousedown : function ( e ) {

            //如果 target 不是视图的子节点
            if ( !$.contains( $.V.prototype.view , e.target ) ) {
                $.V.prototype.view.style.display = 'none';
            }
        }

    } );

    //循环注册事件
    Object.keys( $.E ).forEach( function ( v ) {
        document.addEventListener( v , $.E[v] );
    } );

}.bind( $ ) );

//重要的frame问题
$.isFrame = (function () {
    'use strict';
    return window.top === window ? null : location.href;
}());

chrome.runtime.onMessage.addListener( function ( info ) {
    'use strict';

    /*
     * 由于每个页面（包括 iframe）都有内容脚本
     * 所以一个页面可能会执行多次请求
     * 下面的判断保证请求只会在点击的页面上发生
     */
    if ( info.frameUrl ) {

        //通过地址判断是否是同一个frame
        if ( $.isFrame !== info.frameUrl ) {
            return;
        }
    } else {

        //判断自身是否是子窗口
        if ( $.isFrame ) {
            return;
        }
    }

    switch ( info.menuItemId ) {

        //以下三种命令直接处理
        case 'yd':
        case 'bd':
        case 'ydw':

            //直接query
            $[info.menuItemId].m.query( $.C.prototype.selection.toString().trim() );
            break;
    }

    $.isOpenSlection = info.isSelection;
} );

//读取配置，是否开启划词
chrome.storage.local.get( 'isSelection' , function ( items ) {
    'use strict';
    $.isOpenSlection = items.isSelection;
} );

//$.yd.v.show( $.yd.v.template , {top : 0 , left : 0} );

//$.bd.v.generate( {
//    detailedExplains : ['test']
//} );