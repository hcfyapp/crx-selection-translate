/**
 * @files 复制、粘贴的模块，不能再内容脚本中运行。
 */
const input = document.createElement( 'input' );
input.style.position = 'absolute';
input.style.top = '-99999px';
document.body.appendChild( input );

module.exports = {

  /**
   * 将文本复制进剪切板
   * @param {String} text
   * @returns {*}
   */
  write : text => {
    input.value = text;
    input.select();
    document.execCommand( 'copy' );
  } ,

  /**
   * 返回剪切板中的文本内容
   * @returns {String}
   */
  read : ()=> {
    input.value = '';
    input.focus();
    document.execCommand( 'paste' );
    return input.value;
  }
};
