const {tabs} = chrome;

export default {

  /**
   * 获取标签页的 window.location 对象
   * @param {Number} [tabId] - tab id，默认为当前选中的标签页的 id
   * @returns {Promise} - 由于某些标签页扩展没有权限访问（例如 chrome 设置），所以最终的 locationObj 有可能是 undefined
   */
  async getTabLocation( tabId ) {

    if ( !tabId ) {
      tabId = await new Promise( resolve => {
        tabs.query( { active : true } , ( [{id}] ) => resolve( id ) );
      } );
    }

    return new Promise( resolve => tabs.sendMessage( tabId , { action : 'get location' } , resolve ) );
  } ,

  /**
   * 仅仅是一个空函数
   */
  noop() {}
}
