import chromeCall from 'chrome-call';
import {getTabLocation,isHostEnabled} from '../public/util';

const {browserAction,tabs} = chrome;

export let domains = [];

export function onStorageChanged( changedItems ) {
  const {excludeDomains} = changedItems;
  if ( excludeDomains ) {
    domains = excludeDomains.newValue;
  }
}

export function onTabsUpdated( tabId , changeInfo , tab ) {
  if ( tab.active ) {
    updateBadge( tabId );
  }
}

export function onTabsActivated( { tabId } ) { updateBadge( tabId ); }

/**
 * 更新扩展图标上的 off 标签
 * @param {Number} [tabId] - 根据哪个标签页的 location object 来更新图标。默认为当前选中的标签页
 */
export async function updateBadge( tabId ) {
  const location = await getTabLocation( tabId );
  const enable = isHostEnabled( location , domains );

  browserAction.setBadgeText( { text : enable ? '' : 'off' } );
}

if ( process.env.NODE_ENV !== 'testing' ) {
  chrome.storage.onChanged.addListener( onStorageChanged );
  tabs.onUpdated.addListener( onTabsUpdated );
  tabs.onActivated.addListener( onTabsActivated );
  chromeCall( 'storage.local.get' , 'excludeDomains' )
    .then( ( {excludeDomains} )=> domains = excludeDomains );
}
