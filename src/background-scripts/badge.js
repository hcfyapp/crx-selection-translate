import storage from 'chrome-storage-wrapper';
import * as util from '../public/util';

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

storage.addChangeListener( items => {
  assignDomains( items );
  updateBadge();
} , { keys : [ 'excludeDomains' ] } );

/**
 * 更新扩展图标上的 off 标签
 * @param {Number} [tabId] - 根据哪个标签页的 location object 来更新图标。默认为当前选中的标签页
 */
function updateBadge( tabId ) {
  util.getTabLocation( tabId )
    .then( location => {
      const {host} = location;
      return domains.some( match => match === host );
    } , ()=> false )
    .then( has => browserAction.setBadgeText( { text : has ? 'off' : '' } ) );
}

function assignDomains( items ) {
  domains = items.excludeDomains;
}
