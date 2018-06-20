import { combineReducers } from 'redux';

import user from './user/reducer';
import bill from './bill/reducer';

export default combineReducers({
    user,
    bill
});
