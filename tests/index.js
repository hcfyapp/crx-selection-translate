require( 'babel-polyfill' );
require( './helpers/chrome-mock' );

// require all `./tests/src/**/*spec.js`
const testsContext = require.context( './src/' , true , /spec\.js$/ );
testsContext.keys().forEach( testsContext );

// 在我使用了 connect.io 之后，如果我不注释掉下面的两行代码，那么总是会报错
// require all `./src/**/index.js`
//const componentsContext = require.context( '../src/' , true , /index\.js$/ );
//componentsContext.keys().forEach( componentsContext );
