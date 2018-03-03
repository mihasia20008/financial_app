import { getFetchOptions } from '../services';

const userService = {
	logIn,
	signUp,
	logOut
};

export { userService };

function logIn(login, password) {
	return {login, name: 'test'};
}

function logOut() {
	localStorage.removeItem('userId');
}

function signUp(user) {
	return fetch('/signup', getFetchOptions({ method: 'POST', body: user }))
		.then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}
