import Vue from 'vue';
import vueST from '../../../../src/public/widget/vue-st';

const ST = Vue.extend( vueST );

const __config__ = ()=> ({ // 测试中为了避免多个实例使用同一个配置对象，所以用函数的方式声明
    data : {
      result : ''
    } ,
    compiled() {
      this.$appendTo( 'body' );
    } ,
    template : `<div>
        <div v-el:st-box :style="boxStyle">
          <header v-el:st-drag>这是默认的模板，仅用于展示功能，请重置为自定义模板！</header>
          <div>
            <textarea placeholder="输入要翻译的文本" required v-model="query.text"></textarea>
            <button type="button" @click="translate()">翻译</button>
          </div>
          <div>{{result.result}}</div>
        </div>
        <div v-el:st-btn :style="btnStyle">译</div>
      </div>` ,
    methods : {
      getResult () {
        this.result = {
          result : this.query.text
        };
        return Promise.resolve();
      }
    }
  }) ,
  __mixin__ = Object.assign ,
  __selection__ = getSelection() ,
  __event__ = {
    preventDefault : ()=> {} ,
    target : document.body ,
    pageX : 0 ,
    pageY : 0 ,
    button : 0 ,
    ctrlKey : false ,
    metaKey : false
  };

describe( 'mouse down 事件' , ()=> {
  let st , e;

  beforeEach( ()=> {
    st = new ST( __config__() );
    e = __mixin__( {} , __event__ );
  } );

  it( '如果点击的是翻译按钮，则直接翻译' , ()=> {
    st.btnPos.show = true;
    e.target = st.$els.stBtn;
    spyOn( st , 'translate' );
    spyOn( e , 'preventDefault' );
    st.$emit( 'mousedown' , e );
    expect( e.preventDefault ).toHaveBeenCalled();
    expect( st.translate ).toHaveBeenCalled();
    expect( st.btnPos.show ).toBe( false );
  } );

  describe( '否则在特定条件下隐藏翻译窗口;翻译按钮在此事件中会始终被隐藏' , ()=> {
    beforeEach( ()=> {
      st.boxPos.show = true;
      st.btnPos.show = true;
    } );

    it( 'loading 状态不隐藏' , ()=> {
      st.loading = true;
      st.$emit( 'mousedown' , e );
      expect( st.boxPos.show ).toBe( true );
      expect( st.btnPos.show ).toBe( false );
    } );

    it( 'pinned 状态不隐藏' , ()=> {
      st.pinned = true;
      st.$emit( 'mousedown' , e );
      expect( st.boxPos.show ).toBe( true );
      expect( st.btnPos.show ).toBe( false );
    } );

    it( 'inline 状态不隐藏' , ()=> {
      st.inline = true;
      st.$emit( 'mousedown' , e );
      expect( st.boxPos.show ).toBe( true );
      expect( st.btnPos.show ).toBe( false );
    } );

    it( '事件源在窗口中时不隐藏' , ()=> {
      e.target = st.$els.stBox;
      st.$emit( 'mousedown' , e );
      expect( st.boxPos.show ).toBe( true );
      expect( st.btnPos.show ).toBe( false );
    } );

    it( '否则，隐藏' , ()=> {
      st.pinned = false;
      st.inline = false;
      st.loading = false;
      e.target = document.body;
      st.$emit( 'mousedown' , e );
      expect( st.boxPos.show ).toBe( false );
      expect( st.btnPos.show ).toBe( false );
    } );
  } );
} );

