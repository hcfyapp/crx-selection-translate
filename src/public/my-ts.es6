/**
 * @files 基于 translation.js 创建自己的翻译实例
 * @requires Translation
 */
(( namespace )=> {
  const timeout = 3000 ,
    ts = new Translation();

  ts.create( 'BaiDu' , {
    apiKey : 'Hs18iW3px3gQ6Yfy6Za0QGg4' ,
    timeout
  } );

  ts.create( 'YouDao' , {
    apiKey : '1361128838' ,
    keyFrom : 'chrome' ,
    timeout
  } );

  namespace.ts = ts;
})( typeof CRX !== 'undefined' ? CRX : (window.CRX = {}) );
