const {tabs} = chrome;

/**
 * 获取标签页的 window.location 对象
 * @param {Number} [tabId] - tab id，默认为当前选中的标签页的 id
 * @returns {Promise}
 */
export function getTabLocation( tabId ) {
  return new Promise( ( resolve , reject ) => {
    let tabIdPromise;

    if ( tabId ) {
      tabIdPromise = Promise.resolve( tabId );
    } else {
      tabIdPromise = new Promise( resolve => {
        tabs.query( { active : true } , ( [{id}] ) => resolve( id ) );
      } );
    }

    tabIdPromise
      .then( tabId => tabs.sendMessage( tabId , 'getUrl' , locationObj => {
        if ( locationObj ) {
          resolve( locationObj );
        } else {
          reject();
        }
      } ) );
  } );
}
