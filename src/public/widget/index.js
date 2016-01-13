/**
 * 内容页和 popup 页都用同样的模板与配置，所以单独抽离出来
 */
import '../fontello/css/fontello.css';
import './style.scss';
import widgetMixin from 'selection-widget';

import locales from '../locales';
import template from './template.html';

// 去掉 locales 里的 *-* 类语种，除了 zh-CN、zh-TW 和 zh-HK（百度翻译里的粤语）
const translateLocales = [];

locales.forEach( locale => {
  const {localeId} = locale;

  if ( !localeId.includes( '-' ) || ( localeId === 'zh-CN' || localeId == 'zh-TW' || localeId == 'zh-HK' ) ) {
    translateLocales.push( locale );
  }
} );

const resolvedEmptyPromise = Promise.resolve() ,
  noop = ()=> {};

export default client => {
  return {
    template ,
    data : ()=>({
      locales : translateLocales ,
      query : {
        text : '' ,
        from : '' ,
        to : '' ,
        api : ''
      } ,
      result : {
        error : '' ,
        phonetic : '' ,
        detailed : [] ,
        result : [] ,
        linkToResult : '' ,
        response : {} ,
        api : {
          name : ''
        }
      }
    }) ,
    created() {
      client.once( 'disconnect' , ()=> {
        this.result = {
          error : '连接到翻译引擎时发生了错误，请刷新网页或重启浏览器后再试。'
        }
      } );
    } ,
    methods : {
      getResult() {
        this.$emit( 'beforeQuery' );
        if ( client.disconnected ) {
          return resolvedEmptyPromise;
        }
        return client
          .send( 'get translate result' , this.query , true )
          .then( resultObj => {
            this.result = resultObj;
          } , noop );
        // 只有在一种特殊情况下才会走进 catch 分支:
        // 消息发送出去后但还没得到响应时就被后台断开了连接.
        // 不过出现这种情况的可能性极低.
      } ,

      /**
       * 交换源语种与目标语种
       */
      exchangeLocale() {
        const {to,from} = this.query;
        this.query.to = from;
        this.query.from = to;
      } ,

      /**
       * 打开设置页
       */
      openOptions() {
        client.send( 'openTab' , {
          url : 'options/index.html'
        } );
      } ,

      /**
       * 复制文本
       * @param {String|String[]} textOrTextArray
       * @param {MouseEvent} event
       */
      copy( textOrTextArray , event ) {
        if ( Array.isArray( textOrTextArray ) ) {
          textOrTextArray = textOrTextArray.join( '\n' );
        }
        client.send( 'copy' , textOrTextArray );

        const {target} = event ,
          original = target.textContent;
        target.textContent = '已复制';
        setTimeout( ()=> target.textContent = original , 2000 );
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
        client.send( 'play' , {
          text : textOrTextArray ,
          api : this.query.api ,
          from : this.result[ isFrom ? 'from' : 'to' ]
        } );
      }
    } ,
    mixins : [ widgetMixin ]
  };
};

