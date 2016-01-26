/**
 * 添加谷歌分析。
 * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/
 */

let ga;

/* istanbul ignore next */
if ( process.env.NODE_ENV === 'production' ) {
  (function ( i , s , o , g , r , a , m ) {
    i[ 'GoogleAnalyticsObject' ] = r;
    i[ r ] = i[ r ] || function () {
        (i[ r ].q = i[ r ].q || []).push( arguments )
      }, i[ r ].l = 1 * new Date();
    a = s.createElement( o ),
      m = s.getElementsByTagName( o )[ 0 ];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore( a , m )
  })( window , document , 'script' , 'https://www.google-analytics.com/analytics.js' , 'ga' );

  ga = window.ga;
  ga( 'create' , 'UA-43276752-4' , 'auto' );
} else {
  ga = ()=> {};
}

export default ga;
