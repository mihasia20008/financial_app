import * as types from './actionTypes';

const initialState = {
    user: null,
    isAuth: 0,
    isConfirm: 0
};

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.USER_AUTH_SUCCESS:
            localStorage.setItem('user', action.user.login);
            localStorage.setItem('confirm', true);            
            return Object.assign({}, state, {
                user: action.user,
                isAuth: 1
            });
        case types.USER_AUTH_WARNING:
            return Object.assign({}, state, {
                user: action.user,
                isAuth: 2
            });
        case types.USER_AUTH_ERROR:
            global.alert(action.err.response.data.message);
            return state;
        case types.CONFIRM_SUCCESS:
            localStorage.setItem('user', action.user.login);
            localStorage.setItem('confirm', true);
            return Object.assign({}, state, {
                user: action.user,
                isConfirm: 2
            });
        case types.CONFIRM_WARNING:
            return Object.assign({}, state, {
                isConfirm: 1
            });
        case types.CONFIRM_CRITICAL:
            return Object.assign({}, state, {
                hasError: true
            });
        case types.CONFIRM_ERROR:
            global.alert(action.err.response.data.message);
            return Object.assign({}, state, {
                hasError: true
            });
        default:
            return state;
    }
}
