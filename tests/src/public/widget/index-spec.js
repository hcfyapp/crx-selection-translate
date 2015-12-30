import Vue from 'vue';
import widget from '../../../../src/public/widget/index';

const fakeClient = {
  send() {}
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
    spyOn( vm , '$emit' );
    fakeClient.send.and.returnValue( Promise.resolve( '翻译结果' ) );
    vm.getResult();
    expect( vm.$emit ).toHaveBeenCalledWith( 'beforeQuery' );
    expect( fakeClient.send ).toHaveBeenCalledWith( 'translate' , vm.query , true );
    vm.$nextTick( ()=> {
      expect( vm.result ).toBe( '翻译结果' );
      done();
    } );
  } );

  it( '打开设置页时会发送 openTab 命令到后台' , ()=> {
    vm.openOptions();
    expect( fakeClient.send ).toHaveBeenCalledWith( 'openTab' , {
      url : 'options/index.html'
    } );
  } );

  it( '复制文本时会发送 copy 命令到后台' , ()=> {
    vm.copy( 'text' );
    expect( fakeClient.send ).toHaveBeenCalledWith( 'copy' , 'text' );

    const texts = [ 't' , 'e' , 'x' , 't' ];
    vm.copy( texts );
    expect( fakeClient.send ).toHaveBeenCalledWith( 'copy' , texts.join( '\n' ) );
  } );

  it( '播放语音时会发送 play 命令至后台' , ()=> {
    vm.result.api.id = '翻译 API 的 id';
    vm.result.from = '翻译结果的源语种';
    vm.result.to = '翻译结果的目标语种';

    vm.play( 'test' );
    expect( fakeClient.send ).toHaveBeenCalledWith( 'play' , {
      text : 'test' ,
      api : '翻译 API 的 id' ,
      from : '翻译结果的目标语种'
    } );

    vm.play( 'test' , true );
    expect( fakeClient.send ).toHaveBeenCalledWith( 'play' , {
      text : 'test' ,
      api : '翻译 API 的 id' ,
      from : '翻译结果的源语种'
    } );

    vm.play( [ 't' , 'e' ] );
    expect( fakeClient.send ).toHaveBeenCalledWith( 'play' , {
      text : 't\ne' ,
      api : '翻译 API 的 id' ,
      from : '翻译结果的目标语种'
    } );
  } );
} );
