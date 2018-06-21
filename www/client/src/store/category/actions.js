import axios from 'axios';
import * as types from './actionTypes';

// import { toggleAddForm } from '../form/actions';

export function getCategories(user) {
    return async dispatch => {
        try {
            dispatch({ type: types.CATEGORIES_GET_FETCH });
            await new Promise((resolve, reject) => {
                axios.get(`/api/category?id=${user}`)
                    .then(res => dispatch({ type: types.CATEGORIES_GET_SUCCESS, categories: res.data }))
                    .catch(err => reject(err));
            });
        } catch (err) {
            dispatch({ type: types.CATEGORIES_GET_ERROR, err });
        }
    };
}
