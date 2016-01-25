import {listeners,onStorageChanged,default as main} from '../../../src/public/storage-watcher';

describe( '数据监控器' , ()=> {
  it( '只会报告变化数据的 newValue' , ()=> {
    const spy = jasmine.createSpy( 's' );
    listeners.push( spy );
    onStorageChanged( {
      test : {
        newValue : 'x'
      }
    } , 'y' );
    expect( spy ).toHaveBeenCalledWith( { test : 'x' } , 'y' );
    listeners.pop();
  } );

  describe( '注册监听事件时' , ()=> {
    let spy , removeListener;
    beforeEach( ()=> {
      spy = jasmine.createSpy( 's' );
      removeListener = main( 'x' , 'y' , spy );
    } );

    afterEach( removeListener );

    it( '没有监听的字段变化不会触发回调' , ()=> {
      onStorageChanged( {
        z : {
          newValue : 'x'
        }
      } , 'y' );
      expect( spy ).not.toHaveBeenCalled();
    } );

    it( '没有监听的作用域变化不会触发回调' , ()=> {
      onStorageChanged( {
        x : {
          newValue : 'x'
        }
      } , 'z' );
      expect( spy ).not.toHaveBeenCalled();
    } );

    it( '若没有监听的字段发生变化则不触发回调' , ()=> {
      onStorageChanged( {
        y : {
          newValue : 'x'
        }
      } , 'y' );
      expect( spy ).not.toHaveBeenCalled();
    } );

    it( '指定作用域的指定字段发生变化才会触发回调' , ()=> {
      onStorageChanged( {
        x : {
          newValue : 'x'
        } ,
        y : {
          newValue : 't'
        }
      } , 'y' );
      expect( spy ).toHaveBeenCalledWith( { x : 'x' } , 'y' );
    } );
  } );

  it( '的作用域可以忽略，此时会接收来自任何作用域的变化' , ()=> {
    const spy = jasmine.createSpy( 's' );
    main( 'x' , spy );
    onStorageChanged( {
      x : {
        newValue : 'x'
      }
    } , 'y' );
    expect( spy ).toHaveBeenCalledWith( { x : 'x' } , 'y' );
  } );

  describe( '的键和作用域可以为数组' , ()=> {
    it( '' , ()=> {
      const spy = jasmine.createSpy( 's' );
      main( [ 'x' , 'y' ] , [ 'z' ] , spy );
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
      } , 'z' );
      expect( spy ).toHaveBeenCalledWith( { x : 'x' , y : 'x' } , 'z' );
    } );

    it( '' , ()=> {
      const spy = jasmine.createSpy( 's' );
      main( [ 'x' , 'y' ] , [ 'z' ] , spy );
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
      } , 'y' );
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
