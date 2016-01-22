/**
 * 将翻译窗口与扩展的 storage “绑定”起来
 * @param st
 */
import storage from 'chrome-storage-wrapper';
import util from '../../public/util';

export default async function ( st ) {
  let defApi = '';
  const {host} = location ,
    storageKeys = [
      'ignoreChinese' , 'ignoreNumLike' , 'showBtn' ,
      'needCtrl' , 'defaultApi' , 'excludeDomains' , 'autoPlay'
    ] ,
    options = await storage.get( storageKeys );

  st.$watch( 'boxPos.show' , ( newValue )=> {
    if ( !newValue ) {
      st.query.api = defApi;
    }
  } );

  st.$on( 'after translate' , function () {
    const {query} = this ,
      {text} = query;

    if ( this.autoPlay && text.length < 50 ) {
      this.play( text , query.from );
    }
  } );

  storageChanged( options );

  st.query.api = defApi;

  // 在设置变更时保持同步
  storage.addChangeListener( storageChanged , { keys : storageKeys } );

  /**
   * 处理设置变化
   * @param {StorageData} items
   */
  function storageChanged( items ) {
    const {defaultApi,excludeDomains} = items;

    if ( excludeDomains ) {
      st.selection = util.isHostEnabled( location , excludeDomains );
      delete items.excludeDomains;
    }

    if ( defaultApi ) {
      defApi = defaultApi;
      if ( !st.boxPos.show ) {
        st.query.api = defApi;
      }
      delete items.defaultApi;
    }

    Object.assign( st , items );
  }
}
