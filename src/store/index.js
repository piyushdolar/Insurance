import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

/* import state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions'; */
import Login from './modules/login.store';
import Users from './modules/users.store';
import Dashboard from './modules/dashboard.store';

export default new Vuex.Store({
	/* state,
	getters,
	mutations,
	actions, */
	modules: {
		Login,
		Users,
		Dashboard
	}
});
