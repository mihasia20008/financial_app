import * as types from './actionTypes';

const initialState = {
    categories: {},
    categoryIds: [],
    isFetching: false
};

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.CATEGORY_ADD_FETCH:
        case types.CATEGORY_DELETE_FETCH:
        case types.CATEGORIES_GET_FETCH:
        case types.CATEGORY_UPDATE_FETCH:
            return Object.assign({}, state, {
                isFetching: true
            });
        // case types.CATEGORY_ADD_SUCCESS:
        //     return Object.assign({}, state, {
        //         bills: Object.assign({}, state.bills, {
        //             [`${action.bill.id}`]: action.bill 
        //         }), 
        //         billIds: state.billIds.concat(action.bill.id),
        //         isFetching: false,
        //         showAddFrom: false
        //     });
        // case types.CATEGORY_ADD_ERROR:
        //     // global.alert(action.err.response.data.message);
        //     console.log('error', action);
        //     return Object.assign({}, state, {
        //         isFetching: false
        //     });
        // case types.CATEGORY_DELETE_SUCCESS:
        //     let newBillIds = state.billIds;
        //     newBillIds.splice(state.billIds.indexOf(action.bill), 1);
        //     let newBills = state.bills;
        //     delete newBills[action.bill];
        //     return Object.assign({}, state, {
        //         isFetching: false,
        //         bills: newBills,
        //         billIds: newBillIds
        //     });
        case types.CATEGORIES_GET_SUCCESS:
            let getCategories = {};
            let getCategoryIds = [];
            action.categories.forEach(category => {
                getCategories[category.id] = category;
                getCategoryIds.push(category.id);
            });
            return Object.assign({}, state, {
                categories: getCategories,
                categoryIds: getCategoryIds,
                isFetching: false
            });
        // case types.CATEGORY_UPDATE_SUCCESS:
        //     return Object.assign({}, state, {
        //         bills: Object.assign(state.bills, {
        //             [`${action.bill.id}`]: action.bill
        //         }),
        //         isFetching: false
        //     });
        case types.CATEGORY_DELETE_ERROR:
        case types.CATEGORIES_GET_ERROR:
        case types.CATEGORY_UPDATE_ERROR:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
}
