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

export default client => {
  return {
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
        return client
          .send( 'get translate result' , this.query , true )
          .then( resultObj => {
            this.result = resultObj
          } );
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
       */
      copy( textOrTextArray ) {
        if ( Array.isArray( textOrTextArray ) ) {
          textOrTextArray = textOrTextArray.join( '\n' );
        }
        client.send( 'copy' , textOrTextArray );
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
          api : this.result.api.id ,
          from : this.result[ isFrom ? 'from' : 'to' ]
        } );
      }
    } ,
    mixins : [ widgetMixin ]
  };
};

