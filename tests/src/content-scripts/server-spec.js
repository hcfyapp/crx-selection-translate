import * as main from '../../../src/content-scripts/server';
import st from '../../../src/content-scripts/st';

describe( '内容脚本' , ()=> {

  // 多数浏览器都不支持改写 self 与 top 的值了，忽略此测试
  //describe( '接收到报告 location 的命令时' , ()=> {
  //  it( '不处于顶层 frame 则不报告' , ()=> {
  //    const {self,top} = window;
  //    const spy = jasmine.createSpy( 'x' );
  //
  //    window.self = '1. 被 server-spec.js 修改-1';
  //    window.top = '1. 被 server-spec.js 修改-2';
  //    main.onGetLocation( undefined , spy );
  //    expect( spy ).not.toHaveBeenCalled();
  //    window.self = self;
  //    window.top = top;
  //  } );
  //
  //  it( '仅当自身处于顶层 frame 时 才会报告 location' , ()=> {
  //    const {self,top} = window;
  //    const spy = jasmine.createSpy( 'x' );
  //
  //    window.self = window.top = '2. 被 server-spec.js 修改';
  //    console.log(window.self);
  //    console.log(window.top);
  //    main.onGetLocation( undefined , spy );
  //    expect( spy ).toHaveBeenCalledWith( JSON.parse( JSON.stringify( location ) ) );
  //    window.self = self;
  //    window.top = top;
  //  } );
  //} );

  it( '接收到翻译命令时会调用翻译方法' , ()=> {
    spyOn( st , 'safeTranslate' );
    main.onTranslate();
    expect( st.safeTranslate ).toHaveBeenCalled();
  } );

} );
