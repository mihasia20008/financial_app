import axios from 'axios';
import * as types from './actionTypes';

import { toggleAddForm } from '../form/actions';
import { updateBill } from '../bill/actions';

export function addOperation(operationData) {
    return async dispatch => {
        try {
            dispatch({ type: types.OPERATION_ADD_FETCH });
            await new Promise((resolve, reject) => {
                axios.post('/api/operation', operationData)
                    .then(res => {
                        dispatch(updateBill(res.data.bill));
                        dispatch({ type: types.OPERATION_ADD_SUCCESS, operation: res.data.operation });
                        dispatch(toggleAddForm());
                    })
                    .catch(err => reject(err));
            });
        } catch (err) {
            dispatch({ type: types.OPERATION_ADD_ERROR, err });
        }
    };
}

export function deleteOperation(id) {
    return async dispatch => {
        try {
            dispatch({ type: types.OPERATION_DELETE_FETCH });
            await new Promise((resolve, reject) => {
                axios.delete(`/api/operation?id=${id}`)
                    .then(res => dispatch({ type: types.OPERATION_DELETE_SUCCESS, operation: id }))
                    .catch(err => reject(err));
            });
        } catch (err) {
            dispatch({ type: types.OPERATION_DELETE_ERROR, err });
        }
    };
}

export function getOperations(user) {
    return async dispatch => {
        try {
            dispatch({ type: types.OPERATIONS_GET_FETCH });
            await new Promise((resolve, reject) => {
                axios.get(`/api/operation?id=${user}`)
                    .then(res => dispatch({ type: types.OPERATIONS_GET_SUCCESS, operations: res.data }))
                    .catch(err => reject(err));
            });
        } catch (err) {
            dispatch({ type: types.OPERATIONS_GET_ERROR, err });
        }
    };
}
