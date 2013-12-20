(function () {
    'use strict';
    var h = "http://fanyi.youdao.com/web2", d, k, a, l, g, c, f, body = document.body;
    if ( !window.OUTFOX_JavascriptTranslatoR ) {
        d = document.createElement( "script" );
        d.setAttribute( "src" , h + "/scripts/all-packed-utf-8.js?476567&" + Date.now() );
        d.setAttribute( "type" , "text/javascript" );
        d.setAttribute( "charset" , "utf-8" );
        body.appendChild( d );
    } else {
        k = "http://fanyi.youdao.com";
        a = "/web2/conn.html";
        l = h + "/index.do";
        g = k + "/jtr";
        c = h + "/rl.do";
        f = h + "/styles/all-packed.css";
        J.loadCSS( document , f );
        window.OUTFOX_JavascriptTranslatoR = new J.TR.UI( body , {domain : k , update : false , updateTipMsg : "增加关闭按钮" , updateDate : "2011-3-15" , cssURL : f , tipsURL : l , transURL : g , logURL : c , connFilePath : a , reqSize : 20} )
    }
}());
