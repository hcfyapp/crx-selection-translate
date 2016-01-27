/**
 * 添加谷歌分析。
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
  script.async = 1;
  script.src = 'https://www.google-analytics.com/analytics.js';
  document.body.appendChild( script );
} else {
  window.ga = function () {};
}

export default function () {
  window.ga.apply( null , arguments );
};
