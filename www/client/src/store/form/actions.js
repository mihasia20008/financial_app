import * as types from './actionTypes';

export function toggleAddForm() {
    return dispatch => dispatch({ type: types.TOGGLE_ADD_FORM });
}

export function toggleEditForm() {
    return dispatch => dispatch({ type: types.TOGGLE_EDIT_FORM });
}

export function toggleSortForm() {
    return dispatch => dispatch({ type: types.TOGGLE_SORT_FORM });
}

export function toggleFilterForm() {
    return dispatch => dispatch({ type: types.TOGGLE_FILTER_FORM });
}
