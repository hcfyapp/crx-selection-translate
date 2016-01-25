import {send} from 'connect.io';
import chromeCall from 'chrome-call';

export function noop() {}

/**
 * 返回当前选中的标签页的 tab id
 * @returns {Promise.<Number>}
 */
export async function getCurrentTabId() {
  try {
    return (await chromeCall( 'tabs.query' , { active : true } ))[ 0 ].id;
  }
  catch ( e ) {
    return Promise.reject( e );
  }
}

/**
 * 获取标签页的 window.location 对象
 * @param {Number} [tabId] - tab id，默认为当前选中的标签页的 id
 * @returns {Promise} - 由于某些标签页扩展没有权限访问（例如 chrome://），所以最终的 locationObj 有可能是 undefined
 */
export async function getTabLocation( tabId ) {

  if ( !tabId ) {
    tabId = await getCurrentTabId();
  }

  return send( {
    tabId ,
    frameId : 0 ,
    name : 'get location' ,
    needResponse : true
  } ).catch( noop ); // 获取出错时仍然让此状态成功，只是值是 undefined
}

/**
 * 判断某一个 location 对象是否应该启用
 * @param {Location|undefined} [locationObj] - 默认为当前选中标签页的 location 对象
 * @param {String[]} disabledDomainList - 默认为 chrome.storage.local 里的 excludeDomains 设置项
 * @returns {Boolean} - 如果应该启用，则返回 true，否则为 false
 */
export async function isHostEnabled( locationObj = await getTabLocation() , disabledDomainList = (await chromeCall( 'storage.local.get' , 'excludeDomains' )).excludeDomains ) {
  if ( !locationObj ) { // 有些标签页无法获取它的 location 对象，例如 chrome://，此时判断为 false
    return false;
  }
  const {host} = locationObj;
  return !disabledDomainList.some( domain => host.endsWith( domain ) );
}
