/**
 * @files 保证翻译窗口总是在浏览器视口内
 */

export default function ( st ) {
  /**
   * @prop {Number} width - 元素的宽度
   * @prop {Number} height - 元素的高度
   * @prop {Number} top - 元素的上边线距视口的上边的距离，若为负数则说明超出视口
   * @prop {Number} left - 元素的左边线距视口的左边的距离，若为负数则说明超出视口
   * @prop {Number} right - 元素的右边线距视口的**左**边的距离，即 left + width，若 right - window.innerWidth > 0 则说明超出视口
   * @prop {Number} bottom - 元素的底边线距视口的**上**边的距离，即 top + height，若 bottom - window.innerHeight > 0 则说明超出视口
   * @type {ClientRect}
   */
  const rect = st.$els.stBox.getBoundingClientRect() ,
    {boxPos} = st;

  // 左边
  const {left} = rect;
  if ( left < 0 ) {
    boxPos.translateX -= left;
  }

  // 上边
  const {top} = rect;
  if ( top < 0 ) {
    boxPos.translateY -= top;
  }

  // 右边
  const rightDiff = rect.right - window.innerWidth;
  if ( rightDiff > 0 ) {
    boxPos.translateX -= rightDiff;
  }

  // 下边
  const bottomDiff = rect.bottom - window.innerHeight;
  if ( bottomDiff > 0 ) {
    boxPos.translateY -= bottomDiff;
  }
}
