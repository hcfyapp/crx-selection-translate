import template from './template.html';

const {runtime} = chrome;

export default {
  template ,
  data : ()=>({
    version : runtime.getManifest().version ,
    checking : true ,
    newVersion : null
  }) ,
  ready() {
    runtime.requestUpdateCheck( ( status , details )=> {
      if ( status === 'update_available' ) {
        this.newVersion = details.version;
      }
      this.checking = false;
    } );
  }
};
