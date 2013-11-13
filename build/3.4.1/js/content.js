var $ = $ || {};
$.outResult = function () {
    var container = document.createElement( "section" ), childs = {"_tip_" : "正在查询，请稍候……" , "_queryWords_" : null , "_baseExplain_" : "基本释义" , "_baseExplainContent_" : null , "_tranResult_" : "翻译结果" , "_tranResultContent_" : null , "_luck_" : null , "_tranFrom_" : null , "_errorTitle_" : "出错啦！" , "_errorMsg_" : null};
    Object.keys( childs ).forEach( function ( v ) {
        var div = document.createElement( "div" );
        if ( childs[v] ) {div.innerHTML = childs[v]}
        div.className = v;
        childs[v] = div;
        container.appendChild( childs[v] )
    } );
    container.id = "_container_";
    container.addEventListener( "mousedown" , function ( e ) {
        var temp;
        if ( e.target.className === "_copy_" && e.button === 0 ) {
            if ( $.selection.toString() ) {$.selection.collapseToStart()}
            for ( temp = e.target.parentNode.previousElementSibling ; temp.style.display !== "block" ; temp = temp.previousElementSibling ) {}
            $.copy( temp.textContent );
            e.target.textContent = "已复制"
        }
        e.stopPropagation()
    } , true );
    document.body.appendChild( container );
    return{box : container , childs : childs , show : function ( showObj , pos ) {
        var box = $.result.box;
        $.result.hid();
        box.style.left = pos[0] + "px";
        box.style.top = pos[1] + "px";
        Object.keys( showObj ).forEach( function ( v ) {
            var c = $.result.childs[v];
            if ( showObj[v] ) {c.innerHTML = showObj[v]}
            c.style.display = "block"
        } );
        box.style.display = "block"
    } , hid : function () {
        var b = $.result.box;
        b.style.display = "none";
        Array.prototype.forEach.call( b.children , function ( v ) {v.style.display = "none"} )
    }}
};
$.result = null;
$.error = function ( errCode ) {
    var h;
    switch ( errCode ) {
        case 20:
            h = "有道翻译服务一次性只能翻译200个字符哦，长文本就用百度翻译吧！";
            break;
        case 30:
            h = "你查询的文本太难了，有道翻译不出来  :( 试试百度翻译吧！";
            break;
        case 40:
            h = "有道翻译不支持这种语言哦，试试百度翻译！";
            break;
        case 50:
            h = "天呐！如果你看见这条错误信息，请立刻发送邮件至i@lmk123.com联系作者！主题请注明：有道着火了。";
            break;
        case 52001:
            h = "百度翻译太忙了，稍后再试试看，或者用有道翻译吧。";
            break;
        case 52002:
            h = "百度翻译出错了！用有道试试吧。";
            break;
        case 52003:
            h = "天呐！如果你看见这条错误信息，请立刻发送邮件至i@lmk123.com联系作者！主题请注明：百度着火了。";
            break
    }
    $.result.show( {"_queryWords_" : $.selection.toString() , "_errorMsg_" : h , "_errorTitle_" : null} , $.getSelectionPos() )
};
$.handlerData = function ( msg ) {
    if ( !$.result ) {$.result = $.outResult()}
    var s = "", handlerBox = $.result, showObj = {}, data = msg.tran;
    handlerBox.hid();
    if ( "errorCode" in data ) {
        if ( data.errorCode !== 0 ) {return $.error( data.errorCode )}
        showObj["_queryWords_"] = data.query.replace( /</g , "&lt;" );
        if ( data.basic ) {
            data.basic.explains.forEach( function ( v ) {s += "<p>" + v + "</p>"} );
            showObj["_baseExplain_"] = null;
            showObj["_baseExplainContent_"] = s
        } else {
            showObj["_tranResult_"] = null;
            showObj["_tranResultContent_"] = data.translation[0]
        }
        showObj["_tranFrom_"] = 'via 有道翻译<span class="_copy_">复制</span>'
    }
    if ( "trans_result" in data ) {
        if ( data.error_code ) {return $.error( parseInt( data.error_code , 10 ) )}
        showObj["_queryWords_"] = data.trans_result[0].src.replace( /</g , "&lt;" );
        showObj["_tranResult_"] = null;
        showObj["_tranResultContent_"] = data.trans_result[0].dst;
        showObj["_tranFrom_"] = 'via 百度翻译<span class="_copy_">复制</span>'
    }
    return handlerBox.show( showObj , msg.pos || $.getSelectionPos() )
};
$.openWebTran = function () {
    if ( document.getElementById( "OUTFOX_JTR_CDA" ) ) {return}
    var e = document.createElement( "script" );
    e.id = "outfox_seed_js";
    e.charset = "utf-8", e.setAttribute( "src" , $.rootPath + "js/web.js" );
    document.body.appendChild( e )
};
$.selection = getSelection();
$.getSelectionPos = function () {
    var pos = $.selection.getRangeAt( 0 ).getBoundingClientRect();
    return[pos.left + pageXOffset, pos.top + pageYOffset + pos.height]
};
$.handlerSelection = function ( e ) {
    var selectionText;
    if ( e.button === 0 && (selectionText = $.selection.toString().trim()) ) {
        if ( !$.result ) {$.result = $.outResult()}
        $.result.show( {"_tip_" : null} , $.getSelectionPos() );
        $.query( {tran : selectionText} , "yd" , $.handlerData )
    }
};
$.enableSelection = function () {document.addEventListener( "mouseup" , $.handlerSelection , true )};
$.disableSelection = function () {document.removeEventListener( "mouseup" , $.handlerSelection , true )};
chrome.runtime.onMessage.addListener( function ( msg ) {
    switch ( msg.sign ) {
        case"trans_result":
            if ( msg.isFrame ) {if ( $.isFrame && $.isFrame === msg.isFrame ) {$.handlerData( msg )} else {$.result.hid()}} else {if ( !$.isFrame ) {$.handlerData( msg )}}
            break;
        case"selectionCheckedChange":
            msg.isOpen ? $.enableSelection() : $.disableSelection();
            break;
        case"webTran":
            if ( !$.isFrame ) {$.openWebTran()}
            break
    }
} );
document.addEventListener( "mousedown" , function ( e ) {
    if ( $.result ) {$.result.hid()}
    if ( e.button !== 2 && $.selection.toString() ) {$.selection.collapseToStart()}
} , false );
$.localStorage.get( "isHuaCi" , function ( i ) {if ( i.isHuaCi ) {$.enableSelection()}} );