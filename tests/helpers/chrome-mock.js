window.chrome = {
  browserAction : {
    setBadgeText() {}
  } ,
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
    sendMessage() {} ,
    query() {} ,
    onUpdated : {
      addListener() {}
    } ,
    onActivated : {
      addListener() {}
    }
  } ,
  tts : {
    getVoices( cb ) {
      cb( [
        { name : '语音名字' , lang : '语音语种' }
      ] );
    }
  } ,
  runtime : {
    id : 'xx' ,
    onConnect : { addListener() {} } ,
    connect() {
      return {
        disconnect() {} ,
        onMessage : { addListener() {} } ,
        onDisconnect : { addListener() {} } ,
        postMessage() {}
      };
    } ,
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
