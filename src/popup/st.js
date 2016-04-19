/**
 * @files 弹出页里的 ST 组件
 */

import client from './client';
import Widget from '../public/widget/index';
import getOptions from '../public/default-options';
import {read} from '../public/clipboard';

export default Widget.extend( {
  client ,
  async compiled() {
    this.inline = true;
    this.showForm = true;
    const {defaultApi , autoClipboard} = await getOptions( [ 'defaultApi' , 'autoClipboard' ] );

    this.query.api = defaultApi;
    if ( autoClipboard ) {
      this.query.text = read();
      this.safeTranslate();
    }
  } ,
  ready() {
    setTimeout( ()=> this.$els.textarea.focus() , 200 );
  }
} );
