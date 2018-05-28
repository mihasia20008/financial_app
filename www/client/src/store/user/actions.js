import axios from 'axios';
import * as types from './actionTypes';

export function authUser(authData) {
    return async dispatch => {
        try {
            await new Promise((resolve, reject) => {
                axios.post('/api/signin', authData)
                    .then(res => {
                        if (res.status !== 200) reject(res);
                        const { data: user } = res;
                        if (user.confirmAccount) 
                            dispatch({ type: types.USER_AUTH_SUCCESS, user });
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