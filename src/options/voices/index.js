import template from './voices.html';
import locales from '../../public/locales';

export default {
  template ,
  data : ()=>({
    voices : []
  }) ,
  methods : {
    getLocaleName( voiceLang ) {
      if ( !voiceLang ) {
        return '未知';
      }
      let name;
      locales.some( locale => {
        if ( locale.localeId === voiceLang ) {
          name = locale[ 'zh-CN' ];
          return true;
        }
      } );
      return name || voiceLang;
    }
  } ,
  route : {
    async data() {
      const voices = await new Promise( r => chrome.tts.getVoices( r ) );
      return { voices };
    }
  }
}

