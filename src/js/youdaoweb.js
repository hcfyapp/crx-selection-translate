(function () {
    var h = "http://fanyi.youdao.com/web2";
    if ( !window.OUTFOX_JavascriptTranslatoR ) {
        var d = document.createElement( "script" );
        d.setAttribute( "src" , h + "/scripts/all-packed-utf-8.js?476567&" + Date.parse( new Date() ) );
        d.setAttribute( "type" , "text/javascript" );
        d.setAttribute( "charset" , "utf-8" );
        document.body.appendChild( d );
    } else {
        var k = "http://fanyi.youdao.com", a = "/web2/conn.html", l = h + "/index.do", g = k + "/jtr", c = h + "/rl.do", f = h + "/styles/all-packed.css";
        J.loadCSS( document , f );
        window.OUTFOX_JavascriptTranslatoR = new J.TR.UI( document.body , {domain : k , update : false , updateTipMsg : "增加关闭按钮" , updateDate : "2011-3-15" , cssURL : f , tipsURL : l , transURL : g , logURL : c , connFilePath : a , reqSize : 20} )
    }
})();
