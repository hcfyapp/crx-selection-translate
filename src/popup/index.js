import '../public/bootstrap-lite.scss';
import './popup.scss';
import Vue from 'vue';
import ST from 'selection-widget';
import storage from 'chrome-storage-wrapper';
import template from './tpl.html';

Vue.config.debug = true;

const app = new Vue( {
  el : '#app'
} );

const st = new ST( {
  el : '#st-box' ,
  parent : app ,
  data : {
    query : {
      from : '' ,
      to : ''
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
  _btn : '.st-btn' ,
  _box : '.st-box' ,
  _getResult( queryObj ) {
    return Promise.resolve( {
      result : queryObj.text
    } );
  }
} );

st.inline = true;
