import {Client} from 'connect.io';

export default {

  /**
   * 获取标签页的 window.location 对象
   * @param {Number} [tabId] - tab id，默认为当前选中的标签页的 id
   * @returns {Promise} - 由于某些标签页扩展没有权限访问（例如 chrome://），所以最终的 locationObj 有可能是 undefined
   */
  async getTabLocation( tabId ) {

    if ( !tabId ) {
      tabId = await new Promise( resolve => {
        tabs.query( { active : true } , ( [{id}] ) => resolve( id ) );
      } );
    }

    return new Promise( ( resolve ) => {
      const client = new Client( tabId , 0 );
      client.send( 'get location' , ( location ) => {
        resolve( location );
        client.disconnect();
      } );
    } );
  }
}
