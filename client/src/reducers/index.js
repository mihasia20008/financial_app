import { combineReducers } from 'redux';

import { signUp } from './signup';
// import { toggleLeftMenu } from './interaction';

const rootReducer = combineReducers({
	signUp,
	// toggleLeftMenu
});

export default rootReducer;
