import Vue from 'vue';
import settingsOptions from '../../../../src/options/settings/index';

describe( '设置页' , ()=> {

  it( '在进入时会读取扩展设置' , async done => {
    spyOn( chrome.storage.local , 'get' ).and.callFake( ( x , cb )=> cb( { hello : 'world' } ) );
    const options = await settingsOptions.route.data();
    expect( options.options ).toEqual( {
      hello : 'world'
    } );
    done();
  } );

  describe( '在初始化后' , ()=> {
    let app;
    beforeEach( ()=> {
      spyOn( chrome.storage.local , 'set' );
      app = new Vue( Object.assign( {
        el : document.createElement( 'div' )
      } , settingsOptions ) );
    } );

    it( 'options 变化时会将它保存到扩展中' , done => {
      app.options = { x : 'y' };
      app.$nextTick( ()=> {
        expect( chrome.storage.local.set ).toHaveBeenCalled();
        done();
      } );
    } );

    it( 'showAddForm 会显示表单' , ()=> {
      app.tmpDomain = 'w';
      app.showAddForm();
      expect( app.showAdd ).toBe( true );
      expect( app.tmpDomain ).toBe( '' );
    } );

    it( 'addExclude 会添加规则' , ()=> {
      app.tmpDomain = 'w';
      app.addExclude();
      expect( app.options.excludeDomains ).toEqual( [ 'w' ] );
      expect( app.showAdd ).toBe( false );
    } );
  } );

} );
