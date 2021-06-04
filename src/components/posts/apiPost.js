import axios from 'axios';

const url = 'http://localhost:8000';

export const postNew = async (userId, token, formData) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.post(`${url}/posts/new/${userId}`, formData);
	return res;
}

export const allPosts = async () => {
	const res = await axios.get(`${url}/posts`);
	return res;
}

export const getPost = async id => {
	const res = await axios.get(`${url}/posts/${id}`);
	return res;
}

export const updatePost = async (userId, postId, token, formData) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	// axios.defaults.headers.common = {'content-type': 'multipart/form-data'};
	console.log(formData)

	const res = await axios.put(`${url}/posts/${postId}/update/${userId}`, formData);
	return res;
}

export const removePost = async (userId, postId, token) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.delete(`${url}/posts/${postId}/remove/${userId}`);
	return res;
}

export const like = async (userId, token, postId) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.put(`${url}/posts/${postId}/like`, {userId, postId});
	return res;
}


export const unlike = async (userId, token, postId) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.put(`${url}/posts/${postId}/unlike`, {userId, postId});
	return res;
}

export const createComment = async (userId, token, postId, text) => {
	axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
	const res = await axios.post(`${url}/comments/${postId}/new/${userId}`, {text});
	return res;
}