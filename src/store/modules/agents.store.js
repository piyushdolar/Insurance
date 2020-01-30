import axios from '../../api/config';

const state = {
	agents: []
};

const actions = {
	// Get all agents
	getAgents: ({ commit }, searchWord) => {
		const params = {
			sort: 'id|desc',
			page: 1,
			per_page: 20,
			filter: searchWord
		};
		axios.get('/agents', { params: params }).then(response => {
			commit('SET_AGENTS', response.data.data);
		});
	},
	// Create Agents user
	addAgent: ({ commit }, { userData }) => {
		let rowData = {
			firstName: userData.fname,
			lastName: userData.lname,
			gender: userData.gender,
			email: userData.email,
			phone: userData.phone,
			address: userData.address,
			status: userData.status ? 1 : 2,
			createdBy: userData.sessionId
		};
		return axios({
			method: 'post',
			url: 'agents',
			data: rowData
		})
			.then(response => {
				if (userData.image != null) {
					let formData = new FormData();
					formData.append('avatar', userData.image);
					return axios
						.post('agents/avatar/' + response.data.data.id, formData, {
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						})
						.then(function(data) {
							return 'Agent has been successfully created.';
						})
						.catch(function(error) {
							throw error;
						});
				} else {
					return 'Agent has been successfully created.';
				}
			})
			.catch(error => {
				throw error.response;
			});
	},

	// Edit Agents user
	editAgent: ({ commit }, { userData }) => {
		let rowData = {
			firstName: userData.fname,
			lastName: userData.lname,
			gender: userData.gender,
			email: userData.email,
			phone: userData.phone,
			address: userData.address,
			status: userData.status ? 1 : 2,
			updatedBy: userData.sessionId
		};
		return axios({
			method: 'put',
			url: 'agents/' + userData.id,
			data: rowData
		})
			.then(response => {
				if (userData.image != null) {
					let formData = new FormData();
					formData.append('avatar', userData.image);
					return axios
						.post('agents/avatar/' + userData.id, formData, {
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						})
						.then(function(data) {
							return 'A Agent successfully updated to database.';
						})
						.catch(function() {
							throw error;
						});
				} else {
					return 'A Agent successfully updated to database.';
				}
			})
			.catch(error => {
				throw error.response;
			});
	},

	// Delete Agents user
	deleteAgent: ({ commit }, { userId }) => {
		return axios({
			method: 'delete',
			url: 'agents/' + userId
		})
			.then(response => {
				return response.data.message + ': ' + 'A Agent successfully removed from the database.';
			})
			.catch(error => {
				throw error.response;
			});
	}
};

const mutations = {
	SET_AGENTS: (state, users) => {
		for (let i = 0; i < users.length; i++) {
			let userAvailable = state.agents.find(user => {
				return user.id === users[i].id;
			});
			if (!userAvailable) {
				state.agents.push({
					id: users[i].id,
					name: users[i].firstName + ' ' + users[i].lastName
				});
			}
		}
	}
};

const getters = {
	getAgents: state => {
		return state.agents;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
