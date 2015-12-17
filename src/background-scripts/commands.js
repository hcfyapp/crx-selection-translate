/**
 * @files chrome 快捷键的事件监听函数
 * @see https://crxdoc-zh.appspot.com/extensions/commands
 * 当前划词翻译里只有一个命令 translate，上一版中的 web（网页翻译）命令在这一版被移到 popup 里了
 */

//todo 使用 connect.io ，或者，connect.io 应该有一个发送一次性消息的方法
const {tabs} = chrome;

const main = ()=> {
  chrome.commands.onCommand.addListener( command => {
    switch ( command ) {
      case 'translate':
        tabs.query( { active : true } , tabArr => {
          tabs.sendMessage( tabArr[ 0 ].id , {
            action : 'translate' ,
            data : null
          } );
        } );
        break;
    }
  } );
};

/* istanbul ignore if */
if ( !TEST ) {
  main();
}

/* istanbul ignore next */
export default TEST ? main : undefined;
