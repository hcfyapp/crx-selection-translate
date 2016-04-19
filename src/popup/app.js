import Vue from 'vue';
import template from './tpl.html';
import chromeCall from 'chrome-call';
import getOptions from '../public/default-options';
import {send} from 'connect.io';
import {getTabLocation,isHostEnabled,getCurrentTabId} from '../public/util';
import ST from './st';

export const appOptions = {
  el : document.body ,
  replace: false,
  template ,
  data : {
    _host : null ,
    canInject : false ,
    enabled : false
  } ,
  methods : {

    /**
     * 切换是否在当前域名启用。
     * 之所以不用 watch 是因为在 compiled 事件才会初始化 enabled
     */
    async switchEnable() {
      const {_host} = this.$data ,
        enabled = this.enabled = !this.enabled ,
        {excludeDomains} = await getOptions( 'excludeDomains' );

      if ( enabled ) {
        excludeDomains.splice( excludeDomains.indexOf( _host ) , 1 );
      } else {
        excludeDomains.push( _host );
      }
      return chromeCall( 'storage.local.set' , { excludeDomains } );
    } ,

    /**
     * 使用指定的网页翻译当前标签页
     * @param {String} webName
     */
    async webTranslate( webName ) {
      await send( {
        tabId : await getCurrentTabId() ,
        name : 'web translate' ,
        data : webName ,
        needResponse : true
      } );

      window.close();
    }
  } ,
  components : {
    'st-box' : ST
  } ,
  async ready() {
    const locationObj = await getTabLocation();

    if ( locationObj ) {
      this.$data._host = locationObj.host;
      this.enabled = await isHostEnabled( locationObj );
      this.canInject = true;
    }
  }
};

/* istanbul ignore if */
if ( process.env.NODE_ENV !== 'testing' ) {
  window.onload = ()=> {
    setTimeout( ()=> new Vue( appOptions ) , 0 );
  };
}
