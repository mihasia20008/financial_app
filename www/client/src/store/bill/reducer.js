import * as types from './actionTypes';

const initialState = {
    bills: {},
    billIds: [],
    isFetching: false,
    showAddForm: false
};

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.BILL_ADD_FETCH:
        case types.BILL_DELETE_FETCH:
        case types.BILLS_GET_FETCH:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.BILL_ADD_TOGGLE:
            return Object.assign({}, state, {
                showAddForm: !state.showAddForm
            });
        case types.BILL_ADD_SUCCESS:
            return Object.assign({}, state, {
                bills: Object.assign({}, state.bills, {
                    [`${action.bill.id}`]: action.bill 
                }), 
                billIds: state.billIds.concat(action.bill.id),
                isFetching: false,
                showAddFrom: false
            });
        case types.BILL_ADD_ERROR:
            // global.alert(action.err.response.data.message);
            console.log('error', action);
            return Object.assign({}, state, {
                isFetching: false
            });
        case types.BILLS_GET_SUCCESS:
            let bills = {};
            let billIds = [];
            action.bills.forEach(bill => {
                bills[bill.id] = bill;
                billIds.push(bill.id);
            });
            return Object.assign({}, state, {
                bills, billIds,
                isFetching: false
            });
        case types.BILLS_GET_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}
