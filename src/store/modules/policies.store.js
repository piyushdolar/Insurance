import axios from '../../api/config';
import moment from 'moment';
// axios.defaults.headers.common.Authorization = `Bearer ${window.localStorage.getItem('refreshToken')}`;

const state = {
	policies: []
};

const actions = {
	fetchPolicies: ({ commit }) => {
		return axios
			.get('/policy')
			.then(response => {
				commit('SET_POLICY_DATA', response.data.data);
			})
			.catch(error => {
				throw error.response;
			});
	},
	addPolicy: ({ commit }, payload) => {
		let rowData = {
			customerId: payload.customerSearched.id,
			policyName: payload.policyName,
			startDate: moment(String(payload.startDate)).format('YYYY/MM/DD HH:mm:ss'),
			endDate: moment(String(payload.endDate)).format('YYYY/MM/DD HH:mm:ss'),
			policyType: payload.policyType,
			agentId: payload.agentSearched.id,
			status: 2,
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
				throw error.response;
			});
	},
	editPolicy: ({ commit }, payload) => {
		let rowData = {
			customerId: payload.customerSearched.id,
			name: payload.policyName,
			startDate: moment(String(payload.startDate)).format('YYYY/MM/DD HH:mm:ss'),
			endDate: moment(String(payload.endDate)).format('YYYY/MM/DD HH:mm:ss'),
			policyType: payload.policyType,
			agentId: payload.agentSearched.id,
			status: payload.status == false ? 1 : 2,
			updatedBy: payload.sessionId
		};
		return axios({
			method: 'put',
			url: 'policy/' + payload.id,
			data: rowData
		})
			.then(response => {
				return 'A Policy successfully updated.';
			})
			.catch(error => {
				throw error.response;
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
				throw error.response;
			});
	}
};

const mutations = {
	SET_POLICY_DATA: (state, response) => {
		state.policies = response;
	}
};

const getters = {
	getAllPolicies: state => {
		return state;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
