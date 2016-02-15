// https://ssl.microsofttranslator.com/ajax/v3/WidgetV3.ashx?siteData=ueOIGRSKkd965FeEGM5JtQ**&ctf=True&ui=true&settings=Auto&from=
/* Copyright 2010 Microsoft Corporation */
window[ '_mstConfig' ] = {
  appId : 'ZDqkyX-o8XgoyB0B2u-MgqIbmSHLvI8YmfY3cDI03GZ_gSaDi8I_zvI69-cEWjxqzYbWdy3NzZJxw3RhftEDu0CDhMBnu_BLJfb5lcOHgTOJ0ECX7hZKX9JHBTkOImrU_' ,
  rootURL : 'https\x3a\x2f\x2fssl.microsofttranslator.com\x2f' ,
  baseURL : 'https\x3a\x2f\x2fssl.microsofttranslator.com\x2fajax\x2fv3\x2fWidgetV3.ashx\x3fsiteData\x3dueOIGRSKkd965FeEGM5JtQ\x2a\x2a\x26ctf\x3dTrue\x26ui\x3dtrue\x26settings\x3dAuto\x26from\x3d' ,
  serviceURL : 'https\x3a\x2f\x2fapi.microsofttranslator.com\x2fv2\x2fajax.svc' ,
  imagePath : 'https\x3a\x2f\x2fssl.microsofttranslator.com\x2fstatic\x2f226010\x2fimg\x2f' ,
  debug : false ,
  locale : 'zh-chs' ,
  country : '' ,
  category : '' ,
  ref : 'WidgetV3CTF' ,
  service : 'WC3' ,
  maxChars : 1000000000 ,
  noAuto : [ "facebook." , "youtube." ] ,
  escapeNonAscii : false ,
  requestGroup : '' ,
  preTrans : false ,
  OnErrorHandler : '' ,
  WidgetSiteDomain : ''
};
﻿
window._mstConfig[ 'SignIn' ] = '<a href="https://login.live.com/login.srf?wa=wsignin1.0&amp;rpsnv=12&amp;ct=1454335117&amp;rver=6.0.5276.0&amp;wp=LBI&amp;wreply=https:%2F%2Fssl.microsofttranslator.com%2Fajax%2Fv2%2Fauth.aspx%3Fpru%3Dhttps%253a%252f%252fssl.microsofttranslator.com%252fajax%252fv3%252fWidgetV3.ashx&amp;lc=2052&amp;id=268160">登录</a>';
if ( !this.Microsoft )this.Microsoft = {};
if ( !this.Microsoft.Translator )this.Microsoft.Translator = {};
if ( Microsoft.Translator.Reset )Microsoft.Translator.Reset();
Microsoft.Translator = new function () {
  var qb = "WidgetFloaterPanels" , o = 7e3 , K = "block" , H = "8px" , bb = "4px 4px 4px 4px" , T = "pointer" , eb = "2147483647" , db = "absolute" , ab = "inline-block" , kb = "direction" , jb = "&onerror=" , P = "lang" , m = ">" , Z = "font" , x = "img" , G = "center" , Y = "false" , F = "left" , U = "right" , r = 100 , E = "visible" , w = 255 , C = "div" , X = "inline" , ib = "position" , l = 400 , S = "select" , s = "px" , z = "0px" , ub = "localizedLangs" , k = "Original" , t = "es" , nb = "sr-latn" , mb = "sr-cyrl" , O = "no" , hb = "de" , cb = "fr" , pb = "zh-cht" , tb = "zh-chs" , y = "ar" , d = "ltr" , q = "rtl" , v = "&" , W = "TRNS_ERROR_MSG" , N = "none" , R = "iframe" , V = "string" , e = 16 , j = true , J = "number" , M = "function" , L = "undefined" , Q = "head" , gb = "text/javascript" , c = -1 , u = "/" , B = "_mstConfig" , h = "en" , i = false , lb = "/static/img/" , b = "" , g = null , n = this;
  n.AddTranslation = function ( i , b , a , j , m , h , c , e , k , l , d , f , g ) {
    return new A( "AddTranslation" , {
      appId : i ,
      originalText : b ,
      translatedText : a ,
      from : j ,
      to : m ,
      rating : h ,
      contentType : c ,
      category : e ,
      user : k ,
      uri : l
    } , d , f , g )
  };
  n.BreakSentences = function ( e , f , b , a , c , d ) {
    return new A( "BreakSentences" , {
      appId : e ,
      text : f ,
      language : b
    } , a , c , d )
  };
  n.Detect = function ( d , e , a , b , c ) {return new A( "Detect" , { appId : d , text : e } , a , b , c )};
  n.DetectArray = function ( d , e , a , b , c ) {
    return new A( "DetectArray" , {
      appId : d ,
      texts : e
    } , a , b , c )
  };
  n.GetAppIdToken = function ( g , c , a , b , d , e , f ) {
    return new A( "GetAppIdToken" , {
      appId : g ,
      minRatingRead : c ,
      maxRatingWrite : a ,
      expireSeconds : b
    } , d , e , f )
  };
  n.GetLanguageNames = function ( f , e , a , b , c , d ) {
    return new A( "GetLanguageNames" , {
      appId : f ,
      locale : e ,
      languageCodes : a
    } , b , c , d )
  };
  n.GetLanguagesForSpeak = function ( d , a , b , c ) {return new A( "GetLanguagesForSpeak" , { appId : d } , a , b , c )};
  n.GetLanguagesForTranslate = function ( d , a , b , c ) {return new A( "GetLanguagesForTranslate" , { appId : d } , a , b , c )};
  n.GetTranslations = function ( f , h , g , i , a , d , b , c , e ) {
    return new A( "GetTranslations" , {
      appId : f ,
      text : h ,
      from : g ,
      to : i ,
      maxTranslations : a ,
      options : d
    } , b , c , e )
  };
  n.Translate = function ( f , h , g , i , a , c , b , d , e ) {
    return new A( "Translate" , {
      appId : f ,
      text : h ,
      from : g ,
      to : i ,
      contentType : a ,
      category : c
    } , b , d , e )
  };
  n.AddTranslationArray = function ( f , a , g , h , d , b , c , e ) {
    return new A( "AddTranslationArray" , {
      appId : f ,
      translations : a ,
      from : g ,
      to : h ,
      options : d
    } , b , c , e )
  };
  n.GetTranslationsArray = function ( f , g , h , i , a , d , b , c , e ) {
    return new A( "GetTranslationsArray" , {
      appId : f ,
      texts : g ,
      from : h ,
      to : i ,
      maxTranslations : a ,
      options : d
    } , b , c , e )
  };
  n.Speak = function ( g , h , b , f , d , a , c , e ) {
    return new A( "Speak" , {
      appId : g ,
      text : h ,
      language : b ,
      format : f ,
      options : d
    } , a , c , e )
  };
  n.TranslateArray = function ( e , f , g , h , c , a , b , d ) {
    return new A( "TranslateArray" , {
      appId : e ,
      texts : f ,
      from : g ,
      to : h ,
      options : c
    } , a , b , d )
  };
  n.TranslateArray2 = function ( e , f , g , h , c , a , b , d ) {
    return new A( "TranslateArray2" , {
      appId : e ,
      texts : f ,
      from : g ,
      to : h ,
      options : c
    } , a , b , d )
  };
  var a = {
    serviceClient : g ,
    appId : b ,
    lpURL : "http://www.bing.com/translator" ,
    rootURL : "http://www.microsofttranslator.com/" ,
    baseURL : "http://www.microsofttranslator.com/Ajax/V2/Toolkit.ashx" ,
    serviceURL : "http://api.microsofttranslator.com/V2/Ajax.svc" ,
    imagePath : lb ,
    debug : i ,
    locale : h ,
    country : b ,
    category : b ,
    ref : b ,
    service : b ,
    maxChars : 1e9 ,
    noAuto : [] ,
    escapeNonAscii : i ,
    requestGroup : b ,
    preTrans : i
  };
  a.serviceClient = n;
  if ( window[ B ] ) {
    for ( var wb in a )if ( !window[ B ][ wb ] )window[ B ][ wb ] = a[ wb ];
    a = window[ B ]
  } else {
    window[ B ] = a;
  }
  var ob = a.serviceClient.LoadScript = new function () {
    function d( f , k ) {
      var c = this , a = f.toString().match( /^([^:]*:\/\/[^\/]*)(\/[^\?\#]*)([\?][^#]*)*/ );
      if ( a ) {
        c.auth = a[ 1 ] || b;
        c.path = a[ 2 ] || b;
        c.query = a[ 3 ] || b
      } else {
        a = k.toString().match( /^([^:]*:\/\/[^\/]*)(\/[^\?\#]*)([\?][^#]*)*/ );
        var h = a[ 1 ] || b , i = a[ 2 ] || b , d = f.substr( 0 , 1 ) == u ? [] : i.split( u );
        a = f.match( /^([^?]*)([\?][^#]*)*$/ );
        var e = (a[ 1 ] || b).split( u ) , j = a[ 2 ] || b;
        if ( d.length > 0 && e.length > 0 && e[ 0 ] != "." )d.pop();
        while ( e.length > 0 ) {
          var g = e.shift();
          switch ( g ) {
            case ".":
              break;
            case "..":
              if ( d.length )d.pop();
              break;
            default:
              d.push( g )
          }
        }
        c.auth = h;
        c.path = d.join( u );
        c.query = j
      }
      c.toString = function () {return this.auth + this.path + this.query};
      return c
    }

    return function ( f , j , b ) {
      f = (new d( f , j ? j : new d( a.baseURL ) )).toString();
      b = b ? b : document;
      var h = encodeURIComponent( f ).replace( /%\w\w/g , " " ).length;
      if ( navigator.userAgent.indexOf( "MSIE" ) > c && h > 2048 || h > 8192 )return g;
      var e = b.createElement( "script" );
      e.type = gb;
      e.charset = "utf-8";
      e.src = f;
      var i = b.getElementsByTagName( Q )[ 0 ];
      if ( i )i.appendChild( e ); else b.documentElement.insertBefore( e , b.documentElement.firstChild );
      return e
    }
  } , Cb = new function () {
    var b = {
      1 : "Array" ,
      2 : "Boolean" ,
      3 : "Date" ,
      4 : "Function" ,
      5 : "Number" ,
      6 : "Object" ,
      7 : "RegExp" ,
      8 : "String"
    } , c = {
      1 : "element" ,
      2 : "attribute" ,
      3 : "text" ,
      4 : "cdata" ,
      5 : "entityReference" ,
      6 : "entity" ,
      7 : "instruction" ,
      8 : "comment" ,
      9 : "document" ,
      10 : "documentType" ,
      11 : "documentFragment" ,
      12 : "notation"
    } , a = {};
    for ( var d in b )a[ window[ b[ d ] ] ] = b[ d ].toLowerCase();
    return function ( b ) {
      if ( b === undefined )return L; else if ( b === g )return "null"; else if ( typeof b.constructor === M && a[ b.constructor ] )return a[ b.constructor ]; else if ( typeof b.nodeType === J && c[ b.nodeType ] )return c[ b.nodeType ];
      return typeof b
    }
  } , sb = new function () {
    var d = g;
    if ( navigator.userAgent.toLowerCase().indexOf( "msie 6." ) > c || navigator.userAgent.toLowerCase().indexOf( "webkit" ) > c && (document.charset || document.characterSet || b).toLowerCase().indexOf( "utf" ) == c )a.escapeNonAscii = j;
    var f = "\\u0000" , q = '"#%&+:;=?@\\' , m = [ "\\x00-\\x1F" , "\\x7F-\\xA0" ] , l = [
      "\\u02B0-\\u038F" , "\\u2000-\\u20FF" , "\\u3000-\\u303F"
    ] , k = { '"' : '\\"' , "\\" : "\\\\" } , h;

    function s() {
      h = new RegExp( "[\\s" + q.replace( /./g , function ( b ) {
          var a = b.charCodeAt( 0 ).toString( e );
          return f.substr( 0 , f.length - a.length ) + a
        } ) + m.join( b ) + (a.escapeNonAscii ? "\\x7B-\\uFFFF" : l.join( b )) + "]" , "g" );
      h.compile( h.source , "g" )
    }

    function r( b ) {
      if ( k[ b ] )return k[ b ];
      if ( b.match( /[\s\xA0]/ ) )return "+";
      var c = b.charCodeAt( 0 ) , d = c.toString( e ) , g = encodeURIComponent( b ) , h = f.substr( 0 , f.length - d.length ) + d;
      if ( g.length < h.length && c > 34 || a.escapeNonAscii && c > 122 )return g; else return h
    }

    function i( a ) {return a.toString().replace( h , r )}

    function o( a ) {return '"' + i( a ) + '"'}

    function p( e ) {
      var b = [];
      for ( var a = 0 ; a < e.length ; ++a ) {
        var c = sb( e[ a ] );
        if ( c !== d )b.push( c )
      }
      return "[" + b.join( "," ) + "]"
    }

    function n( c ) {
      var b = [];
      for ( var a in c ) {
        var e = sb( c[ a ] );
        if ( e !== d )b.push( '"' + a + '":' + e )
      }
      return "{" + b.join( "," ) + "}"
    }

    return function ( a ) {
      s();
      switch ( Cb( a ) ) {
        case L:
          return d;
        case "null":
          return d;
        case "boolean":
          return i( a.toString() );
        case J:
          return i( a.toString() );
        case V:
          return o( a );
        case "array":
          return p( a );
        default:
          return n( a )
      }
    }
  } , A = new function () {
    var k , h = 0 , e = window , f = (document.charset || document.characterSet || b).toLowerCase();
    if ( f.indexOf( "utf" ) == c && f.indexOf( "unicode" ) == c ) {
      try {
        a.escapeNonAscii = j;
        var d = document.createElement( R );
        d.id = "MstReqFrm";
        d.style.display = N;
        d.translate = i;
        document.documentElement.insertBefore( d , document.documentElement.firstChild );
        d.contentWindow.document.open( "text/html" , "replace" );
        d.contentWindow.document.write( '<html><head><meta charset="utf-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body></body></html>' );
        d.contentWindow.document.close();
        e = d.contentWindow
      }
      catch ( k ) {if ( a.debug );}
    }
    return function ( x , n , l , q , r ) {
      var k = M , d = ++h , p , f , m = i , u = i , t = b , z = e[ "_mstc" + d ] = function ( a ) {
        setTimeout( function () {
          if ( u ) {
            o( t );
            return
          }
          if ( m )return;
          setTimeout( w , 0 );
          if ( l && typeof l === k )l( a )
        } , 0 )
      } , o = e[ "_mste" + d ] = function ( a ) {
        setTimeout( function () {
          var c = B;
          if ( m )return;
          setTimeout( w , 0 );
          if ( q && typeof q === k )q( a );
          var b = window[ c ].OnErrorHandler , d = window[ c ].WidgetSiteDomain;
          if ( b )if ( window == window.top ) {if ( window[ b ] && typeof window[ b ] == k )window[ b ]( a )} else if ( window.parent )window.parent.postMessage( W + a.toString() , d )
        } , 0 )
      };

      function w() {
        try {delete e[ "_mstc" + d ]}
        catch ( a ) {}
        try {delete e[ "_mste" + d ]}
        catch ( a ) {}
        try {if ( f )f.parentNode.removeChild( f )}
        catch ( a ) {}
        try {if ( p )clearTimeout( p )}
        catch ( a ) {}
        m = j
      }

      this.abort = function ( a ) {
        u = j;
        t = "The request has been aborted" + (a ? ": " + a : b)
      };
      var c = [];
      for ( var s in n )if ( n[ s ] != g )c.push( s + "=" + sb( n[ s ] ) );
      c.push( "oncomplete=_mstc" + d );
      c.push( "onerror=_mste" + d );
      c.push( "loc=" + encodeURIComponent( a.locale ) );
      c.push( "ctr=" + encodeURIComponent( a.country ) );
      if ( a.ref )c.push( "ref=" + encodeURIComponent( a.ref ) );
      c.push( "rgp=" + encodeURIComponent( a.requestGroup ) );
      var y = "./" + x + "?" + c.join( v );
      f = ob( y , a.serviceURL , e.document );
      if ( f ) {if ( typeof r === J && r > 0 )p = setTimeout( function () {o( "The request has timed out" )} , r )} else {
        if ( a.debug );
        o( "The script could not be loaded" )
      }
      return this
    }
  } , Ab = {
    ar : "العربية" ,
    "bs-Latn" : "Bošnjački (latinica)" ,
    bg : "Български" ,
    ca : "Català" ,
    "zh-CHS" : "简体中文" ,
    "zh-CHT" : "繁體中文" ,
    hr : "Hrvatski" ,
    cs : "Čeština" ,
    da : "Dansk" ,
    nl : "Nederlands" ,
    en : "English" ,
    et : "Eesti" ,
    fi : "Suomi" ,
    fr : "Français" ,
    de : "Deutsch" ,
    el : "Ελληνικά" ,
    ht : "Haitian Creole" ,
    he : "עברית" ,
    hi : "हिंदी" ,
    mww : "Hmong Daw" ,
    hu : "Magyar" ,
    id : "Indonesia" ,
    it : "Italiano" ,
    ja : "日本語" ,
    sw : "Kiswahili" ,
    tlh : "Klingon" ,
    ko : "한국어" ,
    lv : "Latviešu" ,
    lt : "Lietuvių" ,
    ms : "Melayu" ,
    mt : "Il-Malti" ,
    yua : "Yucatec Maya" ,
    no : "Norsk" ,
    otq : "Querétaro Otomi" ,
    fa : "Persian" ,
    pl : "Polski" ,
    pt : "Português" ,
    ro : "Română" ,
    ru : "Русский" ,
    "sr-Cyrl" : "Srpski (ćirilica)" ,
    "sr-Latn" : "Srpski (latinica)" ,
    sk : "Slovenčina" ,
    sl : "Slovenščina" ,
    es : "Español" ,
    sv : "Svenska" ,
    th : "ไทย" ,
    tr : "Türkçe" ,
    uk : "Українська" ,
    ur : "اردو" ,
    vi : "Tiếng Việt" ,
    cy : "Welsh"
  } , rb = {
    ar : q ,
    "bs-latn" : d ,
    bg : d ,
    ca : d ,
    "zh-chs" : d ,
    "zh-cht" : d ,
    hr : d ,
    cs : d ,
    da : d ,
    nl : d ,
    en : d ,
    et : d ,
    fi : d ,
    fr : d ,
    de : d ,
    el : d ,
    ht : d ,
    he : q ,
    hi : d ,
    mww : d ,
    hu : d ,
    id : d ,
    it : d ,
    ja : d ,
    sw : d ,
    tlh : d ,
    "tlh-qaak" : d ,
    ko : d ,
    lv : d ,
    lt : d ,
    ms : d ,
    mt : d ,
    yua : d ,
    no : d ,
    otq : d ,
    fa : q ,
    pl : d ,
    pt : d ,
    ro : d ,
    ru : d ,
    "sr-cyrl" : d ,
    "sr-latn" : d ,
    sk : d ,
    sl : d ,
    es : d ,
    sv : d ,
    th : d ,
    tr : d ,
    uk : d ,
    ur : q ,
    vi : d ,
    cy : d
  } , fb = {
    "ar-sa" : y ,
    ar : y ,
    "ar-iq" : y ,
    "ar-eg" : y ,
    "ar-ly" : y ,
    "ar-dz" : y ,
    "ar-ma" : y ,
    "ar-tn" : y ,
    "ar-om" : y ,
    "ar-ye" : y ,
    "ar-sy" : y ,
    "ar-jo" : y ,
    "ar-lb" : y ,
    "ar-kw" : y ,
    "ar-ae" : y ,
    "ar-bh" : y ,
    "ar-qa" : y ,
    "bs-latn-ba" : "bs-latn" ,
    "bs-latn" : "bs-latn" ,
    "bg-bg" : "bg" ,
    bg : "bg" ,
    "ca-es" : "ca" ,
    ca : "ca" ,
    "ca-es-valencia" : "ca" ,
    "zh-cn" : tb ,
    "zh-chs" : tb ,
    "zh-sg" : tb ,
    "zh-tw" : pb ,
    "zh-cht" : pb ,
    "zh-hk" : pb ,
    "zh-mo" : pb ,
    "hr-hr" : "hr" ,
    hr : "hr" ,
    "hr-ba" : "hr" ,
    "cs-cz" : "cs" ,
    cs : "cs" ,
    "da-dk" : "da" ,
    da : "da" ,
    "nl-nl" : "nl" ,
    nl : "nl" ,
    "nl-be" : "nl" ,
    "en-us" : h ,
    en : h ,
    "en-gb" : h ,
    "en-au" : h ,
    "en-ca" : h ,
    "en-nz" : h ,
    "en-ie" : h ,
    "en-za" : h ,
    "en-jm" : h ,
    "en-029" : h ,
    "en-bz" : h ,
    "en-tt" : h ,
    "en-zw" : h ,
    "en-ph" : h ,
    "en-in" : h ,
    "en-my" : h ,
    "en-sg" : h ,
    "et-ee" : "et" ,
    et : "et" ,
    "fi-fi" : "fi" ,
    fi : "fi" ,
    "fr-fr" : cb ,
    fr : cb ,
    "fr-be" : cb ,
    "fr-ca" : cb ,
    "fr-ch" : cb ,
    "fr-lu" : cb ,
    "fr-mc" : cb ,
    "de-de" : hb ,
    de : hb ,
    "de-ch" : hb ,
    "de-at" : hb ,
    "de-lu" : hb ,
    "de-li" : hb ,
    "el-gr" : "el" ,
    el : "el" ,
    "he-il" : "he" ,
    he : "he" ,
    "hi-in" : "hi" ,
    hi : "hi" ,
    "hu-hu" : "hu" ,
    hu : "hu" ,
    "id-id" : "id" ,
    id : "id" ,
    "it-it" : "it" ,
    it : "it" ,
    "it-ch" : "it" ,
    "ja-jp" : "ja" ,
    ja : "ja" ,
    "sw-ke" : "sw" ,
    sw : "sw" ,
    "ko-kr" : "ko" ,
    ko : "ko" ,
    "lv-lv" : "lv" ,
    lv : "lv" ,
    "lt-lt" : "lt" ,
    lt : "lt" ,
    "ms-my" : "ms" ,
    ms : "ms" ,
    "ms-bn" : "ms" ,
    "mt-mt" : "mt" ,
    mt : "mt" ,
    "nb-no" : O ,
    nb : O ,
    no : O ,
    "nn-no" : O ,
    nn : O ,
    "fa-ir" : "fa" ,
    fa : "fa" ,
    "pl-pl" : "pl" ,
    pl : "pl" ,
    "pt-br" : "pt" ,
    pt : "pt" ,
    "pt-pt" : "pt" ,
    "ro-ro" : "ro" ,
    ro : "ro" ,
    "ru-ru" : "ru" ,
    ru : "ru" ,
    "sr-cyrl-cs" : mb ,
    "sr-cyrl" : mb ,
    "sr-cyrl-ba" : mb ,
    "sr-cyrl-rs" : mb ,
    "sr-cyrl-me" : mb ,
    "sr-latn-cs" : nb ,
    "sr-latn" : nb ,
    "sr-latn-ba" : nb ,
    "sr-latn-rs" : nb ,
    "sr-latn-me" : nb ,
    "sk-sk" : "sk" ,
    sk : "sk" ,
    "sl-si" : "sl" ,
    sl : "sl" ,
    "es-mx" : t ,
    es : t ,
    "es-es" : t ,
    "es-gt" : t ,
    "es-cr" : t ,
    "es-pa" : t ,
    "es-do" : t ,
    "es-ve" : t ,
    "es-co" : t ,
    "es-pe" : t ,
    "es-ar" : t ,
    "es-ec" : t ,
    "es-cl" : t ,
    "es-uy" : t ,
    "es-py" : t ,
    "es-bo" : t ,
    "es-sv" : t ,
    "es-hn" : t ,
    "es-ni" : t ,
    "es-pr" : t ,
    "es-us" : t ,
    "sv-se" : "sv" ,
    sv : "sv" ,
    "sv-fi" : "sv" ,
    "th-th" : "th" ,
    th : "th" ,
    "tr-tr" : "tr" ,
    tr : "tr" ,
    "uk-ua" : "uk" ,
    uk : "uk" ,
    "ur-pk" : "ur" ,
    ur : "ur" ,
    "vi-vn" : "vi" ,
    vi : "vi" ,
    "cy-gb" : "cy" ,
    cy : "cy"
  } , xb = {
    ar : "الأصلي" ,
    "bs-latn" : k ,
    bg : "Първоначален текст" ,
    ca : k ,
    "zh-chs" : "原文" ,
    "zh-cht" : "原始語言" ,
    hr : k ,
    cs : "Původní" ,
    da : "Oprindelig" ,
    nl : "Origineel" ,
    en : k ,
    et : "Lähtetekst" ,
    fi : "Alkuperäinen" ,
    fr : "Langue source" ,
    de : k ,
    el : "Πρωτότυπο" ,
    ht : k ,
    he : "מקור" ,
    hi : "मूल" ,
    mww : k ,
    hu : "Eredeti" ,
    id : "Asli" ,
    it : "Originale" ,
    ja : "翻訳元" ,
    sw : k ,
    tlh : k ,
    "tlh-qaak" : k ,
    ko : "원문 언어" ,
    lv : "Oriģināls" ,
    lt : "Originalas" ,
    ms : k ,
    mt : k ,
    yua : k ,
    no : k ,
    otq : k ,
    fa : k ,
    pl : "Oryginał" ,
    pt : k ,
    ro : k ,
    ru : "Исходный текст" ,
    "sr-cyrl" : k ,
    "sr-latn" : k ,
    sk : "Pôvodný text" ,
    sl : "Izvirnik" ,
    es : k ,
    sv : k ,
    th : "ต้นฉบับ" ,
    tr : k ,
    uk : "Оригінал" ,
    ur : k ,
    vi : "Bản gốc" ,
    cy : k
  };
  window[ ub ] = Ab;
  window[ "languageDirs" ] = rb;
  window[ "languageMappings" ] = fb;
  window[ "localizedOriginal" ] = xb;
  var f = new function () {
    var t = "100%" , n = z , m = s , p = i , k = "0" , d = this , A = [
      66 , 77 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 54 , 0 , 0 , 0 , 40 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1 ,
      0 , 24 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0
    ] , o = [] , v = [
      { a : "A" , l : 26 } , { a : "a" , l : 26 } , { a : k , l : 10 } , { a : "+" , l : 1 } , { a : u , l : 1 }
    ];
    for ( var r = 0 ; r < v.length ; ++r )for ( var x = 0 ; x < v[ r ].l ; ++x )o.push( String.fromCharCode( v[ r ].a.charCodeAt( 0 ) + x ) );
    d.addEvent = function ( a , c , d , e ) {
      var b = function () {return d( a , e )};
      if ( a.addEventListener )a.addEventListener( c , b , p ); else if ( a.attachEvent )a.attachEvent( "on" + c , b );
      return b
    };
    d.removeEvent = function ( a , c , b ) {if ( a.removeEventListener )a.removeEventListener( c , b , p ); else if ( a.detachEvent )a.detachEvent( "on" + c , b )};
    var h = d.getStyleValue = function ( c , a ) {
      if ( c.style[ a ] )return c.style[ a ];
      if ( c.currentStyle )return !c.currentStyle[ a ] ? b : c.currentStyle[ a ];
      if ( document.defaultView && document.defaultView.getComputedStyle ) {
        a = a.replace( /([A-Z])/g , "-$1" ).toLowerCase();
        var d = document.defaultView.getComputedStyle( c , b );
        return d && d.getPropertyValue( a )
      }
      return b
    } , O = d.fixIEQuirks = function ( a ) {
      if ( a.tagName.toLowerCase() === S )return;
      var e = h( a , "width" );
      if ( e && e.indexOf( m ) > c )a.style.width = parseInt( e ) + parseInt( k + h( a , "borderLeftWidth" ) ) + parseInt( k + h( a , "borderRightWidth" ) ) + parseInt( k + h( a , "paddingLeft" ) ) + parseInt( k + h( a , "paddingRight" ) ) + m;
      var d = h( a , "height" );
      if ( d && d.indexOf( m ) > c )a.style.height = parseInt( d ) + parseInt( k + h( a , "borderTopWidth" ) ) + parseInt( k + h( a , "borderBottomWidth" ) ) + parseInt( k + h( a , "paddingTop" ) ) + parseInt( k + h( a , "paddingBottom" ) ) + m;
      for ( var b = 0 ; b < a.childNodes.length ; ++b )if ( a.childNodes[ b ].nodeType === 1 )O( a.childNodes[ b ] )
    };
    d.absXPos = function ( a ) {if ( a.getBoundingClientRect )return a.getBoundingClientRect().left + (Math.max( a.ownerDocument.documentElement.scrollLeft , a.ownerDocument.body.scrollLeft ) - Math.max( a.ownerDocument.documentElement.clientLeft , a.ownerDocument.documentElement.offsetLeft )); else return B( a ) + D( a )};
    function B( a ) {return a.offsetLeft + (a.offsetParent && a.offsetParent.nodeType == 1 ? B( a.offsetParent ) : 0)}

    function D( a ) {return (a.parentNode && a.parentNode.nodeType == 1 ? D( a.parentNode ) : 0) + (a.nodeName.toLowerCase() != "html" && a.nodeName.toLowerCase() != "body" && a.scrollLeft ? -a.scrollLeft : 0)}

    d.absYPos = function ( a ) {if ( a.getBoundingClientRect )return a.getBoundingClientRect().top + (Math.max( a.ownerDocument.documentElement.scrollTop , a.ownerDocument.body.scrollTop ) - Math.max( a.ownerDocument.documentElement.clientTop , a.ownerDocument.documentElement.offsetTop )); else return F( a ) + G( a )};
    function F( a ) {return a.offsetTop + (a.offsetParent && a.offsetParent.nodeType == 1 ? F( a.offsetParent ) : 0)}

    function G( a ) {return (a.parentNode && a.parentNode.nodeType == 1 ? G( a.parentNode ) : 0) + (a.nodeName.toLowerCase() != "html" && a.nodeName.toLowerCase() != "body" && a.scrollTop ? -a.scrollTop : 0)}

    d.getVisibleWidth = function ( b ) {
      var a = l;
      if ( window.innerWidth && window.innerWidth > a )a = window.innerWidth; else if ( b.documentElement.clientWidth && b.documentElement.clientWidth > a )a = b.documentElement.clientWidth; else if ( b.body.clientWidth && b.body.clientWidth > a )a = b.body.clientWidth;
      return a
    };
    d.getVisibleHeight = function ( a ) {return M( a ) ? a.body.clientHeight : a.documentElement.clientHeight};
    d.getStringByteCount = function ( b ) {return a.escapeNonAscii ? encodeURIComponent( b ).length : encodeURIComponent( b ).replace( /%\w\w/g , " " ).length};
    var K = d.getBlockParent = function ( a ) {
      var b = a._display = a._display || f.getStyleValue( a , "display" ) , c = a._position = a._position || f.getStyleValue( a , ib );
      return b && b.toLowerCase() == X && c.toLowerCase() == "static" && a.parentNode && a.parentNode.nodeType == 1 ? K( a.parentNode ) : a
    } , M = d.isQuirksMode = function ( a ) {if ( a.compatMode && a.compatMode.indexOf( "CSS" ) != c )return p; else return j} , H = d.isInternetExplorer11OrHigher = function () {
      var a = p;
      if ( navigator.appName == "Netscape" ) {
        var c = navigator.userAgent , b = new RegExp( "Trident/.*rv:([0-9]{1,}[.0-9]{0,})" );
        if ( b.exec( c ) != g ) {
          rv = parseFloat( RegExp.$1 );
          if ( rv >= 11 )a = j
        }
      }
      return a
    } , Q = d.isInternetExplorerAnyVersion = function () {
      var a = y() , b = H();
      return a || b
    } , y = d.isInternetExplorer = function () {return window.navigator.userAgent.toUpperCase().indexOf( "MSIE" ) > c};
    d.setGradient = function ( a , b , c , d ) {
      if ( !d )d = a.offsetHeight;
      if ( a._mstGradCol1 != b.toString() || a._mstGradCol2 != c.toString() ) {
        if ( a._mstGradElem && a._mstGradElem.parentNode == a )a.removeChild( a._mstGradElem );
        if ( b.toString() == c.toString() ) {
          a.style.backgroundColor = "#" + b.toString();
        } else if ( y() && (!document.documentMode || document.documentMode < 8) ) {
          J( a , b , c , d );
        } else {
          a.style.backgroundRepeat = "repeat-x";
          a.style.backgroundImage = "url('data:image/x-ms-bmp;base64," + L( I( b , c , d ) ) + "')"
        }
        a._mstGradCol1 = b.toString();
        a._mstGradCol2 = c.toString()
      }
    };
    function J( a , b , c , f ) {
      var e = ",endColorStr=#FF" , d = "progid:DXImageTransform.Microsoft.Gradient(startColorStr=#FF";
      a._mstGradElem = document.createElement( C );
      a._mstGradElem.style.fontSize = n;
      a._mstGradElem.style.width = t;
      a._mstGradElem.style.height = f + m;
      a._mstGradElem.style.marginBottom = "-" + a._mstGradElem.style.height;
      a.insertBefore( a._mstGradElem , a.firstChild );
      a._mstGradElem.appendChild( document.createElement( C ) );
      a._mstGradElem.appendChild( document.createElement( C ) );
      a._mstGradElem.firstChild.style.width = a._mstGradElem.lastChild.style.width = t;
      a._mstGradElem.firstChild.style.height = a._mstGradElem.lastChild.style.height = f / 2 + m;
      a._mstGradElem.firstChild.style.fontSize = a._mstGradElem.lastChild.style.fontSize = n;
      a._mstGradElem.firstChild.style.filter = d + c + e + c.interpolate( b , .5 ) + ")";
      a._mstGradElem.lastChild.style.filter = d + b + e + b.interpolate( c , .5 ) + ")"
    }

    function I( f , g , c ) {
      var e = 1 * c , a = [];
      for ( var b = 0 ; b < A.length ; ++b )a.push( A[ b ] );
      q( a , 2 , 54 + e * 4 );
      q( a , 18 , 1 );
      q( a , 22 , c );
      q( a , 34 , e * 4 );
      for ( var b = 0 ; b < c ; ++b ) {
        var d = b < c / 2 ? f.interpolate( g , .5 - b / c ) : f.interpolate( g , b / c );
        a.push( d.b );
        a.push( d.g );
        a.push( d.r );
        a.push( w )
      }
      return a
    }

    function q( a , b , c ) {
      a.splice( b , 1 , c & w );
      a.splice( b + 1 , 1 , c >>> 8 & w );
      a.splice( b + 2 , 1 , c >>> e & w );
      a.splice( b + 3 , 1 , c >>> 24 & w )
    }

    d.applyProtectiveCss = function ( a ) {
      var d = "content-box" , c = "normal" , b = N;
      a.style.backgroundAttachment = "scroll";
      a.style.backgroundColor = "Transparent";
      a.style.backgroundImage = b;
      a.style.color = "White";
      a.style.fontStyle = c;
      a.style.fontVariant = c;
      a.style.fontWeight = c;
      a.style.letterSpacing = c;
      a.style.lineHeight = c;
      a.style.margin = n;
      a.style.outline = b;
      a.style.overflow = E;
      a.style.padding = n;
      a.style.verticalAlign = "baseline";
      a.style.wordSpacing = c;
      a.style.fontFamily = '"Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif';
      try {a.style.fontSize = "inherit"}
      catch ( e ) {a.style.fontSize = t}
      a.style.textTransform = b;
      a.style.textDecoration = b;
      a.style.border = n;
      a.style.boxSizing = d;
      a.style.MozBoxSizing = d;
      a.style.float = b;
      a.style.maxWidth = b
    };
    function L( c ) {
      var e = 1048576 , d = [];
      while ( c.length ) {
        var a = [];
        a.push( c.shift() );
        d.push( o[ a[ 0 ] >> 2 & 63 ] );
        a.push( c.length > 0 ? c.shift() : e );
        a.push( c.length > 0 ? c.shift() : e );
        d.push( o[ (a[ 0 ] << 4 | a[ 1 ] >>> 4) & 63 ] );
        d.push( a[ 1 ] == e ? "=" : o[ (a[ 1 ] << 2 | a[ 2 ] >>> 6) & 63 ] );
        d.push( a[ 2 ] == e ? "=" : o[ a[ 2 ] & 63 ] )
      }
      return d.join( b )
    }

    var P = d.clone = function ( a ) {
      var c = {};
      for ( var b in a )if ( typeof a[ b ] === "object" && a !== g )c[ b ] = this.clone( a ); else c[ b ] = a[ b ];
      return c
    };
    d.compress = function ( i ) {
      var d = {} , g = 0 , h = 0 , a = b , c , e , f = [];
      while ( c = i.charAt( h++ ) ) {
        d[ c ] = c.charCodeAt( 0 );
        e = a + c;
        if ( d[ e ] ) {
          a = e;
        } else {
          d[ e ] = --g;
          f.push( d[ a ] );
          a = c
        }
      }
      if ( a )f.push( d[ a ] );
      return f
    };
    d.decompress = function ( f ) {
      var d = {} , e = 0 , g = 0 , c = String.fromCharCode( f[ g++ ] ) , a , b , h = c;
      while ( a = f[ g++ ] ) {
        if ( a > 0 )d[ a ] = String.fromCharCode( a );
        if ( d[ a ] )b = d[ a ]; else if ( a + 1 == e )b = c + c.charAt( 0 ); else throw"Invalid input data";
        h += b;
        d[ --e ] = c + b.charAt( 0 );
        c = b
      }
      return h
    };
    return d
  };

  function D( f , d , c ) {
    var a = this;
    a.r = f;
    a.g = d;
    a.b = c;
    for ( var b in a )a[ b ] = a[ b ] > w ? w : a[ b ] < 0 ? 0 : a[ b ];
    a.toString = function () {
      var c = "0" + this.r.toString( e ) , b = "0" + this.g.toString( e ) , a = "0" + this.b.toString( e );
      return (c.substr( c.length - 2 ) + b.substr( b.length - 2 ) + a.substr( a.length - 2 )).toUpperCase()
    };
    a.interpolate = function ( b , c ) {
      var a = this;
      if ( a.toString() == b.toString() )return new D( a.r , a.g , a.b );
      return new D( Math.round( a.r + c * (b.r - a.r) ) , Math.round( a.g + c * (b.g - a.g) ) , Math.round( a.b + c * (b.b - a.b) ) )
    };
    return a
  }

  D.parse = function ( a ) {
    var b = a.match( /rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)/i );
    if ( b )return new D( parseInt( b[ 1 ] , 10 ) , parseInt( b[ 2 ] , 10 ) , parseInt( b[ 3 ] , 10 ) );
    a = a.split( " " )[ 0 ];
    if ( a.substr( 0 , 1 ) == "#" ) {if ( a.length == 4 )return new D( e * parseInt( a.substr( 1 , 1 ) , e ) , e * parseInt( a.substr( 2 , 1 ) , e ) , e * parseInt( a.substr( 3 , 1 ) , e ) ); else if ( a.length == 7 )return new D( parseInt( a.substr( 1 , 2 ) , e ) , parseInt( a.substr( 3 , 2 ) , e ) , parseInt( a.substr( 5 , 2 ) , e ) )} else if ( D.nameTable[ a.toLowerCase() ] )return D.parse( D.nameTable[ a.toLowerCase() ] ); else throw"Color format not suported: " + a;
  };
  D.nameTable = {
    Black : "#000000" ,
    Navy : "#000080" ,
    DarkBlue : "#00008B" ,
    MediumBlue : "#0000CD" ,
    Blue : "#0000FF" ,
    DarkGreen : "#006400" ,
    Green : "#008000" ,
    Teal : "#008080" ,
    DarkCyan : "#008B8B" ,
    DeepSkyBlue : "#00BFFF" ,
    DarkTurquoise : "#00CED1" ,
    MediumSpringGreen : "#00FA9A" ,
    Lime : "#00FF00" ,
    SpringGreen : "#00FF7F" ,
    Aqua : "#00FFFF" ,
    Cyan : "#00FFFF" ,
    MidnightBlue : "#191970" ,
    DodgerBlue : "#1E90FF" ,
    LightSeaGreen : "#20B2AA" ,
    ForestGreen : "#228B22" ,
    SeaGreen : "#2E8B57" ,
    DarkSlateGray : "#2F4F4F" ,
    LimeGreen : "#32CD32" ,
    MediumSeaGreen : "#3CB371" ,
    Turquoise : "#40E0D0" ,
    RoyalBlue : "#4169E1" ,
    SteelBlue : "#4682B4" ,
    DarkSlateBlue : "#483D8B" ,
    MediumTurquoise : "#48D1CC" ,
    "Indigo " : "#4B0082" ,
    DarkOliveGreen : "#556B2F" ,
    CadetBlue : "#5F9EA0" ,
    CornflowerBlue : "#6495ED" ,
    MediumAquaMarine : "#66CDAA" ,
    DimGray : "#696969" ,
    SlateBlue : "#6A5ACD" ,
    OliveDrab : "#6B8E23" ,
    SlateGray : "#708090" ,
    LightSlateGray : "#778899" ,
    MediumSlateBlue : "#7B68EE" ,
    LawnGreen : "#7CFC00" ,
    Chartreuse : "#7FFF00" ,
    Aquamarine : "#7FFFD4" ,
    Maroon : "#800000" ,
    Purple : "#800080" ,
    Olive : "#808000" ,
    Gray : "#808080" ,
    SkyBlue : "#87CEEB" ,
    LightSkyBlue : "#87CEFA" ,
    BlueViolet : "#8A2BE2" ,
    DarkRed : "#8B0000" ,
    DarkMagenta : "#8B008B" ,
    SaddleBrown : "#8B4513" ,
    DarkSeaGreen : "#8FBC8F" ,
    LightGreen : "#90EE90" ,
    MediumPurple : "#9370D8" ,
    DarkViolet : "#9400D3" ,
    PaleGreen : "#98FB98" ,
    DarkOrchid : "#9932CC" ,
    YellowGreen : "#9ACD32" ,
    Sienna : "#A0522D" ,
    Brown : "#A52A2A" ,
    DarkGray : "#A9A9A9" ,
    LightBlue : "#ADD8E6" ,
    GreenYellow : "#ADFF2F" ,
    PaleTurquoise : "#AFEEEE" ,
    LightSteelBlue : "#B0C4DE" ,
    PowderBlue : "#B0E0E6" ,
    FireBrick : "#B22222" ,
    DarkGoldenRod : "#B8860B" ,
    MediumOrchid : "#BA55D3" ,
    RosyBrown : "#BC8F8F" ,
    DarkKhaki : "#BDB76B" ,
    Silver : "#C0C0C0" ,
    MediumVioletRed : "#C71585" ,
    "IndianRed " : "#CD5C5C" ,
    Peru : "#CD853F" ,
    Chocolate : "#D2691E" ,
    Tan : "#D2B48C" ,
    LightGrey : "#D3D3D3" ,
    PaleVioletRed : "#D87093" ,
    Thistle : "#D8BFD8" ,
    Orchid : "#DA70D6" ,
    GoldenRod : "#DAA520" ,
    Crimson : "#DC143C" ,
    Gainsboro : "#DCDCDC" ,
    Plum : "#DDA0DD" ,
    BurlyWood : "#DEB887" ,
    LightCyan : "#E0FFFF" ,
    Lavender : "#E6E6FA" ,
    DarkSalmon : "#E9967A" ,
    Violet : "#EE82EE" ,
    PaleGoldenRod : "#EEE8AA" ,
    LightCoral : "#F08080" ,
    Khaki : "#F0E68C" ,
    AliceBlue : "#F0F8FF" ,
    HoneyDew : "#F0FFF0" ,
    Azure : "#F0FFFF" ,
    SandyBrown : "#F4A460" ,
    Wheat : "#F5DEB3" ,
    Beige : "#F5F5DC" ,
    WhiteSmoke : "#F5F5F5" ,
    MintCream : "#F5FFFA" ,
    GhostWhite : "#F8F8FF" ,
    Salmon : "#FA8072" ,
    AntiqueWhite : "#FAEBD7" ,
    Linen : "#FAF0E6" ,
    LightGoldenRodYellow : "#FAFAD2" ,
    OldLace : "#FDF5E6" ,
    Red : "#FF0000" ,
    Fuchsia : "#FF00FF" ,
    Magenta : "#FF00FF" ,
    DeepPink : "#FF1493" ,
    OrangeRed : "#FF4500" ,
    Tomato : "#FF6347" ,
    HotPink : "#FF69B4" ,
    Coral : "#FF7F50" ,
    Darkorange : "#FF8C00" ,
    LightSalmon : "#FFA07A" ,
    Orange : "#FFA500" ,
    LightPink : "#FFB6C1" ,
    Pink : "#FFC0CB" ,
    Gold : "#FFD700" ,
    PeachPuff : "#FFDAB9" ,
    NavajoWhite : "#FFDEAD" ,
    Moccasin : "#FFE4B5" ,
    Bisque : "#FFE4C4" ,
    MistyRose : "#FFE4E1" ,
    BlanchedAlmond : "#FFEBCD" ,
    PapayaWhip : "#FFEFD5" ,
    LavenderBlush : "#FFF0F5" ,
    SeaShell : "#FFF5EE" ,
    Cornsilk : "#FFF8DC" ,
    LemonChiffon : "#FFFACD" ,
    FloralWhite : "#FFFAF0" ,
    Snow : "#FFFAFA" ,
    Yellow : "#FFFF00" ,
    LightYellow : "#FFFFE0" ,
    Ivory : "#FFFFF0" ,
    White : "#FFFFFF"
  };
  new function () {
    var a = {};
    for ( var b in D.nameTable )a[ b.toLowerCase() ] = D.nameTable[ b ];
    D.nameTable = a
  };
  function Bb( Kb , pb , ub , qb , eb , Hc , Dc , K , H , Mc ) {
    var jc = "Element too deep" , I = "b" , Lb = "LP" , wb = J , y = b , k = g , cc = "scroll" , bc = Q , hb = " " , u = i , n = j , z = this , o = z , L = ub , M = qb , p = pb , Xb = eb , wc = Hc , mb = Dc , Rb = [] , E , cb , qc = H ? n : u , jb = n , Fc;
    window.Microsoft.Translator.APIRequests = 0;
    window.Microsoft.Translator.APIResponses = 0;
    window.Microsoft.Translator.translationCallsTime = [];
    window.Microsoft.Translator.totalTranslationTime = 0;
    var Db , Mb = !Mc && !H , C = 0 , D = 9 , V = 0 , ic = 15 , hc = r;
    if ( navigator.userAgent && (navigator.userAgent.indexOf( "Chrome" ) > c || navigator.userAgent.indexOf( "Mobile" ) > c) ) {
      ic /= 3;
      D /= 2;
      hc /= 3;
      V = 200
    }
    mb = mb * D;
    var Qb = [] , Sb = [] , w = {};
    w.size = 0;
    var Ab = [] , O;
    a.requestGroup = Math.floor( Math.random() * 1e9 ).toString( e );
    a.from = ub;
    a.to = qb;
    if ( pb.nodeType != 1 )throw new Error( "Invalid input type" );
    if ( ub == qb ) {
      Pb( 1 );
      if ( eb )eb( pb );
      return z
    }
    if ( !p.innerHTML || !p.innerText && !p.textContent ) {
      if ( eb )eb( pb );
      return z
    }
    var nb , db , gb = 1400 , tc = 1600 , sc = (p.innerText || p.textContent).replace( /\s+/g , hb ) , Gb = 0 , Tb = 0 , yb = p.innerHTML.length , mc = 0 , h = [ p ] , T = [ 0 ] , t = [
      {
        o : yb ,
        p : 0
      }
    ] , Vb = [] , N = [] , oc = [] , A = [] , kb = [] , Ib = u , fb = u , rc = u , Jb = u;
    z.text = sc;
    z.textLength = sc.length;
    z.showTooltips = n;
    z.showHighlight = n;
    z.sourceFrame = K ? n : u;
    z.detectedLanguage;
    z.transItems = [];
    var S = [] , Eb , Hb = 0 , tb = 0;
    if ( jb && p.ownerDocument && p.ownerDocument.documentElement && p == p.ownerDocument.documentElement ) {
      var xc = p.ownerDocument.getElementsByTagName( bc )[ 0 ];
      if ( xc ) {
        yb -= xc.innerHTML.length;
        t[ 0 ].o = yb
      }
    }
    if ( window.translatorOnBegin || document.translatorOnBegin ) {
      try {(window.translatorOnBegin || document.translatorOnBegin)()}
      catch ( Fc ) {}
    }
    function ac() {
      rc = n;
      if ( Jb ) {
        Jb = u;
        if ( w.size < D )if ( H && K )B(); else setTimeout( function () {B()} , V )
      }
    }

    f.addEvent( p.ownerDocument.defaultView || p.ownerDocument.parentWindow , cc , ac );
    var Gc = z.cancel = function () {
      if ( Microsoft.TranslatorOverride && Microsoft.TranslatorOverride.hideTooltip )Microsoft.TranslatorOverride.hideTooltip();
      if ( !p )return;
      Ib = n;
      if ( nb )nb.abort( "canceled by user." );
      Ub( p );
      p = k
    };
    try {if ( !toolbar || !toolbar.addExitEvent || !toolbar.setProgress || !toolbar.setLanguagePair )toolbar = k}
    catch ( Jc ) {toolbar = k}
    var Pc = z.exit = function () {
      Gc();
      if ( toolbar )toolbar.hide()
    };

    function pc( a ) {
      a = Math.max( a , 0 );
      a = Math.min( a , r );
      for ( var b = 0 ; b < Rb.length ; ++b )Rb[ b ]( a )
    }

    z.addProgressEvent = function ( a ) {Rb.push( a )};
    if ( !o.sourceFrame )if ( toolbar && toolbar.setProgress )o.addProgressEvent( toolbar.setProgress );
    z.setParallel = function ( a ) {E = a};
    if ( toolbar ) {
      toolbar.addExitEvent( z.exit );
      toolbar.setProgress( 0 );
      toolbar.setLanguagePair( L , M )
    }
    var s = { Inherit : 0 , On : 1 , Off : 2 , Skip : 3 } , gc = {
      google : {
        value : { notranslate : s.Off } ,
        content : { notranslate : s.Off }
      } , microsoft : { value : { notranslate : s.Off } , content : { notranslate : s.Off } }
    } , ec = {
      translate : {
        "true" : s.On ,
        yes : s.On ,
        "false" : s.Off ,
        no : s.Off ,
        skip : s.Skip
      }
    } , fc = { notranslate : s.Off , skiptranslate : s.Skip };
    if ( Lc( p ) == s.Off ) {
      if ( eb )eb( pb );
      return
    }
    h.top = T.top = t.top = function () {return this[ this.length - 1 ]};
    var dc = {
      head : 1 ,
      script : 1 ,
      style : 1 ,
      code : 1 ,
      samp : 1 ,
      "var" : 1 ,
      kbd : 1 ,
      pre : 1 ,
      input : 1 ,
      object : 1 ,
      address : 1 ,
      textarea : 1 ,
      noscript : 1
    } , vb = { hr : 1 , option : 1 , title : 1 , br : 1 , frame : 1 , iframe : 1 };
    for ( var Ec in dc )vb[ Ec ] = 1;
    delete vb[ "code" ];
    delete vb[ "samp" ];
    delete vb[ "var" ];
    function Cb( b ) {
      var a;
      if ( rb[ b ] == q )a = { direction : q , textAlign : U }; else a = { direction : d , textAlign : F };
      return a
    }

    if ( !K && !H )cb = Cb( qb );
    function Ac() {
      var b = [];
      for ( var a = h.length - 2 ; a >= 0 ; --a ) {
        if ( h[ a ].id ) {
          b.unshift( h[ a ].id.toString() );
          break
        } else {
          b.unshift( (h[ a ].nodeName && h[ a ].nodeName.toLowerCase ? h[ a ].nodeName.toLowerCase() : y) + "-" + T[ a ].toString() );
        }
      }
      return b.join( "_" )
    }

    function B() {
      var b = "len";
      if ( a.maxChars && a.maxChars < mc && !rc && !o.sourceFrame ) {
        if ( !Jb ) {
          yc();
          Jb = n
        }
        return
      }
      var e = [] , d = u , g = k;
      if ( jb && t.length ) {
        var l = 0;
        for ( var i = 0 ; i < t.length ; ++i )l += parseInt( t[ i ].p );
        pc( Math.min( 99.999 * (l - Tb) / (yb - Tb) , 99.999 ) )
      }
      while ( h.length > 0 && (Gb < gb || e.length) ) {
        if ( h.length && uc( h.top() ) && bb( h.top() ) ) {
          h.push( h.top().contentWindow.document.documentElement );
          T.push( 0 );
          t.push( { o : 0 , p : 0 } );
          d = n;
          f.addEvent( h.top().ownerDocument.defaultView || h.top().ownerDocument.parentWindow , cc , ac );
          if ( jb ) {
            var c = typeof h.top().length == wb ? h.top().length : h.top().getAttribute( b ) || (h.top().innerHTML && h.top().innerHTML.length ? h.top().innerHTML.length : 0);
            try {if ( !h.top().length && !h.top().getAttribute( b ) )h.top().setAttribute( b , c )}
            catch ( j ) {}
            t[ t.length - 1 ].o = c;
            yb += c
          }
        } else if ( h.length && h.top().firstChild && h.top().firstChild.parentNode == h.top() && !lb( h.top() ) && bb( h.top() ) ) {
          h.push( h.top().firstChild );
          T.push( 0 );
          t.push( { o : 0 , p : 0 } );
          d = n;
          if ( jb ) {
            var c = typeof h.top().length == wb ? h.top().length : h.top().getAttribute( b ) || (h.top().innerHTML && h.top().innerHTML.length ? h.top().innerHTML.length : 0);
            try {if ( !h.top().length && !h.top().getAttribute( b ) )h.top().setAttribute( b , c )}
            catch ( j ) {}
            t[ t.length - 1 ].o = c
          }
        } else {
          while ( h.length && (!h.top().nextSibling && !h.top().nextElementSibling) ) {
            h.pop();
            T.pop();
            t.pop();
            d = n
          }
          if ( h.length > 1 ) {
            if ( jb && h.top().nodeName.toLowerCase() != bc )t[ t.length - 2 ].p += parseInt( t[ t.length - 1 ].o );
            h.push( h.pop().nextSibling );
            t[ t.length - 1 ] = { o : 0 , p : 0 };
            if ( !lb( h.top() ) )d = n;
            if ( jb ) {
              var c = typeof h.top().length == wb ? h.top().length : h.top().getAttribute( b ) || (h.top().innerHTML && h.top().innerHTML.length ? h.top().innerHTML.length : 0);
              try {if ( !h.top().length && !h.top().getAttribute( b ) )h.top().setAttribute( b , c )}
              catch ( j ) {}
              t[ t.length - 1 ].o = c
            }
          } else {
            h.pop();
            T.pop();
            t.pop();
            d = n
          }
        }
        if ( d || h.length > 0 && !lb( h.top() ) ) {
          if ( e.length ) {
            try {zc( e , g )}
            catch ( m ) {if ( a.debug );}
          }
          d = u;
          g = k
        }
        if ( h.length ) {
          if ( h.top().clientHeight < h.top().scrollHeight )f.addEvent( h.top() , cc , ac );
          if ( lb( h.top() ) ) {
            if ( !g )g = Ac();
            ++T[ T.length - 1 ];
            e.push( h.top() )
          }
          if ( h.top().nodeName.toLowerCase() != bc && !bb( h.top() ) )Tb += parseInt( t.top().o );
          Wb( h.top() )
        }
      }
      if ( Gb > 0 || Ab.length > 0 ) {
        Bc();
      } else {
        if ( w.size > 0 || Ab.length > 0 )return;
        pc( r );
        Pb( 1 );
        if ( Xb )Xb( p );
        Xb = k;
        if ( Microsoft.TranslatorOverride && Microsoft.TranslatorOverride.showHighlight )Microsoft.TranslatorOverride.showHighlight( o , L , M );
        if ( window.translatorOnComplete || document.translatorOnComplete ) {
          try {(window.translatorOnComplete || document.translatorOnComplete)()}
          catch ( m ) {if ( a.debug );}
        }
        yc()
      }
    }

    function Wb( b ) {
      var g = "adjustalign";
      try {
        if ( !b.getAttribute )return;
        b.adjustAlign = b.getAttribute( g ) && !(b.getAttribute( g ).toLowerCase() == Y);
        if ( b.adjustAlign == k )b.adjustAlign = b.parentNode.adjustAlign;
        if ( b.adjustAlign == undefined || b.adjustAlign == k )b.adjustAlign = n;
        if ( cb && b && b.style && bb( b ) && !o.sourceFrame && a.service != Lb && b.adjustAlign ) {
          for ( var d in cb ) {
            try {
              var e = f.getStyleValue( b , d );
              if ( e != cb[ d ] ) {
                if ( d == "textAlign" && (e && e.toLowerCase().indexOf( G ) != c || b.tagName && b.tagName.toLowerCase() == G) )continue;
                if ( Mb ) {
                  if ( !b._mstStyle )b._mstStyle = {};
                  if ( b.style[ d ] )b._mstStyle[ d ] = b.style[ d ]; else b._mstStyle[ d ] = e
                }
                b.style[ d ] = cb[ d ]
              }
            }
            catch ( h ) {console.error( h )}
          }
        }
      }
      catch ( i ) {console.error( i )}
    }

    function Pb( e ) {
      var b = "_mssrc";
      if ( !O )if ( p.getElementsByTagName )O = p.getElementsByTagName( x ); else if ( p.documentElement.getElementsByTagName )O = p.documentElement.getElementsByTagName( x ); else if ( p.ownerDocument.documentElement.getElementsByTagName )O = p.ownerDocument.documentElement.getElementsByTagName( x );
      var a;
      if ( O && O.length > 0 )var d = 0;
      for ( var c = 0 ; c < O.length && d < Math.max( 1 , O.length * e ) ; c++ ) {
        a = O[ c ];
        if ( a.getAttribute( b ) ) {
          a.src = a.getAttribute( b );
          a.removeAttribute( b );
          d++
        }
      }
    }

    function yc() {
      if ( !E || !o.sourceFrame ) {
        var b = [];
        b.push( "svc=" + encodeURIComponent( a.service ) );
        b.push( "loc=" + encodeURIComponent( a.locale ) );
        b.push( "ref=" + encodeURIComponent( a.ref ) );
        b.push( "from=" + encodeURIComponent( L ? L : y ) );
        b.push( "to=" + encodeURIComponent( M ? M : y ) );
        b.push( "dtc=" + encodeURIComponent( o.detectedLanguage ? o.detectedLanguage : y ) );
        var d = kb.join( " | " ) , e = f.getStringByteCount( d );
        if ( e > 128 )d = d.substr( 0 , Math.round( d.length * 128 / e ) ) + "...";
        b.push( "text=" + sb( d ? d : y ) );
        for ( var c = 0 ; c < S.length && c < 64 ; ++c ) {
          b.push( c.toString() + "=" + [
              S[ c ].r , S[ c ].c , S[ c ].s , S[ c ].e , S[ c ].l
            ].join( "_" ) );
        }
        ob( "/sync.ashx?" + b.join( v ) );
        kb = [];
        S = []
      }
    }

    function bb( b ) {
      if ( b.nodeType == 3 )return n;
      if ( b.nodeType != 1 )return u;
      if ( !b.hasChildNodes() && !uc( b ) )return u;
      var c;
      try {c = kc( b )}
      catch ( d ) {if ( a.debug );}
      if ( c == s.Off || c == s.Skip )return u;
      if ( dc[ b.nodeName.toLowerCase() ] )return u;
      if ( !b.innerHTML || !Nb( b.innerHTML ) )return u;
      return n
    }

    function lb( a ) {
      if ( a.nodeType == 3 )return n; else if ( a.nodeType != 1 || a._mstChunk || f.getStyleValue( a , "display" ).toLowerCase() != X || f.getStyleValue( a , ib ).toLowerCase() != "static" || vb[ a.nodeName.toLowerCase() ] )return u;
      for ( var b = 0 ; b < a.childNodes.length ; ++b )if ( !lb( a.childNodes[ b ] ) )return u;
      return n
    }

    function uc( b ) {
      try {if ( b.contentWindow && b.contentWindow.document && b.contentWindow.document.documentElement )return n}
      catch ( c ) {if ( a.debug );}
      return u
    }

    function kc( b ) {
      var a = s.Inherit;
      if ( !b.getAttribute )return a;
      for ( var g in ec ) {
        var e = xb( b , g );
        if ( e != k ) {
          var i = ec[ g ] , f = i[ e.toString().toLowerCase() ];
          a = f || a;
          if ( a == s.Off || a == s.Skip )return a
        }
      }
      var d = xb( b , "class" ) || xb( b , "className" );
      if ( d != k ) {
        var h = d.toString().split( hb );
        for ( var c = 0 ; c < h.length ; c++ ) {
          var j = h[ c ] , f = fc[ j.toLowerCase() ];
          a = f || a;
          if ( a == s.Off )return a
        }
      }
      return a
    }

    function xb( c , b ) {
      try {return c.getAttribute( b ) || c[ b ]}
      catch ( d ) {
        if ( a.debug );
        return k
      }
    }

    function Lc( m ) {
      var b = s.Inherit , j = m.ownerDocument.getElementsByTagName( "meta" );
      for ( var d = 0 ; d < j.length ; d++ ) {
        var l = j[ d ] , c = xb( l , "name" );
        if ( c != k ) {
          if ( gc[ c.toString().toLowerCase() ] != k ) {
            var f = gc[ c.toString().toLowerCase() ];
            for ( var g in f ) {
              var a = xb( l , g );
              if ( a != k ) {
                a = a.toString().toLowerCase();
                var h = f[ g ][ a ];
                if ( h != k ) {
                  b = h || b;
                  if ( b == s.Off )return b
                }
                if ( a.match( /^notranslateclasses\s/i ) ) {
                  var i = a.split( /\s+/ );
                  for ( var e = 1 ; e < i.length ; e++ )fc[ i[ e ] ] = s.Off
                }
              }
            }
          }
        }
      }
      return b
    }

    function zc( d , e ) {
      Cc( d );
      var b = Zb( d );
      if ( b && bb( b ) ) {
        b._mstHash = Ic( e );
        while ( o[ b._mstHash ] )++b._mstHash;
        o[ b._mstHash ] = b;
        if ( qc && !o.sourceFrame ) {
          if ( qc && E && E[ b._mstHash ] ) {
            var c = W( E[ b._mstHash ] , I ) , g = W( b , I );
            if ( c.split( /<b\d+/g ).length != g.split( /<b\d+/g ).length ) {
              if ( a.debug );
              return
            }
          } else {
            if ( a.debug );
            return
          }
        } else {
          var c = W( b , I );
        }
        if ( Nb( c ) ) {
          Gb += f.getStringByteCount( c );
          Vb.push( b );
          N.push( c )
        }
      }
    }

    function Zb( a ) {
      var b = k;
      if ( a.length > 0 ) {
        if ( a.length == 1 && a[ 0 ].nodeType == 1 ) {
          b = a.pop();
        } else if ( a[ 0 ].parentNode && a.length == a[ 0 ].parentNode.childNodes.length ) {
          b = a.pop().parentNode;
          while ( a.length > 0 )a.pop()
        } else {
          b = a[ 0 ].ownerDocument.createElement( Z );
          b._mstChunk = n;
          if ( a[ 0 ].parentNode )a[ 0 ].parentNode.insertBefore( b , a[ 0 ] );
          while ( a.length > 0 )b.appendChild( a.shift() )
        }
      }
      return b
    }

    function Cc( a ) {
      var c = n;
      while ( c ) {
        c = u;
        if ( a.length == 1 && !bb( a[ 0 ] ) )return;
        if ( a.length == 1 && a[ 0 ].nodeType == 1 && a[ 0 ].childNodes.length > 0 ) {
          var e = a.pop();
          for ( var d = 0 ; d < e.childNodes.length ; d++ )a.push( e.childNodes[ d ] );
          c = n
        }
        if ( a.length > 0 ) {
          if ( !Yb( a[ 0 ] ) ) {
            var b = a.shift();
            if ( b.nodeType == 3 && !b.nodeValue )b.parentNode.removeChild( b );
            c = n
          } else if ( !Yb( a[ a.length - 1 ] ) ) {
            var b = a.pop();
            if ( b.nodeType == 3 && !b.nodeValue )b.parentNode.removeChild( b );
            c = n
          }
        }
      }
      if ( a.length == 1 && !Yb( a[ 0 ] ) )a.pop()
    }

    function Nb( a ) {return !!(a.match( /[a-zA-Z0-9\xC0-\uFFFF]/ ) || H && a.replace( /[\r\n\s]/g , y ).length > 0)}

    function Yb( a ) {
      if ( !lb( a ) )return n;
      var b = y;
      switch ( a.nodeType ) {
        case 1:
          b = a.innerText || a.textContent || y;
          break;
        case 3:
          b = a.nodeValue || y
      }
      if ( b.match( /^[\s\xA0]*$/ ) )return u;
      if ( Nb( b ) )return n;
      return u
    }

    function W( b , i , e ) {
      e = e ? e : 1;
      if ( e > 9 )throw new Error( jc );
      var d = [] , f = 0 , l = 0;
      for ( var c = 0 ; c < b.childNodes.length ; ++c ) {
        switch ( b.childNodes[ c ].nodeType ) {
          case 1:
            var j = i + e.toString() + f.toString();
            try {var g = kc( b.childNodes[ c ] )}
            catch ( k ) {if ( a.debug );}
            if ( g == s.Skip && b.childNodes[ c ].previousSibling && b.childNodes[ c ].previousSibling.nodeType == 1 ) {
              b.childNodes[ c ].previousSibling._mstSkipNext = f;
            } else if ( g == s.Skip && b.childNodes[ c ].nextSibling && b.childNodes[ c ].nextSibling.nodeType == 1 ) {
              b.childNodes[ c ].nextSibling._mstSkipPrev = f;
            } else {
              d.push( "<" );
              d.push( j );
              d.push( m );
              if ( g != s.Skip )d.push( W( b.childNodes[ c ] , i , e + 1 ) );
              d.push( "</" );
              d.push( j );
              d.push( m )
            }
            ++f;
            break;
          case 3:
            if ( b.childNodes[ c ].nodeValue ) {
              var h = b.childNodes[ c ].nodeValue.replace( /[\s\xA0]+/g , hb );
              if ( h != b.childNodes[ c ].nodeValue )b.replaceChild( b.ownerDocument.createTextNode( h ) , b.childNodes[ c ] );
              d.push( Oc( h ) )
            }
        }
      }
      return d.join( y )
    }

    function ab( a , f , i , b , c , g ) {
      if ( !g )g = 1;
      if ( g > 9 )throw new Error( jc );
      var j = [];
      for ( var h = 0 ; h < a.childNodes.length ; ++h ) {
        if ( a.childNodes[ h ].parentNode != a )a.appendChild( a.childNodes[ h-- ] );
        if ( a.childNodes[ h ].nodeType == 1 )j.push( a.childNodes[ h ] )
      }
      var e = 0 , d = 0;
      f.replace( new RegExp( "<" + i + g + "(\\d+)>(.*)<\\/" + i + g + "\\1>" , "gi" ) , function ( m , q , o , l ) {
        while ( b && b[ 0 ] <= l - e ) {
          var n = a.ownerDocument.createTextNode( Fb( f.substr( e , b[ 0 ] ) ) );
          c[ c.length - 1 ].push( n );
          c.push( [] );
          a.insertBefore( n , d < a.childNodes.length ? a.childNodes[ d ] : k );
          ++d;
          e += b[ 0 ];
          b.shift()
        }
        if ( e < l ) {
          var n = a.ownerDocument.createTextNode( Fb( f.substr( e , l - e ) ) );
          if ( b ) {
            c[ c.length - 1 ].push( n );
            b[ 0 ] -= l - e
          }
          a.insertBefore( n , d < a.childNodes.length ? a.childNodes[ d ] : k );
          ++d;
          e = l
        }
        var h = j[ parseInt( q ) ];
        if ( h != a.childNodes[ d ] )a.insertBefore( h , a.childNodes[ d ] );
        ++d;
        if ( typeof h._mstSkipPrev == wb ) {
          var s = j[ h._mstSkipPrev ];
          a.insertBefore( s , h );
          ++d;
          if ( b )c[ c.length - 1 ].push( s );
          h._mstSkipPrev = y
        }
        if ( bb( h ) ) {
          if ( b ) {
            if ( b[ 0 ] < m.length ) {
              c.push( [] );
              b[ 0 ] -= 4 + q.length;
              ab( h , o , i , b , c , g + 1 );
              b[ 0 ] -= 5 + q.length
            } else {
              c[ c.length - 1 ].push( h );
              ab( h , o , i , k , k , g + 1 );
              b[ 0 ] -= m.length
            }
          } else {
            ab( h , o , i , k , k , g + 1 );
          }
        } else if ( b ) {
          if ( b[ 0 ] < m.length )c.push( [ h ] , [] ); else c[ c.length - 1 ].push( h );
          for ( var p = m.length ; p > b[ 0 ] ; b.shift() )p -= b[ 0 ];
          b[ 0 ] -= p
        }
        if ( typeof h._mstSkipNext == wb ) {
          var r = j[ h._mstSkipNext ];
          a.insertBefore( r , h.nextSibling );
          ++d;
          if ( b )c[ c.length - 1 ].push( r );
          h._mstSkipNext = y
        }
        e += m.length
      } );
      while ( b && b[ 0 ] <= f.length - e ) {
        var l = a.ownerDocument.createTextNode( Fb( f.substr( e , b[ 0 ] ) ) );
        c[ c.length - 1 ].push( l );
        c.push( [] );
        a.insertBefore( l , d < a.childNodes.length ? a.childNodes[ d ] : k );
        ++d;
        e += b[ 0 ];
        b.shift()
      }
      if ( e < f.length ) {
        var l = a.ownerDocument.createTextNode( Fb( f.substr( e , f.length - e ) ) );
        a.insertBefore( l , d < a.childNodes.length ? a.childNodes[ d ] : k );
        ++d;
        if ( b ) {
          c[ c.length - 1 ].push( l );
          b[ 0 ] -= f.length - e
        }
      }
      while ( d < a.childNodes.length )a.removeChild( a.childNodes[ d ] );
      if ( c && c[ c.length - 1 ].length )c.push( [] )
    }

    function Oc( b ) {if ( a.service == Lb && Default.Globals.PhraseAlignment )return b.replace( /[\s\xA0]/g , hb ); else return b.replace( /&/g , "&amp;" ).replace( /</g , "&lt;" ).replace( />/g , "&gt;" ).replace( /[\s\xA0]/g , hb )}

    function Fb( b ) {if ( a.service == Lb && Default.Globals.PhraseAlignment )return b; else return b.replace( /<\w+>/g , y ).replace( /<\/\w+>/g , y ).replace( /&gt;/gi , m ).replace( /&lt;/gi , "<" ).replace( /&amp;/gi , v )}

    function Ic( a ) {
      a = a.replace( /[\s\xA0]/g , y );
      var c = 0;
      for ( var b = 0 ; b < a.length ; ++b )c += a.charCodeAt( b ) * 13 * (b + 7);
      return c
    }

    function Bc() {
      var h = [] , c = [] , b = 0 , g = f.getStringByteCount( N[ 0 ] );
      if ( Ab.length > 0 && !fb ) {
        fb = n;
        var i = Ab.shift();
        A = i.txt;
        b = i.length;
        oc = i.dom;
        var e = A[ 0 ] , d = Math.floor( e.length * gb / b );
        A = [ e.substr( 0 , d ) , e ];
        while ( f.getStringByteCount( A[ 0 ] ) > gb && d > l ) {
          d = Math.floor( d / 2 );
          A = [ e.substr( 0 , d ) , e ]
        }
        db = { aTxt : [] , aSrcSnt : [] , aTgtSnt : [] };
        Eb = new Date;
        Hb = A[ 0 ].length;
        tb = 1;
        nb = a.serviceClient.TranslateArray( Kb , [ A[ 0 ] ] , L , M , a.category ? { Category : a.category } : k , nc , Bb , mb );
        window.Microsoft.Translator.translationCallsTime[ window.Microsoft.Translator.APIRequests ] = (new Date).getTime();
        if ( window.Microsoft.Translator.APIRequests == 0 )Db = new Date;
        window.Microsoft.Translator.APIRequests++;
        return
      }
      do {
        if ( N.length == 0 )break;
        if ( kb.length && kb[ 0 ].length < 32 && N[ 0 ].length > 32 )kb = [];
        kb.push( N[ 0 ].replace( /<[^>]*>/g , hb ).replace( /[\s\xA0]+/g , hb ) );
        Gb -= g;
        b += g;
        mc += N[ 0 ].length;
        h.push( Vb.shift() );
        c.push( N.shift() );
        g = N.length > 0 ? f.getStringByteCount( N[ 0 ] ) : 0
      } while ( Vb.length > 0 && b < gb && b + g + (c.length + 1) * f.getStringByteCount( '"",' ) <= tc );
      if ( b > tc && (!E || !o.sourceFrame) ) {
        Ab.push( { dom : h , txt : c , length : b } );
        B()
      } else if ( b > 0 && (!E || !o.sourceFrame) ) {
        Eb = new Date;
        Hb = b;
        tb = c.length;
        Qb[ C ] = function ( a ) {return function ( b ) {Nc( b , a )}}( C );
        Sb[ C ] = function ( a ) {return function ( b ) {Bb( b , a )}}( C );
        w[ C ] = { Dom : h , Txt : c };
        w.size++;
        if ( a.service == Lb )nb = a.serviceClient.TranslateArray2( Kb , c , L , M , a.category ? { Category : a.category } : k , Qb[ C ] , Sb[ C ] , mb ); else nb = a.serviceClient.TranslateArray( Kb , c , L , M , a.category ? { Category : a.category } : k , Qb[ C ] , Sb[ C ] , mb );
        window.Microsoft.Translator.translationCallsTime[ C ] = (new Date).getTime();
        C++;
        if ( window.Microsoft.Translator.APIRequests == 0 )Db = new Date;
        window.Microsoft.Translator.APIRequests++;
        Kc();
        if ( w.size < D )if ( H && K )B(); else setTimeout( function () {B()} , V )
      } else if ( w.size < D )if ( H && K )B(); else setTimeout( function () {B()} , V )
    }

    function nc( b ) {
      if ( Ib )return;
      if ( !fb )return;
      fb = u;
      window.Microsoft.Translator.APIResponses++;
      o.detectedLanguage = b && b[ 0 ] && b[ 0 ].From ? b[ 0 ].From.toLowerCase() : o.detectedLanguage;
      var p = b[ 0 ].TranslatedText , g = b[ 0 ].OriginalTextSentenceLengths , h = b[ 0 ].TranslatedTextSentenceLengths , j = 0 , m = 0;
      if ( !(p && g && h) ) {
        fb = n;
        Bb( b[ 0 ].Error );
        return
      }
      Ob( b );
      for ( var d = 0 ; d < (A.length > 1 ? Math.max( g.length - 2 , 1 ) : g.length) ; ++d ) {
        db.aTxt.push( p.substr( m , h[ d ] ) );
        db.aSrcSnt.push( g[ d ] );
        db.aTgtSnt.push( h[ d ] );
        j += g[ d ];
        m += h[ d ]
      }
      if ( A.length > 1 ) {
        if ( g.length < 1 ) {
          B();
        } else {
          var c = A[ 1 ].substr( j ) , r = f.getStringByteCount( c ) , e = Math.floor( c.length * gb / r );
          A = e > gb ? [ c.substr( 0 , e ) , c ] : [ c ];
          while ( f.getStringByteCount( A[ 0 ] ) > gb && e > l ) {
            e = Math.floor( e / 2 );
            A = [ c.substr( 0 , e ) , c ]
          }
          if ( fb )return;
          fb = n;
          Eb = new Date;
          Hb = A[ 0 ].length;
          tb = 1;
          nb = a.serviceClient.TranslateArray( Kb , [ A[ 0 ] ] , L , M , k , nc , Bb , mb )
        }
      } else {
        var i = oc.shift() , s = ub || o.detectedLanguage;
        if ( !K && !H ) {
          cb = Cb( qb );
          Wb( i )
        }
        try {lc( i , W( i , I ) , db.aTxt.join( y ) , db.aSrcSnt , db.aTgtSnt )}
        catch ( q ) {if ( a.debug );}
        if ( w.size < D )if ( H && K )B(); else setTimeout( function () {B()} , V )
      }
    }

    function Nc( c , b ) {
      if ( Ib )return;
      window.Microsoft.Translator.translationCallsTime[ b ] = (new Date).getTime() - window.Microsoft.Translator.translationCallsTime[ b ];
      var i = (new Date).getTime() - Db.getTime();
      Db = new Date;
      window.Microsoft.Translator.totalTranslationTime += i;
      window.Microsoft.Translator.APIResponses++;
      if ( w[ b ] && c.length != w[ b ].Dom.length ) {
        Bb( "Inconsistent Data" , b );
        return
      }
      Ob( c );
      o.detectedLanguage = c && c[ 0 ] && c[ 0 ].From ? c[ 0 ].From.toLowerCase() : o.detectedLanguage;
      var j = ub || o.detectedLanguage;
      if ( !K && !H ) {
        cb = Cb( qb );
        Wb( w[ b ].Dom )
      }
      var e = y;
      for ( var f = w[ b ].Dom.shift() , g = w[ b ].Txt.shift() , d = c.shift() ; f && d ; f = w[ b ].Dom.shift(), (g = w[ b ].Txt.shift(), d = c.shift()) ) {
        if ( d.Alignment ) {
          if ( e.length != 0 )e += "|";
          e += d.Alignment
        }
        try {lc( f , g , d.TranslatedText , d.OriginalTextSentenceLengths , d.TranslatedTextSentenceLengths )}
        catch ( h ) {if ( a.debug );}
      }
      if ( e.length != 0 )pb.setAttribute( "mstAlign" , e );
      delete w[ b ];
      w.size--;
      if ( w.size < D )if ( H && K )B(); else setTimeout( function () {B()} , V )
    }

    function Kc() {
      if ( C > hc ) {
        D = 1;
        V = 500
      } else if ( D > 2 && C % ic == 0 ) {
        D = D - parseInt( D / 3 );
        V += 10;
        Pb( .1 )
      }
    }

    function Bb( c , b ) {
      if ( b ) {
        delete w[ b ];
        w.size--
      }
      if ( Ib )return;
      if ( a.debug );
      window.Microsoft.Translator.APIResponses++;
      Ob( k );
      if ( wc )wc( c );
      if ( w.size < D )B()
    }

    function Ob( a ) {
      var e = new Date , b = e.getTime() - Eb.getTime();
      if ( b > 13000 )b = 13000;
      var c = 0;
      if ( a )for ( var d = 0 ; d < a.length ; ++d )c += a[ d ].OriginalTextSentenceLengths.length; else c = tb;
      S.push( { r : a ? "S" : "E" , c : Hb , s : c , e : tb , l : b } )
    }

    var lc = z.translateElement = function ( b , l , j , h , i ) {
      b._mstSrcHtml = b.innerHTML;
      if ( b.nodeName.toLowerCase() == "option" ) {
        ab( b , j , I , k , k );
        return
      }
      var d , g = b._mstHash;
      if ( o.sourceFrame ) {
        d = b.cloneNode( n );
      } else {
        d = b;
        b = d.cloneNode( n )
      }
      var m = h ? h.slice( 0 ) : [] , p = i ? i.slice( 0 ) : [] , e = [ [] ] , f = [ [] ];
      try {
        ab( b , l , I , m , e );
        ab( d , j , I , p , f )
      }
      catch ( q ) {if ( a.debug );}
      if ( e.length > 2 && f.length > 2 ) {
        b._mstSrcHtml = b.innerHTML;
        for ( var c = 0 ; c < e.length && c < f.length ; ++c )vc( Zb( e[ c ] ) , Zb( f[ c ] ) , g * (c + 1) )
      } else {
        vc( b , d , g );
      }
      if ( E && E[ g ] && !o.sourceFrame )E.translateElement( E[ g ] , l , j , h , i )
    };

    function vc( b , c , d ) {
      if ( !(b && c) )return;
      var g = b.textContent || b.innerText || y , h = c.textContent || c.innerText || y;
      if ( !g.match( /[a-zA-Z0-9\xC0-\uFFFF]/ ) && !h.match( /[a-zA-Z0-9\xC0-\uFFFF]/ ) )return;
      b._mstHash = c._mstHash = d;
      if ( Mb )c._mstSrcHtml = b.innerHTML;
      try {
        b.setAttribute( P , L );
        c.setAttribute( P , M )
      }
      catch ( e ) {if ( a.debug );}
      b._mstNormalize = function () {return W( b , I )};
      c._mstNormalize = function () {return W( c , I )};
      c._mstDenormalize = function ( d ) {
        var c = b.cloneNode( n );
        c._mstNormalize = function () {return W( c , I )};
        try {ab( c , d , I )}
        catch ( e ) {if ( a.debug );}
        return c
      };
      try {
        if ( o.sourceFrame ) {
          o[ d ] = b;
          new zb( b , c , f.getBlockParent( b ) , Cb( M ) , o , E )
        } else {
          o[ d ] = c;
          new zb( c , b , f.getBlockParent( c ) , Cb( L || o.detectedLanguage ) , o , E )
        }
      }
      catch ( i ) {}
      o.transItems.push( { src : b , tgt : c } )
    }

    function Ub( b ) {
      if ( !Mb )throw new Error( "Untranslate feature was turned off, please consider modifying the parameter in the constructor!" );
      if ( b.nodeName.toLowerCase() == "frame" || b.nodeName.toLowerCase() == R ) {
        try {Ub( b.contentWindow.document.documentElement )}
        catch ( c ) {if ( a.debug );}
      } else {
        if ( b._mstStyle ) {
          for ( var e in b._mstStyle ) {
            try {b.style[ e ] = b._mstStyle[ e ]}
            catch ( c ) {if ( a.debug );}
          }
        }
        b._mstStyle = k;
        if ( b._mstSrcHtml ) {
          b.innerHTML = b._mstSrcHtml;
          if ( b._mstTooltip )b._mstTooltip.detach()
        } else {
          for ( var d = 0 ; d < b.childNodes.length ; ++d ) {
            try {Ub( b.childNodes[ d ] )}
            catch ( c ) {if ( a.debug );}
          }
        }
      }
    }

    if ( H && K ) {
      B();
      if ( toolbar )toolbar.show()
    } else {
      setTimeout( B , 0 );
      if ( toolbar )setTimeout( toolbar.show , 10 )
    }
    return z
  }

  var yb = function () {
    function a( b , a ) {
      this.Name = b;
      this.Code = a
    }

    return a
  }() , Eb = function () {
    function a( b , a , c ) {
      this.SignIn = b;
      this.SignOut = a;
      this.Help = c
    }

    return a
  }() , Db = function () {
    var m = "object" , l = J , o = "onComplete" , f = M , k = V , d = i , e = j , n = ub , h = g;

    function a() {
      var c = "UserName" , a = this;
      a.languageNames = [];
      a.langLocalized = h;
      a.appId = window._mstConfig.appId;
      a.unTranslateDelegate = h;
      a.Links = new Eb( window._mstConfig[ "SignIn" ] ? window._mstConfig[ "SignIn" ] : b , window._mstConfig[ "SignOut" ] ? window._mstConfig[ "SignOut" ] : b , "http://go.microsoft.com/?linkid=9722454" );
      a.UserName = window._mstConfig[ c ] ? window._mstConfig[ c ] : b;
      a.languageCodes = [];
      for ( var d in window[ n ] )a.languageCodes[ a.languageCodes.length ] = d
    }

    a.prototype.Translate = function ( g , h , c , d , b , a , f ) {this.TranslateElement( g , h , document.documentElement , c , d , b , a , f , e )};
    a.prototype.TranslateElement = function ( u , m , g , q , c , p , n , j , b ) {
      var s = L , a = this;
      if ( typeof g === s )g = document.documentElement;
      if ( typeof b === s )b = e;
      a.validate( u , "from" , d , k );
      a.validate( m , "to" , e , k );
      if ( !a.isElement( g ) && !a.isNode( g ) )throw new Error( "Invalid DomElement" );
      a.validate( q , "onProgress" , d , f );
      a.validate( c , "onError" , d , f );
      a.validate( p , o , d , f );
      a.validate( n , "onRestoreOriginal" , d , f );
      a.validate( j , "timeOut" , d , l , e );
      a.validate( b , "showFloater" , d , "boolean" );
      var i = d;
      a.lastToLanguage = m;
      if ( a.domTranslator != h && a.domTranslator.cancel )a.domTranslator.cancel();
      if ( b )I.Show( m );
      var w = function () {
        t( r );
        i = e;
        try {if ( b )I.TranslationComplete()}
        catch ( a ) {console.error( a )}
        try {if ( p )p()}
        catch ( a ) {console.error( a )}
      } , x = function ( d ) {
        try {if ( b )I.TranslationError( d )}
        catch ( a ) {console.error( a )}
        try {if ( c )c( d )}
        catch ( a ) {console.error( a )}
      } , t = function ( c ) {
        if ( i )return;
        if ( c == r )i = e;
        try {if ( b )I.TranslationProgress( c )}
        catch ( a ) {console.error( a )}
        try {if ( q )q( c )}
        catch ( a ) {console.error( a )}
      };
      a.domTranslator = new Bb( a.appId , g , u , m , w , c , j , d , d );
      if ( a.domTranslator.addProgressEvent )a.domTranslator.addProgressEvent( t );
      if ( n )a.unTranslateDelegate = n;
      if ( c && j ) {
        var v = a.domTranslator;
        setTimeout( function () {
          if ( !i ) {
            c( "Timout expired before translation could be finished" );
            if ( v.cancel )v.cancel()
          }
        } , j )
      }
    };
    a.prototype.validate = function ( a , c , f , b , e ) {
      var d = " should be of type ";
      if ( f ) {
        if ( !a )throw new Error( c + " is required" );
        if ( typeof a != b )throw new Error( c + d + b );
      } else if ( a && typeof a != b )throw new Error( c + d + b );
      if ( b == l && e && a && a < 0 )throw new Error( c + " should be a positive number" );
    };
    a.prototype.isNode = function ( a ) {return typeof Node === m ? a instanceof Node : a && typeof a === m && typeof a.nodeType === l && typeof a.nodeName === k};
    a.prototype.isElement = function ( a ) {return typeof HTMLElement === m ? a instanceof HTMLElement : a && typeof a === m && a !== h && a.nodeType === 1 && typeof a.nodeName === k};
    a.prototype.RestoreOriginal = function () {
      var a = this;
      if ( !a.domTranslator )throw new Error( "Can not RestoreOriginal before making a translation" );
      if ( a.domTranslator.cancel )a.domTranslator.cancel();
      if ( a.unTranslateDelegate ) {
        try {a.unTranslateDelegate( a.lastToLanguage )}
        catch ( b ) {console.error( b )}
      }
    };
    a.prototype.GetLanguagesForTranslate = function ( b , c , g , i ) {
      var a = this;
      a.validate( b , "locale" , e , k );
      a.validate( c , o , e , f );
      a.validate( g , "onError" , d , f );
      a.validate( i , "timeOut" , d , l , e );
      if ( a.languageNames[ b ] != h ) {
        try {c( a.languageNames[ b ] )}
        catch ( j ) {console.error( j )}
        return
      }
      Microsoft.Translator.GetLanguageNames( a.appId , b , a.languageCodes , function ( a ) {Microsoft.Translator.Widget.GetLanguageNamesCallBack( a , b , c , g )} , g , i )
    };
    a.prototype.GetLanguageNamesCallBack = function ( b , e , g , d ) {
      if ( !b || !b[ 0 ] ) {
        if ( d )d( "Invalid locale " + e );
        return
      }
      var c = [];
      for ( var a = 0 ; a < b.length ; a++ )c[ a ] = new yb( b[ a ] , this.languageCodes[ a ] );
      this.languageNames[ e ] = c;
      try {g( c )}
      catch ( f ) {console.error( f )}
    };
    a.prototype.GetLanguagesForTranslateLocalized = function () {
      var a = this;
      if ( !a.langLocalized ) {
        a.langLocalized = [];
        for ( var b in window[ n ] )a.langLocalized[ a.langLocalized.length ] = new yb( window[ n ][ b ] , b )
      }
      return a.langLocalized
    };
    a.prototype.GetAutoDetectedLanguage = function () {
      if ( !this.domTranslator || !this.domTranslator.detectedLanguage )throw new Error( "Can not return auto detected language before making a translation with 'from' parameter set to null " );
      return this.domTranslator.detectedLanguage
    };
    a.prototype.SetUpdatedAccessToken = function ( d ) {
      var i = B , k = window._mstConfig.baseURL.split( u ) , a = k[ 2 ].split( ":" )[ 0 ];
      a = a.substring( 4 , a.length );
      d = encodeURIComponent( d );
      var e = document.getElementsByTagName( R );
      if ( e && e.length > 0 ) {
        for ( var h = 0 ; h < e.length ; h++ ) {
          var l = e[ h ] , g = l.getAttribute( "src" );
          if ( g && (g.toLowerCase().indexOf( "roledashboard.aspx" ) != c || g.toLowerCase().indexOf( "bulkdashboard.aspx" ) != c) ) {
            var j = "https://" + k[ 2 ] , j = j.replace( "www." , "ssl." );
            l.contentWindow.postMessage( "TRNS_TOKEN_UPDATE" + d , j )
          }
        }
      }
      var f = document.createElement( "script" );
      f.type = gb;
      f.charset = "UTF-8";
      var m = window[ i ].onErrorHandlerName ? jb + window[ i ].onErrorHandlerName : b;
      f.src = (location && location.href && location.href.indexOf( "https" ) == 0 ? "https://ssl." + a : "http://www." + a) + "/ajax/v3/WidgetV3.ashx?action=refreshToken&trnsaccesstoken=" + d + m;
      p = document.getElementsByTagName( Q )[ 0 ] || document.documentElement;
      p.insertBefore( f , p.firstChild )
    };
    a.prototype.UpdateAppID = function ( a , b ) {
      this.appId = a;
      window._mstConfig.appId = this.appId;
      Microsoft.Translator.Widget.UpdateDashboardLink( encodeURIComponent( b ) )
    };
    a.prototype.UpdateDashboardLink = function ( a ) {Microsoft.Translator.Community.updateWidgetInfo( a )};
    return a
  }();
  n.Widget = new Db;
  var zb = new function () {
    var c = i , m = c , n = 600 , o = 430 , r = "#0F0F5F" , p = "#F0F0A0" , t;
    return function ( t , J , u , Q , A , w ) {
      var Y = "touchstart" , X = "pointerup" , W = "mouseout" , V = "mouseover" , E = N , B = j , v = this;
      if ( t._mstTooltip ) {
        try {t._mstTooltip.detach()}
        catch ( ib ) {}
      }
      t._mstTooltip = J._mstTooltip = v;
      if ( !u )u = t;
      var y = c , I = c , P = t.style.color , L = t.style.backgroundColor , i = t.ownerDocument , M = c , R = v.hover = function ( d ) {
        if ( m )return;
        if ( A.showHighlight ) {
          var b = t.style.color;
          try {b = "#" + D.parse( t.style.color ).toString()}
          catch ( c ) {}
          if ( b != r )P = t.style.color;
          var a = t.style.backgroundColor;
          try {a = "#" + D.parse( t.style.backgroundColor ).toString()}
          catch ( c ) {}
          if ( a != p )L = t.style.backgroundColor;
          t.style.color = r;
          t.style.backgroundColor = p
        }
        if ( A.showTooltips && d ) {
          y = B;
          setTimeout( cb , n )
        }
        if ( d && w && w[ t._mstHash ] && w[ t._mstHash ]._mstTooltip )w[ t._mstHash ]._mstTooltip.hover()
      } , hb = v.unhover = function ( a ) {
        if ( m || M ) {
          M = c;
          return
        }
        if ( A.showHighlight ) {
          t.style.color = P;
          t.style.backgroundColor = L
        }
        if ( A.showTooltips && a ) {
          y = c;
          setTimeout( Z , n )
        }
        if ( a && w && w[ t._mstHash ] && w[ t._mstHash ]._mstTooltip )w[ t._mstHash ]._mstTooltip.unhover()
      };

      function cb() {
        if ( m )return;
        if ( y )ob()
      }

      var ob = v.show = function () {
        var ib = kb , X = h , N = "none 0px" , hb = ab , gb = U , M = "normal" , mb = "0px 0px 0px 0px" , L = C , D = q;
        if ( I )return; else I = B;
        if ( !i._mstTooltip ) {
          var pb = a.baseURL.substr( 0 , 8 ) + a.baseURL.substr( 8 ).replace( /\/.*$/ , lb ) , Y = c;
          if ( fb[ a.locale ] && rb[ fb[ a.locale ] ] && rb[ fb[ a.locale ] ] == D )Y = B;
          i._mstTooltip = i.createElement( L );
          i._mstTooltip.translate = c;
          i._mstTooltip.setAttribute( "translate" , O );
          i._mstTooltip.style.display = E;
          i._mstTooltip.style.position = db;
          i._mstTooltip.style.zIndex = eb;
          i._mstTooltip.style.margin = mb;
          i._mstTooltip.style.border = "2px solid #D2D2D2";
          i._mstTooltip.style.padding = mb;
          i._mstTooltip.style.color = "#000000";
          i._mstTooltip.style.backgroundColor = "#E6E6E6";
          i._mstTooltip.style.fontFamily = "Arial, Helvetica, Sans-Serif";
          i._mstTooltip.style.fontStyle = M;
          i._mstTooltip.style.fontVariant = M;
          i._mstTooltip.style.fontWeight = M;
          i._mstTooltip.style.fontSize = "12px";
          i._mstTooltip.style.lineHeight = M;
          if ( !Y ) {
            i._mstTooltip.style.direction = d;
            i._mstTooltip.style.textAlign = F
          } else {
            i._mstTooltip.style.direction = D;
            i._mstTooltip.style.textAlign = gb
          }
          var p = i.createElement( L );
          if ( !Y )p.style.styleFloat = p.style.cssFloat = gb; else p.style.styleFloat = p.style.cssFloat = F;
          var j = i.createElement( "a" );
          j.href = a.lpURL;
          j.target = "_blank";
          j.style.display = hb;
          j.style.padding = "4px";
          j.style.border = N;
          j.style.cursor = T;
          j.style.textDecoration = E;
          j.style.textAlign = G;
          var v = i.createElement( x );
          v.src = a.imagePath + "binglogo_ctf.png";
          v.style.width = "36px";
          v.style.height = "14px";
          v.style.border = N;
          j.appendChild( v );
          p.appendChild( j );
          i._mstTooltip.cl = i.createElement( "a" );
          i._mstTooltip.cl.style.padding = bb;
          i._mstTooltip.cl.style.border = N;
          i._mstTooltip.cl.style.textAlign = G;
          i._mstTooltip.cl.style.textDecoration = E;
          i._mstTooltip.cl.style.verticalAlign = "top";
          i._mstTooltip.cl.style.display = hb;
          i._mstTooltip.cl.style.cursor = T;
          var w = i.createElement( x );
          w.src = a.imagePath + "tooltip_close.gif";
          w.style.border = N;
          w.style.width = H;
          w.style.height = H;
          i._mstTooltip.cl.appendChild( w );
          p.appendChild( i._mstTooltip.cl );
          i._mstTooltip.appendChild( p );
          var m = i.createElement( L );
          m.style.margin = "4px 4px 8px 4px";
          m.style.fontWeight = "bold";
          m.style.fontFamily = "Segoe UI";
          m.style.fontSize = "9px";
          m.style.letterSpacing = z;
          m.style.textTransform = "uppercase";
          m.style.color = "#4D4D4D";
          if ( !A.sourceFrame ) {
            var r = k;
            try {r = xb[ fb[ a.locale || X ] || X ] || r}
            catch ( W ) {}
            r += ":"
          } else {
            var r = "Translation";
            try {r = localizedTranslation[ fb[ a.locale || X ] || X ] || r}
            catch ( W ) {}
          }
          m.appendChild( i.createTextNode( r ) );
          i._mstTooltip.appendChild( m );
          i._mstTooltip.cp = i.createElement( L );
          i._mstTooltip.appendChild( i._mstTooltip.cp );
          i._mstTooltip.cb = i.createElement( "span" );
          i._mstTooltip.cb.style.display = hb;
          i._mstTooltip.cb.style.margin = "0px 4px 4px 4px";
          i._mstTooltip.cb.style.fontFamily = "Arial";
          i._mstTooltip.cb.style.fontSize = "12px";
          i._mstTooltip.cb.style.color = "black";
          i._mstTooltip.cp.appendChild( i._mstTooltip.cb );
          i.body.appendChild( i._mstTooltip )
        }
        i._mstTooltip.cl.onclick = S;
        i._mstTooltip.style.width = b;
        i._mstTooltip.cb.style.whiteSpace = "nowrap";
        i._mstTooltip.cb.innerHTML = b;
        i._mstTooltip.cb.appendChild( i.createTextNode( J.innerText || J.textContent ) );
        i._mstTooltip.style.display = K;
        for ( var jb in Q ) {
          try {i._mstTooltip.cp.style[ jb ] = Q[ jb ]}
          catch ( W ) {if ( a.debug );}
        }
        i._mstTooltip.onmouseover = function () {
          y = B;
          R();
          cb()
        };
        i._mstTooltip.onmouseout = function () {
          y = c;
          setTimeout( Z , l )
        };
        var P = Math.max( f.getVisibleWidth( i ) , l ) , V = window.pageXOffset || i.documentElement.scrollLeft || i.body.scrollLeft , ob = Math.max( i.documentElement.scrollWidth , i.body.scrollWidth );
        if ( Microsoft.TranslatorOverride && Microsoft.TranslatorOverride.showTooltip ) {
          try {
            Microsoft.TranslatorOverride.showTooltip( J , t , i._mstTooltip );
            o = 430
          }
          catch ( W ) {}
        }
        var n = i._mstTooltip.cb.offsetWidth + 12;
        if ( n > u.offsetWidth )n = u.offsetWidth;
        if ( n > P - e )n = P - e;
        if ( n < o )n = o;
        i._mstTooltip.style.width = n.toString() + s;
        i._mstTooltip.cb.style.whiteSpace = b;
        var g , nb = f.getStyleValue( t , ib ) == D || f.getStyleValue( t , "text-align" ) == gb;
        if ( nb )g = f.absXPos( t ) + t.offsetWidth - i._mstTooltip.offsetWidth; else g = f.absXPos( t );
        if ( g + i._mstTooltip.offsetWidth > f.absXPos( u ) + u.offsetWidth )g = f.absXPos( u ) + u.offsetWidth - i._mstTooltip.offsetWidth;
        if ( g < f.absXPos( u ) && f.absXPos( u ) + n < ob )g = f.absXPos( u );
        if ( f.getStyleValue( t , ib ) != D ) {
          if ( g + i._mstTooltip.offsetWidth > P + V - 8 )g = P + V - 8 - i._mstTooltip.offsetWidth;
          if ( g < V + 8 )g = V + 8
        }
        i._mstTooltip.style.left = g + s;
        i._mstTooltip.style.top = Math.max( f.absYPos( t ) - (i._mstTooltip.offsetHeight + 8) , 8 ) + s
      };

      function Z() {
        if ( m )return;
        if ( !y )S()
      }

      var S = v.hide = function () {
        gb( c );
        if ( !I )return; else I = c;
        if ( A.showHighlight ) {
          t.style.color = P;
          t.style.backgroundColor = L
        }
        if ( i._mstTooltip )i._mstTooltip.style.display = E
      } , gb = v.setLock = function ( a ) {m = a} , pb = v.tap = function ( a ) {
        if ( window.WidgetLastHoveredItem != g )window.WidgetLastHoveredItem._mstTooltip.unhover( window.WidgetLastHoveredItem );
        M = B;
        if ( i._mstTooltip )setTimeout( function () {i._mstTooltip.style.display = K} , n + 10 );
        window.WidgetLastHoveredItem = a
      } , qb = v.detach = function () {
        f.removeEvent( t , V , mb );
        f.removeEvent( t , W , nb );
        f.removeEvent( t , t , window.navigator.msPointerEnabled ? X : Y , jb )
      } , mb = f.addEvent( t , V , R ) , nb = f.addEvent( t , W , hb ) , jb = f.addEvent( t , window.navigator.msPointerEnabled ? X : Y , pb )
    }
  } , Fb = new function ( vb ) {
    var Pb = 1600 , fc = "white" , Kb = "#E6E6E6" , gc = kb , Eb = x , rb = "span" , hb = C , w = s , n = b , G = g , h = N , t = K , Cb = "hidden" , ib = ab , nc = "MSTCTransPanel" , y = j , d = i , qb = this , Ac = 0 , ec , Db , cb , Zb , tb , A , Ib , Ob , Fb , bc , I , mb , Wb , Hb , Gb , Rb , Qb , sc , Nb , lb , Vb , Tb , xc , vc , ac , wb , Ab , yb , zb , xb , cc , mc , p , ub , gb , uc , X , Yb , Mb , B , Dc , k = d , jc = y , Bc = 1e6 , J , L = 0 , kc , sb , Bb;
    window._mstCmCb = function () {
      a.appId = document.getElementById( "MSTCAppIdToken" ).innerHTML;
      gb = parseInt( document.getElementById( "MSTCMaxRating" ).innerHTML );
      uc = document.getElementById( "MSTCImagePath" ).innerHTML;
      X = document.getElementById( "MSTCAuthLang" ).innerHTML.toLowerCase();
      Yb = document.getElementById( "MSTCDashboardUrl" ).href;
      Ib = document.getElementById( "MSTCContent" );
      Ob = document.getElementById( "MSTCExpandLink" );
      Fb = document.getElementById( "MSTCRootPanel" );
      bc = document.getElementById( "MSTCLoading" );
      I = document.getElementById( "MSTCSubmitting" );
      mb = document.getElementById( nc );
      Wb = document.getElementById( "MSTCPrevNextPanel" );
      Hb = document.getElementById( "MSTCPrevLink" );
      Gb = document.getElementById( "MSTCNextLink" );
      Rb = document.getElementById( "MSTCPrevCount" );
      Qb = document.getElementById( "MSTCNextCount" );
      sc = document.getElementById( "MSTCFooterPanel" );
      Nb = document.getElementById( "MSTCDashboardLink" );
      ac = document.getElementById( "MSTCApprove" );
      wb = document.getElementById( "MSTCApproveTooltip" );
      Ab = document.getElementById( "MSTCReject" );
      yb = document.getElementById( "MSTCRejectTooltip" );
      zb = document.getElementById( "MSTCRestore" );
      xb = document.getElementById( "MSTCRestoreTooltip" );
      cc = document.getElementById( "MSTCUserID" );
      mc = document.getElementById( "MSTCButtonPanel" );
      lb = document.getElementById( "MSTCTransPanelError" );
      Vb = document.getElementById( "MSTCTransPanelErrorMsg" );
      Tb = document.getElementById( "MSTCOKImgBtn" );
      xc = document.getElementById( "MSTCHelpImgBtn" );
      if ( Tb )Tb.onclick = Lb;
      if ( f.isInternetExplorer() && f.isQuirksMode( document ) )f.fixIEQuirks( A );
      Hb.onclick = function () {
        Xb( -3 );
        return d
      };
      Gb.onclick = function () {
        Xb( 3 );
        return d
      };
      if ( Nb ) {
        if ( jc ) {
          Nb.onclick = lc;
          var b = document.getElementById( "MSTTDashboardLink" );
          if ( b ) {
            b.parentNode.style.display = ib;
            b.onclick = lc;
            b.href = "javascript: " + b.title
          }
        } else {
          Nb.style.visibility = Cb;
        }
      }
      if ( !window.Microsoft )window.Microsoft = {};
      window.Microsoft.TranslatorOverride = { showTooltip : tc , hideTooltip : nb };
      if ( gb >= 5 )window.Microsoft.TranslatorOverride.showHighlight = rc
    };
    var tc = qb.showTooltip = function ( a , b , c ) {
      if ( !A || A.ownerDocument != c.ownerDocument )return;
      B = a._mstTooltip;
      Db = a.getAttribute( P );
      cb = b.getAttribute( P );
      Zb = a;
      tb = b;
      k = d;
      Ob.onclick = ic;
      A.style.display = t;
      Fb.style.display = h;
      mb.style.display = h;
      Lb();
      c.appendChild( A )
    } , ic = qb.showTranslations = function () {
      Ob.onclick = hc;
      Fb.style.display = t;
      bc.style.display = t;
      mb.style.display = h;
      Lb();
      Wb.style.display = h;
      a.serviceClient.GetTranslations( a.appId , Zb._mstNormalize() , Db , cb , 24 , a.category ? { Category : a.category } : G , yc , oc , o );
      return d
    } , zc = qb.updateWidgetInfo = function ( a ) {
      ub = a;
      Mb = y
    };

    function yc( b ) {
      bc.style.display = h;
      mb.innerHTML = n;
      mb.style.display = t;
      if ( b.Translations.length > 4 )Wb.style.display = t;
      var r = gb >= 5 && gb >= Math.abs( b.Translations[ 0 ].Rating ) && (!X || X == cb.toLowerCase()) , k = b.Translations.length > 0 && b.Translations[ 0 ].Rating >= 5 , s = !b.NoEdit && b.Translations.length == 1 , p = b.Reject , f , l = b.Translations.length;
      for ( f = 0 ; f < l ; f++ )if ( b.Translations[ f ].Rating == 5 )break;
      if ( f != l ) {
        var m = b.Translations[ f ].TranslatedText;
        for ( var e = 0 ; e < b.Translations.length ; e++ ) {
          if ( e == f )continue;
          if ( m == b.Translations[ e ].TranslatedText ) {
            if ( e < f )f--;
            b.Translations.splice( e , 1 );
            e--
          }
        }
      }
      var g = c , j = c;
      for ( var e = 0 ; e < b.Translations.length ; ++e ) {
        if ( g == c && b.Translations[ e ].Rating < 5 )g = e;
        if ( g != c && b.Translations[ e ].Rating > -5 )j = e
      }
      if ( g >= 0 && j > g ) {
        for ( var e = g ; e < j ; ++e ) {
          for ( var i = e + 1 ; i <= j ; ++i ) {
            if ( b.Translations[ e ].Count < b.Translations[ i ].Count ) {
              var u = b.Translations[ e ];
              b.Translations[ e ] = b.Translations[ i ];
              b.Translations[ i ] = u
            }
          }
        }
      }
      J = [];
      while ( b.Translations.length > 0 ) {
        var o = b.Translations.shift();
        try {J.push( new qc( o , mb , r , k , s , p ) )}
        catch ( q ) {
          if ( a.debug );
          continue
        }
        if ( k )k = d
      }
      if ( b.Hover && J.length && J[ 0 ].hover )J[ 0 ].hover();
      L = 0;
      Xb();
      if ( document._mstTooltip && (document._mstTooltip.style.display == h || A.style.display == h) )nb();
      return J.slice( 0 )
    }

    function pc( a , b ) {
      Vb.textContent = Vb.innerText = b;
      lb.style.width = a.offsetWidth - 20 + w;
      lb.style.height = a.offsetHeight + w;
      lb.style.left = a.offsetLeft + w;
      lb.style.top = a.offsetTop + w;
      lb.style.display = n
    }

    function Lb() {lb.style.display = h}

    function oc() {
      if ( a.debug );
      hc()
    }

    function hc() {
      k = d;
      B.setLock( d );
      Ob.onclick = ic;
      A.style.display = t;
      Fb.style.display = h;
      mb.style.display = h;
      Lb();
      return d
    }

    function Xb( b ) {
      if ( k )return d;
      if ( !b )L = 0; else L += b;
      if ( L < 0 )L = 0; else if ( L >= J.length )L -= 3;
      B.setLock( y );
      for ( var a = 0 ; a < J.length ; ++a )if ( a >= L && a < L + 3 )J[ a ].panel.style.display = t; else J[ a ].panel.style.display = h;
      var e = L , c = Math.max( J.length - (L + 3) , 0 );
      Rb.innerHTML = "(" + e.toString() + ")";
      Qb.innerHTML = "(" + c.toString() + ")";
      if ( e > 0 ) {
        Hb.style.color = "#59F";
        Rb.style.display = n
      } else {
        Hb.style.color = "#999";
        Rb.style.display = h
      }
      if ( c > 0 ) {
        Gb.style.color = "#59F";
        Qb.style.display = n
      } else {
        Gb.style.color = "#999";
        Qb.style.display = h
      }
      setTimeout( function () {B.setLock( d )} , 500 )
    }

    function qc( e , lb , mb , kb , jb , P ) {
      var ab = "MSTCCancelButton" , Y = "MSTCSubmitButton" , S = "MSTCReportButton" , W = "MSTCSelectButton" , V = "MSTCEditButton" , U = "4px 1px 0px 3px" , T = "4px 3px 0px 1px" , R = "ctfbadge.gif" , M = this , b = M.panel = document.createElement( hb );
      b.className = nc;
      lb.appendChild( b );
      e.OriginalText = Zb._mstNormalize();
      var db = tb._mstDenormalize( e.TranslatedText ) , l = document.createElement( hb );
      l.className = "MSTCTransBox";
      if ( kb )l.style.color = "#006622";
      l.appendChild( document.createTextNode( db.innerText || db.textContent ) );
      b.appendChild( l );
      var s = document.createElement( hb );
      s.className = "MSTCStatsTab";
      b.insertBefore( s , b.firstChild );
      var A = document.createElement( hb );
      A.className = "MSTCVoteCount";
      s.appendChild( A );
      if ( e.Rating > 5 ) {
        var H = document.createElement( rb ) , eb = document.createElement( Eb );
        eb.src = a.imagePath + R;
        H.appendChild( eb );
        A.appendChild( H );
        if ( e.Rating >= 10 )H.style.backgroundColor = "#F2C341"; else if ( e.Rating >= 8 )H.style.backgroundColor = "#B2B2B2"; else if ( e.Rating >= 6 )H.style.backgroundColor = "#8C7853"
      } else if ( e.Rating == 5 ) {
        var fb = document.createElement( rb ) , x = document.createElement( Eb );
        x.src = a.imagePath + "ctfmt.gif";
        x.style.margin = "2px 2px 0px 3px";
        fb.appendChild( x );
        A.appendChild( fb )
      } else if ( e.Count ) {
        var O = document.createElement( rb ) , F = document.createElement( Z );
        F.style.display = ib;
        F.appendChild( document.createTextNode( e.Count ) );
        O.appendChild( F );
        var x = document.createElement( Eb );
        x.src = a.imagePath + "ctfvotes.gif";
        O.appendChild( x );
        A.appendChild( O );
        if ( f.getStyleValue( Ib , gc ) == q ) {
          F.style.margin = T;
          x.style.margin = "7px 1px 0px 3px"
        } else {
          F.style.margin = U;
          x.style.margin = "3px 3px 0px 1px"
        }
      } else {
        s.parentNode.removeChild( s );
      }
      if ( e.Flags ) {
        var J = document.createElement( hb );
        J.className = "MSTCFlagCount";
        J.style.marginTop = "2px";
        s.appendChild( J );
        var L = document.createElement( rb );
        L.style.width = L.style.minWidth = "1px";
        L.style.height = "21px";
        J.appendChild( L );
        var N = document.createElement( rb ) , C = document.createElement( Z );
        C.style.display = ib;
        C.appendChild( document.createTextNode( e.Flags ) );
        N.appendChild( C );
        var K = document.createElement( Eb );
        K.src = a.imagePath + "ctfflags.gif";
        N.appendChild( K );
        J.appendChild( N );
        if ( f.getStyleValue( Ib , gc ) == q ) {
          C.style.margin = T;
          K.style.margin = "7px 1px 0px 2px"
        } else {
          C.style.margin = U;
          K.style.margin = "7px 2px 0px 1px"
        }
      }
      s.style.marginTop = (b.offsetHeight - s.offsetHeight) / 2 + w;
      var c = mc.cloneNode( y );
      c.style.visibility = Cb;
      b.insertBefore( c , b.firstChild );
      if ( mb ) {
        var j = new Q( D( c , V ) ) , i = new Q( D( c , W ) , ac.innerText || ac.textContent , wb.innerText || wb.textContent );
        if ( e.Rating > -5 ) {
          var g = new Q( D( c , S ) , Ab.innerText || Ab.textContent , yb.innerText || yb.textContent );
        } else {
          var g = new Q( D( c , S ) , zb.innerText || zb.textContent , xb.innerText || xb.textContent );
          l.style.color = "#A6A6A6"
        }
        var u = new Q( D( c , Y ) , G , wb.innerText || wb.textContent ) , p = new Q( D( c , ab ) );
        i.setIcon( R );
        u.setIcon( R )
      } else {
        var j = new Q( D( c , V ) ) , i = new Q( D( c , W ) , G , G , e.Count ) , g = new Q( D( c , S ) ) , u = new Q( D( c , Y ) ) , p = new Q( D( c , ab ) );
      }
      var v , m , z;
      if ( !P ) {
        i.hover();
        j.collapse();
        g.collapse()
      } else {
        i.collapse();
        j.collapse();
        g.hover()
      }
      M.hover = b.onmouseover = function () {
        if ( k )return;
        b.className = b.className + " MSTCTransPanelHover";
        s.style.visibility = Cb;
        c.style.marginTop = (b.offsetHeight - c.offsetHeight) / 2 + w;
        c.style.visibility = E
      };
      M.unhover = b.onmouseout = function () {
        if ( k )return;
        b.className = b.className.replace( /\s+/g , " " ).replace( /MSTCTransPanelHover/g , n );
        s.style.visibility = E;
        c.style.visibility = Cb
      };
      c.onmouseover = function () {
        if ( k )return;
        j.expand();
        i.expand();
        g.expand()
      };
      c.onmouseout = function () {
        if ( k )return;
        if ( !P ) {
          i.hover();
          j.collapse();
          g.collapse()
        } else {
          i.collapse();
          j.collapse();
          g.hover()
        }
      };
      j.setCallback( function () {
        if ( k )return d;
        k = y;
        B.setLock( y );
        if ( !m ) {
          v = document.createElement( hb );
          v.style.padding = "14px 4px 14px 4px";
          m = document.createElement( "textarea" );
          m.className = "MSTCTransEdit";
          m.style.width = (b.offsetWidth - 116).toString() + w;
          m.style.height = (b.offsetHeight - 38).toString() + w;
          m.style.padding = bb;
          m.onkeypress = function ( a ) {
            a = a || window.event;
            if ( a.keyCode == 13 ) {
              u.doCallback();
              return d
            } else if ( a.keyCode == 27 ) {
              p.doCallback();
              return d
            }
          };
          v.appendChild( m );
          b.appendChild( v )
        }
        l.style.display = h;
        v.style.display = t;
        j.hide();
        i.hide();
        g.hide();
        u.show();
        p.show();
        c.style.marginTop = (b.offsetHeight - c.offsetHeight) / 2 + w;
        m.value = wc( e.TranslatedText );
        m.focus();
        m.select();
        return d
      } );
      j.setHover( function () {
        i.unhover();
        g.unhover()
      } );
      i.setCallback( function () {
        if ( k )return d;
        j.hide();
        i.hide();
        g.hide();
        u.hide();
        p.show();
        c.style.marginTop = (b.offsetHeight - c.offsetHeight) / 2 + w;
        b.style.backgroundColor = Kb;
        l.style.display = h;
        b.appendChild( I );
        I.style.display = t;
        k = y;
        B.setLock( y );
        z = setTimeout( function () {
          k = d;
          nb();
          b.removeChild( I );
          b.style.backgroundColor = n;
          l.style.display = t;
          b.onmouseout();
          j.show();
          i.show();
          g.show();
          u.hide();
          p.hide();
          var c = gb;
          if ( X && X != cb.toLowerCase() )c = 2;
          var q = dc() , f = pb( e.OriginalText ) , h = pb( e.TranslatedText );
          a.serviceClient.AddTranslation( a.appId , f , h , Db , cb , c , G , a.category ? a.category : G , Jb() , q , function () {} , function () {} , o );
          if ( e.Callback )e.Callback( c );
          try {tb.innerHTML = tb._mstDenormalize( e.TranslatedText ).innerHTML}
          catch ( m ) {}
        } , 1e3 );
        return d
      } );
      i.setHover( function () {
        j.unhover();
        g.unhover()
      } );
      g.setCallback( function () {
        if ( k )return d;
        j.hide();
        i.hide();
        g.hide();
        u.hide();
        p.show();
        c.style.marginTop = (b.offsetHeight - c.offsetHeight) / 2 + w;
        b.style.backgroundColor = Kb;
        l.style.display = h;
        b.appendChild( I );
        I.style.display = t;
        k = y;
        B.setLock( y );
        z = setTimeout( function () {
          k = d;
          B.setLock( d );
          b.removeChild( I );
          l.style.display = t;
          I.style.display = h;
          s.style.display = h;
          p.hide();
          var m = Jb();
          if ( gb >= 5 && (!X || X == cb.toLowerCase()) )m = "authuser";
          var f = gb;
          if ( X && X != cb.toLowerCase() )f = 2; else if ( e.Rating < -5 )f = 0;
          var u = dc() , q = pb( e.OriginalText ) , r = pb( e.TranslatedText );
          a.serviceClient.AddTranslation( a.appId , q , r , Db , cb , -f , G , a.category ? a.category : G , m , u , function () {} , function () {} , o );
          if ( e.Callback )e.Callback( f );
          if ( f > 5 || f == 0 ) {
            e.Rating = -f;
            j.show();
            i.show();
            g.show();
            c.style.marginTop = (b.offsetHeight - c.offsetHeight) / 2 + w;
            if ( f == 0 ) {
              g.setLabel( Ab.innerText || Ab.textContent , yb.innerText || yb.textContent );
              l.style.color = n
            } else {
              g.setLabel( zb.innerText || zb.textContent , xb.innerText || xb.textContent );
              l.style.color = "#A6A6A6"
            }
            b.style.backgroundColor = n
          }
        } , 1e3 );
        return d
      } );
      g.setHover( function () {
        j.unhover();
        i.unhover()
      } );
      u.setCallback( function () {
        if ( !m.value )return;
        if ( !m.value.replace( /\s/g , n ) )return;
        l.style.display = t;
        v.style.display = h;
        j.hide();
        i.hide();
        g.hide();
        u.hide();
        p.show();
        c.style.marginTop = (b.offsetHeight - c.offsetHeight) / 2 + w;
        b.style.backgroundColor = Kb;
        l.style.display = h;
        b.appendChild( I );
        I.style.display = t;
        k = y;
        B.setLock( y );
        z = setTimeout( function () {
          var c = gb;
          if ( X && X != cb.toLowerCase() )c = 2;
          var r = dc() , f = pb( e.OriginalText ) , q = pb( m.value );
          a.serviceClient.AddTranslation( a.appId , f , q , Db , cb , c , G , a.category ? a.category : G , Jb() , r , function () {
            k = d;
            nb();
            b.removeChild( I );
            b.style.backgroundColor = n;
            l.style.display = t;
            b.onmouseout();
            j.show();
            i.show();
            g.show();
            u.hide();
            p.hide();
            if ( e.Callback )e.Callback( c );
            try {tb.innerHTML = tb._mstDenormalize( pb( m.value ) ).innerHTML}
            catch ( a ) {alert( "The translation could not be displayed.  Please try again later." )}
          } , function ( a ) {
            p.hide();
            if ( a.indexOf( "InvalidRequest_MismatchedTags" ) >= 0 ) {
              pc( b , "The translation could not be added. Please check that the tags are preserved and try again." );
              b.style.backgroundColor = n;
              l.style.display = n;
              I.style.display = h;
              k = d;
              j.doCallback()
            } else {
              alert( "The translation could not be added.  Please try again later." );
              nb()
            }
          } , o )
        } , 1e3 );
        return d
      } );
      p.setCallback( function () {
        if ( z ) {
          clearTimeout( z );
          z = G
        }
        b.style.backgroundColor = n;
        l.style.display = t;
        if ( v )v.style.display = h;
        I.style.display = h;
        j.show();
        i.show();
        g.show();
        u.hide();
        p.hide();
        try {b.removeChild( I )}
        catch ( a ) {}
        c.style.marginTop = (b.offsetHeight - c.offsetHeight) / 2 + w;
        setTimeout( function () {
          k = d;
          B.setLock( d );
          if ( jb )nb()
        } , r );
        return d
      } );
      if ( !P ) {
        b.title = i.tooltip;
        b.onclick = function () {
          i.doCallback();
          return d
        }
      } else {
        b.title = g.tooltip;
        b.onclick = function () {
          g.doCallback();
          return d
        }
      }
      if ( jb ) {
        b.onmouseover();
        j.doCallback()
      }
      return M
    }

    function Q( B , A , w , l ) {
      var e = this , a = B , o = D( a , "MSTCButtonIcon" ) , j = D( a , "MSTCVoteCountSelect" ) , i = D( a , "MSTCButtonImg" ) , b = D( a , "MSTCButtonLabel" ) , x = f.getStyleValue( b , "color" ) , p = f.getStyleValue( b , "backgroundColor" ) , k = i.src.match( /^(.*)(\.[^\.]*)$/ )[ 1 ] , u = f.getStyleValue( Ib , gc ) == q ? "borderRightColor" : "borderLeftColor" , r , v , s , g = d;
      if ( A ) {
        b.innerHTML = n;
        b.appendChild( document.createTextNode( A ) )
      }
      if ( w )a.title = w;
      if ( l ) {
        if ( l.toString().length <= 2 ) {
          j.appendChild( document.createTextNode( l ) );
        } else {
          j.title = l;
          j.appendChild( document.createTextNode( l.toString().substr( 0 , 1 ) + "x" ) )
        }
      }
      e.tooltip = a.title;
      b.style[ u ] = fc;
      var m = document.createElement( rb );
      m.style.display = ib;
      m.style.width = "1px";
      m.style.height = "21px";
      m.style.backgroundColor = p;
      a.insertBefore( m , a.firstChild );
      e.setIcon = function ( a ) {
        k = i.src.match( /^(.*\/)([^\/]*)$/ )[ 1 ] + a.match( /^(.*)(\.[^\.]*)$/ )[ 1 ];
        i.src = k + ".gif"
      };
      e.setCallback = function ( b ) {r = a.onclick = b};
      e.doCallback = function () {
        if ( r && !g ) {
          g = y;
          r();
          g = d
        }
      };
      e.hover = a.onmouseover = function () {
        o.style.color = b.style.color = p;
        o.style.backgroundColor = b.style.backgroundColor = x;
        b.style[ u ] = n;
        i.src = k + "_h.gif";
        if ( k.indexOf( S ) > c ) {
          i.style.marginLeft = "-3px";
          i.style.marginTop = "2px"
        }
        if ( j )j.style.display = ib;
        if ( v && !g ) {
          g = y;
          v();
          g = d
        }
      };
      e.unhover = a.onmouseout = function () {
        o.style.color = b.style.color = x;
        o.style.backgroundColor = b.style.backgroundColor = p;
        b.style[ u ] = fc;
        i.src = k + ".gif";
        if ( k.indexOf( S ) > c ) {
          i.style.marginLeft = z;
          i.style.marginTop = z
        }
        if ( j )j.style.display = h;
        if ( s && !g ) {
          g = y;
          s();
          g = d
        }
      };
      e.setHover = function ( a ) {v = a};
      e.setUnhover = function ( a ) {s = a};
      e.show = function () {a.style.display = t};
      e.hide = function () {a.style.display = h};
      e.expand = function () {b.style.display = n};
      e.collapse = function () {b.style.display = h};
      e.setLabel = function ( d , c ) {
        if ( d ) {
          b.innerHTML = n;
          b.appendChild( document.createTextNode( d ) )
        }
        if ( c )a.title = c;
        this.tooltip = a.title
      }
    }

    var nb = qb.hideTooltip = function () {
      k = d;
      A.style.display = h;
      if ( B )B.hide();
      if ( p && p.parentNode == document.body ) {
        try {document.body.removeChild( p )}
        catch ( a ) {}
      }
    };

    function D( b , g , e ) {
      if ( !e )e = 0;
      if ( e > 40 )return G;
      var d;
      for ( var a = 0 ; a < b.childNodes.length ; ++a ) {
        var f = b.childNodes[ a ];
        if ( f.className && f.className.indexOf( g ) > c )d = b.childNodes[ a ]; else if ( b.childNodes[ a ].nodeType == 1 && b.childNodes[ a ].childNodes )d = D( b.childNodes[ a ] , g , e + 1 );
        if ( d )break
      }
      return d
    }

    var lc = qb.showDashboard = function () {
      var i = db;
      nb();
      if ( B )B.setLock( y );
      if ( !Yb )return;
      p = document.createElement( hb );
      p.style.position = i;
      p.style.zIndex = eb;
      p.style.width = "97%";
      p.style.margin = "44px 8px";
      p.style.borderRight = p.style.borderBottom = "solid 1px black";
      p.style.backgroundColor = fc;
      var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || l;
      if ( h < l )h = l;
      h -= 60;
      var g = document.createElement( R );
      g.style.width = "100%";
      g.style.height = h.toString() + w;
      g.src = 'javascript:document.write("Loading...")';
      p.appendChild( g );
      var b = document.createElement( "a" );
      try {f.applyProtectiveCss( b )}
      catch ( j ) {if ( a.debug );}
      b.style.display = ib;
      b.style.position = i;
      b.style.styleFloat = U;
      b.style.top = "4px";
      b.style.cursor = T;
      b.title = "Close dashboard";
      var e = document.createElement( rb );
      e.style.display = ib;
      e.style.width = "28px";
      e.style.height = "28px";
      e.style.marginRight = "16px";
      b.appendChild( e );
      var c = document.createElement( Eb );
      try {f.applyProtectiveCss( c )}
      catch ( j ) {if ( a.debug );}
      c.src = a.imagePath + "ctfdashboardclose.gif";
      c.style.display = ib;
      c.style.marginTop = H;
      c.style.marginLeft = H;
      c.style.border = z;
      e.appendChild( c );
      b.onclick = function () {
        if ( B )B.setLock( d );
        document.body.removeChild( p )
      };
      p.appendChild( b );
      p.style.height = h.toString() + w;
      p.style.overflow = Cb;
      p.style.textAlign = F;
      window.scrollTo( 0 , 0 );
      document.body.insertBefore( p , document.body.firstChild );
      setTimeout( function () {
        b.style.right = "4px";
        if ( !f.isInternetExplorer() )b.style.left = (p.offsetWidth - b.offsetWidth).toString() + w;
        var c = encodeURIComponent( location.href );
        if ( c.lenght > Pb )c = c.substr( 0 , Pb );
        var d = Yb + "?" + Sb() + "&url=" + c + "&from=" + encodeURIComponent( a.from ) + "&to=" + encodeURIComponent( a.to ) + "&category=" + encodeURIComponent( a.category ) + "&usr=" + encodeURIComponent( Jb() );
        g.src = d
      } , 0 );
      return d
    };

    function Sb() {
      var a = n;
      if ( !Mb )a += "siteData=" + ub; else a += "trnsaccesstoken=" + ub;
      if ( sb )a += jb + sb;
      return a
    }

    function wc( a ) {return a.replace( /<([a-zA-Z]*)(\d*)>/g , function ( b , c , a ) {return "<tag" + a + m} ).replace( /<\/([a-zA-Z]*)(\d*)>/g , function ( b , c , a ) {return "</tag" + a + m} )}

    function pb( a ) {return a.replace( /<([a-zA-Z]*)(\d*)>/g , function ( b , c , a ) {return "<b" + a + m} ).replace( /<\/([a-zA-Z]*)(\d*)>/g , function ( b , c , a ) {return "</b" + a + m} )}

    function dc() {
      var c = document.location.href;
      if ( document.location.href.indexOf( a.rootURL ) == 0 ) {
        var b = document.location.href.match( /url=([^&]+)/ );
        if ( b )c = decodeURIComponent( b[ 1 ] )
      }
      return c
    }

    var fb = 0;

    function rc( a , b , c ) {
      if ( !a.transItems || !a.transItems.length )return;
      fb = 0;
      Ub( a , b , c )
    }

    function Ub( b , g , h ) {
      if ( fb >= b.transItems.length )return;
      var c = [] , e = 0;
      for ( var d = fb ; d < b.transItems.length && e < Pb && d - fb < 10 ; ++d ) {
        var i = b.transItems[ d ].src._mstNormalize();
        e += f.getStringByteCount( i );
        c.push( i )
      }
      if ( e >= Pb )c.pop();
      a.serviceClient.GetTranslationsArray( a.appId , c , g , h , 3 , a.category ? { Category : a.category } : G , function ( d ) {
        for ( var a = 0 ; a < d.length ; ++a )if ( d[ a ].Translations.length > 1 )if ( d[ a ].Translations[ 0 ].Rating > 5 )b.transItems[ fb + a ].tgt.style.backgroundColor = Kb; else if ( d[ a ].Translations[ 1 ].Count < 0 )b.transItems[ fb + a ].tgt.style.backgroundColor = "#E5917F"; else b.transItems[ fb + a ].tgt.style.backgroundColor = "#B9E4FC";
        fb += c.length;
        Ub( b , g , h )
      } , function () {
        fb += c.length > 1 ? c.length : 1;
        Ub( b , g , h )
      } , o )
    }

    var Cc = qb.forceLoad = function () {if ( Bb )Bb()};

    function Jb() {
      var a = cc.innerText || cc.textContent;
      if ( !a ) {
        var b = document.cookie.match( /mstcid=([^;]+)/i );
        if ( b ) {
          a = b[ 1 ];
        } else {
          a = Math.floor( Math.random() * 1e9 ).toString( e );
          document.cookie = "mstcid=" + a + "; expires=Sun, 01-Jan-2040 01:01:01 GMT; path=" + ((location.host.indexOf( "bing" ) > c && location.pathname.indexOf( "/translator" )) > c ? location.pathname : u)
        }
      }
      return a
    }

    new function () {
      var b , c;
      b = vb.match( /siteData=([^&]*)/i );
      if ( b ) {
        ub = b[ 1 ];
        Mb = d
      } else {
        b = vb.match( /trnsaccesstoken=([^&]*)/i );
        if ( b ) {
          ub = b[ 1 ];
          Mb = y
        }
      }
      b = vb.match( /onerror=([^&]+)/i );
      if ( b )sb = b[ 1 ];
      ec = a.locale;
      b = vb.match( /loc=([^&]+)/ );
      if ( b )ec = b[ 1 ];
      b = vb.match( /ctfLanguages=([^&]*)/ );
      if ( b )c = b[ 1 ];
      b = vb.match( /showDashboard=([^&]*)/ );
      if ( b && (b[ 1 ].toLowerCase() == Y || b[ 1 ].toLowerCase() == O) )jc = d;
      if ( c ) {
        kc = {};
        var g = c.split( "," );
        for ( var e = 0 ; e < g.length ; ++e )kc[ g[ e ].toLowerCase() ] = 1
      }
      if ( ub ) {
        Bb = function () {
          var b = "MicrosoftTranslatorCommunity";
          if ( !Bb )return;
          Bb = G;
          A = document.getElementById( b );
          if ( A )A.parentNode.removeChild( A );
          A = document.createElement( hb );
          A.id = b;
          A.style.display = h;
          document.body.insertBefore( A , document.body.firstChild );
          var c = n;
          if ( f.isInternetExplorer() && f.isQuirksMode( document ) )c = "&inrt=1";
          vc = ob( "/ajax/v3/community.aspx?fmt=js&loc=" + ec + c + v + Sb() , a.rootURL )
        };
      }
      if ( a.tokRef ) {
        window._mstRefTok = function ( b ) {a.appId = b};
        setInterval( function () {
          if ( _eTokenScript )_eTokenScript.parentNode.removeChild( _eTokenScript );
          _eTokenScript = ob( "/ajax/v3/community.aspx?reftok=1&" + Sb() , a.rootURL )
        } , a.tokRef * 1e3 )
      }
      function i( a ) {
        var b = W;
        if ( typeof a.data == V && a.data.indexOf( b ) == 0 ) {
          var c = a.data.substring( b.length );
          if ( window[ sb ] && typeof window[ sb ] == M )window[ sb ]( c )
        }
      }

      if ( window.addEventListener )addEventListener( "message" , i , d ); else attachEvent( "onmessage" , i )
    };
    a.serviceClient.Community = qb
  }( a.baseURL ) , I;
  (function ( k ) {
    var cb = "dragging" , bb = "__mstto=" , u = "value" , A = "{0}" , W = "style" , e = "LanguageMenu" , t = K , n = N , Z = B , m = j , d = i , y = g , w = {} , O , l , q = y , x = y , D = d , G , f , J , T , S , R , p , U , V , kb = d , ib = m , C = d , F = m , hb = d , jb = d , P;

    function rb( u , j , e ) {
      var h = "_bwmid" , p = "Microsoft.Translator.OnMouseOverFloater()" , o = "onmouseover" , c = "SignOutSpan" , g = "SignInSpan" , l = L;
      if ( typeof j === l )j = "true";
      if ( typeof e === l )e = b;
      G = Util.GetElement( "WidgetFloater" );
      f = Util.GetElement( qb );
      J = Util.GetElement( "WidgetFloaterCollapsed" );
      T = Util.GetElement( "FloaterSharePanel" );
      S = Util.GetElement( "FloaterEmbed" );
      R = Util.GetElement( "FloaterProgressBar" );
      P = e == b;
      q = e;
      var i = document.createElement( "link" );
      i.setAttribute( "href" , window[ Z ].floaterStylePath );
      i.setAttribute( "rel" , "stylesheet" );
      var r = document.getElementsByTagName( Q )[ 0 ];
      r.insertBefore( i , r.firstChild );
      if ( Util.GetElement( "CTFAuthPanel" ) ) {
        Util.GetElement( g ).style.display = n;
        Util.GetElement( c ).style.display = n;
        if ( Microsoft.Translator.Widget.Links.SignIn ) {
          Util.GetElement( g ).innerHTML = Microsoft.Translator.Widget.Links.SignIn;
          Util.GetElement( g ).style.display = X
        } else if ( Microsoft.Translator.Widget.Links.SignOut ) {
          Util.GetElement( c ).style.display = ab;
          Util.GetElement( "UsernameLink" ).innerHTML = Microsoft.Translator.Widget.UserName;
          Util.GetElement( c ).innerHTML += '<span style="border-left: 1px solid #222;"> </span>' + Microsoft.Translator.Widget.Links.SignOut;
          var v = Util.GetElement( c ).children[ Util.GetElement( c ).children.length - 1 ];
          v.setAttribute( "title" , window._mstConfig[ "SignOutTitle" ] )
        }
      }
      f.onmousedown = pb;
      G.setAttribute( o , p );
      G.setAttribute( "onmouseout" , "Microsoft.Translator.OnMouseOutFloater()" );
      J.setAttribute( o , p );
      O = u;
      Microsoft.Translator.Widget.GetLanguagesForTranslate( u , eb , db );
      var s = f.getElementsByTagName( "input" );
      for ( var k = 0 ; k < s.length ; k++ ) {
        var t = s[ k ];
        if ( t.getAttribute( "type" ).toLowerCase() == "text" )t.setAttribute( "onclick" , "this.select()" )
      }
      if ( j.toLowerCase() == Y )ib = d;
      hb = m;
      if ( window[ h ] )window[ h ] += ",translator"; else window[ h ] = "translator";
      ob( "widget/metrics.js" , (document.location.protocol == "https:" ? "https://ssl" : "http://www") + ".bing.com/" );
      if ( !kb && ib ) {
        a.serviceClient.Community.forceLoad();
        kb = m
      }
    }

    k.Initialize = rb;
    function gb() {f.style.display = t}

    function I( d ) {
      if ( !hb ) {
        setTimeout( function () {I( d )} , 50 );
        return
      }
      var c;
      if ( !jb ) {
        if ( c = document.getElementById( "WidgetLauncher" ) ) {
          var a = c.getBoundingClientRect();
          if ( window[ "Util" ].IsElementInViewport( c ) ) {
            if ( a.left == 0 && a.top == 0 ) {
              setTimeout( function () {
                a = c.getBoundingClientRect();
                H( a.left , a.top )
              } , 200 );
            } else {
              H( a.left , a.top );
            }
          } else {
            H( 50 , 50 )
          }
        } else if ( !c )H( 50 , 50 );
      }
      jb = m;
      z();
      gb();
      G.style.display = t;
      l = d;
      var f = setInterval( function () {
        if ( window[ e ] ) {
          window[ e ].onChanged = nb;
          try {
            try {window[ e ].setValue( l )}
            catch ( a ) {console.error( a )}
            p = Util.GetElement( "OriginalLanguageSpan" );
            if ( q == b ) {
              p.parentNode[ W ].display = n;
            } else {
              p.parentNode[ W ].display = t;
              if ( P )p.innerHTML = window[ Z ].autoDetected.replace( A , w[ q ] ); else p.innerHTML = w[ q ]
            }
          }
          catch ( a ) {console.warn( a )}
          clearInterval( f )
        }
      } , 1 );
      F = m;
      if ( x )clearTimeout( x );
      if ( !C ) {
        D = m;
        M()
      }
    }

    k.Show = I;
    function Eb() {f.style.display = n}

    function z() {
      G.style.display = n;
      T.style.display = n;
      J.style.display = n;
      S.style.display = n;
      F = d;
      clearTimeout( x )
    }

    function H( a , b ) {
      f.style.top = b + s;
      f.style.left = a + s
    }

    function xb() {
      fb();
      D = m;
      M()
    }

    k.TranslationComplete = xb;
    function yb( g ) {
      if ( g >= 0 && g < r ) {
        D = d;
        clearTimeout( x );
        fb();
        lb()
      }
      var f = y;
      try {f = Microsoft.Translator.Widget.GetAutoDetectedLanguage()}
      catch ( l ) {}
      if ( f && window[ e ] && window[ e ].getValue ) {
        q = f;
        p.parentNode[ W ].display = t;
        if ( P )p.innerHTML = window[ Z ].autoDetected.replace( A , w[ q ] ); else p.innerHTML = w[ q ];
        var k = w[ f ] , h = w[ window[ e ].getValue() ] , i = location.href.substr( 0 , location.href.length - (location.hash || b).length ) , j = document.location.search.length == 0 ? "?" : v , a = Util.GetElement( "EmailSubject" ).getAttribute( u );
        a = a.replace( A , h );
        a = a.replace( "{1}" , k );
        var c = Util.GetElement( "EmailBody" ).getAttribute( u );
        c = c.replace( A , encodeURIComponent( i + j + bb + window[ e ].getValue() ) );
        c = c.replace( "{1}" , encodeURIComponent( i ) );
        Util.GetElement( "EmailLink" ).setAttribute( "href" , "mailto:?charset=utf-8&subject=" + a + "&body=" + c );
        Util.GetElement( "ShareHelpLink" ).setAttribute( "title" , Util.GetElement( "ShareHelpText" ).getAttribute( u ).replace( A , h ) );
        window[ "Util" ].SetCookie( "mstto" , window[ e ].getValue() , d )
      }
    }

    k.TranslationProgress = yb;
    function Db( a ) {console.log( a )}

    k.TranslationError = Db;
    function ub() {
      Microsoft.Translator.Widget.RestoreOriginal();
      Eb()
    }

    k.OnClose = ub;
    function Cb() {
      z();
      I( l )
    }

    k.OnShareBackClick = Cb;
    function Bb() {
      z();
      I( l )
    }

    k.OnEmbedBackClick = Bb;
    function zb() {
      clearTimeout( x );
      C = m;
      I( l )
    }

    k.OnMouseOverFloater = zb;
    function Ab() {
      C = d;
      if ( F )M()
    }

    k.OnMouseOutFloater = Ab;
    function M() {if ( D && !C && F )x = setTimeout( function () {wb()} , o )}

    function mb() {
      var d = "ShareTextbox";
      z();
      gb();
      var a = location.href.substr( 0 , location.href.length - (location.hash || b).length );
      if ( location.search.length == 0 )Util.GetElement( d ).setAttribute( u , a + "?__mstto=" + l ); else if ( location.search.indexOf( "__mstto" ) != c ) {if ( a.match( /__mstto=(.+)([&]+)/i ) )Util.GetElement( d ).setAttribute( u , a.replace( /__mstto=(.+)([&&]+)/i , bb + l + v ) ); else if ( a.match( /__mstto=(.+)/i ) )Util.GetElement( d ).setAttribute( u , a.replace( /__mstto=(.+)/i , bb + l ) )} else Util.GetElement( d ).setAttribute( u , a + "&amp;__mstto=" + l );
      T.style.display = t
    }

    k.ShowSharePanel = mb;
    function tb() {
      z();
      S.style.display = t
    }

    k.ShowEmbed = tb;
    function wb() {
      if ( D && !C && F ) {
        z();
        J.style.display = t
      }
    }

    function eb( b ) {for ( var a = 0 ; a < b.length ; a++ )w[ b[ a ].Code ] = b[ a ].Name}

    function db() {
      if ( O != h ) {
        O = h;
        Microsoft.Translator.Widget.GetLanguagesForTranslate( h , eb , db )
      }
    }

    function fb() {R.style.visibility = "hidden"}

    function lb() {R.style.visibility = E}

    function nb() {
      if ( l.toLowerCase() != window[ e ].getValue().toLowerCase() ) {
        clearTimeout( x );
        Microsoft.Translator.Widget.Translate( q , window[ e ].getValue() );
        l = window[ e ].getValue();
        window[ e ].elemHeader.focus()
      }
    }

    function pb( a ) {
      a = a || event;
      U = a.clientX;
      V = a.clientY;
      document.onmousemove = vb;
      document.onmouseup = sb;
      document.body.focus();
      document.onselectstart = function () {return d};
      f.ondragstart = function () {return d};
      Util.addClass( f , cb );
      return d
    }

    function vb( a ) {
      a = a || event;
      var b = Util.getPosition( f ) , c = a.clientX - U , e = a.clientY - V;
      H( parseInt( b.left ) + c , parseInt( b.top ) + e );
      U = a.clientX;
      V = a.clientY;
      return d
    }

    function sb( a ) {
      a = a || event;
      document.onmousemove = y;
      document.onselectstart = y;
      f.ondragstart = y;
      Util.removeClass( f , cb );
      return d
    }
  })( I || (I = {}) );
  n.FloaterInitialize = function ( b , a , c ) {I.Initialize( b , a , c )};
  n.FloaterShowSharePanel = function () {I.ShowSharePanel()};
  n.FloaterShowEmbed = function () {I.ShowEmbed()};
  n.FloaterOnClose = function () {
    I.OnClose();
    return i
  };
  n.FloaterOnShareBackClick = function () {I.OnShareBackClick()};
  n.FloaterOnEmbedBackClick = function () {I.OnEmbedBackClick()};
  n.OnMouseOverFloater = function () {
    I.OnMouseOverFloater();
    return i
  };
  n.OnMouseOutFloater = function () {
    I.OnMouseOutFloater();
    return i
  };
  var vb = document.getElementById( qb );
  if ( vb != g )vb.parentNode.removeChild( vb )
};
function CUtil() {
  var d = "character" , b = null , c = -1 , a = this , e = navigator.userAgent.toLowerCase();
  a.MSIE = e.indexOf( "msie" ) != c && e.indexOf( "opera" ) == c;
  a.MSIE6 = a.MSIE && e.indexOf( "msie 6." ) != c;
  a.MSIE7 = a.MSIE && e.indexOf( "msie 7." ) != c;
  a.FIREFOX = e.indexOf( "firefox" ) != c;
  a.SAFARI = e.indexOf( "applewebkit" ) != c;
  a.GetPath = function () {
    var a = "/";
    if ( location.pathname ) {
      a = location.pathname.match( /\/\w*/i );
      if ( a )a = a[ 0 ]
    }
    return a
  };
  a.AddFavorites = function () {
    var a = document.title , b = window.location.href;
    if ( this.FIREFOX )window.sidebar.addPanel( a , b , "" ); else window.external.AddFavorite( b , a )
  };
  a.SetCookie = function ( c , b , d , a ) {
    if ( !a )a = "/";
    document.cookie = c + "=" + b + (d ? "; expires=Sun, 01-Jan-2040 01:01:01 GMT" : "") + "; path=" + a
  };
  a.DeleteCookie = function ( b , a ) {
    if ( !a )a = "/";
    document.cookie = b + "=;Thu, 01 Jan 1970 00:00:01 GMT; path=" + a
  };
  a.GetCookie = function ( d ) {
    var c = "document.cookie.match(/" , a = eval( c + d + "s*=([^;]*)(;|$)/);" );
    if ( a != b ) {
      return a[ 1 ];
    } else {
      a = eval( c + d + "s*([^;]*)(;|$)/);" );
      if ( a != b )return a[ 1 ]; else return b
    }
  };
  a.AddEvent = function ( a , b , c ) {if ( a.addEventListener )a.addEventListener( b , c , false ); else if ( a.attachEvent )a.attachEvent( "on" + b , c )};
  a.AbsXPos = function ( a ) {return a.offsetLeft + (a.offsetParent != b ? this.AbsXPos( a.offsetParent ) : 0)};
  a.AbsYPos = function ( a ) {return a.offsetTop + (a.offsetParent != b ? this.AbsYPos( a.offsetParent ) : 0)};
  a.SetDDLByVal = function ( c , b ) {
    for ( var a = 0 ; a < b.options.length ; a++ ) {
      if ( b.options[ a ].value == c ) {
        b.options[ a ].selected = true;
        return
      }
    }
  };
  a.GetElement = function ( a ) {
    if ( arguments.length <= 0 )return b;
    if ( document.getElementById )return document.getElementById( a ); else if ( document.all )return document.all( a ); else if ( document.layers )return window.document.layers[ a ]; else return b
  };
  a.GetStyleObject = function ( a ) {if ( document.getElementById && document.getElementById( a ) )return document.getElementById( a ).style; else if ( document.all && document.all( a ) )return document.all( a ).style; else if ( document.layers && document.layers[ a ] )return document.layers[ a ]; else return false};
  a.GetStyleValue = function ( e , c ) {
    var a = document.getElementById( e ) || document.body , d;
    if ( a.currentStyle )d = a.currentStyle[ c ] || a.currentStyle.getAttribute( c.replace( "-" ) ); else if ( window.getComputedStyle )d = document.defaultView.getComputedStyle( a , b ).getPropertyValue( c );
    return d
  };
  a.GetScrollBounds = function ( a ) {
    if ( a == b )return { x : 0 , y : 0 , width : 0 , height : 0 };
    var e , f , d , c;
    if ( a.documentElement != b && a.documentElement.scrollTop != b && a.documentElement.scrollTop >= a.body.scrollTop ) {
      e = a.documentElement.scrollLeft;
      f = a.documentElement.scrollTop;
      d = a.documentElement.scrollWidth;
      c = a.documentElement.scrollHeight
    } else {
      e = a.body.scrollLeft;
      f = a.body.scrollTop;
      d = a.body.scrollWidth;
      c = a.body.scrollHeight
    }
    return { x : e , y : f , width : d , height : c }
  };
  a.getLanguageDirStyle = function ( b ) {
    var a;
    if ( Microsoft.Translator.languageDirs[ b ] == "rtl" ) {
      a = {
        direction : "rtl" ,
        textAlign : "right"
      };
    } else {
      a = { direction : "ltr" , textAlign : "left" };
    }
    return a
  };
  a.setScrollValue = function ( a , b , e , f , c ) {
    var d = a.ownerDocument.defaultView ? a.ownerDocument.defaultView : a.ownerDocument.parentWindow;
    if ( d.scrollBy ) {
      d.scrollBy( e , f );
    } else {
      a[ "scroll" + c ] = b;
      a.ownerDocument.body[ "scroll" + c ] = b
    }
  };
  a.GetUrlParameter = function ( e , a ) {
    a = a.replace( /[\[]/ , "\\[" ).replace( /[\]]/ , "\\]" );
    var d = "[\\?&]" + a + "=([^&#]*)" , f = new RegExp( d , "i" ) , c = f.exec( e );
    if ( c == b )return b; else return c[ 1 ]
  };
  a.GetDocumentUrl = function ( d ) {
    var e = "/bv.aspx" , b = "a=" , a = "";
    if ( d.location.hash.length > 1 )a = d.location.hash.substring( 1 ); else if ( d.location.search.indexOf( b ) > 0 )a = decodeURIComponent( d.location.search.substring( d.location.search.indexOf( b ) + 2 ) );
    while ( a && a.toLowerCase().indexOf( e ) >= 0 && a.toLowerCase().indexOf( b ) >= 0 )a = decodeURIComponent( a.substring( a.toLowerCase().indexOf( b ) + 2 ) );
    if ( a.length > 0 ) {
      a = a.replace( /^\s*/ , "" ).replace( /\s*$/ , "" );
      if ( a.indexOf( "?" ) == c )a = a.replace( "&" , "?" )
    }
    if ( a && a.indexOf( "://" ) == c )a = "http://" + a;
    if ( a && a.toLowerCase().indexOf( e ) >= 0 )a = "";
    return a
  };
  a.SendPostRequest = function ( f , c , e ) {
    var a = document.createElement( "form" );
    a.action = f;
    a.method = "post";
    a.target = e;
    for ( var d in c ) {
      if ( c.hasOwnProperty( d ) ) {
        var b = document.createElement( "input" );
        b.name = d;
        b.value = c[ d ];
        b.type = "hidden";
        a.appendChild( b )
      }
    }
    document.body.appendChild( a );
    a.submit();
    document.body.removeChild( a )
  };
  a.Log = function ( b , a ) {Microsoft.Translator.LoadScript( "/sync.ashx?svc=" + b + "&" + a.join( "&" ) )};
  a.GetCaretPosition = function ( a ) {
    var f = 0;
    if ( a.selectionStart || a.selectionStart == "0" ) {
      f = a.selectionStart;
    } else if ( document.selection ) {
      var h = document.selection.createRange() , i = 0 , j = 0;
      if ( h && h.parentElement() == a ) {
        var e = a.value.length , k = a.value.replace( /\r\n/g , "\n" ) , b = a.createTextRange();
        b.moveToBookmark( h.getBookmark() );
        var g = a.createTextRange();
        g.collapse( false );
        if ( b.compareEndPoints( "StartToEnd" , g ) > c ) {
          i = j = e;
        } else {
          i = -b.moveStart( d , -e );
          if ( b.compareEndPoints( "EndToEnd" , g ) > c )j = e; else j = -b.moveEnd( d , -e )
        }
      }
      f = i
    }
    return f
  };
  a.SetSelectionRange = function ( a , c , e ) {
    if ( a.setSelectionRange ) {
      a.focus();
      a.setSelectionRange( c , e )
    } else if ( a.createTextRange ) {
      var b = a.createTextRange();
      b.collapse( true );
      b.moveEnd( d , e );
      b.moveStart( d , c );
      b.select()
    }
  };
  a.SetCaretToPosition = function ( b , a ) {this.SetSelectionRange( b , a , a )};
  a.addClass = function ( d , c ) {
    var b = d.className.split( " " );
    for ( var a = 0 ; a < b.length ; a++ )if ( c == b[ a ] )return;
    d.className += " " + c
  };
  a.removeClass = function ( c , d ) {
    var b = c.className.split( " " );
    c.className = "";
    for ( var a = 0 ; a < b.length ; a++ ) {
      if ( d != b[ a ] ) {
        c.className += b[ a ];
        if ( a == b.length - 1 )c.className += " "
      }
    }
  };
  a.getPosition = function ( a ) {
    var b = 0 , c = 0;
    while ( a && !isNaN( a.offsetLeft ) && !isNaN( a.offsetTop ) ) {
      b += a.offsetLeft - a.scrollLeft;
      c += a.offsetTop - a.scrollTop;
      a = a.offsetParent
    }
    return { top : c , left : b }
  };
  a.IsElementInViewport = function ( b ) {
    var a = b.getBoundingClientRect();
    return a.top >= 0 && a.left >= 0 && a.bottom <= (window.innerHeight || document.documentElement.clientHeight) && a.right <= (window.innerWidth || document.documentElement.clientWidth)
  };
  return a
}
var Util = new CUtil;
var MtPopUpList = function () {
  var a = this;
  a.onChanged = null;
  a.shiftKeyDown = false;
  a.MRUL = [];
  a.MAX_MRUL = 2
};
MtPopUpList.prototype = {
  keysBuffer : "" ,
  Init : function ( d , c , i , g , h ) {
    var a = this;
    a.Items = [];
    a.Keys = [];
    a.KeyMap = " " + c.join( " " ) + " ";
    a.keysBuffer = "";
    var f = 0;
    for ( var b = 0 ; b < c.length ; b++ ) {
      a.Items[ c[ b ] ] = i[ b ];
      if ( c[ b ] != "-" ) {
        a.Keys[ f ] = c[ b ];
        f++
      }
    }
    a.onChanged = g;
    document.onclick = a.HideCurrentPopup;
    a.elemHeader = Util.GetElement( "__" + d + "_header" );
    a.elemSvID = Util.GetElement( d + "_svid" );
    a.elemTextId = Util.GetElement( d + "_textid" );
    a.elemPopup = document.getElementById( h );
    a.cropText();
    if ( a.elemPopup != null ) {
      a.elemPopup.onkeydown = (new a.doKeyDown( a , a.HideCurrentPopup )).execute;
      a.elemPopup.onkeyup = (new a.doKeyUp( a )).execute;
      a.elemPopup.onkeypress = (new a.doKeyPress( a )).execute
    }
    a.name = d;
    a.mrul_cookie = d + "_lpmru";
    var e = Util.GetCookie( a.mrul_cookie );
    if ( e != null && e != "undefined" )a.MRUL = e.split( "," ); else a.MRUL = []
  } ,
  getLinks : function () {return this.elemPopup.getElementsByTagName( "a" )} ,
  getActiveLink : function () {
    var a = this.getLinks() , c = this.elemSvID.value;
    if ( c != null )for ( var b = 0 ; b < a.length ; b++ )if ( a[ b ].href.match( "#" + c + "$" ) != null )return a[ b ];
    return a[ 0 ]
  } ,
  getByLetter : function ( i , h , e ) {
    var d = this , g = String.fromCharCode( h ).toUpperCase() , f = d.getActiveLink() , a = [] , b;
    for ( b = 0 ; b < e.length ; b++ )a[ b ] = e[ b ];
    a.sort( function ( c , d ) {
      var a = c.innerText || c.textContent , b = d.innerText || d.textContent;
      if ( a < b )return -1;
      if ( a > b )return 1;
      return 0
    } );
    var c = 0;
    for ( ; c < a.length ; c++ ) {
      if ( f == a[ c ] ) {
        c++;
        break
      }
    }
    for ( ; c < a.length ; c++ )if ( d.getFirstChar( a[ c ] ) == g )return d.getHref( a[ c ] );
    for ( b = 0 ; b < a.length ; b++ )if ( d.getFirstChar( a[ b ] ) == g && f != a[ b ] )return d.getHref( a[ b ] );
    return null
  } ,
  getFirstChar : function ( b ) {
    var a = b.innerText || b.textContent;
    if ( a != undefined && a != null && a.length > 0 )return a.substr( 0 , 1 ).toUpperCase(); else return ""
  } ,
  getNextKey : function ( e , d ) {
    var b = this , a = 0;
    for ( var c = 0 ; c < b.Keys.length ; c++ ) {
      if ( b.Keys[ c ] == e ) {
        a = c;
        break
      }
    }
    a = a + d;
    if ( a > b.Keys.length )a = 0; else if ( a < 0 )a = b.Keys.length - 1;
    return b.Keys[ a ]
  } ,
  getNextSibling : function ( g , f ) {
    var e = this.getActiveLink() , c = e.parentNode;
    while ( c.tagName.toLowerCase() != "tr" && c.parentNode != null )c = c.parentNode;
    var b = c.getElementsByTagName( "a" ) , a = 0;
    for ( var d = 0 ; d < b.length ; d++ ) {
      if ( e.href == b[ d ].href ) {
        a = d;
        break
      }
    }
    a = a + f;
    if ( a < 0 )a = 0; else if ( a >= b.length )a = b.length - 1;
    return this.getHref( b[ a ] )
  } ,
  doKeyUp : function ( a ) {
    this.execute = function ( b ) {
      if ( !b )b = window.event;
      if ( b.keyCode == 16 ) {
        a.shiftKeyDown = false;
        if ( b.preventDefault )b.preventDefault(); else b.returnValue = false;
        b.cancelBubble = true;
        return true
      } else {
        return false
      }
    }
  } ,
  doKeyPress : function ( a ) {
    this.execute = function ( b ) {
      if ( !b )b = window.event;
      a.keysBuffer += String.fromCharCode( b.charCode || b.keyCode ).toLowerCase();
      clearTimeout( a.keyTimeOut );
      a.keyTimeOut = setTimeout( function () {a.keysBuffer = ""} , 1e3 )
    }
  } ,
  doKeyDown : function ( a , b ) {
    this.execute = function ( e ) {
      var c = false , d = null;
      if ( !e )e = window.event;
      var g = a.getLinks() , f = a.elemSvID.value , j = c;
      switch ( e.keyCode ) {
        case 16:
          a.shiftKeyDown = true;
          return c;
        case 9:
          if ( a.shiftKeyDown )d = a.getNextKey( f , -1 ); else d = a.getNextKey( f , 1 );
          break;
        case 40:
          d = a.getNextKey( f , 1 );
          break;
        case 38:
          d = a.getNextKey( f , -1 );
          break;
        case 39:
          d = a.getNextSibling( f , 1 );
          break;
        case 37:
          d = a.getNextSibling( f , -1 );
          break;
        case 13:
        case 27:
          b();
          return c;
        default:
          j = true
      }
      if ( !j ) {
        var i = g[ 0 ];
        for ( var h = 0 ; h < g.length ; h++ ) {
          if ( g[ h ].href.indexOf( "#" + d ) != -1 ) {
            i = g[ h ];
            break
          }
        }
        try {
          i.focus();
          i.onclick()
        }
        catch ( k ) {}
        return c
      } else {
        window.evt = e;
        setTimeout( function () {
          if ( !e )e = window.evt;
          var c = a.getLinks() , d;
          for ( var b = 0 ; b < c.length ; b++ ) {
            var f = c[ b ].outerText || c[ b ].text;
            if ( f.toLowerCase().indexOf( a.keysBuffer ) == 0 && f != (a.getActiveLink().outerText || a.getActiveLink().text) ) {
              d = c[ b ];
              break
            }
          }
          try {
            if ( d ) {
              d.focus();
              d.onclick()
            }
          }
          catch ( g ) {}
        } , 30 )
      }
      return true
    }
  } ,
  Hide : function () {this.HideCurrentPopup()} ,
  Show : function ( c , b ) {
    var d = true , a = this;
    if ( b ) {
      if ( b.keyCode == 27 ) {
        a.Hide( c , b );
        return d
      }
      if ( b.keyCode && b.keyCode != 40 )return false;
      if ( window.curDisplayedPopup == c ) {
        a.HideCurrentPopup();
        return d
      }
      a.HideCurrentPopup();
      b.cancelBubble = d;
      if ( a.ChangeObjectDisplay( c , "block" ) ) {
        window.curDisplayedDDHeader = a.elemHeader;
        window.curDisplayedPopup = c;
        a.getActiveLink().focus();
        Util.addClass( a.elemHeader , "DDSActive" );
        return d
      }
    }
    return false
  } ,
  cropText : function () {
    var c = "overflow" , a = this , f = "..." , b = a.elemHeader.innerHTML;
    a.elemHeader.title = b;
    a.elemHeader.innerHTML += "____";
    a.elemHeader.style[ c ] = "hidden";
    var g = a.elemHeader.clientWidth , h = a.elemHeader.scrollWidth , d = g * 1 / h * 1;
    if ( d < 1 ) {
      var e = Math.ceil( d * b.length );
      if ( e < b.length )b = String( b ).substring( 0 , e - f.length ) + f
    }
    a.elemHeader.style[ c ] = "visible";
    a.elemHeader.innerHTML = b
  } ,
  getHref : function ( a ) {return a.href.substr( a.href.indexOf( "#" ) + 1 )} ,
  setValue : function ( b , f ) {
    var a = this;
    if ( b ) {
      var c = (new RegExp( " (" + b + ") " , "i" )).exec( a.KeyMap );
      if ( c && c[ 1 ] )b = c[ 1 ]
    }
    if ( a.Items[ b ] == null )throw new Error( "Value is not in the current list." );
    a.elemSvID.value = b;
    a.elemHeader.value = a.Items[ b ];
    if ( f != "true" )a.addMRUL( b );
    var e = document.getElementById( a.name );
    if ( e.tagName == "SELECT" ) {
      for ( var d = 0 ; d < e.options.length ; d++ ) {
        var g = e.options[ d ];
        if ( g.value == b ) {
          g.selected = "selected";
          break
        }
      }
    }
    a.setText( a.Items[ b ] , f )
  } ,
  getValue : function () {return this.elemSvID.value} ,
  setText : function ( c , d ) {
    var a = this , b = document.getElementById( a.name );
    if ( b.tagName.toLowerCase() == "select" )if ( b.value == "" )b.options[ 0 ].text = c; else if ( b.options[ 0 ].value == "" )b.options[ 0 ].text = a.Items[ "" ];
    a.elemTextId.value = c;
    a.elemHeader.innerHTML = c;
    a.cropText();
    if ( d != "true" )a.onChanged( c , a.Items[ c ] )
  } ,
  getText : function () {return this.elemTextId.value} ,
  onclick : function ( a ) {
    this.setValue( a );
    return false
  } ,
  ondragstart : function ( a ) {
    if ( !a )a = window.event;
    if ( a.preventDefault )a.preventDefault()
  } ,
  OnSelectedValueChanged : function () {return this.onChanged} ,
  HideCurrentPopup : function () {
    if ( window.curDisplayedPopup ) {
      Util.GetElement( window.curDisplayedPopup ).style.display = "none";
      Util.removeClass( window.curDisplayedDDHeader , "DDSActive" );
      window.curDisplayedPopup = false;
      window.curDisplayedDDHeader = null
    }
    this.shiftKeyDown = false
  } ,
  ChangeObjectDisplay : function ( c , b ) {
    var a = Util.GetStyleObject( c );
    if ( a && a.display ) {
      a.display = b;
      return true
    } else {
      return false
    }
  } ,
  addMRUL : function ( d ) {
    var a = this;
    if ( !d )return;
    if ( a.MRUL[ 0 ] == d )return;
    var c = 0 , b;
    for ( b = 1 ; b < a.MRUL.length ; b++ ) {
      if ( a.MRUL[ b ] == d ) {
        c = b;
        break
      }
    }
    if ( c == 0 ) {
      a.MRUL.unshift( d );
    } else {
      var e = c > 0 ? a.MRUL[ c ] : d;
      for ( b = c ; b > 0 ; b-- )a.MRUL[ b ] = a.MRUL[ b - 1 ];
      a.MRUL[ 0 ] = e
    }
    while ( a.MRUL.length > a.MAX_MRUL )a.MRUL.pop();
    Util.SetCookie( a.mrul_cookie , a.MRUL , true , Util.GetPath() )
  }
};
var Launcher;
(function ( e ) {
  var q = "WidgetDisabled" , j = "WidgetEnabled" , p = "#WidgetLauncher" , i = "title" , h = "#LauncherTranslatePhrase" , a = "_mstConfig" , f = false , c = null , r = "MicrosoftTranslatorWidget" , g = c , n = {} , v = f , t , d , k , b , o = f;

  function z( j , l , h , f ) {
    var i = "undefined";
    if ( typeof h === i )h = c;
    if ( typeof f === i )f = c;
    t = j;
    g = l;
    d = h;
    k = f;
    document.getElementById( r ).setAttribute( "translate" , "no" );
    if ( typeof jQuery == "function" ) {
      m();
    } else {
      var b = document.createElement( "script" );
      b.setAttribute( "src" , window[ a ].rootURL + "static/lib/jquery-1.11.2.min.js" );
      b.setAttribute( "type" , "text/javascript" );
      b.onload = m;
      b.onreadystatechange = function () {if ( this.readyState == "complete" || this.readyState == "loaded" )e.onScriptLoad()};
      document.getElementsByTagName( "head" )[ 0 ].appendChild( b )
    }
  }

  e.Show = z;
  function w( b ) {for ( var a = 0 ; a < b.length ; a++ )n[ b[ a ].Code ] = b[ a ].Name}

  function l() {
    var c = true;
    for ( var d in n ) {
      c = f;
      break
    }
    if ( c ) {
      setTimeout( l , 100 );
      return
    }
    b( h ).attr( i , window[ a ].translateTo.replace( "{0}" , n[ g ] ) )
  }

  function x() {
    b( h ).unbind( "click" ).attr( i , "" );
    b( p ).removeClass( j ).addClass( q );
    o = true
  }

  function y() {
    b( h ).click( function () {e.Translate()} );
    b( p ).removeClass( q ).addClass( j );
    l();
    o = f
  }

  function m() {
    var s = "background-color" , h = "id" , q = "<div/>";
    if ( !v )v = true; else return;
    b = jQuery;
    var m = b( "#" + r );
    if ( m == c )return;
    b( "<link/>" ).attr( "href" , window[ a ].launcherCss ).attr( "rel" , "stylesheet" ).appendTo( "head" );
    var B = b( q ).attr( h , "WidgetLauncher" ).css( "direction" , window[ a ].langDir ).appendTo( m ) , z = b( q ).click( function () {
      e.Translate();
      return f
    } ).attr( h , "LauncherTranslatePhrase" ).addClass( j ).css( s , b( m ).css( s ) ) , C = b( "<span/>" ).attr( h , "TranslateSpan" ).text( window[ a ].translatePhrase ).appendTo( z ) , n = b( q ).attr( h , "LauncherLogo" );
    if ( window[ a ].langDir == "rtl" )n.css( "textAlign" , "left" );
    var y = b( "<a/>" ).attr( h , "LauncherLogoLink" ).attr( "href" , window[ a ].bingLink ).attr( "target" , "_blank" ).attr( i , window[ a ].bingLink ) , t = b( "<img/>" ).attr( h , "LauncherLogoImage" ).appendTo( y );
    if ( m.hasClass( "Dark" ) )t.attr( "src" , window[ a ].imagePath + window[ a ].launcherDarkLogoImage ); else t.attr( "src" , window[ a ].imagePath + window[ a ].launcherLightLogoImage );
    m.css( s , "Transparent" );
    n.append( y );
    var x = window[ a ].translateWithBing.replace( "{0}" , "" ) , A = x.indexOf( window[ a ].withBing.replace( "{0}" , "" ).replace( " " , "" ) );
    if ( A == -1 )A = 1e5;
    var D = x.indexOf( window[ a ].translatePhrase );
    n.addClass( "WithPhraseAfter" );
    B.append( z ).append( n );
    Microsoft.Translator.Widget.GetLanguagesForTranslate( g , function ( a ) {
      w( a );
      if ( !o )l()
    } , function () {new Error( "Could not retrieve languages." )} );
    var p = d;
    if ( !p )p = Util.GetCookie( "mstto" );
    if ( p ) {
      d = p;
      u()
    } else if ( k )d = k; else d = g
  }

  e.onScriptLoad = m;
  function u() {
    Microsoft.Translator.Widget.Translate( t , d , c , c , c , s );
    x()
  }

  e.Translate = u;
  function s( a ) {
    d = a;
    y()
  }

  e.onUntranslate = s
})( Launcher || (Launcher = {}) );
window[ '_mstConfig' ].floaterStylePath = 'https://ssl.microsofttranslator.com/static/226010/css/WidgetV3.css?v=226010';
window[ '_mstConfig' ].translateWithBing = '通过 {0} 翻译';
window[ '_mstConfig' ].withBing = '通过 {0}';
window[ '_mstConfig' ].autoDetected = '{0}（已自动检测）';
function loadAllScripts( fn ) {
  var intervalID = setInterval( function () {
    if ( document.readyState != 'complete' ) return;
    clearInterval( intervalID );
    fn();
  } , 10 );
}
window[ '_mstConfig' ].bingLink = '//www.bing.com/translator';
window[ '_mstConfig' ].translatePhrase = '翻译';
window[ '_mstConfig' ].launcherCss = 'https://ssl.microsofttranslator.com/static/226010/css/WidgetLauncher.css?v=226010';
window[ '_mstConfig' ].langDir = 'ltr';
window[ '_mstConfig' ].translateTo = '目标语言 {0}';
window[ '_mstConfig' ].launcherDarkLogoImage = 'binglogo_dark.png';
window[ '_mstConfig' ].launcherLightLogoImage = 'binglogo_light.png';
function onloadCallback() {
  var head = document.getElementsByTagName( 'head' )[ 0 ];
  try {
    var body = document.getElementsByTagName( 'body' )[ 0 ];
    var numChildren = body.children.length;
    var numScripts = body.getElementsByTagName( 'script' ).length;

    function appendHTMLToBody( html ) {
      var temp = document.createElement( 'div' );
      temp.innerHTML = html;
      for ( var i = 0 ; i < temp.children.length ; i++ ) {body.appendChild( temp.children[ i ] );}
    }

    appendHTMLToBody( decodeURIComponent( '%3ctitle%3e%20%3c%2ftitle%3e' ) );
    appendHTMLToBody( decodeURIComponent( '%20%3cdiv%20id%3d%22WidgetFloaterPanels%22%20translate%3d%22no%22%20style%3d%22display%3a%20none%3btext-align%3a%20left%3bdirection%3a%20ltr%22%20class%3d%22LTRStyle%22%20%3e%20%3cdiv%20id%3d%22WidgetFloater%22%20style%3d%22display%3a%20none%22%20%3e%20%3cdiv%20id%3d%22WidgetLogoPanel%22%3e%20%3cspan%20id%3d%22WidgetTranslateWithSpan%22%20style%3d%22text-align%3aleft%3b%22%3e%e5%bf%85%e5%ba%94%e5%9c%a8%e7%ba%bf%e7%bf%bb%e8%af%91%3c%2fspan%3e%20%3cspan%20id%3d%22WidgetCloseButton%22%20title%3d%22%e9%80%80%e5%87%ba%e7%bf%bb%e8%af%91%22%20onclick%3d%22Microsoft.Translator.FloaterOnClose()%22%3e%3cimg%20src%3d%22https%3a%2f%2fssl.microsofttranslator.com%2fstatic%2f226010%2fimg%2fclose_x.png%22%20id%3d%22WidgetCloseImage%22%20class%3d%22WidgetCloseImage%22%20%2f%3e%3c%2fspan%3e%3c%2fdiv%3e%20%3cdiv%20id%3d%22LanguageMenuPanel%22%3e%20%3cdiv%20class%3d%22DDStyle_outer%22%3e%3cinput%20name%3d%22LanguageMenu_svid%22%20type%3d%22text%22%20id%3d%22LanguageMenu_svid%22%20style%3d%22display%3anone%3b%22%20autocomplete%3d%22on%22%20value%3d%22zh-CHS%22%20%2f%3e%20%3cinput%20name%3d%22LanguageMenu_textid%22%20type%3d%22text%22%20id%3d%22LanguageMenu_textid%22%20style%3d%22display%3anone%3b%22%20autocomplete%3d%22on%22%20%2f%3e%20%3cspan%20onselectstart%3d%22return%20false%22%20tabindex%3d%220%22%20class%3d%22DDStyle%22%20id%3d%22__LanguageMenu_header%22%20onclick%3d%22return%20LanguageMenu%20%26amp%3b%26amp%3b%20!LanguageMenu.Show(%26%2339%3b__LanguageMenu_popup%26%2339%3b%2c%20event)%3b%22%20onkeydown%3d%22return%20LanguageMenu%20%26amp%3b%26amp%3b%20!LanguageMenu.Show(%26%2339%3b__LanguageMenu_popup%26%2339%3b%2c%20event)%3b%22%3e%e7%ae%80%e4%bd%93%e4%b8%ad%e6%96%87%3c%2fspan%3e%20%3cdiv%20style%3d%22position%3arelative%3btext-align%3aleft%3bleft%3a0%3b%22%3e%3cdiv%20style%3d%22position%3aabsolute%3bwidth%3a%3bleft%3a0px%3b%22%3e%3cdiv%20class%3d%22DDStyle%22%20style%3d%22display%3anone%3b%22%20id%3d%22__LanguageMenu_popup%22%3e%20%3ctable%20id%3d%22LanguageMenu%22%20border%3d%220%22%3e%20%3ctr%3e%20%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bar%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23ar%22%3e%e9%98%bf%e6%8b%89%e4%bc%af%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bcs%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23cs%22%3e%e6%8d%b7%e5%85%8b%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bsw%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23sw%22%3e%e6%96%af%e7%93%a6%e5%b8%8c%e9%87%8c%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%20%3c%2ftr%3e%3ctr%3e%20%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bet%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23et%22%3e%e7%88%b1%e6%b2%99%e5%b0%bc%e4%ba%9a%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3botq%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23otq%22%3e%e5%85%8b%e9%9b%b7%e5%a1%94%e7%bd%97%e5%a5%a5%e6%89%98%e7%b1%b3%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bth%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23th%22%3e%e6%b3%b0%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%20%3c%2ftr%3e%3ctr%3e%20%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bmww%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23mww%22%3e%e7%99%bd%e8%8b%97%e6%96%87%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3btlh%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23tlh%22%3e%e5%85%8b%e6%9e%97%e8%b4%a1%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3btr%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23tr%22%3e%e5%9c%9f%e8%80%b3%e5%85%b6%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%20%3c%2ftr%3e%3ctr%3e%20%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bbg%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23bg%22%3e%e4%bf%9d%e5%8a%a0%e5%88%a9%e4%ba%9a%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bhr%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23hr%22%3e%e5%85%8b%e7%bd%97%e5%9c%b0%e4%ba%9a%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bcy%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23cy%22%3e%e5%a8%81%e5%b0%94%e5%a3%ab%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%20%3c%2ftr%3e%3ctr%3e%20%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bpl%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23pl%22%3e%e6%b3%a2%e5%85%b0%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3blv%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23lv%22%3e%e6%8b%89%e8%84%b1%e7%bb%b4%e4%ba%9a%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bur%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23ur%22%3e%e4%b9%8c%e5%b0%94%e9%83%bd%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%20%3c%2ftr%3e%3ctr%3e%20%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bbs-Latn%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23bs-Latn%22%3e%e6%b3%a2%e6%96%af%e5%b0%bc%e4%ba%9a%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3blt%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23lt%22%3e%e7%ab%8b%e9%99%b6%e5%ae%9b%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3buk%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23uk%22%3e%e4%b9%8c%e5%85%8b%e5%85%b0%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%20%3c%2ftr%3e%3ctr%3e%20%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bfa%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23fa%22%3e%e6%b3%a2%e6%96%af%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bro%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23ro%22%3e%e7%bd%97%e9%a9%ac%e5%b0%bc%e4%ba%9a%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bes%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23es%22%3e%e8%a5%bf%e7%8f%ad%e7%89%99%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%20%3c%2ftr%3e%3ctr%3e%20%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bko%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23ko%22%3e%e6%9c%9d%e9%b2%9c%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bmt%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23mt%22%3e%e9%a9%ac%e8%80%b3%e4%bb%96%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bhe%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23he%22%3e%e5%b8%8c%e4%bc%af%e6%9d%a5%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%20%3c%2ftr%3e%3ctr%3e%20%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bda%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23da%22%3e%e4%b8%b9%e9%ba%a6%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bms%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23ms%22%3e%e9%a9%ac%e6%9d%a5%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bel%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23el%22%3e%e5%b8%8c%e8%85%8a%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%20%3c%2ftr%3e%3ctr%3e%20%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bde%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23de%22%3e%e5%be%b7%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bno%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23no%22%3e%e6%8c%aa%e5%a8%81%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bhu%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23hu%22%3e%e5%8c%88%e7%89%99%e5%88%a9%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%20%3c%2ftr%3e%3ctr%3e%20%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bru%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23ru%22%3e%e4%bf%84%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bpt%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23pt%22%3e%e8%91%a1%e8%90%84%e7%89%99%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bit%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23it%22%3e%e6%84%8f%e5%a4%a7%e5%88%a9%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%20%3c%2ftr%3e%3ctr%3e%20%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bfr%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23fr%22%3e%e6%b3%95%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bja%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23ja%22%3e%e6%97%a5%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bhi%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23hi%22%3e%e5%8d%b0%e5%9c%b0%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%20%3c%2ftr%3e%3ctr%3e%20%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bzh-CHT%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23zh-CHT%22%3e%e7%b9%81%e4%bd%93%e4%b8%ad%e6%96%87%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bsv%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23sv%22%3e%e7%91%9e%e5%85%b8%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bid%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23id%22%3e%e5%8d%b0%e5%ba%a6%e5%b0%bc%e8%a5%bf%e4%ba%9a%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%20%3c%2ftr%3e%3ctr%3e%20%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bfi%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23fi%22%3e%e8%8a%ac%e5%85%b0%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bsr-Latn%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23sr-Latn%22%3e%e5%a1%9e%e5%b0%94%e7%bb%b4%e4%ba%9a%e8%af%ad%20(%e6%8b%89%e4%b8%81%e6%96%87)%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3ben%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23en%22%3e%e8%8b%b1%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%20%3c%2ftr%3e%3ctr%3e%20%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bht%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23ht%22%3e%e6%b5%b7%e5%9c%b0%e5%85%8b%e9%87%8c%e5%a5%a5%e5%b0%94%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bsr-Cyrl%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23sr-Cyrl%22%3e%e5%a1%9e%e5%b0%94%e7%bb%b4%e4%ba%9a%e8%af%ad%20(%e8%a5%bf%e9%87%8c%e5%b0%94%e6%96%87)%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3byua%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23yua%22%3e%e5%b0%a4%e5%8d%a1%e5%9d%a6%e7%8e%9b%e9%9b%85%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%20%3c%2ftr%3e%3ctr%3e%20%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bnl%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23nl%22%3e%e8%8d%b7%e5%85%b0%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bsk%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23sk%22%3e%e6%96%af%e6%b4%9b%e4%bc%90%e5%85%8b%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bvi%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23vi%22%3e%e8%b6%8a%e5%8d%97%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%20%3c%2ftr%3e%3ctr%3e%20%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bca%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23ca%22%3e%e5%8a%a0%e6%b3%b0%e9%9a%86%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bsl%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23sl%22%3e%e6%96%af%e6%b4%9b%e6%96%87%e5%b0%bc%e4%ba%9a%e8%af%ad%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bzh-chs%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23zh-chs%22%3e%e7%ae%80%e4%bd%93%e4%b8%ad%e6%96%87%3c%2fa%3e%3c%2ftd%3e%20%3c%2ftr%3e%3ctr%3e%20%3ctd%3e%3ca%20tabindex%3d%22-1%22%20onclick%3d%22return%20LanguageMenu.onclick(%26%2339%3bzh-CHS%26%2339%3b)%3b%22%20ondragstart%3d%22LanguageMenu.ondragstart(event)%3b%22%20href%3d%22%23zh-CHS%22%3e%e7%ae%80%e4%bd%93%e4%b8%ad%e6%96%87%3c%2fa%3e%3c%2ftd%3e%3ctd%3e%3c%2ftd%3e%3ctd%3e%3c%2ftd%3e%20%3c%2ftr%3e%20%3c%2ftable%3e%20%3cimg%20alt%3d%22%22%20src%3d%22https%3a%2f%2fssl.microsofttranslator.com%2fstatic%2f226010%2fimg%2fniche.gif%22%20style%3d%22height%3a7px%3bwidth%3a17px%3bborder-width%3a0px%3bleft%3a20px%3b%22%20%2f%3e%20%3c%2fdiv%3e%3c%2fdiv%3e%3c%2fdiv%3e%3c%2fdiv%3e%20%3cscript%20type%3d%22text%2fjavascript%22%3e%20var%20LanguageMenu%3b%20var%20LanguageMenu_keys%3d%5b%22ar%22%2c%22et%22%2c%22mww%22%2c%22bg%22%2c%22pl%22%2c%22bs-Latn%22%2c%22fa%22%2c%22ko%22%2c%22da%22%2c%22de%22%2c%22ru%22%2c%22fr%22%2c%22zh-CHT%22%2c%22fi%22%2c%22ht%22%2c%22nl%22%2c%22ca%22%2c%22zh-CHS%22%2c%22cs%22%2c%22otq%22%2c%22tlh%22%2c%22hr%22%2c%22lv%22%2c%22lt%22%2c%22ro%22%2c%22mt%22%2c%22ms%22%2c%22no%22%2c%22pt%22%2c%22ja%22%2c%22sv%22%2c%22sr-Latn%22%2c%22sr-Cyrl%22%2c%22sk%22%2c%22sl%22%2c%22sw%22%2c%22th%22%2c%22tr%22%2c%22cy%22%2c%22ur%22%2c%22uk%22%2c%22es%22%2c%22he%22%2c%22el%22%2c%22hu%22%2c%22it%22%2c%22hi%22%2c%22id%22%2c%22en%22%2c%22yua%22%2c%22vi%22%2c%22zh-chs%22%5d%3b%20var%20LanguageMenu_values%3d%5b%22%e9%98%bf%e6%8b%89%e4%bc%af%e8%af%ad%22%2c%22%e7%88%b1%e6%b2%99%e5%b0%bc%e4%ba%9a%e8%af%ad%22%2c%22%e7%99%bd%e8%8b%97%e6%96%87%22%2c%22%e4%bf%9d%e5%8a%a0%e5%88%a9%e4%ba%9a%e8%af%ad%22%2c%22%e6%b3%a2%e5%85%b0%e8%af%ad%22%2c%22%e6%b3%a2%e6%96%af%e5%b0%bc%e4%ba%9a%e8%af%ad%22%2c%22%e6%b3%a2%e6%96%af%e8%af%ad%22%2c%22%e6%9c%9d%e9%b2%9c%e8%af%ad%22%2c%22%e4%b8%b9%e9%ba%a6%e8%af%ad%22%2c%22%e5%be%b7%e8%af%ad%22%2c%22%e4%bf%84%e8%af%ad%22%2c%22%e6%b3%95%e8%af%ad%22%2c%22%e7%b9%81%e4%bd%93%e4%b8%ad%e6%96%87%22%2c%22%e8%8a%ac%e5%85%b0%e8%af%ad%22%2c%22%e6%b5%b7%e5%9c%b0%e5%85%8b%e9%87%8c%e5%a5%a5%e5%b0%94%e8%af%ad%22%2c%22%e8%8d%b7%e5%85%b0%e8%af%ad%22%2c%22%e5%8a%a0%e6%b3%b0%e9%9a%86%e8%af%ad%22%2c%22%e7%ae%80%e4%bd%93%e4%b8%ad%e6%96%87%22%2c%22%e6%8d%b7%e5%85%8b%e8%af%ad%22%2c%22%e5%85%8b%e9%9b%b7%e5%a1%94%e7%bd%97%e5%a5%a5%e6%89%98%e7%b1%b3%e8%af%ad%22%2c%22%e5%85%8b%e6%9e%97%e8%b4%a1%e8%af%ad%22%2c%22%e5%85%8b%e7%bd%97%e5%9c%b0%e4%ba%9a%e8%af%ad%22%2c%22%e6%8b%89%e8%84%b1%e7%bb%b4%e4%ba%9a%e8%af%ad%22%2c%22%e7%ab%8b%e9%99%b6%e5%ae%9b%e8%af%ad%22%2c%22%e7%bd%97%e9%a9%ac%e5%b0%bc%e4%ba%9a%e8%af%ad%22%2c%22%e9%a9%ac%e8%80%b3%e4%bb%96%e8%af%ad%22%2c%22%e9%a9%ac%e6%9d%a5%e8%af%ad%22%2c%22%e6%8c%aa%e5%a8%81%e8%af%ad%22%2c%22%e8%91%a1%e8%90%84%e7%89%99%e8%af%ad%22%2c%22%e6%97%a5%e8%af%ad%22%2c%22%e7%91%9e%e5%85%b8%e8%af%ad%22%2c%22%e5%a1%9e%e5%b0%94%e7%bb%b4%e4%ba%9a%e8%af%ad%20(%e6%8b%89%e4%b8%81%e6%96%87)%22%2c%22%e5%a1%9e%e5%b0%94%e7%bb%b4%e4%ba%9a%e8%af%ad%20(%e8%a5%bf%e9%87%8c%e5%b0%94%e6%96%87)%22%2c%22%e6%96%af%e6%b4%9b%e4%bc%90%e5%85%8b%e8%af%ad%22%2c%22%e6%96%af%e6%b4%9b%e6%96%87%e5%b0%bc%e4%ba%9a%e8%af%ad%22%2c%22%e6%96%af%e7%93%a6%e5%b8%8c%e9%87%8c%e8%af%ad%22%2c%22%e6%b3%b0%e8%af%ad%22%2c%22%e5%9c%9f%e8%80%b3%e5%85%b6%e8%af%ad%22%2c%22%e5%a8%81%e5%b0%94%e5%a3%ab%e8%af%ad%22%2c%22%e4%b9%8c%e5%b0%94%e9%83%bd%e8%af%ad%22%2c%22%e4%b9%8c%e5%85%8b%e5%85%b0%e8%af%ad%22%2c%22%e8%a5%bf%e7%8f%ad%e7%89%99%e8%af%ad%22%2c%22%e5%b8%8c%e4%bc%af%e6%9d%a5%e8%af%ad%22%2c%22%e5%b8%8c%e8%85%8a%e8%af%ad%22%2c%22%e5%8c%88%e7%89%99%e5%88%a9%e8%af%ad%22%2c%22%e6%84%8f%e5%a4%a7%e5%88%a9%e8%af%ad%22%2c%22%e5%8d%b0%e5%9c%b0%e8%af%ad%22%2c%22%e5%8d%b0%e5%ba%a6%e5%b0%bc%e8%a5%bf%e4%ba%9a%e8%af%ad%22%2c%22%e8%8b%b1%e8%af%ad%22%2c%22%e5%b0%a4%e5%8d%a1%e5%9d%a6%e7%8e%9b%e9%9b%85%e8%af%ad%22%2c%22%e8%b6%8a%e5%8d%97%e8%af%ad%22%2c%22%e7%ae%80%e4%bd%93%e4%b8%ad%e6%96%87%22%5d%3b%20var%20LanguageMenu_callback%3dfunction()%7b%20%7d%3b%20var%20LanguageMenu_popupid%3d%27__LanguageMenu_popup%27%3b%20%3c%2fscript%3e%20%3c%2fdiv%3e%20%3cdiv%20id%3d%22CTFLinksPanel%22%3e%20%3cspan%20id%3d%22ExternalLinksPanel%22%3e%3ca%20id%3d%22BingTranslatorLink%22%20title%3d%22bing.com%2ftranslator%22%20href%3d%22http%3a%2f%2fwww.bing.com%2ftranslator%22%20target%3d%22_blank%22%3e%20%3cimg%20id%3d%22BingTranslatorLinkImg%22%20src%3d%22https%3a%2f%2fssl.microsofttranslator.com%2fstatic%2f226010%2fimg%2fbingmark.png%22%20%2f%3e%3c%2fa%3e%20%3ca%20id%3d%22FacebookLink%22%20href%3d%22https%3a%2f%2fwww.facebook.com%2fmicrosofttranslator%22%20title%3d%22Facebook%20%e5%bf%85%e5%ba%94%e5%9c%a8%e7%ba%bf%e7%bf%bb%e8%af%91%22%20target%3d%22_blank%22%3e%20%3cimg%20id%3d%22FacebookImg%22%20src%3d%22https%3a%2f%2fssl.microsofttranslator.com%2fstatic%2f226010%2fimg%2ffbookmark.png%22%20%2f%3e%3c%2fa%3e%20%3ca%20id%3d%22ShareLink%22%20title%3d%22%e5%88%86%e4%ba%ab%22%20href%3d%22javascript%3aMicrosoft.Translator.FloaterShowSharePanel()%22%3e%20%3cimg%20id%3d%22ShareImg%22%20src%3d%22https%3a%2f%2fssl.microsofttranslator.com%2fstatic%2f226010%2fimg%2fsharemark.png%22%20%2f%3e%3c%2fa%3e%20%3c%2fspan%3e%20%3c%2fdiv%3e%20%3cdiv%20id%3d%22FloaterProgressBar%22%3e%20%3cdiv%20id%3d%22ProgressFill%22%20%3e%20%e6%ad%a3%e5%9c%a8%e7%bf%bb%e8%af%91...%20%3c%2fdiv%3e%20%3c%2fdiv%3e%20%3c%2fdiv%3e%20%3cdiv%20id%3d%22WidgetFloaterCollapsed%22%20style%3d%22display%3a%20none%22%3e%20%3cspan%20id%3d%22WidgetFloaterCollapsedSpan%22%3e%e5%bf%85%e5%ba%94%e5%9c%a8%e7%ba%bf%e7%bf%bb%e8%af%91%3c%2fspan%3e%20%3cspan%20id%3d%22WidgetCloseButtonCollapsed%22%20title%3d%22%e9%80%80%e5%87%ba%e7%bf%bb%e8%af%91%22%20onclick%3d%22Microsoft.Translator.FloaterOnClose()%22%3e%3cimg%20src%3d%22https%3a%2f%2fssl.microsofttranslator.com%2fstatic%2f226010%2fimg%2fclose_x.png%22%20id%3d%22WidgetCloseImageCollapsed%22%20class%3d%22WidgetCloseImage%22%20%2f%3e%3c%2fspan%3e%3c%2fdiv%3e%20%3cdiv%20id%3d%22FloaterSharePanel%22%20style%3d%22display%3a%20none%22%20%3e%20%3cdiv%20id%3d%22ShareTextDiv%22%3e%20%3cspan%20id%3d%22ShareTextSpan%22%3e%20%e5%a4%8d%e5%88%b6%e4%b8%8b%e9%9d%a2%e7%9a%84%20URL%20%3c%2fspan%3e%20%3c%2fdiv%3e%20%3cdiv%20id%3d%22ShareTextboxDiv%22%3e%20%3cinput%20name%3d%22ShareTextbox%22%20type%3d%22text%22%20id%3d%22ShareTextbox%22%20readonly%3d%22readonly%22%20%2f%3e%20%3c!--a%20id%3d%22TwitterLink%22%20title%3d%22%e5%9c%a8%20Twitter%20%e4%b8%8a%e5%85%b1%e4%ba%ab%22%3e%20%3cimg%20id%3d%22TwitterImg%22%20src%3d%22https%3a%2f%2fssl.microsofttranslator.com%2fstatic%2f226010%2fimg%2ftwitter_icon.png%22%20%2f%3e%3c%2fa%3e%20%3ca--%20id%3d%22FacebookLink%22%20title%3d%22%e5%9c%a8%20Facebook%20%e4%b8%8a%e5%85%b1%e4%ba%ab%22%3e%20%3cimg%20id%3d%22FacebookImg%22%20src%3d%22https%3a%2f%2fssl.microsofttranslator.com%2fstatic%2f226010%2fimg%2ffacebook_icon.png%22%20%2f%3e%3c%2fa--%3e%20%3ca%20id%3d%22EmailLink%22%20title%3d%22%e9%80%9a%e8%bf%87%e7%94%b5%e5%ad%90%e9%82%ae%e4%bb%b6%e5%8f%91%e9%80%81%e6%ad%a4%e7%bf%bb%e8%af%91%22%3e%20%3cimg%20id%3d%22EmailImg%22%20src%3d%22https%3a%2f%2fssl.microsofttranslator.com%2fstatic%2f226010%2fimg%2femail_icon.png%22%20%2f%3e%3c%2fa%3e%20%3c%2fdiv%3e%20%3cdiv%20id%3d%22ShareFooter%22%3e%20%3cspan%20id%3d%22ShareHelpSpan%22%3e%3ca%20id%3d%22ShareHelpLink%22%3e%20%3cimg%20id%3d%22ShareHelpImg%22%20src%3d%22https%3a%2f%2fssl.microsofttranslator.com%2fstatic%2f226010%2fimg%2fembed_question.png%22%20%2f%3e%3c%2fa%3e%3c%2fspan%3e%20%3cspan%20id%3d%22ShareBackSpan%22%3e%3ca%20id%3d%22ShareBack%22%20href%3d%22javascript%3aMicrosoft.Translator.FloaterOnShareBackClick()%22%20title%3d%22%e8%bf%94%e5%9b%9e%e7%bf%bb%e8%af%91%22%3e%20%e8%bf%94%e5%9b%9e%3c%2fa%3e%3c%2fspan%3e%20%3c%2fdiv%3e%20%3cinput%20name%3d%22EmailSubject%22%20type%3d%22hidden%22%20id%3d%22EmailSubject%22%20value%3d%22%e6%9f%a5%e7%9c%8b%e6%ad%a4%e9%a1%b5%e4%bb%8e%20%7b1%7d%20%e5%88%b0%20%7b0%7d%20%e7%9a%84%e7%bf%bb%e8%af%91%22%20%2f%3e%20%3cinput%20name%3d%22EmailBody%22%20type%3d%22hidden%22%20id%3d%22EmailBody%22%20value%3d%22%e8%af%91%e6%96%87%3a%20%7b0%7d%250d%250a%e5%8e%9f%e6%96%87%3a%20%7b1%7d%250d%250a%250d%250a%e8%87%aa%e5%8a%a8%e7%bf%bb%e8%af%91%e7%94%b1%20Microsoft%c2%ae%20Translator%20%e6%8f%90%e4%be%9b%250d%250ahttp%3a%2f%2fwww.bing.com%2ftranslator%3fref%3dMSTWidget%22%20%2f%3e%20%3cinput%20type%3d%22hidden%22%20id%3d%22ShareHelpText%22%20value%3d%22%e6%ad%a4%e9%93%be%e6%8e%a5%e5%85%81%e8%ae%b8%e8%ae%bf%e9%97%ae%e8%80%85%e5%90%af%e5%8a%a8%e6%9c%ac%e9%a1%b5%e9%9d%a2%ef%bc%8c%e5%b9%b6%e8%87%aa%e5%8a%a8%e7%bf%bb%e8%af%91%e4%b8%ba%7b0%7d%e3%80%82%22%2f%3e%20%3c%2fdiv%3e%20%3cdiv%20id%3d%22FloaterEmbed%22%20style%3d%22display%3a%20none%22%3e%20%3cdiv%20id%3d%22EmbedTextDiv%22%3e%20%3cspan%20id%3d%22EmbedTextSpan%22%3e%e5%b0%86%e4%b8%8b%e9%9d%a2%e7%9a%84%e4%bb%a3%e7%a0%81%e6%ae%b5%e5%b5%8c%e5%85%a5%e6%82%a8%e7%9a%84%e7%ab%99%e7%82%b9%3c%2fspan%3e%20%3ca%20id%3d%22EmbedHelpLink%22%20title%3d%22%e5%a4%8d%e5%88%b6%e6%ad%a4%e4%bb%a3%e7%a0%81%ef%bc%8c%e5%b9%b6%e5%b0%86%e5%85%b6%e7%bd%ae%e4%ba%8e%e6%82%a8%e7%9a%84%20HTML%20%e4%b8%ad%e3%80%82%22%3e%20%3cimg%20id%3d%22EmbedHelpImg%22%20src%3d%22https%3a%2f%2fssl.microsofttranslator.com%2fstatic%2f226010%2fimg%2fembed_question.png%22%2f%3e%3c%2fa%3e%20%3c%2fdiv%3e%20%3cdiv%20id%3d%22EmbedTextboxDiv%22%3e%20%3cinput%20name%3d%22EmbedSnippetTextBox%22%20type%3d%22text%22%20id%3d%22EmbedSnippetTextBox%22%20readonly%3d%22readonly%22%20value%3d%22%26lt%3bdiv%20id%3d%26%2339%3bMicrosoftTranslatorWidget%26%2339%3b%20class%3d%26%2339%3bDark%26%2339%3b%20style%3d%26%2339%3bcolor%3awhite%3bbackground-color%3a%23555555%26%2339%3b%3e%26lt%3b%2fdiv%3e%26lt%3bscript%20type%3d%26%2339%3btext%2fjavascript%26%2339%3b%3esetTimeout(function()%7bvar%20s%3ddocument.createElement(%26%2339%3bscript%26%2339%3b)%3bs.type%3d%26%2339%3btext%2fjavascript%26%2339%3b%3bs.charset%3d%26%2339%3bUTF-8%26%2339%3b%3bs.src%3d((location%20%26amp%3b%26amp%3b%20location.href%20%26amp%3b%26amp%3b%20location.href.indexOf(%26%2339%3bhttps%26%2339%3b)%20%3d%3d%200)%3f%26%2339%3bhttps%3a%2f%2fssl.microsofttranslator.com%26%2339%3b%3a%26%2339%3bhttp%3a%2f%2fwww.microsofttranslator.com%26%2339%3b)%2b%26%2339%3b%2fajax%2fv3%2fWidgetV3.ashx%3fsiteData%3dueOIGRSKkd965FeEGM5JtQ**%26amp%3bctf%3dtrue%26amp%3bui%3dtrue%26amp%3bsettings%3dmanual%26amp%3bfrom%3dzh-CHS%26%2339%3b%3bvar%20p%3ddocument.getElementsByTagName(%26%2339%3bhead%26%2339%3b)%5b0%5d%7c%7cdocument.documentElement%3bp.insertBefore(s%2cp.firstChild)%3b%20%7d%2c0)%3b%26lt%3b%2fscript%3e%22%20%2f%3e%20%3c%2fdiv%3e%20%3cdiv%20id%3d%22EmbedNoticeDiv%22%3e%3cspan%20id%3d%22EmbedNoticeSpan%22%3e%e5%90%af%e7%94%a8%e5%8d%8f%e4%bd%9c%e5%8a%9f%e8%83%bd%e5%92%8c%e8%87%aa%e5%ae%9a%e4%b9%89%e5%b0%8f%e5%b7%a5%e5%85%b7%3a%20%3ca%20href%3d%22http%3a%2f%2fwww.bing.com%2fwidget%2ftranslator%22%20target%3d%22_blank%22%3e%e5%bf%85%e5%ba%94%e7%bd%91%e7%ab%99%e7%ae%a1%e7%90%86%e5%91%98%e9%97%a8%e6%88%b7%3c%2fa%3e%3c%2fspan%3e%3c%2fdiv%3e%20%3cdiv%20id%3d%22EmbedFooterDiv%22%3e%3cspan%20id%3d%22EmbedBackSpan%22%3e%3ca%20href%3d%22javascript%3aMicrosoft.Translator.FloaterOnEmbedBackClick()%22%20title%3d%22%e8%bf%94%e5%9b%9e%e7%bf%bb%e8%af%91%22%3e%e8%bf%94%e5%9b%9e%3c%2fa%3e%3c%2fspan%3e%3c%2fdiv%3e%20%3c%2fdiv%3e%20%3cscript%20type%3d%22text%2fjavascript%22%3e%20var%20intervalId%20%3d%20setInterval(function%20()%20%7b%20if%20(MtPopUpList)%20%7b%20LanguageMenu%20%3d%20new%20MtPopUpList()%3b%20var%20langMenu%20%3d%20document.getElementById(LanguageMenu_popupid)%3b%20var%20origLangDiv%20%3d%20document.createElement(%22div%22)%3b%20origLangDiv.id%20%3d%20%22OriginalLanguageDiv%22%3b%20origLangDiv.innerHTML%20%3d%20%22%3cspan%20id%3d%27OriginalTextSpan%27%3e%e5%8e%9f%e6%96%87%3a%20%3c%2fspan%3e%3cspan%20id%3d%27OriginalLanguageSpan%27%3e%3c%2fspan%3e%22%3b%20langMenu.appendChild(origLangDiv)%3b%20LanguageMenu.Init(%27LanguageMenu%27%2c%20LanguageMenu_keys%2c%20LanguageMenu_values%2c%20LanguageMenu_callback%2c%20LanguageMenu_popupid)%3b%20window%5b%22LanguageMenu%22%5d%20%3d%20LanguageMenu%3b%20clearInterval(intervalId)%3b%20%7d%20%7d%2c%201)%3b%20%3c%2fscript%3e%20%3c%2fdiv%3e%20' ) );
    var code = '';
    var scripts = body.getElementsByTagName( 'script' );
    for ( var i = numScripts ; i < scripts.length ; i++ ) {if ( scripts[ i ].innerHTML.length != 0 ) {code += scripts[ i ].innerHTML;}}
    eval( code );
  }
  catch ( e ) {console.error( e );}
  Microsoft.Translator.FloaterInitialize( 'zh-CHS' , 'true' , '' );
  Launcher.Show( '' , 'zh-CHS' , 'zh-CHS' );
}
loadAllScripts( onloadCallback );
