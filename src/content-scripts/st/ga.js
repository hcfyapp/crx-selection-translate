import client from '../client';

/* istanbul ignore next */
function ga( ...args ) {
  client.send( 'ga' , args );
}

export default function ( st ) {
   /* istanbul ignore next */
  st.$watch( 'boxPos.show' , ( value )=> {
    if ( value ) {
      ga( 'send' , 'event' , '翻译窗口' , '展示' );
    }
  } );
}
