import storage from 'chrome-storage-wrapper';

import template from './settings.html';

export default {
  template ,
  data : ()=>({
    options : {
      excludeDomains : [] // 防止应用启动时模版报错
    } ,
    showAdd : false ,
    tmpDomain : ''
  }) ,
  watch : {
    options : {
      handler : newVal => storage.set( newVal ) ,
      deep : true
    }
  } ,
  route : {
    async data() {
      const options = await storage.getAll();
      return { options };
    }
  }
};
