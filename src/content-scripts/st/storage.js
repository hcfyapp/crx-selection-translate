/**
 * 将翻译窗口与扩展的 storage “绑定”起来
 * @param st
 */
import {isHostEnabled} from '../../public/util';
import chromeCall from 'chrome-call';
import watch from '../../public/storage-watcher';

export default function ( st ) {
  let defApi = '';

  function onBoxPosShow( isShow ) {
    if ( !isShow ) {
      this.query.api = defApi;
    }
  }

  function onAfterTranslate() {
    const {query} = this ,
      {text} = query;

    // autoPlay 属性是在 onStorageChanged 的时候扩展进去的
    if ( this.autoPlay && text.length < 50 ) {
      this.play( text , query.from );
    }
  }

  async function onStorageChanged( items ) {
    // 这里不能用 const，否则 Babel 又报错了
    let {defaultApi,excludeDomains} = items;

    if ( excludeDomains ) {
      this.selection = await isHostEnabled( location , excludeDomains );
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
      'ignoreChinese' , 'ignoreNumLike' , 'showBtn' ,
      'needCtrl' , 'defaultApi' , 'excludeDomains' , 'autoPlay'
    ];

    chromeCall( 'storage.local.get' , storageKeys ).then( onStorageChanged );

    // 在设置变更时保持同步
    watch( storageKeys , 'local' , onStorageChanged );
  }
}
