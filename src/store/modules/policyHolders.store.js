import axios from '../../api/config';

const state = {
	policyHolders: []
};

const actions = {
	// Get all Policy Holders
	getPolicyHolders: ({ commit }, searchWord = '') => {
		const params = {
			sort: 'id|desc',
			page: 1,
			per_page: 20,
			filter: searchWord
		};
		axios.get('/customers', { params: params }).then(response => {
			commit('SET_POLICY_HOLDERS', response.data.data);
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
			status: userData.status ? 1 : 2,
			createdBy: userData.sessionId,
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
						.then(function (data) {
							return 'Policy Holder has been successfully created.';
						})
						.catch(function (error) {
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
			status: userData.status ? 1 : 2,
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
						.then(function (data) {
							return 'A Policy Holder successfully updated to database.';
						})
						.catch(function () {
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
	SET_POLICY_HOLDERS: (state, users) => {
		for (let i = 0; i < users.length; i++) {
			let userAvailable = state.policyHolders.find(user => {
				return user.id === users[i].id;
			});
			if (!userAvailable) {
				state.policyHolders.push({
					id: users[i].id,
					name: users[i].firstName + ' ' + users[i].lastName,
					picture: users[i].picture,
					gender: users[i].gender,
					address: users[i].address,
					phone: users[i].phone,
					email: users[i].email,
					status: users[i].status,
					createdBy: users[i].createdBy,
					updatedBy: users[i].updatedBy,
					createdAt: users[i].createdAt,
					updatedAt: users[i].updatedAt
				});
			}
		}
	}
};

const getters = {
	getCustomers: state => {
		return state.policyHolders;
	},
	getSingleCustomer: state => id => {
		return state.policyHolders.find(customer => customer.id === id);
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
