import '../public/bootstrap-lite.scss';
import './popup.scss';

import 'babel-polyfill';
import Vue from 'vue';
import createST from 'selection-widget';
import storage from 'chrome-storage-wrapper';

import template from '../content-scripts/tpl.html';
import * as util from '../public/util';

Vue.config.debug = true;

storage
  .get( 'defaultApi' )
  .then( ( { defaultApi } )=> {
    const stConfig = createST( {
      template ,
      btn : '.st-btn' ,
      box : '.st-box' ,
      getResult() {
        this.result = { result : this.query.text };
        return Promise.resolve();
      } ,
      mixins : [
        {
          data() {
            return {
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
            };
          } ,
          methods : {
            openOptions : util.noop
          }
        }
      ]
    } );

    const app = new Vue( {
      el : '#app' ,
      data : {
        canInject : false ,
        enabled : false
      } ,
      methods : {
        switchEnable() {
          const enabled = this.enabled = !this.enabled;
          // todo
        }
      } ,
      components : {
        'st-box' : stConfig
      }
    } );

    app.$refs.st.inline = true;
  } );

Promise.all( [
  util.getTabLocation() ,
  storage.get( [ 'excludeDomains' , 'defaultApi' ] )
] ).then( ( [locationObj, { excludeDomains , defaultApi }] ) => {

  const {host} = locationObj;
  app.enabled = !excludeDomains.some( domain => domain === host );
  app.canInject = true;
} , util.noop );
