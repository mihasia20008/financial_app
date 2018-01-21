import { userConstants } from '../constants';
import { userService } from '../services';
import { history } from '../helpers';

function signUp(user) {
	function request(user) { return { type: userConstants.SIGNUP_REQUEST, user } }
  	function success(user) { return { type: userConstants.SIGNUP_SUCCESS, user } }
	function fail(error) { return { type: userConstants.SIGNUP_FAILURE, error } }
	  
	return dispatch => {
		dispatch(request(user));

		userService.signUp(user)
			.then(user => {
				dispatch(success(user));
				history.push('/login');
				console.log('SignUp success');
			})
			.catch(err => {
				dispatch(fail(err));
				console.log('SignUp has some errors');
				console.error(JSON.stringify(err));
			});
	}

}

const userActions = {
	signUp
};

export { userActions };


