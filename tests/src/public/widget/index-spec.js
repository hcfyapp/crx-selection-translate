import Vue from 'vue';
import Widget from '../../../../src/public/widget/index';

describe( '翻译组件' , ()=> {
  let vm , fakeClient;
  beforeEach( ()=> {
    fakeClient = jasmine.createSpyObj( 'client' , [ 'send' , 'once' ] );
    vm = new Widget( { client : fakeClient } );
    vm.$appendTo( 'body' );
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

  it( '若与后台网页的连接已断开则直接返回空 Promise' , async ( done )=> {
    fakeClient.disconnected = true;
    expect( await vm.getResult() ).toBeUndefined();
    done();
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
    const event = {
      target : {
        textContent : '呵呵哒'
      }
    };
    jasmine.clock().install();
    vm.copy( 'text' , event );
    expect( fakeClient.send ).toHaveBeenCalledWith( 'copy' , 'text' );

    const texts = [ 't' , 'e' , 'x' , 't' ];
    vm.copy( texts , {
      target : {
        textContent : ''
      }
    } );
    expect( fakeClient.send ).toHaveBeenCalledWith( 'copy' , texts.join( '\n' ) );
    expect( event.target.textContent ).toBe( '已复制' );
    jasmine.clock().tick( 2001 );
    expect( event.target.textContent ).toBe( '呵呵哒' );
    jasmine.clock().uninstall();
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

  it( '在输入框中 ctrl + Enter 会调用翻译方法' , ()=> {
    spyOn( vm , 'safeTranslate' );

    vm.ctrlEnter( {
      ctrlKey : true
    } );
    expect( vm.safeTranslate ).toHaveBeenCalled();

    vm.ctrlEnter( {
      ctrlKey : false
    } );
    expect( vm.safeTranslate.calls.count() ).toBe( 1 );
  } );

  it( '翻译方法会检查文本是否为空' , ()=> {
    spyOn( vm , 'translate' );

    vm.query.text = '   ';
    vm.safeTranslate();
    expect( vm.translate ).not.toHaveBeenCalled();

    vm.query.text = ' x  ';
    vm.safeTranslate();
    expect( vm.translate ).toHaveBeenCalled();
  } );

  it( '连接断开时会设置 result.error' , ()=> {
    fakeClient.once.calls.first().args[ 1 ]();
    expect( vm.result ).toEqual( {
      error : '连接到翻译引擎时发生了错误，请刷新网页或重启浏览器后再试。'
    } );
  } );
} );
