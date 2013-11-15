$.extend( $ , {
    //重要的frame问题
    isFrame : function () {
//        var d = top === window ? null : location.href;
//        console.log( d );
        return top === window ? null : location.href;
//        return d;
    }() ,
    //这是一个实时的对象，所以只需获取一次
    selection : getSelection() ,
    //划词翻译的事件，为了能remove它所以要单独保存成一个函数
    mouseupHandler : function ( e ) {
        var selectionText;
        //如果是鼠标左键且当前有选中的文本
        if ( e.button === 0 && (selectionText = $.selection.toString().trim()) ) {
//            if ( !$.result ) {$.result = $.outResult()}
//            $.result.show( {"_tip_" : null} , $.getSelectionPos() );
            $.query( selectionText , $.handleResult );
        }
    } ,
    //打开划词翻译
    open : function () {
        document.addEventListener( 'mouseup' , this.mouseupHandler , true );
        return this;
    } ,
    //关闭划词翻译
    close : function () {
        document.removeEventListener( 'mouseup' , this.mouseupHandler , true );
        return this;
    } ,
    //用于生成界面
    handleResult : function ( r ) {
        //TODO
        console.dir( r );
    }
} );
chrome.runtime.onMessage.addListener( function ( msg ) {
//    console.dir( msg );
    //卧槽，iFrame导致页面收到多次信息
    //如果右键是在子窗口里点击的
    if ( msg.frameUrl ) {
        //通过地址判断是否是同一个frame
        if ( $.isFrame !== msg.frameUrl ) return;
    } else {
        //判断自身是否是子窗口
        if ( $.isFrame ) return;
    }
    switch ( msg.menuItemId ) {
        //以下三种命令直接处理
        case 'youdao':
        case 'baidu':
        case 'youdaoweb':
            //直接调用配置里的处理函数
            $.config.menus[msg.menuItemId].onmessage();
            return;
    }
    if ( msg.isSelection ) {
        $.open();
    } else {
        $.close();
    }
} );
chrome.storage.local.get( 'isSelection' , function ( items ) {
    if ( items.isSelection ) {
        $.open();
    }
} );
//打开划词翻译
//$.open();
//$.close();