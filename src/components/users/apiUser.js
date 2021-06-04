import axios from 'axios';

const url = 'http://localhost:8000';

export const login = async (email, password) => {
	const res = await axios.post(`${url}/login`, {email, password});
	return res;
}

export const register = async (email, password, firstName, lastName) => {
	const res = await axios.post(`${url}/register`, {email, password, firstName, lastName});
	return res;
}

export const allUsers = async () => {
	// axios.defaults.headers.common = {'Authorization': `bearer ${token}`}

	const res = await axios.get(`${url}/users`);
	return res;
}

export const userById = async id => {
	const res = await axios.get(`${url}/user/${id}`);
	return res;
}

export const updateUser = async (id, formData, token) => {
	axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
	const res = await axios.put(`${url}/user/${id}`, formData);
	return res;
}

export const followRequest = async (userId, token, followId) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.put(`${url}/user/follow`, {userId, followId});
	return res;
}


export const unfollowRequest = async (userId, token, unfollowId) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.put(`${url}/user/unfollow`, {unfollowId, userId});
	return res;
}

export const authenticate = (token, cb) => {
	localStorage.setItem('token', JSON.stringify(token));
	cb();
}

export const isAuthenticated = () => {
	if(localStorage.getItem('token')){
		return JSON.parse(localStorage.getItem('token'));
	} else {
		return null
	}
}


// export const isAuthenticated = () => {
//     if(typeof window == 'undefined'){
//         return false;
//     }

//     if(localStorage.getItem('jwt')){
//         return JSON.parse(localStorage.getItem('jwt'));
//     } else {
//         return false;
//     }
// }