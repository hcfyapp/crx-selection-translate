import storage from 'chrome-storage-wrapper';
import {Client} from 'connect.io';

import getST from '../../../src/content-scripts/init-st';
import server from '../../../src/content-scripts/server';
import main from '../../../src/content-scripts/lazy-bootstrap';

const selection = getSelection();

describe( '内容脚本里的划词翻译在第一次产生 mouseup 事件时' , ()=> {
  let firstMouseUpHandler;

  beforeEach( ()=> {
    spyOn( selection , 'toString' );
    spyOn( document , 'addEventListener' ).and.callFake( ( eventName , cb )=> {
      firstMouseUpHandler = cb;
    } );
    spyOn( document , 'removeEventListener' );
    main();
  } );

  it( '如果不带拖蓝则不会初始化' , async ( done )=> {
    selection.toString.and.returnValue( '' );
    await firstMouseUpHandler();
    expect( document.removeEventListener ).not.toHaveBeenCalled();
    done();
  } );

  it( '如果带拖蓝就会初始化' , async ( done )=> {
    selection.toString.and.returnValue( '带拖蓝了' );
    await firstMouseUpHandler( { target : document.body , button : 1 } );
    expect( document.removeEventListener.calls.count() ).toBe( 1 );

    const c = new Client();
    server.emit( 'connect' , c );
    c.emit( 'translate' );
    expect( document.removeEventListener.calls.count() ).toBe( 1 );

    done();
  } );
} );
