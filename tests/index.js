require( 'babel-polyfill' );
require( 'chrome-env' );

// todo 添加进 chrome-env
chrome.runtime.getURL = function () {
  return '';
};

const Vue = require( 'vue' );
Vue.config.silent = true;

if ( !window.Audio ) {
  window.Audio = function () {};
  window.Audio.prototype.play = function () {};
}

// require all `./tests/src/**/*spec.js`
const testsContext = require.context( './src/' , true , /-spec\.js$/ );

// todo 当使用下面这行 context 的时候，会发生一个未处理的 promise 的错误，可能是 babel 的锅。
//const testsContext = require.context( './src/background-scripts/' , true , /(server|badge)-spec\.js$/ );

testsContext.keys().forEach( testsContext );

// require all `./src/**/index.js`
const componentsContext = require.context( '../src/' , true , /index\.js$/ );
componentsContext.keys().forEach( componentsContext );
