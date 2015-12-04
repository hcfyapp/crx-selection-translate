window.chrome = {
  commands : {
    onCommand : {
      addListener() {}
    }
  } ,
  contextMenus : {
    onClicked : {
      addListener() {}
    }
  } ,
  tabs : {
    onUpdated : {
      addListener() {}
    } ,
    onActivated : {
      addListener() {}
    }
  } ,
  runtime : {
    getManifest() {
      return { version : '' };
    } ,
    requestUpdateCheck( fb ) {
      fb( '随便一个字符串' , {} );
    } ,
    onInstalled : {
      addListener() {}
    } ,
    onMessage : {
      addListener() {}
    }
  } ,
  storage : {
    local : {
      get() {} ,
      set() {}
    } ,
    sync : {} ,
    onChanged : {
      addListener() {}
    }
  }
};
