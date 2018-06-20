import * as types from './actionTypes';

const initialState = {
    showAddForm: false,
    showEditForm: false,
    showSortForm: false,
    showFilterForm: false
};

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.TOGGLE_ADD_FORM:
            return Object.assign({}, state, {
                showAddForm: !state.showAddForm
            });
        case types.TOGGLE_EDIT_FORM:
            return Object.assign({}, state, {
                showEditForm: !state.showEditForm
            });
        case types.TOGGLE_SORT_FORM:
            return Object.assign({}, state, {
                showSortForm: !state.showSortForm
            });
        case types.TOGGLE_FILTER_FORM:
            return Object.assign({}, state, {
                showFilterForm: !state.showFilterForm
            });
        default:
            return state;
    }
}
