import {listeners,onStorageChanged,default as main} from '../../../src/public/storage-watcher';

// 虽然 watcher 会先查询一次 storage 并触发一次回调,
// 但是在测试环境中 chrome.storage.local.get 不会执行回调函数
// 所以下面的测试中, spy 最多只会被执行一次

describe( '数据监控器' , ()=> {
  it( '只会报告变化数据的 newValue' , ()=> {
    const spy = jasmine.createSpy( 's' );
    listeners.push( spy );
    onStorageChanged( {
      test : {
        newValue : 'x'
      }
    } , 'sync' );
    expect( spy ).toHaveBeenCalledWith( { test : 'x' } , 'sync' );
    listeners.pop();
  } );

  describe( '注册监听事件时' , ()=> {
    let spy , removeListener;
    beforeEach( ()=> {
      spy = jasmine.createSpy( 's' );
      removeListener = main( 'x' , spy );
    } );

    afterEach( ()=> {
      removeListener();
    } );

    it( '没有监听的字段变化不会触发回调' , ()=> {
      onStorageChanged( {
        z : {
          newValue : 'x'
        }
      } , 'local' );
      expect( spy ).not.toHaveBeenCalled();
    } );

    it( '没有监听的作用域变化不会触发回调' , ()=> {
      onStorageChanged( {
        x : {
          newValue : 'x'
        }
      } , 'sync' );
      expect( spy ).not.toHaveBeenCalled();
    } );

    it( '若没有监听的字段发生变化则不触发回调' , ()=> {
      onStorageChanged( {
        y : {
          newValue : 'x'
        }
      } , 'local' );
      expect( spy ).not.toHaveBeenCalled();
    } );

    it( '监听的字段发生变化才会触发回调' , ()=> {
      onStorageChanged( {
        x : {
          newValue : 'x'
        } ,
        y : {
          newValue : 't'
        }
      } , 'local' );
      expect( spy ).toHaveBeenCalledWith( { x : 'x' } , 'local' );
    } );
  } );

  it( '的作用域可以忽略，此时会接收来自 local 作用域的变化' , ()=> {
    const spy = jasmine.createSpy( 's' );
    main( 'x' , spy );
    onStorageChanged( {
      x : {
        newValue : 'x'
      }
    } , 'local' );
    expect( spy ).toHaveBeenCalledWith( { x : 'x' } , 'local' );
  } );

  describe( '的键和作用域可以为数组' , ()=> {
    it( '' , ()=> {
      const spy = jasmine.createSpy( 's' );
      main( [ 'x' , 'y' ] , [ 'sync' ] , spy );
      onStorageChanged( {
        x : {
          newValue : 'x'
        } ,
        y : {
          newValue : 'x'
        } ,
        a : {
          newValue : 'x'
        }
      } , 'sync' );
      expect( spy ).toHaveBeenCalledWith( { x : 'x' , y : 'x' } , 'sync' );
    } );

    it( '' , ()=> {
      const spy = jasmine.createSpy( 's' );
      main( [ 'x' , 'y' ] , [ 'sync' ] , spy );
      onStorageChanged( {
        x : {
          newValue : 'x'
        } ,
        y : {
          newValue : 'x'
        } ,
        a : {
          newValue : 'x'
        }
      } , 'local' );
      expect( spy ).not.toHaveBeenCalled();
    } );
  } );

  it( '返回的函数可以用于删除监听函数' , ()=> {
    const spy = jasmine.createSpy( 's' );
    const remove = main( 'x' , spy );
    remove();
    onStorageChanged( {
      x : {
        newValue : 'x'
      }
    } , 'y' );
    expect( spy ).not.toHaveBeenCalled();
  } );
} );