describe( 'mouse up 事件' , ()=> {
  let jasmineClock;
  beforeEach( ()=> {
    jasmineClock = jasmine.clock();
    jasmineClock.install();
  } );

  afterEach( ()=> {
    jasmineClock.uninstall();
  } );

  it( '会使用 setTimeout 延迟执行' , ()=> {
    // 默认情况下,在产生捕获阶段的 mousedown 事件后,浏览器会清除拖蓝,但下面两种情况:
    // 1. 点击拖蓝本身
    // 2. 在输入框中选中文本后,点击输入框其它位置
    // 浏览器是在 mouseup 事件后才清除拖蓝的,
    // 这意味着如果不延迟执行 mouseup 事件,
    // 那事件仍会检测到拖蓝并再次弹出翻译按钮&窗口

    const st = new ST( __config__() );
    spyOn( __selection__ , 'toString' ).and.returnValue( '' );
    st.$emit( 'mouseup' , __event__ );
    expect( __selection__.toString ).not.toHaveBeenCalled();
    jasmineClock.tick( 1 );
    expect( __selection__.toString ).toHaveBeenCalled();
  } );

  describe( '满足条件才能触发 select 事件' , ()=> {
    let st , e;

    beforeEach( ()=> {
      st = new ST( __config__() );
      e = __mixin__( {} , __event__ );
    } );

    it( '1.网页上必须有选中的文本' , ()=> {
      spyOn( __selection__ , 'toString' ).and.returnValue( '' );
      st.$emit( 'mouseup' , e );
      spyOn( st , '$emit' );
      jasmineClock.tick( 1 );
      expect( __selection__.toString ).toHaveBeenCalled();
      expect( st.$emit ).not.toHaveBeenCalled();
    } );

    it( '2.事件源不是翻译窗口且不在它里面' , ()=> {
      spyOn( __selection__ , 'toString' ).and.returnValue( 'text' );
      e.target = st.$els.stBox;
      st.$emit( 'mouseup' , e );
      spyOn( st , '$emit' );
      jasmineClock.tick( 1 );
      expect( __selection__.toString ).toHaveBeenCalled();
      expect( st.$emit ).not.toHaveBeenCalled();
    } );

    it( '3.鼠标左键才能触发' , ()=> {
      spyOn( __selection__ , 'toString' ).and.returnValue( 'text' );
      e.button = 1;
      st.$emit( 'mouseup' , e );
      spyOn( st , '$emit' );
      jasmineClock.tick( 1 );
      expect( __selection__.toString ).toHaveBeenCalled();
      expect( st.$emit ).not.toHaveBeenCalled();
    } );

    it( '满足上面三个条件才能触发' , ()=> {
      spyOn( __selection__ , 'toString' ).and.returnValue( 'text' );
      st.$emit( 'mouseup' , e );
      spyOn( st , '$emit' );
      jasmineClock.tick( 1 );
      expect( __selection__.toString ).toHaveBeenCalled();
      expect( st.$emit ).toHaveBeenCalledWith( 'select' , e , 'text' );
    } );
  } );
} );

