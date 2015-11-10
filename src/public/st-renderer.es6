/**
 * @files 划词翻译内通用的翻译界面
 */

(( namespace )=> {
  const renderer = new ST.Renderer( {
    template : `
        <header class="st-header"><span>图钉</span>这里是翻译窗口的头部<span>设置</span></header>
        <form class="st-query">
          <input type="text" name="text" placeholder="输入要翻译的句子或单词">
          <select name="from">
            <option value="">自动判断</option>
            <option value="en">英语</option>
          </select>
          <select name="to">
            <option value="">自动选择</option>
            <option value="zh">中文</option>
          </select>
          <select name="api">
            <option value="YouDao">有道翻译</option>
            <option value="BaiDu">百度翻译</option>
          </select>
          <button type="submit">翻译</button>
        </form>
        <div class="st-result"></div>
      ` ,
    drag : '.st-header' ,
    query : '.st-query' ,
    result : '.st-result'
  } );

  renderer.loading = ()=> '正在翻译，请稍候……';
  renderer.result = resultObj => {
    const {error} = resultObj;
    if ( error ) {
      return error;
    }
    return `
    <div${display( resultObj.phonetic )}>${resultObj.phonetic}</div>
    <ul${display( Array.isArray( resultObj.detailed ) )}>
      ${Array.isArray( resultObj.detailed ) && resultObj.detailed.reduce( ( a , b )=> a + '<li>' + b + '</li>' , '' )}
    </ul>
    <div${display( resultObj.result )}>${resultObj.result}</div>
    <footer>via <a target="_blank" href="${resultObj.linkToResult}">${resultObj.api.name}</a></footer>
    `;
  };

  /**
   * 是否显示一个元素
   * @param {*} isShow
   * @returns {String}
   */
  function display( isShow ) {
    return isShow ? '' : ' style="display:none"';
  }

  namespace.renderer = renderer;
})( typeof CRX !== 'undefined' ? CRX : (window.CRX = {}) );
