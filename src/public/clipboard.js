/**
 * @files 复制、粘贴的模块，不能再内容脚本中运行。
 */
export const input = document.createElement( 'input' );
input.style.position = 'absolute';
input.style.top = '-99999px';
document.body.appendChild( input );

/**
 * 将文本复制进剪切板
 * @param {String} text
 * @returns {*}
 */
export function write( text ) {
  input.value = text;
  input.select();
  document.execCommand( 'copy' );
}

/**
 * 返回剪切板中的文本内容
 * @returns {String}
 */
export function read() {
  input.value = '';
  input.focus();
  document.execCommand( 'paste' );
  return input.value;
}
