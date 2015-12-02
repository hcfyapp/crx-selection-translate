import 'babel-polyfill';
import Vue from 'vue';
import storage from 'chrome-storage-wrapper';

import './popup.scss';

import widget from '../public/widget/index';
import util from '../public/util';

if ( DEBUG ) {
  Vue.config.debug = true;
}

(async ()=> {
  let host;
  const [ {excludeDomains , defaultApi} , locationObj ] = await Promise.all( [
      storage.get( [ 'excludeDomains' , 'defaultApi' ] ) ,
      util.getTabLocation()
    ] ) ,
    app = new Vue( {
      el : 'body' ,
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

          storage.set( 'excludeDomains' , ex );
        }
      } ,
      components : {
        'st-box' : widget
      }
    } ) ,
    {st} = app.$refs;

  st.inline = true;
  st.query.api = defaultApi;

  if ( locationObj ) {
    host = locationObj.host;
    app.enabled = !excludeDomains.some( domain => domain === host );
    app.canInject = true;
  }
})();
