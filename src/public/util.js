const {tabs} = chrome;

/**
 * 获取标签页的 window.location 对象
 * @param {Number} [tabId] - tab id，默认为当前选中的标签页的 id
 * @returns {Promise} - 由于某些标签页扩展没有权限访问（例如 chrome 设置），所以最终的 locationObj 有可能是 undefined
 */
export function getTabLocation( tabId ) {
  return new Promise( resolve => {
    let tabIdPromise;

    if ( tabId ) {
      tabIdPromise = Promise.resolve( tabId );
    } else {
      tabIdPromise = new Promise( resolve => {
        tabs.query( { active : true } , ( [{id}] ) => resolve( id ) );
      } );
    }

    tabIdPromise
      .then( tabId => tabs.sendMessage( tabId , { action : 'get location' } , resolve ) );
  } );
}

/**
 * 空函数
 */
export function noop() {}
