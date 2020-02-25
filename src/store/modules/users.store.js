import axios from '../../api/config';
import moment from 'moment';

const state = {
	users: [],
	singleUser: {}
};

const actions = {
	// Get all users
	getUsers: ({ commit }, payload) => {
		const params = {
			sort: 'id|desc',
			page: 1,
			per_page: 20,
			filter: payload.searchWord,
			user_type: payload.user_type
		};
		axios.get('/users', {
			params: params
		}).then(response => {
			commit('SET_USERS', response.data.data);
		});
	},
	getSingleUser({ commit }, userId) {
		axios.get('/users/' + userId).then(response => {
			commit('SET_SINGLE_USER', response.data.data);
		});
	},
	// Create admin/agent user
	addUser: ({ dispatch }, userData) => {
		userData.locationId = userData.districtId ? userData.districtId : null;
		userData.userStatus = userData.loginStatus ? 1 : 2;
		return axios({
			method: 'post',
			url: 'users',
			data: userData
		})
			.then(response => {
				if (userData.image != null) {
					let parsedData = {
						id: response.data.data.id,
						image: userData.image
					}
					dispatch('uploadImage', parsedData);
				}
				return 'Admin has been successfully created.';
			})
			.catch(error => {
				throw error.response.data.error;
			});
	},
	// Upload profile picture
	uploadImage: (context, payload) => {
		let formData = new FormData();
		formData.append('avatar', payload.image);
		axios.post('users/avatar/' + payload.id, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},
	// Edit admin/agent user
	editUser: ({ dispatch }, userData) => {
		userData.userStatus = (userData.loginStatus) ? 1 : 2;
		userData.updatedBy = userData.sessionId;
		return axios({
			method: 'put',
			url: 'users/' + userData.id,
			data: userData
		})
			.then(response => {
				if (userData.image != null && response.status == 200) {
					dispatch('uploadImage', userData);
				}
				return 'User successfully updated.';
			})
			.catch(error => {
				throw error.response.data.error;
			});
	},

	// Delete admin/agent user
	deleteUser: ({ commit }, { userId }) => {
		return axios({
			method: 'delete',
			url: 'users/' + userId
		})
			.then(response => {
				return response.data.message + ': ' + 'Admin successfully removed from the database.';
			})
			.catch(error => {
				throw error.response.data.error;
			});
	}
};

const mutations = {
	SET_USERS: (state, users) => {
		for (let i = 0; i < users.length; i++) {
			let userAvailable = state.users.find(user => {
				return user.email === users[i].email;
			});
			if (!userAvailable) {
				state.users.push({
					id: users[i].id,
					name: users[i].firstName + ' ' + users[i].lastName,
					email: users[i].email,
					gender: users[i].gender,
					createdAt: moment(String(users[i].createdAt)).format('DD/MM/YYYY hh:mm A'),
					updatedAt: moment(String(users[i].updatedAt)).format('DD/MM/YYYY hh:mm A')
				});
			}
		}
	},
	SET_SINGLE_USER: (state, response) => {
		state.singleUser = response;
	}
};

const getters = {
	getUsers: (state) => {
		return state.users;
	},
	getSingleUser(state) {
		return state.singleUser;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
