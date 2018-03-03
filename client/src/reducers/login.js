import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('userId'));
const initialState = user ? { loggedIn: true, user } : {};

// export function login(state = initialState, action) {
// 	switch (action.type) {
// 		case userConstants.LOGIN_:
//
// 			break;
// 		default:
//
// 	}
// }
