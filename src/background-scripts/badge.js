import chromeCall from 'chrome-call';
import watcher from '../public/storage-watcher';
import {getTabLocation,isHostEnabled} from '../public/util';

export let domains = [];

export function onStorageChanged( changedItems ) {
  domains = changedItems.excludeDomains;
}

export async function onTabsUpdated( tabId , changeInfo , tab ) {
  if ( tab.active ) {
    await updateBadge( tabId );
  }
}

export async function onTabsActivated( { tabId } ) { await updateBadge( tabId ); }

/**
 * 更新扩展图标上的 off 标签
 * @param {Number} [tabId] - 根据哪个标签页的 location object 来更新图标。默认为当前选中的标签页
 */
export async function updateBadge( tabId ) {
  const enable = await isHostEnabled( await getTabLocation( tabId ) , domains );
  chrome.browserAction.setBadgeText( { text : enable ? '' : 'off' } );
}

/* istanbul ignore if */
if ( process.env.NODE_ENV !== 'testing' ) {
  watcher( 'excludeDomains' , 'local' , onStorageChanged );
  const {tabs} = chrome;
  tabs.onUpdated.addListener( onTabsUpdated );
  tabs.onActivated.addListener( onTabsActivated );
  chromeCall( 'storage.local.get' , 'excludeDomains' )
    .then( onStorageChanged );
}
