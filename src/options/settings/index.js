import storage from 'chrome-storage-wrapper';

import template from './template.html';

export default {
  template ,
  data : ()=>({
    options : {
      excludeDomains : [] // 防止应用启动时模版报错
    } ,
    showAdd : false ,
    tmpDomain : ''
  }) ,
  methods : {
    addExclude() {
      this.options.excludeDomains.push( this.tmpDomain );
      this.tmpDomain = '';
      this.showAdd = false;
    }
  } ,
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
