/**
 * @files 基于 translation.js 创建自己的翻译实例
 */
import T from 'translation.js';
const timeout = 3000 ,
  ts = new T();

ts.create( 'BaiDu' , {
  apiKey : 'Hs18iW3px3gQ6Yfy6Za0QGg4' ,
  timeout
} );

ts.create( 'YouDao' , {
  apiKey : '1361128838' ,
  keyFrom : 'chrome' ,
  timeout
} );

export default ts;
