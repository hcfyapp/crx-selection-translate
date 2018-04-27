/**
 * @files 基于 translation.js 创建自己的翻译实例
 */
import * as tjs from 'translation.js'
import 'translation.js/chrome-youdao'

export default {
  translate(queryObj) {
    const api = tjs[queryObj.api]
    return tjs[queryObj.api].translate(queryObj)
  },
  audio(queryObj) {
    return tjs[queryObj.api].audio(queryObj)
  }
}
