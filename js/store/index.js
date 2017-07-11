'use strict';

import {createStore, applyMiddleware} from 'redux';
import reduces from '../reducers/index';
import thunkMiddleware from 'redux-thunk';

const applyStoreMiddleware = applyMiddleware(thunkMiddleware)(createStore);
export const store = applyStoreMiddleware(reduces);