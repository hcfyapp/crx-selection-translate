import chromeCall from 'chrome-call';
import getOptions from '../../public/default-options';
import template from './template.html';

export default {
  template ,
  data : ()=> ({
    options : null ,
    showAdd : false ,
    tmpDomain : '',
    showYDApi : false,
    addYouDaoAPI : {
      apiKey : '',
      keyFrom : ''
    }
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
    },

    /**
     * 显示添加有道翻译 API 的表单
     */
    showYDForm() {
      this.showYDApi = true;
    },

    /**
     * 隐藏有道翻译 API 的表单
     */
    hideYDForm() {
      this.showYDApi = false;
      this.addYouDaoAPI = {
        apiKey : '',
        keyFrom : ''
      };
    },

    /**
     * 添加有道 API
     */
    addYDApi() {
      this.options.youDaoApi.push( this.addYouDaoAPI );
      this.hideYDForm();
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
      return { options : await getOptions( null ) };
    }
  }
};
