import Vue from 'vue';
import voicesOptions from '../../../../src/options/voices/index';

function getDiffOptions() {
  return Object.assign( {
    el : document.createElement( 'div' ) ,
    compiled () { this.$appendTo( 'body' ); }
  } , voicesOptions );
}

describe( '语音列表页' , ()=> {

  it( '在进入时会读取所有可用的语音' , async done => {
    spyOn( chrome.tts , 'getVoices' ).and.callFake( cb => {
      cb( [
        {
          name : 'voice name'
        }
      ] );
    } );
    const voices = await voicesOptions.route.data();
    expect( voices.voices ).toEqual( [
      {
        name : 'voice name'
      }
    ] );
    done();
  } );

  describe( '转换地区 id 为人类可读的地区名称时' , ()=> {
    let app;

    beforeEach( ()=> {
      app = new Vue( getDiffOptions() );
    } );

    it( '若地区 id 为空则返回“未知”' , async done => {
      const name = await app.getLocaleName();
      expect( name ).toBe( '未知' );
      done();
    } );

    it( '若地区列表里有指定的地区 id 则返回对应名称' , async done => {
      const name = await app.getLocaleName( 'zh-CN' );
      expect( name ).toBe( '中文(简体)' );
      done();
    } );

    it( '若地区列表里没有指定的地区 id 则返回此地区 id' , async done => {
      const name = await app.getLocaleName( '没有哦' );
      expect( name ).toBe( '没有哦' );
      done();
    } );
  } );
} );
