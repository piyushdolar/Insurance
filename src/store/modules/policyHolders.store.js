import axios from '../../api/config';
import moment from 'moment';

axios.defaults.headers.common.Authorization = `Bearer ${window.localStorage.getItem('refreshToken')}`;

const state = {
	policyHolders: []
};

const actions = {
	// Get all agents
	getPolicyHolders: ({ commit }) => {
		axios
			.get('/customers')
			.then(response => {
				commit('SET_POLICY_HOLDERS', response.data.data);
			})
			.catch(error => {
				console.log('Error-vuex-actions: ', error);
			});
	},
	// Create Agents user
	addPolicyHolder: ({ commit }, { userData }) => {
		let rowData = {
			firstName: userData.fname,
			lastName: userData.lname,
			gender: userData.gender,
			email: userData.email,
			phone: userData.phone,
			address: userData.address,
			status: 1,
			createdBy: userData.sessionId
		};
		return axios({
			method: 'post',
			url: 'customers',
			data: rowData
		})
			.then(response => {
				if (userData.image != null) {
					let formData = new FormData();
					formData.append('avatar', userData.image);
					return axios
						.post('customers/avatar/' + response.data.data.id, formData, {
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						})
						.then(function(data) {
							return 'Policy Holder has been successfully created.';
						})
						.catch(function(error) {
							throw error;
						});
				} else {
					return 'Policy Holder has been successfully created.';
				}
			})
			.catch(error => {
				throw error.response;
			});
	},

	// Edit Agents user
	editPolicyHolder: ({ commit }, { userData }) => {
		let rowData = {
			firstName: userData.fname,
			lastName: userData.lname,
			gender: userData.gender,
			email: userData.email,
			phone: userData.phone,
			address: userData.address,
			updatedBy: userData.sessionId
		};
		return axios({
			method: 'put',
			url: 'customers/' + userData.id,
			data: rowData
		})
			.then(response => {
				if (userData.image != null) {
					let formData = new FormData();
					formData.append('avatar', userData.image);
					return axios
						.post('customers/avatar/' + userData.id, formData, {
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						})
						.then(function(data) {
							return 'A Policy Holder successfully updated to database.';
						})
						.catch(function() {
							throw error;
						});
				} else {
					return 'A Policy Holder successfully updated to database.';
				}
			})
			.catch(error => {
				throw error.response;
			});
	},

	// Delete Agents user
	deletePolicyHolder: ({ commit }, { userId }) => {
		return axios({
			method: 'delete',
			url: 'customers/' + userId
		})
			.then(response => {
				return response.data.message + ': ' + 'A Policy Holder successfully removed from the database.';
			})
			.catch(error => {
				throw error.response;
			});
	}
};

const mutations = {
	SET_AGENTS: (state, users) => {
		for (let i = 0; i < users.data.length; i++) {
			let userAvailable = state.agents.find(user => {
				return user.email === users.data[i].email;
			});
			if (!userAvailable) {
				state.agents.push({
					id: i + 1,
					fullName: users.data[i].firstName + ' ' + users.data[i].lastName,
					email: users.data[i].email,
					gender: users.data[i].gender,
					createdAt: moment(String(users.data[i].createdAt)).format('DD/MM/YYYY hh:mm A'),
					updatedAt: moment(String(users.data[i].updatedAt)).format('DD/MM/YYYY hh:mm A')
				});
			}
		}
	}
};

const getters = {
	getAgents: ({ state }) => {
		return state.agents;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
