/**
 * @files 基础 ST 组件,内容脚本和弹出页都会用到
 */

import '../fontello/css/selection-translator.css';
import './style.scss';
import Vue from 'vue';
import widgetMixin from './vue-st';
import VueResource from 'vue-resource';

import locales from '../locales';
import template from './template.html';

Vue.use(VueResource);
Vue.http.options.emulateJSON = true;

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

/**
 * 翻译窗口的基础 Vue 构造函数。
 * 注意：这个构造函数需要一个额外的 options：client
 */
export default Vue.extend( {
  template ,
  data : ()=>({
    locales : translateLocales ,
    showForm : false ,
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
    this.$options.client.once( 'disconnect' , ()=> {
      this.result = {
        error : '连接到翻译引擎时发生了错误，请刷新网页或重启浏览器后再试。'
      }
    } );
  } ,
  methods : {

    /**
     * 翻译快捷键：Ctrl + Enter
     * @param event
     */
    ctrlEnter( event ) {
      if ( event.ctrlKey ) {
        this.safeTranslate();
      }
    } ,

    /**
     * 仅当有文本时才翻译
     */
    safeTranslate() {
      if ( this.query.text.trim() ) {
        this.translate();
      }
    } ,

    /**
     * 从后台网页获取查询结果
     * @returns {Promise}
     */
    getResult() {
      if ( this.$options.client.disconnected ) {
        return resolvedEmptyPromise;
      }
      return this.$options.client
        .send( 'get translate result' , this.query , true )
        .then( resultObj => {
          const {phonetic} = resultObj;
          /* istanbul ignore if */
          if ( phonetic ) {
            resultObj.phonetic = '/' + phonetic + '/';
          }
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
      this.$options.client.send( 'open options' );
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
      this.$options.client.send( 'copy' , textOrTextArray );

      const {target} = event ,
        original = target.textContent;
      target.textContent = '已复制';
      setTimeout( ()=> target.textContent = original , 2000 );
    } ,

    /**
     * 添加单词
     * @param {String|String[]} textOrTextArray
     * @param {MouseEvent} event
     */
    addWord( text, event) {
      var access_token = ' ';
      var param = {word: text, access_token: access_token}
      Vue.http.get('https://api.shanbay.com/bdc/search/', {params: param})
      .then((response) => {
        if (response.status == 200) {
          return response.json()
        } else if (response.status == 401) {
          alert('token 无效')
        } else if (response.status == 429) {
          alert('今日请求次数过多')
        } else {
          alert('未知错误, status_code='+response.status)
        }
      }, (response) => {
        alert('查询单词发生错误')
      })
      .then((info) => {
        if (info.status_code == 0) {
          this.realAddWord(info.data.id, event);
        } else {
          alert('查词错误, '+info.msg)
        }
      });
    } ,

    realAddWord(id, event) {
      var access_token = ' ';
      Vue.http.post('https://api.shanbay.com/bdc/learning/', {id: id, access_token: access_token})
      .then((response) => {
        alert(response.status)
        if (response.ok) {
          return response.json()
        }
      }, (response) => {
        alert('添加单词发生错误')
      })
      .then((res) => {
        if (res.status_code == 0) {
          const {target} = event ,
          original = target.textContent;
          target.textContent = '已添加';
          setTimeout( ()=> target.textContent = original , 2000 );
        } else {
          alert('添加单词发生错误, '+info.msg)
        }
      });
    } ,

    /**
     * 播放语音
     * @param {String|String[]} textOrTextArray
     * @param {String} [lang] - 文本的语种
     */
    play( textOrTextArray , lang ) {
      if ( Array.isArray( textOrTextArray ) ) {
        textOrTextArray = textOrTextArray.join( '\n' );
      }
      this.$options.client.send( 'play' , {
        text : textOrTextArray ,
        api : this.query.api ,
        from : lang
      } );
    }
  } ,
  mixins : [ widgetMixin ]
} );

