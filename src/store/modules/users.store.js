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
	addUser: ({ commit }, userData) => {
		let rowData = {
			firstName: userData.firstName,
			lastName: userData.lastName,
			gender: userData.gender,
			email: userData.email,
			phone: userData.phone,
			password: userData.repeatPassword,
			locationId: userData.districtId,
			villageName: userData.villageName,
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
						.then(function (data) {
							return 'User has been successfully created.';
						})
						.catch(function (error) {
							throw error;
						});
				} else {
					return 'User has been successfully created.';
				}
			})
			.catch(error => {
				throw error.response.data.error;
			});
	},

	// Edit admin/agent user
	editUser: ({ commit }, userData) => {
		let rowData = {
			firstName: userData.firstName,
			lastName: userData.lastName,
			gender: userData.gender,
			email: userData.email,
			phone: userData.phone,
			address: userData.address,
			villageName: userData.villageName,
			userStatus: (userData.loginStatus) ? 1 : 2,
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
						.then(function (data) {
							return 'A User profile updated successfully.';
						})
						.catch(function (error) {
							throw error;
						});
				} else {
					return 'A User profile updated successfully.';
				}
			})
			.catch(error => {
				throw error.response.data.error;
			});
	},

	addAgent: ({ commit }, userData) => {
		let rowData = {
			firstName: userData.firstName,
			lastName: userData.lastName,
			gender: userData.gender,
			email: userData.email,
			phone: userData.phone,
			password: userData.repeatPassword,
			locationId: userData.districtId,
			villageName: userData.villageName,
			address: userData.address,
			faxNumber: userData.faxNumber,
			bankName: userData.bankName,
			bankAcNumber: userData.bankAcNumber,
			familyBookNumber: userData.familyBookNumber,
			familyBookDOI: userData.familyBookDOI,
			personalIdNumber: userData.personalIdNumber,
			personalIdDOI: userData.personalIdDOI,
			userType: 3,
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
						.then(function (data) {
							return 'User has been successfully created.';
						})
						.catch(function (error) {
							throw error;
						});
				} else {
					return 'User has been successfully created.';
				}
			})
			.catch(error => {
				throw error.response.data.error;
			});
	},

	editAgent: ({ commit }, userData) => {
		let rowData = {
			firstName: userData.firstName,
			lastName: userData.lastName,
			gender: userData.gender,
			email: userData.email,
			phone: userData.phone,
			locationId: userData.districtId,
			villageName: userData.villageName,
			address: userData.address,
			faxNumber: userData.faxNumber,
			bankName: userData.bankName,
			bankAcNumber: userData.bankAcNumber,
			familyBookNumber: userData.familyBookNumber,
			familyBookDOI: userData.familyBookDOI,
			personalIdNumber: userData.personalIdNumber,
			personalIdDOI: userData.personalIdDOI,
			userType: 3,
			userStatus: userData.loginStatus ? 1 : 2,
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
						.then(function (data) {
							return 'A User profile updated successfully.';
						})
						.catch(function (error) {
							throw error;
						});
				} else {
					return 'A User profile updated successfully.';
				}
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
				return response.data.message + ': ' + 'A User successfully removed from the database.';
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
					id: i + 1,
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
