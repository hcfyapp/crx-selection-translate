require( 'babel-polyfill' );
require( './helpers/chrome-mock' );

// require all `./tests/src/**/*spec.js`
const testsContext = require.context( './src/' , true , /spec\.js$/ );

testsContext.keys().forEach( testsContext );

// require all `./src/**/index.js`。加上 index 这个限制是为了避免加载 ./src/bundle/ 下由 webpack 生成的文件
const componentsContext = require.context( '../src/' , true , /index\.js$/ );

componentsContext.keys().forEach( componentsContext );
