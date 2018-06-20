import axios from 'axios';
import * as types from './actionTypes';

export function toggleAddBillForm() {
    return dispatch => dispatch({ type: types.BILL_ADD_TOGGLE });
}

export function addBill(billData) {
    return async dispatch => {
        try {
            dispatch({ type: types.BILL_ADD_FETCH });
            await new Promise((resolve, reject) => {
                axios.post('/api/bill', billData)
                    .then(res => {
                        dispatch({ type: types.BILL_ADD_SUCCESS, bill: res.data });
                        dispatch({ type: types.BILL_ADD_TOGGLE });
                    })
                    .catch(err => reject(err));
            });
        } catch (err) {
            dispatch({ type: types.BILL_ADD_ERROR, err });
        }
    };
}

export function deleteBill(id) {
    return async dispatch => {
        try {
            dispatch({ type: types.BILL_DELETE_FETCH });
            await new Promise((resolve, reject) => {
                axios.delete(`/api/bill?id=${id}`)
                    .then(res => dispatch({ type: types.BILL_DELETE_SUCCESS, bill: id }))
                    .catch(err => reject(err));
            });
        } catch (err) {
            dispatch({ type: types.BILL_DELETE_ERROR, err });
        }
    };
}

export function getBills(user) {
    return async dispatch => {
        try {
            dispatch({ type: types.BILLS_GET_FETCH });
            await new Promise((resolve, reject) => {
                axios.get(`/api/bill?id=${user}`)
                    .then(res => dispatch({ type: types.BILLS_GET_SUCCESS, bills: res.data }))
                    .catch(err => reject(err));
            });
        } catch (err) {
            dispatch({ type: types.BILLS_GET_ERROR, err });
        }
    };
}
