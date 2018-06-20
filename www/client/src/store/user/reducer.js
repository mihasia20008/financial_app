import * as types from './actionTypes';

const initialState = {
    isAuth: 0,
    isConfirm: 0,
    isFetching: false,
    isLogout: false
};

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.USER_AUTH_FETCH:
        case types.USER_GET_FETCH:
        case types.USER_LOGOUT_FETCH:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.USER_AUTH_SUCCESS:
            localStorage.setItem('user', action.user.login);
            sessionStorage.setItem('confirm', true);            
            return Object.assign({}, state, {
                ...action.user,
                isAuth: 1,
                isFetching: false
            });
        case types.USER_AUTH_WARNING:
            return Object.assign({}, state, {
                ...action.user,
                isAuth: 2,
                isFetching: false
            });
        case types.USER_AUTH_ERROR:
            global.alert(action.err.response.data.message);
            return Object.assign({}, state, {
                isFetching: false
            });
        case types.CONFIRM_SUCCESS:
            localStorage.setItem('user', action.user.login);
            sessionStorage.setItem('confirm', true);
            return Object.assign({}, state, {
                ...action.user,
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
        case types.USER_GET_SUCCESS:
            return Object.assign({}, state, {
                ...action.user,
                isFetching: false
            });
        case types.USER_GET_ERROR:
            console.log(action);
            return Object.assign({}, state, {
                isFetching: false
            });
        case types.USER_LOGOUT_SUCCESS: 
            localStorage.removeItem('user');
            sessionStorage.removeItem('confirm');
            return Object.assign({}, state, {
                isLogout: true
            });
        case types.USER_LOGOUT_RESET: 
            return initialState;
        case types.USER_LOGOUT_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;

    }
}
