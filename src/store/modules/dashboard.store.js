import axios from '@/api/config';
// All the constants-states are in the details because of the preventing console error of undefined.

const state = {
	total: {
		admins: {
			totalAdmin: null,
			totalAdminsLoggedInToday: null
		},
		agents: {
			totalAgents: null,
			totalAgentsLoggedInToday: null
		},
		customers: {
			totalCustomers: null,
			totalActiveCustomers: null,
			totalInactiveCustomers: null
		},
		policy: {
			totalPolicy: null,
			totalPendingPolicies: null,
			totalActivePolicies: null,
			totalRejectedPolicies: null
		}
	},
	recent: {
		logged_in: [],
		agents: [],
		policy_holders: [],
		policies: []
	},
	charts: {
		policy_holders: {
			labels: [],
			series: [[]]
		},
		daily_sales: {
			labels: [],
			series: [[]]
		},
		agents: {
			labels: [],
			series: [[]]
		}
	},
	notifications: {
		total: null,
		messages: null
	}
};

const actions = {
	// Get all users
	fetchDashboard: ({ commit }) => {
		return axios
			.get('/dashboard', {
				headers: {
					Authorization: `Bearer ${window.localStorage.getItem('refreshToken')}`
				}
			})
			.then(response => {
				commit('SET_DASHBOARD_DATA', response.data.data);
			})
			.catch(error => {
				throw error.response;
			});
	},

	fetchNotifications: ({ commit }) => {
		return axios
			.get('/notifications', {
				headers: {
					Authorization: `Bearer ${window.localStorage.getItem('refreshToken')}`
				}
			})
			.then(response => {
				commit('SET_NOTIFICATION_DATA', response.data.data);
			})
			.catch(error => {
				throw error.response ? error.response.data.error : error;
			});
	}
};

const mutations = {
	SET_DASHBOARD_DATA: (state, response) => {
		state.total = response.total;
		state.recent.logged_in = response.recent.logged_in;
		state.recent.agents = response.recent.agents;
		state.recent.policy_holders = response.recent.policy_holders;
		state.recent.policies = response.recent.policies;

		state.charts = {
			policy_holders: {
				labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				series: [response.charts.policy_holders.data]
			},
			daily_sales: {
				labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				series: [response.charts.daily_sales.data]
			},
			agents: {
				labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				series: [response.charts.daily_sales.data]
			}
		};
	},

	SET_NOTIFICATION_DATA: (state, response) => {
		state.notifications.total = response.length;
		state.notifications.messages = response;
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
	getDashboardRecentCustomers: state => {
		return state.recent.policy_holders;
	},
	getDashboardCharts: state => {
		return state.charts;
	},
	getNotifications: state => {
		return state.notifications;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
