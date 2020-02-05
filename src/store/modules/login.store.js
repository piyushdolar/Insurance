import axios from "../../api/config";
// axios.defaults.headers.common.Authorization = `Bearer ${window.localStorage.getItem('refreshToken')}`;

const state = {
	user: {
		userLogin: null,
		loggedIn: false
	},
	token: null
};

const actions = {
	checkLogin: ({ commit }, { userData }) => {
		return axios
			.post(`/users/login`, {
				email: userData.email,
				password: userData.password
			})
			.then(response => {
				commit("LOGIN_CHECK", response);
				return response.data;
			})
			.catch(error => {
				throw error.response.data.error;
			});
	},
	checkLoginWithQRCode: ({ commit, state }, payload) => {
		return axios
			.get("/2fa", {
				params: {
					authCode: payload
				},
				headers: { 'Authorization': `Bearer ${state.token}` },
			})
			.then(function (response) {
				commit("SET_LOGIN", response);
				return response.data;
			})
			.catch(function (error) {
				throw error.response.data.error;
			})
	},
}
const mutations = {
	SET_LOGIN: (state, userData) => {
		state.token = userData.headers.token;
		window.localStorage.setItem("refreshToken", state.token);
		state.user.userLogin = userData.data.data;
		state.user.loggedIn = true;
	},
	LOGIN_CHECK: (state, payload) => {
		state.token = payload.headers.token;
	}
};

const getters = {
	isLoggedIn: state => {
		return state.user.loggedIn;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
