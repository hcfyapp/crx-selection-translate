import chromeCall from 'chrome-call';
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

    /**
     * 添加禁用域名
     */
    addExclude() {
      this.options.excludeDomains.push( this.tmpDomain );
      this.cancelAdd();
    } ,

    /**
     * 显示添加禁用域名的表单
     */
    showAddForm() {
      this.tmpDomain = '';
      this.showAdd = true;
      this.$nextTick( ()=> this.$els.domainInput.focus() );
    } ,

    /**
     * 取消添加禁用域名
     */
    cancelAdd() {
      this.showAdd = false;
    }
  } ,
  watch : {
    options : {
      handler : newVal => chromeCall( 'storage.local.set' , newVal ) ,
      deep : true
    }
  } ,
  route : {
    async data() {
      return { options : await chromeCall( 'storage.local.get' , null ) };
    }
  }
};
