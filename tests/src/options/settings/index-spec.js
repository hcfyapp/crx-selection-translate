import Vue from 'vue';
import storage from 'chrome-storage-wrapper';
import settingsOptions from '../../../../src/options/settings/index';

function getDiffOptions() {
  return Object.assign( {
    el : document.createElement( 'div' ) ,
    compiled () { this.$appendTo( 'body' ); }
  } , settingsOptions );
}

describe( '设置页' , ()=> {

  it( '在进入时会读取扩展设置' , async done => {
    spyOn( storage , 'getAll' ).and.returnValue( Promise.resolve( {
      hello : 'world'
    } ) );
    const options = await settingsOptions.route.data();
    expect( options.options ).toEqual( {
      hello : 'world'
    } );
    done();
  } );

  it( 'options 变化时会将它保存到扩展中' , done => {
    spyOn( storage , 'set' );
    const app = new Vue( getDiffOptions() );
    app.options = { x : 'y' };
    app.$nextTick( ()=> {
      expect( storage.set ).toHaveBeenCalledWith( { x : 'y' } );
      done();
    } );
  } );
} );
