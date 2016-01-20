import 'babel-polyfill';
import Vue from 'vue';
import storage from 'chrome-storage-wrapper';

import './popup.scss';

import widget from '../public/widget/index';
import {Client,send} from 'connect.io';
import util from '../public/util';
import clipboard from '../public/clipboard';
import template from './tpl.html';

const client = new Client();

const main = async ()=> {
  let host; // 保存当前标签页的 host，用于给 switchEnable 方法进行判断
  const app = new Vue( {
    el : document.createElement( 'div' ) ,
    template ,
    data : {
      canInject : false ,
      enabled : false
    } ,
    methods : {

      /**
       * 切换是否在当前域名启用
       */
      async switchEnable() {
        const enabled = this.enabled = !this.enabled ,
          {excludeDomains:ex} = await storage.get( 'excludeDomains' );

        if ( enabled ) {
          ex.splice( ex.indexOf( host ) , 1 );
        } else {
          ex.push( host );
        }

        return storage.set( 'excludeDomains' , ex );
      } ,

      /**
       * 使用指定的网页翻译当前标签页
       * @param {String} webName
       */
      async webTranslate( webName ) {
        const tabId = await new Promise( resolve => {
          chrome.tabs.query( { active : true } , ( [{id}] ) => resolve( id ) );
        } );

        send( {
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
      'st-box' : widget( client )
    } ,
    compiled() {
      this.$appendTo( 'body' );
    }
  } );

  const {st} = app.$refs ,
    [ {excludeDomains , defaultApi,autoClipboard} , locationObj ] = await Promise.all( [
      storage.get( [ 'excludeDomains' , 'defaultApi' , 'autoClipboard' ] ) ,
      util.getTabLocation()
    ] );

  st.inline = true;
  st.showForm = true;
  st.query.api = defaultApi;

  if ( autoClipboard ) {
    const c = clipboard.read();
    if ( c ) {
      st.query.text = c;
      st.translate();
    }
  }

  setTimeout( ()=> st.$els.textarea.focus() , 200 );

  if ( locationObj ) {
    host = locationObj.host;
    app.enabled = util.isHostEnabled( locationObj , excludeDomains );
    app.canInject = true;
  }
  /* istanbul ignore if */
  if ( TEST ) {
    return app;
  }
};

/* istanbul ignore if */
if ( !TEST ) {
  main();
}

/* istanbul ignore next */
export default TEST ? main : undefined;


