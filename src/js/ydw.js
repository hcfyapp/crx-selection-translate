(function () {
    'use strict';
    var h = "https://fanyi.youdao.com/web2", o = document, b = o.body, d, k , a, l, g, c, f;
    if ( window.OUTFOX_JavascriptTranslatoR ) {
        k = "https://fanyi.youdao.com";
        a = "/web2/conn.html";
        l = h + "/index.do";
        g = k + "/jtr";
        c = h + "/rl.do";
        f = h + "/styles/all-packed.css";
        J.loadCSS( o , f );
        window.OUTFOX_JavascriptTranslatoR = new J.TR.UI( b , {domain : k , update : false , updateTipMsg : "增加关闭按钮" , updateDate : "2011-3-15" , cssURL : f , tipsURL : l , transURL : g , logURL : c , connFilePath : a , reqSize : 20} );
    } else {
        d = document.createElement( "script" );
        d.setAttribute( "src" , h + "/scripts/all-packed-utf-8.js?543853&" + Date.now() );
        d.setAttribute( "type" , "text/javascript" );
        d.setAttribute( "charset" , "utf-8" );
        b.appendChild( d );
    }
}());
