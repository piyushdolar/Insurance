import axios from '../../api/config';
axios.defaults.headers.common.Authorization = `Bearer ${window.localStorage.getItem('refreshToken')}`;

const state = {
	total: {
		users: null,
		agents: null,
		policy_holders: null,
		policies: null
	},
	recent: {
		logged_in: [],
		agents: [],
		policy_holders: [],
		policies: []
	},
	charts: {}
};

const actions = {
	// Get all users
	fetchDashboard: ({ commit }) => {
		return axios
			.get('/dashboard', { headers: { Authorization: `Bearer ${window.localStorage.getItem('refreshToken')}` } })
			.then(response => {
				commit('SET_DASHBOARD_DATA', response.data.data);
			})
			.catch(error => {
				throw error.response;
			});
	}
};

const mutations = {
	SET_DASHBOARD_DATA: (state, response) => {
		state.total.users = response.total.usersCount;
		state.total.agents = response.total.agentsCount;
		state.total.policy_holders = response.total.policy_holders_count;
		state.total.policies = response.total.policyCount;

		state.recent.logged_in = response.recent.logged_in;
		state.recent.agents = response.recent.agents;
		state.recent.policy_holders = response.recent.policy_holders;
		state.recent.policies = response.recent.policies;

		state.charts = {
			policy_holders: {
				labels: response.charts.policy_holders.labels,
				series: [response.charts.policy_holders.data]
			},
			daily_sales: {
				labels: response.charts.daily_sales.labels,
				series: [response.charts.daily_sales.data]
			},
			agents: {
				data: {
					labels: response.charts.daily_sales.labels,
					series: [response.charts.daily_sales.data]
				}
			}
		};
	}
};

const getters = {
	getDashboard: state => {
		return state.total;
	},
	getDashboardRecent: state => {
		return state.recent.logged_in;
	},
	getDashboardRecentAgents: state => {
		return state.recent.agents;
	},
	getDashboardRecentPolicies: state => {
		return state.recent.policies;
	},
	getDashboardRecentPolicyHolders: state => {
		return state.recent.policy_holders;
	},
	getDashboardCharts: state => {
		console.log('Getter: ', state.charts);
		return state.charts;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
