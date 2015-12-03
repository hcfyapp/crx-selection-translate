require( 'babel-polyfill' );
require( './helpers/chrome-mock' );

// require all `tests/src/**/*spec.js`
const testsContext = require.context( './src/' , true , /spec\.js$/ );

testsContext.keys().forEach( testsContext );

// require all `src/**/*.js`
const componentsContext = require.context( '../src/' , true , /\.js$/ );

componentsContext.keys().forEach( componentsContext );
