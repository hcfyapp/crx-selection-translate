import chromeCall from 'chrome-call';
import getOptions from '../../public/default-options';
import template from './template.html';

export default {
  template ,
  data : ()=> ({
    clearSuccess : false,
    options : {
      excludeDomains: []
    } ,
    showAdd : false ,
    tmpDomain : '',
    showYDApi : false,
    addYouDaoAPI : {
      apiKey : '',
      keyFrom : ''
    }
  }) ,
  methods : {

    clearToken() {
      chromeCall('storage.local.set', { access_token: null })
        .then((res) => {
          this.clearSuccess = true
          setTimeout(() => {
            this.clearSuccess = false
          }, 2000);
        });
    },

    gotoAccess() {
      chrome.runtime.sendMessage({ action: 'shanbay_authorize' })
    } ,
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
      // Firefox 浏览器中直接传入 Vue 的对象会"静默失败"：数据没有存进去，但也没有报错
      // 这里需要转一下才能正常存进去数据
      handler: newVal => chromeCall('storage.local.set', JSON.parse(JSON.stringify(newVal))),
      deep : true
    }
  } ,
  route : {
    async data() {
      return { options : await getOptions( null ) };
    }
  }
};
