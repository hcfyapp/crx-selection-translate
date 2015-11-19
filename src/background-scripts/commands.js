/**
 * @files chrome 快捷键的事件监听函数
 * @see https://crxdoc-zh.appspot.com/extensions/commands
 * 当前划词翻译里只有一个命令 translate，上一版中的 web（网页翻译）命令在这一版被移到 popup 里了
 */

chrome.commands.onCommand.addListener( command => {
  switch ( command ) {
    case 'translate':
      chrome.tabs.query( { active : true } , tabs => {
        chrome.tabs.sendMessage( tabs[ 0 ].id , {
          action : 'translate' ,
          data : null
        } );
      } );
      break;
  }
} );

