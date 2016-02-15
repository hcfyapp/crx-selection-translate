// https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit
(function () {
  var d = "text/javascript" , e = "text/css" , f = "stylesheet" , g = "script" , h = "link" , k = "head" , l = "complete" , m = "UTF-8" , n = ".";

  function p( b ) {
    var a = document.getElementsByTagName( k )[ 0 ];
    a || (a = document.body.parentNode.appendChild( document.createElement( k ) ));
    a.appendChild( b )
  }

  function _loadJs( b ) {
    var a = document.createElement( g );
    a.type = d;
    a.charset = m;
    a.src = b;
    p( a )
  }

  function _loadCss( b ) {
    var a = document.createElement( h );
    a.type = e;
    a.rel = f;
    a.charset = m;
    a.href = b;
    p( a )
  }

  function _isNS( b ) {
    b = b.split( n );
    for ( var a = window , c = 0 ; c < b.length ; ++c )if ( !(a = a[ b[ c ] ]) )return !1;
    return !0
  }

  function _setupNS( b ) {
    b = b.split( n );
    for ( var a = window , c = 0 ; c < b.length ; ++c )a.hasOwnProperty ? a.hasOwnProperty( b[ c ] ) ? a = a[ b[ c ] ] : a = a[ b[ c ] ] = {} : a = a[ b[ c ] ] || (a[ b[ c ] ] = {});
    return a
  }

  window.addEventListener && "undefined" == typeof document.readyState && window.addEventListener( "DOMContentLoaded" , function () {document.readyState = l} , !1 );
  if ( _isNS( 'google.translate.Element' ) ) {return}
  (function () {
    var c = _setupNS( 'google.translate._const' );
    c._cl = 'zh-CN';
    c._cuc = 'googleTranslateElementInit';
    c._cac = '';
    c._cam = '';
    c._ctkk = '403982';
    var h = 'translate.googleapis.com';
    var s = (true ? 'https' : window.location.protocol == 'https:' ? 'https' : 'http') + '://';
    var b = s + h;
    c._pah = h;
    c._pas = s;
    c._pbi = b + '/translate_static/img/te_bk.gif';
    c._pci = b + '/translate_static/img/te_ctrl3.gif';
    c._pli = b + '/translate_static/img/loading.gif';
    c._plla = h + '/translate_a/l';
    c._pmi = b + '/translate_static/img/mini_google.png';
    c._ps = b + '/translate_static/css/translateelement.css';
    c._puh = 'translate.google.com';
    _loadCss( c._ps );
    //_loadJs( b + '/translate_static/js/element/main_zh-CN.js' );
    //https://translate.googleapis.com/translate_static/js/element/main_zh-CN.js
    (function () {
      var c = "." , d = "Google \u5df2\u5c06\u6b64\u7f51\u9875\u81ea\u52a8\u7ffb\u8bd1\u6210\uff1a" , e = "var " , f = "\u4f7f\u7528\u4ee5\u4e0b\u8bed\u8a00\u67e5\u770b\u6b64\u7f51\u9875\uff1a" , k = "\u5173\u95ed" , l = "\u5173\u95ed\u4ee5\u4e0b\u8bed\u8a00\u7684\u81ea\u52a8\u6a2a\u5e45\u5f39\u51fa\u529f\u80fd\uff1a" , m = "\u5c06\u6240\u6709\u5185\u5bb9\u7ffb\u8bd1\u6210" , n = "\u5df2\u7ffb\u8bd1\u4e3a\u4ee5\u4e0b\u8bed\u8a00\uff1a" , p = "\u5f3a\u529b\u9a71\u52a8" , q = "\u7528 Google \u7ffb\u8bd1\u5c06\u6b64\u7f51\u9875\u7ffb\u8bd1\u6210" ,
        r = "\u7531 " , t = "\u7ffb\u8bd1" , u = "\uff1f" , v = this;

      function w( a , x ) {
        var g = a.split( c ) , b = v;
        g[ 0 ] in b || !b.execScript || b.execScript( e + g[ 0 ] );
        for ( var h ; g.length && (h = g.shift()) ; )g.length || void 0 === x ? b[ h ] ? b = b[ h ] : b = b[ h ] = {} : b[ h ] = x
      };
      var y = {
        0 : t ,
        1 : "\u53d6\u6d88" ,
        2 : "\u53d6\u6d88" ,
        3 : function ( a ) {return d + a} ,
        4 : function ( a ) {return n + a} ,
        5 : "\u9519\u8bef\uff1a\u670d\u52a1\u5668\u65e0\u6cd5\u5b8c\u6210\u60a8\u7684\u8bf7\u6c42\u3002\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002" ,
        6 : "\u4e86\u89e3\u8be6\u60c5" ,
        7 : function ( a ) {return r + (a + p)} ,
        8 : t ,
        9 : "\u6b63\u5728\u7ffb\u8bd1" ,
        10 : function ( a ) {return q + (a + u)} ,
        11 : function ( a ) {return f + a} ,
        12 : "\u663e\u793a\u539f\u6587" ,
        13 : "\u6b64\u672c\u5730\u6587\u4ef6\u7684\u5185\u5bb9\u5c06\u901a\u8fc7\u5b89\u5168\u8fde\u63a5\u53d1\u9001\u7ed9 Google \u8fdb\u884c\u7ffb\u8bd1\u3002" ,
        14 : "\u6b64\u5b89\u5168\u7f51\u9875\u7684\u5185\u5bb9\u5c06\u901a\u8fc7\u5b89\u5168\u8fde\u63a5\u53d1\u9001\u7ed9 Google \u8fdb\u884c\u7ffb\u8bd1\u3002" ,
        15 : "\u6b64 Intranet \u7f51\u9875\u7684\u5185\u5bb9\u5c06\u901a\u8fc7\u5b89\u5168\u8fde\u63a5\u53d1\u9001\u7ed9 Google \u8fdb\u884c\u7ffb\u8bd1\u3002" ,
        16 : "\u9009\u62e9\u8bed\u8a00" ,
        17 : function ( a ) {return k + (a + t)} ,
        18 : function ( a ) {return l + a} ,
        19 : "\u59cb\u7ec8\u9690\u85cf" ,
        20 : "\u539f\u6587\uff1a" ,
        21 : "\u63d0\u4f9b\u66f4\u597d\u7684\u7ffb\u8bd1\u5efa\u8bae" ,
        22 : "\u63d0\u4f9b\u5efa\u8bae" ,
        23 : "\u5168\u90e8\u7ffb\u8bd1" ,
        24 : "\u5168\u90e8\u6062\u590d" ,
        25 : "\u5168\u90e8\u53d6\u6d88" ,
        26 : "\u5c06\u8fd9\u4e9b\u5185\u5bb9\u7ffb\u8bd1\u6210\u6211\u7684\u8bed\u8a00" ,
        27 : function ( a ) {return m + a} ,
        28 : "\u663e\u793a\u6e90\u8bed\u8a00" ,
        29 : "\u9009\u9879" ,
        30 : "\u5173\u95ed\u5bf9\u6b64\u7f51\u7ad9\u7684\u7ffb\u8bd1" ,
        31 : null ,
        32 : "\u663e\u793a\u5176\u4ed6\u7ffb\u8bd1" ,
        33 : "\u70b9\u51fb\u4e0a\u65b9\u7684\u5b57\u8bcd\u5373\u53ef\u83b7\u53d6\u5176\u4ed6\u7ffb\u8bd1" ,
        34 : "\u91c7\u7528" ,
        35 : "\u6309\u4f4f Shift \u952e\u8fdb\u884c\u62d6\u52a8\u53ef\u91cd\u65b0\u6392\u5e8f" ,
        36 : "\u70b9\u51fb\u53ef\u663e\u793a\u5176\u4ed6\u7ffb\u8bd1" ,
        37 : "\u6309\u4f4f Shift \u952e\u7684\u540c\u65f6\u70b9\u51fb\u5e76\u62d6\u52a8\u4e0a\u65b9\u7684\u5b57\u8bcd\u5373\u53ef\u91cd\u65b0\u6392\u5e8f\u3002" ,
        38 : "\u611f\u8c22\u60a8\u4e3a Google \u7ffb\u8bd1\u63d0\u4f9b\u7ffb\u8bd1\u5efa\u8bae\u3002" ,
        39 : "\u7ba1\u7406\u6b64\u7f51\u7ad9\u7684\u7ffb\u8bd1" ,
        40 : "\u70b9\u51fb\u67d0\u4e2a\u5b57\u8bcd\u663e\u793a\u5176\u4ed6\u7ffb\u8bd1\u6216\u53cc\u51fb\u67d0\u4e2a\u5b57\u8bcd\u76f4\u63a5\u8fdb\u884c\u4fee\u6539" ,
        41 : "\u539f\u6587" ,
        42 : t ,
        43 : t ,
        44 : "\u60a8\u6240\u505a\u7684\u66f4\u6b63\u5df2\u63d0\u4ea4\u3002" ,
        45 : "\u9519\u8bef\uff1a\u4e0d\u652f\u6301\u7f51\u9875\u6240\u7528\u8bed\u8a00\u3002"
      };
      var z = window.google && google.translate && google.translate._const;
      if ( z ) {
        var A;
        a:{
          for ( var B = [] , C = [ "26,0.01,20150908" ] , D = 0 ; D < C.length ; ++D ) {
            var E = C[ D ].split( "," ) , F = E[ 0 ];
            if ( F ) {
              var G = Number( E[ 1 ] );
              if ( !(!G || .1 < G || 0 > G) ) {
                var H = Number( E[ 2 ] ) , I = new Date , J = 1E4 * I.getFullYear() + 100 * (I.getMonth() + 1) + I.getDate();
                !H || H < J || B.push( { version : F , ratio : G , a : H } )
              }
            }
          }
          for ( var K = 0 , L = window.location.href.match( /google\.translate\.element\.random=([\d\.]+)/ ) , M = Number( L && L[ 1 ] ) || Math.random() , D = 0 ; D < B.length ; ++D ) {
            var N = B[ D ] , K = K + N.ratio;
            if ( 1 <= K )break;
            if ( M < K ) {
              A = N.version;
              break a
            }
          }
          A = "33"
        }
        var O = "/translate_static/js/element/%s/element_main.js".replace( "%s" ,
          A );
        if ( "0" == A ) {
          var P = " translate_static js element %s element_main.js".split( " " );
          P[ P.length - 1 ] = "main_zh-CN.js";
          O = P.join( "/" ).replace( "%s" , A )
        }
        if ( z._cjlc ) {
          z._cjlc( z._pas + z._pah + O );
        } else {
          var Q = z._pas + z._pah + O , R = document.createElement( "script" );
          R.type = "text/javascript";
          R.charset = "UTF-8";
          R.src = Q;
          var S = document.getElementsByTagName( "head" )[ 0 ];
          S || (S = document.body.parentNode.appendChild( document.createElement( "head" ) ));
          // todo 这里的脚本没法直接嵌在代码里，否则运行不正常
          S.appendChild( R )
        }
        w( "google.translate.m" , y );
        w( "google.translate.v" , A )
      }
      ;
    })()
  })();
})();
