/**
 * 将翻译窗口与扩展的 storage “绑定”起来
 * @param st
 */
import {isHostEnabled} from '../../public/util';
import chromeCall from 'chrome-call';
import watch from '../../public/storage-watcher';

export default function ( st ) {
  let defApi = '';

  function onAfterTranslate() {
    const {query} = this ,
      {text} = query;

    // autoPlay 属性是在 onStorageChanged 的时候扩展进去的
    if ( this.autoPlay && text.length < 50 ) {
      this.play( text , query.from );
    }
  }

  async function onStorageChanged( items ) {
    const {defaultApi,excludeDomains} = items;

    if ( defaultApi ) {
      defApi = defaultApi;
      if ( !st.boxPos.show ) {
        st.query.api = defApi;
      }
      delete items.defaultApi;
    }

    if ( items.disableSelection ) {
      st.selection = false;
    } else if ( excludeDomains ) {
      st.selection = await isHostEnabled( location , excludeDomains );
      delete items.excludeDomains;
    }

    Object.assign( st , items );
  }

  function onBoxPosShow( isShow ) {
    if ( !isShow ) {
      this.query.api = defApi;
    }
  }

  /* istanbul ignore next */
  if ( process.env.NODE_ENV === 'testing' ) {
    st.__onBoxShow = onBoxPosShow;
    st.__afterTs = onAfterTranslate;
    st.__onStorageChanged = onStorageChanged;
  } else {
    st.$watch( 'boxPos.show' , onBoxPosShow );
    st.$on( 'after translate' , onAfterTranslate );

    const storageKeys = [
      'ignoreChinese' , 'ignoreNumLike' , 'showBtn' , 'disableSelection' ,
      'needCtrl' , 'defaultApi' , 'excludeDomains' , 'autoPlay'
    ];

    chromeCall( 'storage.local.get' , storageKeys ).then( onStorageChanged );

    // 在设置变更时保持同步
    watch( storageKeys , 'local' , onStorageChanged );
  }
}
