import client from '../client';
import Widget from '../../public/widget/index';

import draggable from './draggable';
import bindStorage from './storage';
import bindGA from './ga';
import hideOnEsc from './hide-on-esc';
import './shanbay'

const st = new Widget( { client } );

draggable( st );
bindStorage( st );
bindGA( st );
hideOnEsc( st );

export default st;
