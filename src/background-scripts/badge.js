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

storage.addChangeListener( assignDomains , { keys : [ 'excludeDomains' ] } );

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
