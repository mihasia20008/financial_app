import { combineReducers } from 'redux';

import { signUp } from './signup';
import { toggleLeftMenu } from './interaction';

const reducers = combineReducers({
	signUp,
	// toggleLeftMenu
});

export default reducers;
