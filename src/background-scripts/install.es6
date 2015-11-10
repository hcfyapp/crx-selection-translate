/**
 * @files 扩展从旧版升级至新版或安装时要写入默认设置
 * @requires chromeStorage
 */

(( namespace , storage )=> {
  const {runtime,tabs} = chrome ,
    defaultConfig = {
      reminded : true ,
      autoPlay : false ,
      showMenu : true ,
      autoClipboard : true ,
      defaultApi : "YouDao" ,
      defaultTo : 'auto' ,
      needCtrl : false ,
      showBtn : true ,
      ignoreChinese : true ,
      ignoreNumLike : true ,
      excludesUrl : [] ,
      ignoresText : []
    };

  // 安装时提示用户划词翻译已升级至最新版
  runtime.onInstalled.addListener( details => {
    const {reason} = details;

    if ( reason === 'install' ) { // 安装了新版
      storage.set( defaultConfig );
      remindInstalled();
    } else if ( reason === 'update' && details.previousVersion[ 0 ] === '5' ) { // 从旧版升级
      remindNewVersion();

      storage
        .getAll()
        .then( items => {
          items.showBtn = items.showTranslateButton;
          delete items.showTranslateButton;
          return storage.clear();
        } )
        .then( ()=> storage.set( Object.assign( defaultConfig , items ) ) );
    }
  } );

  /**
   * 提醒用户升级到新版了，跟旧版有哪些不同
   * @returns {Promise}
   */
  function remindNewVersion() {
    return storage
      .get( 'reminded' )
      .then( ( {reminded} ) => {
        if ( !reminded ) {
          storage.set( 'reminded' , true );
          tabs.create( { url : 'https://www.baidu.com' } );
        }
      } );
  }

  /**
   * 用户安装新版之后，打开一个欢迎页面
   * @returns {Promise}
   */
  function remindInstalled() {
    return new Promise( ( resolve , reject )=> {
      tabs.create( { url : 'http://www.limingkai.cn/' } , resolve );
    } );
  }
})( typeof CRX !== 'undefined' ? CRX : (window.CRX = {}) , chromeStorage );
