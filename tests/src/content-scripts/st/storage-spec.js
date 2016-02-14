import bindStorage from '../../../../src/content-scripts/st/storage';

describe( '绑定设置的函数' , ()=> {
  let fakeSt , playSpy;

  beforeEach( ()=> {
    spyOn( chrome.storage.local , 'get' ).and.callFake( ( x , cb )=> {
      cb( { disableSelection : false } );
    } );
  } );

  beforeEach( ()=> {
    playSpy = jasmine.createSpy( 'play spy' );
    fakeSt = {
      query : { api : 'not default' } ,
      boxPos : { show : false } ,
      selection : true ,
      autoPlay : false ,
      play : playSpy
    };
    bindStorage( fakeSt );
  } );

  it( '在窗口显示之后更新默认翻译引擎' , ()=> {
    fakeSt.__onBoxShow( true );
    expect( fakeSt.query.api ).toBe( 'not default' );
    fakeSt.__onBoxShow( false );
    expect( fakeSt.query.api ).toBe( '' );
  } );

  describe( '在翻译之后' , ()=> {
    it( '若没开启自动翻译则不会翻译' , ()=> {
      fakeSt.autoPlay = false;
      fakeSt.__afterTs();
      expect( playSpy ).not.toHaveBeenCalled();
    } );

    describe( '若开启了自动翻译' , ()=> {
      beforeEach( ()=> {
        fakeSt.autoPlay = true;
      } );

      it( '若翻译的文本过长则不会朗读' , ()=> {
        fakeSt.query.text = 'x'.repeat( 50 );
        fakeSt.__afterTs();
        expect( playSpy ).not.toHaveBeenCalled();
      } );

      it( '若翻译的文本不长则朗读' , ()=> {
        fakeSt.query.text = 'x'.repeat( 49 );
        fakeSt.__afterTs();
        expect( playSpy ).toHaveBeenCalledWith( fakeSt.query.text , undefined );
      } );
    } );
  } );

  it( '禁用列表发生变化时会重新计算是否开启划词翻译' , async ( done )=> {
    fakeSt.selection = true;
    await fakeSt.__onStorageChanged( { excludeDomains : [ location.host ] } );
    expect( fakeSt.selection ).toBe( false );

    await fakeSt.__onStorageChanged( { excludeDomains : [] } );
    expect( fakeSt.selection ).toBe( true );
    done();
  } );

  it( '默认翻译接口发生变化时会重设' , ()=> {
    fakeSt.boxPos.show = true;
    fakeSt.__onStorageChanged( { defaultApi : 'hello' } );
    expect( fakeSt.query.api ).toBe( 'not default' );

    fakeSt.boxPos.show = false;
    fakeSt.__onStorageChanged( { defaultApi : 'hello' } );
    expect( fakeSt.query.api ).toBe( 'hello' );
  } );
} );