describe( 'select 事件' , ()=> {
  let st;
  beforeEach( ()=> {
    st = new ST( __config__() );
    st.showBtn = true;
    st.btnPos.show = false;
    st.selection = true;
    st.loading = false;
  } );

  describe( '如果满足下列条件则不做任何事情' , ()=> {
    it( '没有开启划词' , ()=> {
      st.selection = false;
      st.$emit( 'select' , __event__ , 'x' );
      expect( st.btnPos.show ).toBe( false );

      st.selection = true;
      st.$emit( 'select' , __event__ , 'x' );
      expect( st.btnPos.show ).toBe( true );
    } );

    it( 'loading 中' , ()=> {
      st.loading = true;
      st.$emit( 'select' , __event__ , 'x' );
      expect( st.btnPos.show ).toBe( false );

      st.loading = false;
      st.$emit( 'select' , __event__ , 'x' );
      expect( st.btnPos.show ).toBe( true );
    } );

    it( '开启忽略中文但文本包含中文' , ()=> {
      st.ignoreChinese = true;
      st.$emit( 'select' , __event__ , '中文' );
      expect( st.btnPos.show ).toBe( false );

      st.ignoreChinese = false;
      st.$emit( 'select' , __event__ , '中文' );
      expect( st.btnPos.show ).toBe( true );
    } );

    it( '开启忽略类数字组合但文本由数字等组成' , ()=> {
      st.ignoreNumLike = true;
      st.$emit( 'select' , __event__ , '345345' );
      expect( st.btnPos.show ).toBe( false );

      st.$emit( 'select' , __event__ , '(010) 32234234' );
      expect( st.btnPos.show ).toBe( false );

      st.$emit( 'select' , __event__ , 'x3d3-d (s' );
      expect( st.btnPos.show ).toBe( true );
    } );

    it( '没有开启翻译按钮但开启了 ctrl 辅助键可是划词时没有按下辅助键' , ()=> {
      st.showBtn = false;
      st.needCtrl = true;
      const e = __mixin__( {} , __event__ );
      e.ctrlKey = false;
      e.metaKey = false;

      st.$emit( 'select' , e , 'x' );
      expect( st.btnPos.show ).toBe( false );

      spyOn( st , 'translate' );
      e.ctrlKey = true;
      e.metaKey = true;
      st.$emit( 'select' , e , 'x' );
      expect( st.btnPos.show ).toBe( false );
      expect( st.translate ).toHaveBeenCalled();
    } );
  } );

  describe( '会设定翻译按钮与窗口的位置' , ()=> {
    let e , top , left;
    beforeEach( ()=> {
      e = __mixin__( {} , __event__ );
      e.pageX = e.pageY = 100;
      left = e.pageX - window.pageXOffset;
      top = e.pageY - window.pageYOffset + 10;
    } );
    it( '正常情况下会同时设定按钮与窗口为同一位置' , ()=> {
      st.$emit( 'select' , e , 'x' );
      expect( st.btnPos.translateX ).toBe( left );
      expect( st.btnPos.translateY ).toBe( top );

      expect( st.boxPos.translateX ).toBe( left );
      expect( st.boxPos.translateY ).toBe( top );
    } );

    it( '如果当前为pinned，则翻译窗口的位置不变' , ()=> {
      st.pinned = true;

      st.$emit( 'select' , e , 'x' );
      expect( st.btnPos.translateX ).toBe( left );
      expect( st.btnPos.translateY ).toBe( top );

      expect( st.boxPos.translateX ).toBe( 0 );
      expect( st.boxPos.translateY ).toBe( 0 );
    } );

    it( '如果当前为inline，则翻译窗口的位置不变' , ()=> {
      st.inline = true;

      st.$emit( 'select' , e , 'x' );
      expect( st.btnPos.translateX ).toBe( left );
      expect( st.btnPos.translateY ).toBe( top );

      expect( st.boxPos.translateX ).toBe( 0 );
      expect( st.boxPos.translateY ).toBe( 0 );
    } );
  } );

  it( '开启翻译按钮则会显示翻译按钮' , ()=> {
    st.$emit( 'select' , __event__ , 'x' );
    expect( st.btnPos.show ).toBe( true );
  } );

  it( '但如果同时开启了辅助键且划词时使用了辅助键则直接翻译' , ()=> {
    st.needCtrl = true;
    const e = __mixin__( {} , __event__ );
    e.ctrlKey = true;
    e.metaKey = true;
    spyOn( st , 'translate' );
    st.$emit( 'select' , e , 'x' );
    expect( st.btnPos.show ).toBe( false );
    expect( st.translate ).toHaveBeenCalled();
  } );
} );

describe( '切换 inline 模式时' , ()=> {
  let st;
  beforeEach( ()=> {
    st = new ST( __config__() );
  } );
  it( '能正确切换 position 与 show' , done => {
    st.inline = true;
    st.$nextTick( ()=> {
      expect( st.boxPos.position ).toBe( 'static' );
      expect( st.boxPos.show ).toBe( true );
      st.inline = false;
      st.$nextTick( ()=> {
        expect( st.boxPos.position ).not.toBe( 'static' );
        done();
      } );
    } );
  } );
} );

describe( 'destory 实例时' , ()=> {
  it( '会将所有事件监听函数取消' , ()=> {
    spyOn( document , 'addEventListener' ).and.callThrough();
    spyOn( document , 'removeEventListener' ).and.callThrough();
    new ST( __config__() ).$destroy( true );
    expect( document.addEventListener.calls.allArgs() ).toEqual( document.removeEventListener.calls.allArgs() );
  } );
} );

describe( 'translate 方法' , ()=> {
  let st;
  beforeEach( ()=> {
    st = new ST( __config__() );
  } );
  it( '会正确设置 loading 状态' , done => {
    st.translate().then( ()=> {
      expect( st.loading ).toBe( false );
      expect( st.boxPos.show ).toBe( true );
      done();
    } );
    expect( st.loading ).toBe( true );
    expect( st.boxPos.show ).toBe( true );
    st.boxPos.show = false;
  } );
  it( '没有声明 getResult 方法时会报错' , ()=> {
    const c = __config__();
    delete  c.methods;
    const st = new ST( c );
    expect( st.translate.bind( st ) ).toThrow();
  } );
} );
