import axios from '../../api/config';
import moment from 'moment';

const state = {
	adminUsers: [],
	singleUser: {}
};

const actions = {
	// Get all users
	getAdminUsers: ({ commit }) => {
		axios
			.get('/users')
			.then(response => {
				commit('SET_ADMIN_USERS', response.data.data);
			})
			.catch(error => {
				console.log('Error-vuex-actions: ', error);
			});
	},
	getSingleAdminUser({ commit }, userId) {
		axios
			.get('/users/' + userId)
			.then(response => {
				commit('SET_SINGLE_ADMIN_USER', response.data.data);
			})
			.catch(error => {
				console.log('Error-vuex-actions: ', error);
			});
	},
	// Create admin user
	addAdminUser: ({ commit }, userData) => {
		let rowData = {
			firstName: userData.firstName,
			lastName: userData.lastName,
			gender: userData.gender,
			email: userData.email,
			phone: userData.phone,
			password: userData.repeatPassword,
			address: userData.address,
			userType: 2,
			userStatus: userData.loginStatus ? 1 : 2
		};
		return axios({
			method: 'post',
			url: 'users',
			data: rowData
		})
			.then(response => {
				if (userData.image != null) {
					let formData = new FormData();
					formData.append('avatar', userData.image);
					return axios
						.post('users/avatar/' + response.data.data.id, formData, {
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						})
						.then(function(data) {
							return 'User has been successfully created.';
						})
						.catch(function(error) {
							throw error;
						});
				} else {
					return 'User has been successfully created.';
				}
			})
			.catch(error => {
				throw error.response;
			});
	},

	// Edit admin user
	editAdminUser: ({ commit }, userData) => {
		let rowData = {
			firstName: userData.firstName,
			lastName: userData.lastName,
			gender: userData.gender,
			email: userData.email,
			phone: userData.phone,
			address: userData.address,
			userStatus: userData.loginStatus,
			updatedBy: userData.sessionId
		};
		return axios({
			method: 'put',
			url: 'users/' + userData.id,
			data: rowData
		})
			.then(response => {
				if (userData.image != null && response.status == 200) {
					let formData = new FormData();
					formData.append('avatar', userData.image);
					return axios
						.post('users/avatar/' + userData.id, formData, {
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						})
						.then(function(data) {
							return 'A User profile updated successfully.';
						})
						.catch(function(error) {
							throw error;
						});
				} else {
					return 'A User profile updated successfully.';
				}
			})
			.catch(error => {
				throw error.response;
			});
	},

	// Delete admin user
	deleteAdminUser: ({ commit }, { userId }) => {
		return axios({
			method: 'delete',
			url: 'users/' + userId
		})
			.then(response => {
				return response.data.message + ': ' + 'A User successfully removed from the database.';
			})
			.catch(error => {
				throw error.response;
			});
	}
};

const mutations = {
	SET_ADMIN_USERS: (state, users) => {
		for (let i = 0; i < users.data.length; i++) {
			let userAvailable = state.adminUsers.find(user => {
				return user.email === users.data[i].email;
			});
			if (!userAvailable) {
				state.adminUsers.push({
					id: i + 1,
					fullName: users.data[i].firstName + ' ' + users.data[i].lastName,
					email: users.data[i].email,
					gender: users.data[i].gender,
					createdAt: moment(String(users.data[i].createdAt)).format('DD/MM/YYYY hh:mm A'),
					updatedAt: moment(String(users.data[i].updatedAt)).format('DD/MM/YYYY hh:mm A')
				});
			}
		}
	},
	SET_SINGLE_ADMIN_USER: (state, response) => {
		state.singleUser = response;
	}
};

const getters = {
	getAdminUsers: ({ commit }) => {
		return [
			{
				id: 1,
				name: "Noelia O'Kon",
				nickname: 'asperiores',
				email: 'otho.smitham@example.com',
				birthdate: '1978-06-28 00:00:00',
				gender: 'F',
				salary: '13098.00',
				group_id: 2,
				created_at: '2017-01-01 07:21:10',
				updated_at: '2017-01-01 07:21:10',
				age: 41,
				group: {
					id: 2,
					name: 'Exec',
					description: 'Executives'
				}
			}
		];
	},
	getSingleAdminUser(state) {
		return state.singleUser;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
