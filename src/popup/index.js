import '../public/bootstrap-lite.scss';
import './popup.scss';
import Vue from 'vue';
import ST from 'selection-widget';
import storage from 'chrome-storage-wrapper';
import template from '../content-scripts/tpl.html';

Vue.config.debug = true;

const app = new Vue( {
  el : '#app'
} );

storage
  .get( 'defaultApi' )
  .then( ( {defaultApi:api} ) => {
    const st = new ST( {
      el : '#st-box' ,
      parent : app ,
      data : {
        query : {
          from : '' ,
          to : '' ,
          api
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
      } ,
      template ,
      methods : {
        openOptions(){}
      } ,
      _btn : '.st-btn' ,
      _box : '.st-box' ,
      _getResult() {
        this.result.result = this.query.text;
        return Promise.resolve();
      }
    } );

    st.inline = true;
  } );
