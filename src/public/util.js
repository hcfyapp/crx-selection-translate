import {send} from 'connect.io';
import chromeCall from 'chrome-call';

export function noop() {}

/**
 * 返回当前选中的标签页的 tab id
 * @returns {Promise.<Number>}
 */
export async function getCurrentTabId() {
  try {
    // todo 优化一下这里的报错.
    // 右键单击扩展按钮,然后选择"审查弹出内容"时,这里会报一个错:
    // can't read 'id' of undefined
    // 我猜是因为 chrome 开发者工具先弹出来了,所以变成了 lastFocusedWindow,而扩展又没权限介入.
    // 可是奇怪的是这个错误为什么没有被 try/catch 捕获到?
    return (await chromeCall( 'tabs.query' , { active : true , lastFocusedWindow : true } ))[ 0 ].id;
  }
  catch ( e ) {
    return Promise.reject( e );
  }
}

/**
 * 获取标签页的 window.location 对象
 * @param {Number} [tabId] - tab id，默认为当前选中的标签页的 id
 * @returns {Promise} - 由于某些标签页扩展没有权限访问（例如 chrome://），所以最终的 locationObj 有可能是 null
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
  } ).catch( ()=> null ); // 获取出错时仍然让此状态成功，只是值是 null，表示没有权限获取
}

/**
 * 判断某一个 location 对象是否应该启用
 * @param {Location|undefined} [locationObj] - 默认为当前选中标签页的 location 对象
 * @param {String[]} [disabledDomainList] - 默认为 chrome.storage.local 里的 excludeDomains 设置项
 * @returns {Boolean} - 如果应该启用，则返回 true，否则为 false；但如果没有权限获取当前标签页的 location 对象，则返回 null。
 */
export async function isHostEnabled( locationObj , disabledDomainList ) {
  const {disableSelection} = await chromeCall( 'storage.local.get' , 'disableSelection' );

  if ( disableSelection ) {
    return false;
  }

  const location = locationObj || (locationObj === null ? locationObj : await getTabLocation());

  if ( !location ) { // 有些标签页无法获取它的 location 对象，例如 chrome://，此时判断为 false
    return null;
  }

  const {host} = location;
  const domains = disabledDomainList || (await chromeCall( 'storage.local.get' , 'excludeDomains' )).excludeDomains;
  return !domains.some( domain => host.endsWith( domain ) );
}
