import Vue from 'vue';
import aboutOptions from '../../../../src/options/about/index';

function getDiffOptions() {
  return Object.assign( {
    el : document.createElement( 'div' ) ,
    compiled () { this.$appendTo( 'body' ); }
  } , aboutOptions );
}

describe( '关于页面' , ()=> {

  it( '当有可用更新时会显示新版本号' , ()=> {
    spyOn( chrome.runtime , 'requestUpdateCheck' ).and.callFake( fn => {
      fn( 'update_available' , { version : 'hello' } );
    } );
    const app = new Vue( getDiffOptions() );
    expect( app.newVersion ).toBe( 'hello' );
  } );

  it( '若没有可用更新，新版本号会是空' , ()=> {
    spyOn( chrome.runtime , 'requestUpdateCheck' ).and.callFake( fn => {
      fn( '' , { version : 'hello' } );
    } );
    const app = new Vue( getDiffOptions() );
    expect( app.newVersion ).toBeNull();
  } );

} );
