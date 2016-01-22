/**
 * 将翻译窗口与扩展的 storage “绑定”起来
 * @param st
 */
import {isHostEnabled} from '../../public/util';
import chromeCall from 'chrome-call';
import watch from '../../public/storage-watcher';

export default async function ( st ) {
  let defApi = '';

  st.$watch( 'boxPos.show' , ( newValue )=> {
    if ( !newValue ) {
      st.query.api = defApi;
    }
  } );

  st.$on( 'after translate' , function () {
    const {query} = this ,
      {text} = query;

    // autoPlay 属性是在 $on 'storage changed' 的时候扩展进去的
    if ( this.autoPlay && text.length < 50 ) {
      this.play( text , query.from );
    }
  } );

  st.$on( 'storage changed' , function ( items ) {
    const {defaultApi,excludeDomains} = items;

    if ( excludeDomains ) {
      this.selection = isHostEnabled( location , excludeDomains );
      delete items.excludeDomains;
    }

    if ( defaultApi ) {
      defApi = defaultApi;
      if ( !this.boxPos.show ) {
        this.query.api = defApi;
      }
      delete items.defaultApi;
    }

    Object.assign( this , items );
  } );

  if ( process.env.NODE_ENV !== 'testing' ) {
    const storageKeys = [
      'ignoreChinese' , 'ignoreNumLike' , 'showBtn' ,
      'needCtrl' , 'defaultApi' , 'excludeDomains' , 'autoPlay'
    ];

    st.$emit( 'storage changed' , await chromeCall( 'storage.local.get' , storageKeys ) );

    // 在设置变更时保持同步
    watch( storageKeys , 'local' , ( changed )=> {
      st.$emit( 'storage changed' , changed );
    } );
  }
}
