import axios from '@/api/config';
import moment from 'moment';

const state = {
	policies: [],
	policyHistory: [],
	policyReports: []
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
		axios.get('/report/policy', {
			params: params
		}).then(response => {
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
		formData.append('grossWeightInTon', payload.grossWeightInTon);
		formData.append('vehicleType', payload.vehicleType);
		formData.append('vehicleColor', payload.vehicleColor);
		formData.append('seats', payload.seats);
		formData.append('agentId', payload.agentId);

		return axios.post('/policy', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress: progressEvent => {
				let completeProgress = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
			}
		}).then(response => {
			return "Policy has been created successfully.";
		}).catch(error => {
			throw error.response.data.error;
		})
	},

	createPolicyByAdmin: ({ commit }, payload) => {
		let rowData = {
			policy:{
				policyName: payload.policyName,
				policyNumber: payload.policyNumber,
				policyType: payload.policyType,
				startDate: moment(String(payload.startDate)).format('YYYY/MM/DD HH:mm:ss'),
				endDate: moment(String(payload.endDate)).format('YYYY/MM/DD HH:mm:ss'),
				customerId: payload.customerSearched.id,
				agentId: payload.agentSearched.id,
				sumInsured: payload.sumInsured,
				currencyType: payload.currencyType,
				status: 1
			},
			vehicle:{
				vehicleType: payload.vehicleType,
				make: payload.make,
				plateNumber: payload.plateNumber,
				vehicleColor: payload.vehicleColor,
				powerInCC: payload.powerInCC,
				engineNumber: payload.engineNumber,
				chassisNumber: payload.chassisNumber,
				grossWeightInTon: payload.grossWeightInTon,
				seats: payload.grossWeightInTon
			}
		};
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

	editPolicy: ({ commit }, payload) => {
		let rowData = {
			customerId: payload.customerSearched.id,
			policyName: payload.policyName,
			policyNumber: payload.policyNumber,
			startDate: moment(String(payload.startDate)).format('YYYY/MM/DD HH:mm:ss'),
			endDate: moment(String(payload.endDate)).format('YYYY/MM/DD HH:mm:ss'),
			policyType: payload.policyType,
			agentId: payload.agentSearched.id,
			sumInsured: payload.sumInsured,
			comment: payload.comment,
			currencyType: payload.currencyType,
			status: payload.status == false ? 1 : 2,
			updatedBy: payload.sessionId
		};
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
	}
};

const mutations = {
	SET_POLICY_DATA: (state, response) => {
		state.policies = response;
	},
	SET_POLICY_HISTORY: (state, response) => {
		state.policyHistory = response;
	},
	SET_USER_REPORTS: (state, response) => {
		state.policyReports = response;
	}
};

const getters = {
	getAllPolicies: state => {
		return state.policies;
	},
	getPolicyHistory: state => { return state.policyHistory },
	getPolicyReports: state => { return state.policyReports }
};

export default {
	state,
	mutations,
	actions,
	getters
};
