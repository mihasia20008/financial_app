import * as types from './actionTypes';

const initialState = {
    operations: {},
    operationIds: [],
    isFetching: false
};

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.OPERATION_ADD_FETCH:
        case types.OPERATION_DELETE_FETCH:
        case types.OPERATIONS_GET_FETCH:
        // case types.OPERATION_UPDATE_FETCH:
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.OPERATION_ADD_SUCCESS:
            return Object.assign({}, state, {
                operations: Object.assign({}, state.operations, {
                    [`${action.operation.id}`]: action.operation
                }), 
                operationIds: state.operationIds.concat(action.operation.id),
                isFetching: false,
                showAddFrom: false
            });
        case types.OPERATION_ADD_ERROR:
            // global.alert(action.err.response.data.message);
            console.log('error', action);
            return Object.assign({}, state, {
                isFetching: false
            });
        case types.OPERATION_DELETE_SUCCESS:
            let newOperationIds = state.operationIds;
            newOperationIds.splice(state.operationIds.indexOf(action.operation), 1);
            let newOperations = state.operations;
            delete newOperations[action.operation];
            return Object.assign({}, state, {
                isFetching: false,
                operations: newOperations,
                operationIds: newOperationIds
            });
        case types.OPERATIONS_GET_SUCCESS:
            let getOperations = {};
            let getOperationIds = [];
            action.operations.forEach(operation => {
                getOperations[operation.id] = operation;
                getOperationIds.push(operation.id);
            });
            return Object.assign({}, state, {
                operations: getOperations,
                operationIds: getOperationIds,
                isFetching: false
            });
        // case types.BILL_UPDATE_SUCCESS:
        //     return Object.assign({}, state, {
        //         bills: Object.assign(state.bills, {
        //             [`${action.bill.id}`]: action.bill
        //         }),
        //         isFetching: false
        //     });
        case types.OPERATION_DELETE_ERROR:
        case types.OPERATIONS_GET_ERROR:
        // case types.OPERATION_UPDATE_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}
