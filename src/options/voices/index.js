import template from './voices.html';
import locales from '../../public/locales';

const localesHash = {};

locales.forEach( locale => {
  localesHash[ locale.localeId ] = locale[ 'zh-CN' ];
} );

export default {
  template ,
  data : ()=> ({
    voices : []
  }) ,
  methods : {
    getLocaleName( voiceLang ) {
      if ( !voiceLang ) {
        return '未知';
      }
      return localesHash[ voiceLang ] || voiceLang;
    }
  } ,
  route : {
    async data() {
      const voices = await new Promise( r => chrome.tts.getVoices( r ) );
      return { voices };
    }
  }
}

