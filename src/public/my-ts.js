/**
 * @files 基于 translation.js 创建自己的翻译实例
 */
import T from 'translation.js';
import getOptions from './default-options';
import watch from './storage-watcher';

const timeout = 15000 ,
  ts = new T();

ts.create( 'BaiDu' , { timeout } );

ts.create( 'YouDao' , {
  apiKey : '1361128838' ,
  keyFrom : 'chrome' ,
  timeout
} );

watch('youDaoApi',( { youDaoApi } )=> {
  ts.api.YouDao = []; // 清空自带的 api key
  if( youDaoApi.length ) {
    youDaoApi.forEach( ( api )=> {
      api.timeout = timeout;
      ts.create( 'YouDao' , api );
    });
  } else {
    ts.create( 'YouDao' , {
      apiKey : '1361128838' ,
      keyFrom : 'chrome' ,
      timeout
    } );
  }
});

getOptions( 'youDaoApi' ).then( ( { youDaoApi } )=> {
  if( youDaoApi.length ) {
    ts.api.YouDao = []; // 清空自带的 api key
    youDaoApi.forEach( ( api )=> {
      api.timeout = timeout;
      ts.create( 'YouDao' , api );
    });
  }
} );

ts.create( 'Bing' , { timeout } );
ts.create( 'Google' , { timeout : 20000 } );
ts.create( 'GoogleCN' , { timeout } );

export default ts;
