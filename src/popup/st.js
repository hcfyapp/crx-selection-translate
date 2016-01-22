import client from './client';
import Widget from '../public/widget/index';
import chromeCall from 'chrome-call';
import clipboard from '../public/clipboard';

export default Widget.extend( {
  client ,
  async compiled() {
    this.inline = true;
    this.showForm = true;

    const {defaultApi , autoClipboard} = await chromeCall( 'storage.local.get' , [ 'defaultApi' , 'autoClipboard' ] );

    this.query.api = defaultApi;
    if ( autoClipboard ) {
      const c = clipboard.read();
      if ( c ) {
        this.query.text = c;
        this.translate();
      }
    }
  } ,
  ready() {
    setTimeout( ()=> this.$els.textarea.focus() , 200 );
  }
} );
