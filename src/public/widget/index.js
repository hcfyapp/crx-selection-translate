/**
 * 内容页和 popup 页都用同样的模板与配置，所以单独抽离出来
 */

import widgetMixin from 'selection-widget';

import locales from '../locales';
import template from './template.html';

const {runtime} = chrome;

// 去掉 locales 里的 *-* 类语种，除了 zh-CN、zh-TW 和 zh-HK（百度翻译里的粤语）
const translateLocales = [];

locales.forEach( locale => {
  const {localeId} = locale;

  if ( !localeId.includes( '-' ) || ( localeId === 'zh-CN' || localeId == 'zh-TW' || localeId == 'zh-HK' ) ) {
    translateLocales.push( locale );
  }
} );

export default {
  template ,
  data : ()=>({
    locales : translateLocales ,
    query : {
      api : '' ,
      from : '' ,
      to : ''
    } ,
    result : {
      phonetic : '' ,
      detailed : [] ,
      result : '' ,
      linkToResult : '' ,
      response : {} ,
      api : {
        name : ''
      }
    }
  }) ,
  methods : {
    getResult() {
      this.$emit( 'beforeQuery' );
      return send( {
        action : 'translate' ,
        data : this.query
      } )
        .catch( error => ({ error }) )
        .then( resultObj => this.result = resultObj );
    } ,

    /**
     * 打开设置页
     */
    openOptions() {
      send( {
        action : 'openTab' ,
        data : {
          url : 'options/index.html'
        }
      } );
    } ,

    /**
     * 复制文本
     * @param {String|String[]} textOrTextArray
     */
    copy( textOrTextArray ) {
      if ( Array.isArray( textOrTextArray ) ) {
        textOrTextArray = textOrTextArray.join( '\n' );
      }
      send( {
        action : 'copy' ,
        data : textOrTextArray
      } );
    } ,

    /**
     * 播放语音
     * @param {String|String[]} textOrTextArray
     * @param {Boolean} [isFrom] - 默认情况下会读取 result.to 作为语音的语种,若这个值为 true 则使用 result.from
     */
    play( textOrTextArray , isFrom ) {
      if ( Array.isArray( textOrTextArray ) ) {
        textOrTextArray = textOrTextArray.join( '\n' );
      }
      send( {
        action : 'play' ,
        data : {
          text : textOrTextArray ,
          api : this.result.api.id ,
          from : this.result[ isFrom ? 'from' : 'to' ]
        }
      } );
    }
  } ,
  mixins : [ widgetMixin ]
};

/**
 * 传递消息到后台的方法
 * @param {Object} obj
 * @returns {Promise}
 */
function send( obj ) {
  return new Promise( ( resolve , reject )=> {
    try { // 连接到背景页时可能会报错：{ message : 'Error connecting to extension ${扩展id}' }
      runtime.sendMessage( obj , res => {
        const le = runtime.lastError;
        if ( le || !res ) { // 不知道为何，偶尔res会是一个undefined
          reject( '获取查询结果时发生了错误，请尝试刷新网页或重启浏览器后重试。' , le );
        } else {
          resolve( res );
        }
      } );
    }
    catch ( e ) {
      reject( '连接到翻译引擎时发生了错误，请尝试刷新网页或重启浏览器后重试。' , e );
    }
  } );
}
