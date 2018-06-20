import axios from 'axios';
import * as types from './actionTypes';

import { getBills } from '../bill/actions';

export function authUser(authData) {
    return async dispatch => {
        try {
            dispatch({ type: types.USER_AUTH_FETCH });
            await new Promise((resolve, reject) => {
                axios.post('/api/signin', authData)
                    .then(res => {
                        if (res.status !== 200) reject(res);
                        const { data: user } = res;
                        if (user.confirmAccount) {
                            dispatch(getBills(user.id));
                            dispatch({ type: types.USER_AUTH_SUCCESS, user });
                        }
                        else 
                            dispatch({ type: types.USER_AUTH_WARNING, user });
                    })
                    .catch(err => reject(err));
            });
        } catch (err) {
            dispatch({ type: types.USER_AUTH_ERROR, err });
        }
    };
}

export function confirmUser(id, hash) {
    return async dispatch => {
        try {
            await new Promise((resolve, reject) => {
                if (!!id && !!hash) 
                    setTimeout(() => {
                        axios.get(`/api/confirm?id=${id}&hash=${hash}`)
                            .then(res => resolve(dispatch({ type: types.CONFIRM_SUCCESS, user: res.data})))
                            .catch(err => {
                                if (typeof err.response.data.message !== 'undefined')
                                    reject(err);
                                else
                                    resolve(dispatch({ type: types.CONFIRM_WARNING }));
                            });
                    }, 1000);
                else resolve(dispatch({ type: types.CONFIRM_CRITICAL }));
            });
        } catch (err) {
            dispatch({ type: types.CONFIRM_ERROR, err});
        }
    };    
}

export function getUser(login) {
    return async dispatch => {
        try {
            dispatch({ type: types.USER_GET_FETCH });
            await new Promise((resolve, reject) => {
                if (typeof login !== 'undefined') {
                    axios.get(`/api/user?login=${login}`)
                        .then(res => {
                            dispatch(getBills(res.data.id));
                            resolve(dispatch({ type: types.USER_GET_SUCCESS, user: res.data}))
                        })
                        .catch(err => {
                            console.log(err);
                            if (typeof err.response.data.message !== 'undefined')
                                reject(err.response.data.message);
                        });
                } else reject('Передан неверный параметр запроса');
            })
        } catch (err) {
            dispatch({ type: types.USER_GET_ERROR, err});
        }
    }
}

export function logoutUser() {
    return dispatch => {
        try {
            dispatch({ type: types.USER_LOGOUT_FETCH });
            setTimeout(() => {
                dispatch({ type: types.USER_LOGOUT_SUCCESS });
                dispatch({ type: types.USER_LOGOUT_RESET });
            }, 1500);
        } catch(err) {
            dispatch({ type: types.USER_LOGOUT_ERROR, err});
        }
    }
}
