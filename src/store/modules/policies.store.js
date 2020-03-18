import axios from '@/api/config';
import moment from 'moment';

const state = {
	policy: [],
	policies: [],
	policyHistory: [],
	policyReports: [],
	tempData: []
};

const actions = {
	fetchPolicies: ({ commit }) => {
		return axios
			.get('/policy')
			.then(response => {
				commit('SET_POLICY_DATA', response.data.data);
			})
			.catch(error => {
				throw error.response.data.error;
			});
	},

	getPolicyReports: ({ commit }, payload) => {
		const params = {
			sort: 'id|desc',
			page: 1,
			per_page: 20,
			filter: payload.searchWord,
			user_type: payload.user_type
		};
		axios
			.get('/report/policy', {
				params: params
			})
			.then(response => {
				commit('SET_USER_REPORTS', response.data.data);
			});
	},

	createPolicyByAgent({ commit }, payload) {
		let formData = new FormData();
		formData.append('picture', payload.picture);
		formData.append('firstName', payload.firstName);
		formData.append('lastName', payload.lastName);
		formData.append('policyNumber', payload.policyNumber);
		formData.append('phone', payload.phone);
		formData.append('address', payload.address);
		formData.append('make', payload.make);
		formData.append('plateNumber', payload.plateNumber);
		formData.append('powerInCC', payload.powerInCC);
		formData.append('engineNumber', payload.engineNumber);
		formData.append('chassisNumber', payload.chassisNumber);
		payload.grossWeightInTon ? formData.append('grossWeightInTon', payload.grossWeightInTon) : '';
		formData.append('vehicleType', payload.vehicleType);
		formData.append('vehicleColor', payload.vehicleColor);
		formData.append('seats', payload.seats);
		formData.append('agentId', payload.agentId);

		return axios
			.post('/policy', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: progressEvent => {
					let completeProgress = (((progressEvent.loaded / progressEvent.total) * 100) | 0) + '%';
				}
			})
			.then(response => {
				return 'Policy has been created successfully.';
			})
			.catch(error => {
				throw error.response.data.error;
			});
	},

	editPolicyByAgent({ commit }, payload) {
		let formData = new FormData();
		payload.pictureNew ? formData.append('picture', payload.pictureNew) : '';
		formData.append('firstName', payload.firstName);
		formData.append('lastName', payload.lastName);
		formData.append('customerId', payload.customerId);
		formData.append('policyNumber', payload.policyNumber);
		formData.append('phone', payload.phone);
		formData.append('address', payload.address);
		formData.append('make', payload.make);
		formData.append('plateNumber', payload.plateNumber);
		formData.append('powerInCC', payload.powerInCC);
		formData.append('engineNumber', payload.engineNumber);
		formData.append('chassisNumber', payload.chassisNumber);
		payload.grossWeightInTon ? formData.append('grossWeightInTon', payload.grossWeightInTon) : '';
		formData.append('vehicleType', payload.vehicleType);
		formData.append('vehicleColor', payload.vehicleColor);
		formData.append('seats', payload.seats);
		formData.append('agentId', payload.agentId);
		formData.append('status', 1);

		return axios
			.put('/policy/' + payload.policyId, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: progressEvent => {
					let completeProgress = (((progressEvent.loaded / progressEvent.total) * 100) | 0) + '%';
				}
			})
			.then(response => {
				return 'Policy has been updated successfully and sent to the admins.';
			})
			.catch(error => {
				throw error.response.data.error;
			});
	},

	createPolicyByAdmin: ({ commit, state }, payload) => {
		commit('SET_FILTER_DATA', payload);
		let rowData = state.tempData;
		return axios({
			method: 'post',
			url: 'policy',
			data: rowData
		})
			.then(response => {
				commit('SET_POLICY_DATA', response.data.data);
				return `Policy for ${payload.customerSearched.name} has been successfully created.`;
			})
			.catch(error => {
				throw error.response.data.error;
			});
	},

	editPolicy: ({ state, commit }, payload) => {
		commit('SET_FILTER_DATA', payload);
		let rowData = state.tempData;
		rowData.updatedBy = payload.sessionId;

		return axios({
			method: 'put',
			url: 'policy/' + payload.id,
			data: rowData
		})
			.then(response => {
				return 'Policy successfully updated.';
			})
			.catch(error => {
				throw error.response.data.error;
			});
	},

	deletePolicy: ({ commit }, { policyId }) => {
		return axios({
			method: 'delete',
			url: 'policy/' + policyId
		})
			.then(response => {
				return response.data.message + ': ' + 'A Policy successfully removed from the database.';
			})
			.catch(error => {
				throw error.response.data.error;
			});
	},

	getPolicyHistory: ({ commit }, policyId) => {
		return axios
			.get('/policyHistory/' + policyId)
			.then(response => {
				commit('SET_POLICY_HISTORY', response.data.data);
			})
			.catch(error => {
				throw error.response.data.error;
			});
	},

	getPolicyById: ({ commit }, policyId) => {
		return axios
			.get('/policy/' + policyId)
			.then(response => {
				commit('SET_SINGLE_POLICY_DATA', response.data.data);
			})
			.catch(error => {
				throw error.response.data.error;
			});
	}
};

const mutations = {
	SET_POLICY_DATA: (state, response) => {
		state.policies = response;
	},
	SET_SINGLE_POLICY_DATA: (state, response) => {
		state.policy = response;
	},
	SET_POLICY_HISTORY: (state, response) => {
		state.policyHistory = response;
	},
	SET_USER_REPORTS: (state, response) => {
		state.policyReports = response;
	},
	SET_FILTER_DATA: (state, payload) => {
		let rowData = {
			policyName: payload.policyName,
			policyNumber: payload.policyNumber,
			policyType: payload.policyType,
			startDate: moment(String(payload.startDate)).format('YYYY/MM/DD HH:mm:ss'),
			endDate: moment(String(payload.endDate)).format('YYYY/MM/DD HH:mm:ss'),
			customerId: payload.customerSearched.id,
			sumInsured: payload.sumInsured,
			currencyType: payload.currencyType,
			status: payload.status,
			vehicleType: payload.vehicleType,
			make: payload.make,
			plateNumber: payload.plateNumber,
			vehicleColor: payload.vehicleColor,
			powerInCC: payload.powerInCC,
			engineNumber: payload.engineNumber,
			chassisNumber: payload.chassisNumber,
			seats: payload.seats
		};
		payload.agentSearched.id ? (rowData.agentId = payload.agentSearched.id) : '';
		payload.grossWeightInTon ? (rowData.grossWeightInTon = payload.grossWeightInTon) : '';
		payload.comment ? (rowData.comment = payload.comment) : '';
		state.tempData = rowData;
	}
};

const getters = {
	getAllPolicies: state => {
		return state.policies;
	},
	getPolicyHistory: state => {
		return state.policyHistory;
	},
	getPolicyReports: state => {
		return state.policyReports;
	},
	getSinglePolicy: state => {
		return state.policy;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
