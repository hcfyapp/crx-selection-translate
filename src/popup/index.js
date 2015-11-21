import '../public/bootstrap-lite.scss';
import './popup.scss';
import Vue from 'vue';
import ST from 'selection-widget';
import storage from 'chrome-storage-wrapper';
import template from '../content-scripts/tpl.html';

const app = new Vue( {
  el : '#app'
} );
const st = new ST( {
  el : 'st-box' ,
  parent : app ,
  template ,
  _btn : '.st-btn' ,
  _box : '.st-box' ,
  _drag : 'header' ,
  _getResult( queryObj ) {
    return Promise.resolve( {
      result : queryObj.text
    } );
  }
} );
