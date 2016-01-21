import Vue from 'vue';
import widget from '../../../../src/public/widget/index';

const fakeClient = {
  send() {},
  once() {}
};

function createWidget() {
  const vm = new Vue( widget( fakeClient ) );
  vm.$appendTo( 'body' );
  return vm;
}

describe( '翻译组件' , ()=> {
  let vm;
  beforeEach( ()=> {
    vm = createWidget();
    spyOn( fakeClient , 'send' );
  } );

  it( '获取结果前会触发一次事件、并发送 translate 命令至后台以获取结果' , ( done )=> {
    fakeClient.send.and.returnValue( Promise.resolve( '翻译结果' ) );
    vm.getResult();
    expect( fakeClient.send ).toHaveBeenCalledWith( 'get translate result' , vm.query , true );
    vm.$nextTick( ()=> {
      expect( vm.result ).toBe( '翻译结果' );
      done();
    } );
  } );

  it( 'exchangeLocale 可以交换源语种与目标语种' , ()=> {
    vm.query.to = 'hello';
    vm.query.from = 'world';
    vm.exchangeLocale();
    expect( vm.query.to ).toBe( 'world' );
    expect( vm.query.from ).toBe( 'hello' );
  } );

  it( '打开设置页时会发送 openTab 命令到后台' , ()=> {
    vm.openOptions();
    expect( fakeClient.send ).toHaveBeenCalledWith( 'openTab' , {
      url : 'options/index.html'
    } );
  } );

  it( '复制文本时会发送 copy 命令到后台' , ()=> {
    vm.copy( 'text' , {
      target : {
        textContent : ''
      }
    } );
    expect( fakeClient.send ).toHaveBeenCalledWith( 'copy' , 'text' );

    const texts = [ 't' , 'e' , 'x' , 't' ];
    vm.copy( texts , {
      target : {
        textContent : ''
      }
    } );
    expect( fakeClient.send ).toHaveBeenCalledWith( 'copy' , texts.join( '\n' ) );
  } );

  it( '播放语音时会发送 play 命令至后台' , ()=> {
    vm.query.api = '翻译 API 的 id';

    vm.play( 'test' );
    expect( fakeClient.send ).toHaveBeenCalledWith( 'play' , {
      text : 'test' ,
      api : '翻译 API 的 id' ,
      from : undefined
    } );

    vm.play( [ 't' , 'e' ] );
    expect( fakeClient.send ).toHaveBeenCalledWith( 'play' , {
      text : 't\ne' ,
      api : '翻译 API 的 id' ,
      from : undefined
    } );
  } );
} );
