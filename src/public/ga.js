/**
 * @files 谷歌分析
 * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/
 */

/* istanbul ignore next */
if ( process.env.NODE_ENV === 'production' ) {
  window.GoogleAnalyticsObject = 'ga';

  const ga = function () {
    ga.q.push( arguments );
  };

  ga.q = [];
  ga.l = Date.now();

  ga( 'create' , 'UA-43276752-4' , 'auto' );
  ga( 'set' , 'checkProtocolTask' , null );
  window.ga = ga;

  const script = document.createElement( 'script' );
  script.src = 'https://www.google-analytics.com/analytics.js';
  script.async = true;
  document.body.appendChild( script );
} else {
  window.ga = function () {};
}

export default function () {
  // 谷歌分析的脚本会替换全局变量 window.ga,所以每次使用时都得用 `window.ga` 而不是本地变量 `ga`
  window.ga.apply( null , arguments );
};
