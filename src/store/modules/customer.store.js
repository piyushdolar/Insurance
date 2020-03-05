import axios from '@/api/config';

const state = {
	customers: []
};

const actions = {
	// Get all Policy Holders
	getCustomers: ({ commit }, searchWord = '') => {
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
	addCustomers: ({ dispatch }, userData) => {
		userData.status = userData.status ? 1 : 2;
		userData.createdBy = userData.sessionId;
		return axios({
			method: 'post',
			url: 'customers',
			data: userData
		})
			.then(response => {
				if (userData.image != null) {
					let parsedData = {
						id: response.data.data.id,
						image: userData.image
					}
					dispatch('uploadImageCustomer', parsedData);
				}
				return 'Policy Holder has been successfully created.';
			})
			.catch(error => {
				throw error.response.data.error;
			});
	},
	// Upload profile picture
	uploadImageCustomer: (context, payload) => {
		let formData = new FormData();
		formData.append('avatar', payload.image);
		axios.post('customers/avatar/' + payload.id, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress: progressEvent => {
				let completeProgress = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
			}
		})
	},
	// Edit Agents user
	editCustomer: ({ dispatch }, userData) => {
		userData.status = userData.status ? 1 : 2;
		userData.updatedBy = userData.sessionId;
		(!userData.email) ? delete userData.email : '';
		return axios({
			method: 'put',
			url: 'customers/' + userData.id,
			data: userData
		})
			.then(response => {
				if (userData.image != null && response.status == 200) {
					dispatch('uploadImageCustomer', userData);
				}
				return 'Policy Holder successfully updated to database.';
			})
			.catch(error => {
				throw error.response.data.error;
			});
	},

	// Delete Agents user
	deleteCustomer: ({ commit }, { userId }) => {
		return axios({
			method: 'delete',
			url: 'customers/' + userId
		})
			.then(response => {
				return response.data.message + ': ' + 'A Policy Holder successfully removed from the database.';
			})
			.catch(error => {
				throw error.response.data.error;
			});
	}
};

const mutations = {
	SET_POLICY_HOLDERS: (state, users) => {
		for (let i = 0; i < users.length; i++) {
			let userAvailable = state.customers.find(user => {
				return user.id === users[i].id;
			});
			if (!userAvailable) {
				state.customers.push({
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
		return state.customers;
	},
	getSingleCustomer: state => id => {
		return state.customers.find(customer => customer.id === id);
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
