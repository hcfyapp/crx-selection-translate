import 'babel-polyfill';
import './popup.scss';
import './app';

import ga from '../public/ga';
ga( 'set' , 'page' , '/popup/index.html' );
ga( 'send' , 'pageview' );
