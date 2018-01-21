import { userConstants } from '../constants';

export function signUp(state = {}, action){
  switch (action.type) {
    case userConstants.SIGNUP_REQUEST:
      return { signup: true }; 
      break;
    case userConstants.SIGNUP_SUCCESS:
      return {};
      break;
    case userConstants.SIGNUP_FAIL:
      return {};
      break;
    default:
      return state;
  }
};
