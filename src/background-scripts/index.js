import 'babel-polyfill';

import './commands';
import './install';
import './menus';
import './server';
import './badge';
import './pdf-sniffer';
import './shanbay';

import ga from '../public/ga';
ga( 'set' , 'page' , '/background-scripts/index.html' );
