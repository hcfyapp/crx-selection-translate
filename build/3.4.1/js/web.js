(function () {
    var o, j = "http://fanyi.youdao.com/web2", i, e, b, m, p, n;
    if ( !window.OUTFOX_JavascriptTranslatoR ) {
        o = document.createElement( "script" );
        o.setAttribute( "src" , j + "/scripts/all-packed-utf-8.js?476567&" + Date.parse( new Date() ) );
        o.setAttribute( "type" , "text/javascript" );
        o.setAttribute( "charset" , "utf-8" );
        document.body.appendChild( o )
    } else {
        i = "http://fanyi.youdao.com";
        e = "/web2/conn.html";
        b = j + "/index.do";
        m = i + "/jtr";
        p = j + "/rl.do";
        n = j + "/styles/all-packed.css";
        J.loadCSS( document , n );
        window.OUTFOX_JavascriptTranslatoR = new J.TR.UI( document.body , {domain : i , update : false , updateTipMsg : "增加关闭按钮" , updateDate : "2011-3-15" , cssURL : n , tipsURL : b , transURL : m , logURL : p , connFilePath : e , reqSize : 20} )
    }
})();