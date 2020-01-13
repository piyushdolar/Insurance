import axios from '../../Api/config';

const state = {
	userLogin: null
};

const actions = {
	checkLogin: ({ commit }, { userData }) => {
		return axios
			.post(`/users/login`, {
				email: userData.email,
				password: userData.password
			})
			.then(response => {
				localStorage.setItem('refreshToken', response.headers.token);
				commit('SET_LOGIN', response.data);
				return response.data;
			})
			.catch(error => {
				throw error.response.data.error;
			});
	}
};

const mutations = {
	SET_LOGIN: (state, userData) => {
		state.userLogin = userData.data;
	}
};

const getters = {};

export default {
	state,
	mutations,
	actions,
	getters
};
