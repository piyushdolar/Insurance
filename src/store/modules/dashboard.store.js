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
	charts: {
		daily_sales: null,
		policy_holders: null
	}
};

const actions = {
	// Get all users
	fetchDashboard: ({ state }) => {
		axios
			.get('/dashboard')
			.then(response => {
				state.total.users = response.data.data.total.usersCount;
				state.total.agents = response.data.data.total.agentsCount;
				state.total.policies = response.data.data.total.policyCount;
				state.total.policy_holders = response.data.data.total.policy_holders_count;

				state.recent.logged_in = response.data.data.recent.logged_in;
				state.recent.agents = response.data.data.recent.agents;
				state.recent.policy_holders = response.data.data.recent.policy_holders;
				state.recent.policies = response.data.data.recent.policies;

				state.charts.daily_sales = response.data.data.chart.daily_sales;
				state.charts.policy_holders = response.data.data.chart.policy_holders;
			})
			.catch(error => {
				throw error.response;
			});
	}
};

const mutations = {};

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
		return state.charts;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
