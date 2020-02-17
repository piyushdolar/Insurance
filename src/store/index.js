import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import Login from './modules/login.store';
import Global from './modules/global.store';
import Dashboard from './modules/dashboard.store';
import Users from './modules/users.store';
import Agents from './modules/agents.store';
import PolicyHolders from './modules/policyHolders.store';
import Policies from './modules/policies.store';

export default new Vuex.Store({
	modules: {
		Login,
		Global,
		Dashboard,
		Users,
		Agents,
		PolicyHolders,
		Policies
	},
	plugins: [createPersistedState()]
});
