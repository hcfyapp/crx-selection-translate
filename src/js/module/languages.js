define( [ '../lib/jquery' ] , function ( $ ) {
    'use strict';
    var end = function ( func , timeout ) {
            var timeId;
            return function () {
                var args = arguments ,
                    that = this;
                clearTimeout( timeId );
                timeId = setTimeout( function () {
                    func.apply( that , args );
                } , timeout || 250 );
            };
        } ,

        s = {
            /**
             * 语种：语种中文名_对应拼音
             * @see https://translate.google.cn
             */
            languages : {
                "sq" : "阿尔巴尼亚语_aebnyy" ,
                "ga" : "爱尔兰语_aely" ,
                "ar" : "阿拉伯语_alby" ,
                "az" : "阿塞拜疆语_asbjy" ,
                "et" : "爱沙尼亚语_asnyy" ,
                "is" : "冰岛语_bdy" ,
                "be" : "白俄罗斯语_belsy" ,
                "af" : "布尔语(南非荷兰语)_nfhly" ,
                "bg" : "保加利亚语_bjlyy" ,
                "pl" : "波兰语_bly" ,
                "eu" : "巴斯克语_bsky" ,
                "bs" : "波斯尼亚语_bsnyy" ,
                "fa" : "波斯语_bsy" ,
                "da" : "丹麦语_dmy" ,
                "de" : "德语_dy" ,
                "ru" : "俄语_ey" ,
                "tl" : "菲律宾语_flby" ,
                "fi" : "芬兰语_fly" ,
                "fr" : "法语_fy" ,
                "gu" : "古吉拉特语_gjlty" ,
                "ka" : "格鲁吉亚语_gljyy" ,
                "km" : "高棉语_gmy" ,
                "ht" : "海地克里奥尔语_hdklaey" ,
                "nl" : "荷兰语_hly" ,
                "ha" : "豪萨语_hsy" ,
                "ko" : "韩语_hy" ,
                "cs" : "捷克语_jky" ,
                "gl" : "加利西亚语_jlxyy" ,
                "ca" : "加泰罗尼亚语_jtlnyy" ,
                "hr" : "克罗地亚语_kldyy" ,
                "kn" : "卡纳达语_kndy" ,
                "la" : "拉丁语_ldy" ,
                "ro" : "罗马尼亚语_lmnyy" ,
                "lt" : "立陶宛语_ltwy" ,
                "lv" : "拉脱维亚语_ltwyy" ,
                "lo" : "老挝语_lwy" ,
                "mt" : "马耳他语_mety" ,
                "mn" : "蒙古语_mgy" ,
                "bn" : "孟加拉语_mjly" ,
                "mr" : "马拉地语_mldy" ,
                "mi" : "毛利语_mly" ,
                "ms" : "马来语_mly" ,
                "mk" : "马其顿语_mqdy" ,
                "hmn" : "苗语_my" ,
                "ne" : "尼泊尔语_nbey" ,
                "zu" : "南非祖鲁语_nfzly" ,
                "no" : "挪威语_nwy" ,
                "pt" : "葡萄牙语_ptyy" ,
                "pa" : "旁遮普语_pzpy" ,
                "sv" : "瑞典语_rdy" ,
                "ja" : "日语_ry" ,
                "sr" : "塞尔维亚语_sewyy" ,
                "eo" : "世界语_sjy" ,
                "sk" : "斯洛伐克语_slfky" ,
                "sl" : "斯洛文尼亚语_slwnyy" ,
                "so" : "索马里语_smly" ,
                "sw" : "斯瓦希里语_swxly" ,
                "ceb" : "宿务语_swy" ,
                "tr" : "土耳其语_teqy" ,
                "te" : "泰卢固语_tlgy" ,
                "ta" : "泰米尔语_tmey" ,
                "th" : "泰语_ty" ,
                "ur" : "乌尔都语_wedy" ,
                "cy" : "威尔士语_wesy" ,
                "uk" : "乌克兰语_wkly" ,
                "iw" : "希伯来语_xbly" ,
                "es" : "西班牙语_xbyy" ,
                "el" : "希腊语_xly" ,
                "hu" : "匈牙利语_xyly" ,
                "ig" : "伊博语_yby" ,
                "it" : "意大利语_ydly" ,
                "yi" : "意第绪语_ydxy" ,
                "hi" : "印地语_ydy" ,
                "yo" : "约鲁巴语_ylby" ,
                "hy" : "亚美尼亚语_ymnyy" ,
                "id" : "印尼语_yny" ,
                "vi" : "越南语_yny" ,
                "jw" : "印尼爪哇语_ynzwy" ,
                "en" : "英语_yy" ,
                "zh-TW" : "中文(繁体)_zwft" ,
                "zh-CN" : "中文(简体)_zwjt"
            } ,

            /**
             * 根据用户输入返回匹配的语种
             * @param input 用户的输入
             * @returns {{code: string, des: string}[]}
             */
            search : function ( input ) {
                var r = [
                    {
                        code : 'auto' ,
                        des : '自动选择'
                    }
                ];
                if ( input ) {
                    $.each( s.languages , function ( key , value ) {
                        if ( value.indexOf( input ) >= 0 ) {
                            r.push( {
                                code : key ,
                                des : value.split( '_' )[ 0 ]
                            } );
                        }
                    } );
                }
                return r;
            } ,

            /**
             * 检测划词翻译是否支持某种语种
             * @param {string} code
             * @returns {boolean}
             */
            has : function ( code ) {
                return s.languages.hasOwnProperty( code );
            } ,

            handles : {

                /**
                 * 显示与用户输入匹配的语言列表
                 * 这是一个“懒加载”函数，仅在第一次显示时才真正将相关的dom插入到网页中
                 */
                show : function () {
                    var $x = $( '<lmk-langs/>' ).appendTo( 'body' ) ,
                        show = function ( $input , result ) {
                            var pos = $input.offset() ,
                                str = '';

                            result.forEach( function ( v ) {
                                str += '<lmk-langs-item data-value="' + v.code + '">' + v.des + '</lmk-langs-item>';
                            } );

                            $x.html( str ).css( {
                                left : pos.left ,
                                top : pos.top + $input.outerHeight( true ) ,
                                width : $input.outerWidth()
                            } ).addClass( 'show' );
                            return this;
                        };

                    $( '<style>' +
                    'lmk-langs{box-sizing:border-box;background:#fff;border:1px solid black;display:none;position:absolute}lmk-langs.show{display:block}lmk-langs-item{display:block;line-height:20px;cursor:pointer}lmk-langs-item:hover{background:#d3d3d3}' +
                    '</style>' ).appendTo( 'head' );

                    s.handles.show = show; // 覆盖
                    s.handles.hide = function () { $x.removeClass( 'show' ); };

                    return show.apply( this , arguments );
                } ,
                hide : function () {}
            } ,

            /**
             * 将语言列表附到一个输入框上
             * @param {Element} input
             * @param {function} choose
             */
            attach : function ( input , choose ) {
                var $input = $( input );
                $input.on( 'input' , end( function () {
                    var v = this.value.trim();
                    if ( v ) {
                        s.handles.show( $input , s.search( v ) );
                    } else {
                        s.handles.hide();
                    }
                } ) );

                $( document ).on( 'click' , function ( e ) {
                    var target = e.target;
                    s.handles.hide();
                    if ( 'lmk-langs-item' === target.nodeName.toLowerCase() ) {
                        choose( target );
                    }
                } );
            }
        };
    return Object.freeze( s );
} );
