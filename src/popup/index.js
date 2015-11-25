import 'babel-polyfill';
import Vue from 'vue';
import createST from 'selection-widget';
import storage from 'chrome-storage-wrapper';

import '../public/bootstrap-lite.scss';
import './popup.scss';

import template from '../content-scripts/tpl.html';
import util from '../public/util';

Vue.config.debug = true;

(async ()=> {
  let host;
  const [ {excludeDomains , defaultApi} , locationObj ] = await Promise.all( [
      storage.get( [ 'excludeDomains' , 'defaultApi' ] ) ,
      util.getTabLocation()
    ] ) ,
    stConfig = createST( {
      template ,
      btn : '.st-btn' ,
      box : '.st-box' ,
      getResult() {
        this.result = { result : this.query.text };
        return Promise.resolve();
      } ,
      mixins : [
        {
          data : ()=> ({
            query : {
              from : '' ,
              to : '' ,
              api : defaultApi
            } ,
            result : {
              phonetic : '' ,
              detailed : [] ,
              result : '' ,
              linkToResult : '' ,
              response : {} ,
              api : {
                name : ''
              }
            }
          }) ,
          methods : {
            openOptions : util.noop
          }
        }
      ]
    } ) ,
    app = new Vue( {
      el : '#app' ,
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
        'st-box' : stConfig
      }
    } );

  app.$refs.st.inline = true;

  if ( locationObj ) {
    host = locationObj.host;
    app.enabled = !excludeDomains.some( domain => domain === host );
    app.canInject = true;
  }
})();
