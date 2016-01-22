import Vue from 'vue';
import template from './tpl.html';
import chromeCall from 'chrome-call';
import {send} from 'connect.io';
import util from '../public/util';
import ST from './st';

export default new Vue( {
  el : document.createElement( 'div' ) ,
  template ,
  data : {
    _host : null ,
    canInject : false ,
    enabled : false
  } ,
  methods : {

    /**
     * 切换是否在当前域名启用
     */
    async switchEnable() {
      const {_host} = this.$data ,
        enabled = this.enabled = !this.enabled ,
        {excludeDomains} = await chromeCall( 'storage.local.get' , 'excludeDomains' );

      if ( enabled ) {
        excludeDomains.splice( ex.indexOf( _host ) , 1 );
      } else {
        excludeDomains.push( _host );
      }
      return chromeCall( 'storage.local.set' , 'excludeDomains' , excludeDomains );
    } ,

    /**
     * 使用指定的网页翻译当前标签页
     * @param {String} webName
     */
    async webTranslate( webName ) {
      const tabId = (await chromeCall( 'tabs.query' , { active : true } ))[ 0 ].id;

      return send( {
        tabId ,
        name : 'web translate' ,
        data : webName ,
        needResponse : true
      } ).then( ()=> {
        window.close();
      } );
    }
  } ,
  components : {
    'st-box' : ST
  } ,
  async compiled() {
    this.$appendTo( 'body' );

    const [ {excludeDomains} , locationObj ] = await Promise.all( [
      chromeCall( 'storage.local.get' , 'excludeDomains' ) ,
      util.getTabLocation()
    ] );

    if ( locationObj ) {
      this.$data._host = locationObj.host;
      this.enabled = util.isHostEnabled( locationObj , excludeDomains );
      this.canInject = true;
    }
  }
} );
