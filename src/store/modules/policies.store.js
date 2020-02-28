import axios from '../../api/config';
import moment from 'moment';

const state = {
	policies: [],
	policyHistory: []
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
	createPolicyByAgent({ commit }, payload) {
		console.log(payload);
		return axios.post('/policy', payload).then(response => {
			console.log('okay', response);
		}).catch(error => {
			console.log('error', error);
		})
	},
	addPolicy: ({ commit }, payload) => {
		let rowData = {
			customerId: payload.customerSearched.id,
			policyName: payload.policyName,
			startDate: moment(String(payload.startDate)).format('YYYY/MM/DD HH:mm:ss'),
			endDate: moment(String(payload.endDate)).format('YYYY/MM/DD HH:mm:ss'),
			policyType: payload.policyType,
			agentId: payload.agentSearched.id,
			sumInsured: payload.sumInsured,
			currencyType: payload.currencyType,
			policyNumber: payload.policyNumber,
			comment: payload.comment,
			status: 1,
			createdBy: payload.sessionId,
			updatedBy: payload.sessionId
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
	}
};

const getters = {
	getAllPolicies: state => {
		return state.policies;
	},
	getPolicyHistory: state => { return state.policyHistory }
};

export default {
	state,
	mutations,
	actions,
	getters
};
