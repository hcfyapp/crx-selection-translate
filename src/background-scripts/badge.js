import storage from 'chrome-storage-wrapper';

const {browserAction,tabs} = chrome;
let domains = [];

tabs.onUpdated.addListener( ( tabId , changeInfo , tab )=> {
  if ( tab.active ) {
    updateBadge( tab.id );
  }
} );

tabs.onActivated.addListener( ( {tabId} ) => {
  updateBadge( tabId );
} );

storage
  .get( 'excludeDomains' )
  .then( assignDomains );

storage.addChangeListener( assignDomains , { keys : [ 'excludeDomains' ] } );

function updateBadge( tabId ) {
  getActiveUrl( tabId )
    .then( location => {
      const {host} = location;
      return domains.some( match => match === host );
    } , ()=> false )
    .then( has => browserAction.setBadgeText( { text : has ? 'off' : '' } ) );
}

/**
 * 获取当前选中的标签页的 URL(没有 tabs 权限只能这么做了)
 * @param {Number} activeTabId - 当前标签页的 id
 * @returns {Promise} - 值为选中标签页的 window.location 对象,但是当标签页是 chrome:// 协议时(比如空白的新标签页和 chrome 设置页)则值是 false
 */
function getActiveUrl( activeTabId ) {
  return new Promise( ( resolve , reject ) => tabs.sendMessage( activeTabId , 'getUrl' , locationObj => {
    if ( locationObj ) {
      resolve( locationObj );
    } else {
      reject();
    }
  } ) );
}

function assignDomains( items ) {
  domains = items.excludeDomains;
}
