/**
 * @files 复制、粘贴的模块，不能在内容脚本中运行。
 */

import { noop } from './util';

export let input;

/**
 * input 应该在第一次调用 write 或者 read 时才初始化.
 * 这是因为当我使用 new Vue({el:'body'}) 时,body 下的内容都会被清空
 */
function initInput() {
  initInput = noop;
  input = document.createElement( 'input' );
  input.style.position = 'absolute';
  input.style.top = '-99999px';
  document.body.appendChild( input );
}

/**
 * 将文本复制进剪切板
 * @param {String} text
 * @returns {*}
 */
export function write( text ) {
  initInput();
  input.value = text;
  input.select();
  document.execCommand( 'copy' );
}

/**
 * 返回剪切板中的文本内容
 * @returns {String}
 */
export function read() {
  initInput();
  input.value = '';
  input.focus();
  document.execCommand( 'paste' );
  return input.value;
}
