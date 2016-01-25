import client from './client';
import Widget from '../public/widget/index';
import chromeCall from 'chrome-call';
import {read} from '../public/clipboard';

export default Widget.extend( {
  client ,
  async compiled() {
    this.inline = true;
    this.showForm = true;
    const {defaultApi , autoClipboard} = await chromeCall( 'storage.local.get' , [ 'defaultApi' , 'autoClipboard' ] );

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
