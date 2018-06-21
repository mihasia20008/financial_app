import * as types from './actionTypes';

const initialState = {
    bills: {},
    billIds: [],
    isFetching: false
};

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.BILL_ADD_FETCH:
        case types.BILL_DELETE_FETCH:
        case types.BILLS_GET_FETCH:
        case types.BILL_UPDATE_FETCH:
            return Object.assign({}, state, {
                isFetching: true
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
        case types.BILL_DELETE_SUCCESS:
            let newBillIds = state.billIds;
            newBillIds.splice(state.billIds.indexOf(action.bill), 1);
            let newBills = state.bills;
            delete newBills[action.bill];
            return Object.assign({}, state, {
                isFetching: false,
                bills: newBills,
                billIds: newBillIds
            });
        case types.BILLS_GET_SUCCESS:
            let getBills = {};
            let getBillIds = [];
            action.bills.forEach(bill => {
                getBills[bill.id] = bill;
                getBillIds.push(bill.id);
            });
            return Object.assign({}, state, {
                bills: getBills,
                billIds: getBillIds,
                isFetching: false
            });
        case types.BILL_UPDATE_SUCCESS:
            return Object.assign({}, state, {
                bills: Object.assign(state.bills, {
                    [`${action.bill.id}`]: action.bill
                }),
                isFetching: false
            });
        case types.BILL_DELETE_ERROR:
        case types.BILLS_GET_ERROR:
        case types.BILL_UPDATE_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}
