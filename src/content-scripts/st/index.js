import client from '../client';
import Widget from '../../public/widget/index';

import draggable from './draggable';
import bindStorage from './storage';
import bindGA from './ga';

const st = new Widget( { client } );

draggable( st );
bindStorage( st );
bindGA( st );

export default st;
