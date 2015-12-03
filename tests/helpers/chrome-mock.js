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
