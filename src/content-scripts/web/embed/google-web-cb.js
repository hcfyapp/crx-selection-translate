/**
 * 谷歌网页翻译的回调函数需要在宿主网页上下文中运行。
 * 这段脚本会被当做一个内联脚本嵌入到宿主网页中，见 ../web.js@google()
 */
function googleTranslateElementInit() {
  new google.translate.TranslateElement( {
    pageLanguage : 'en' ,
    layout : google.translate.TranslateElement.FloatPosition.TOP_LEFT ,
    autoDisplay : true ,
    multilanguagePage : true
  } , 'google_translate_element' );

  /**
   * 在谷歌翻译准备好了之后自动触发网页翻译，而不需要用户选择一下。
   */
  ready( function ( select ) {
    if ( !select.value ) {
      select.value = 'zh-CN';
    }
    select.dispatchEvent( new Event( 'change' ) );
  } );

  /**
   * 当谷歌网页翻译准备好了之后调用回调函数。
   * @param {Function} cb
   */
  function ready( cb ) {
    var tryCount = 0;

    tryGetSelect();

    function tryGetSelect() {
      var select = document.querySelector( '#google_translate_element select.goog-te-combo' );
      if ( select && select.options.length ) {
        cb( select );
      } else {
        tryCount += 1;
        if ( tryCount > 10 ) {
          alert( '无法加载谷歌网页翻译。' );
        } else {
          setTimeout( function () {
            tryGetSelect( cb );
          } , 100 );
        }
      }
    }
  }
}
