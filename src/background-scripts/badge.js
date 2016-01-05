import storage from 'chrome-storage-wrapper';
import util from '../public/util';

const {browserAction,tabs} = chrome;

const main = ()=> {

  let domains = []; // 保存禁用域名列表

  /**
   * 更新扩展图标上的 off 标签。由于 babel 的一个 bug（https://phabricator.babeljs.io/T6664），所以必须以变量赋值的方式定义异步函数
   * @param {Number} [tabId] - 根据哪个标签页的 location object 来更新图标。默认为当前选中的标签页
   */
  const updateBadge = async tabId => {
    const location = await util.getTabLocation( tabId );
    const enable = util.isHostEnabled( location , domains );

    browserAction.setBadgeText( { text : enable ? '' : 'off' } );
  };

  tabs.onUpdated.addListener( ( tabId , changeInfo , tab )=> {
    if ( tab.active ) {
      updateBadge( tabId );
    }
  } );

  tabs.onActivated.addListener( ( {tabId} ) => updateBadge( tabId ) );

  storage
    .get( 'excludeDomains' )
    .then( assignDomains );

  storage.addChangeListener( items => {
    assignDomains( items );
    updateBadge();
  } , { keys : [ 'excludeDomains' ] } );

  function assignDomains( items ) {
    domains = items.excludeDomains;
  }
};

/* istanbul ignore if */
if ( !TEST ) {
  main();
}

/* istanbul ignore next */
export default TEST ? main : undefined;
