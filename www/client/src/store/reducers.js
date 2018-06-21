import { combineReducers } from 'redux';

import user from './user/reducer';
import bill from './bill/reducer';
import form from './form/reducer';
import category from './category/reducer';
import operation from './operation/reducer';

export default combineReducers({
    user,
    bill,
    form,
    category,
    operation
});
