import client from '../client';
import Widget from '../../public/widget/index';

import draggable from './draggable';
import bindStorage from './storage';

const st = new Widget( { client } );

draggable( st );
bindStorage( st );

export default st;
