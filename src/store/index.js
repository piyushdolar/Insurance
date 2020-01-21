import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

/* import state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions'; */
import Login from "./modules/login.store";
import Dashboard from "./modules/dashboard.store";
import Users from "./modules/users.store";
import Agents from "./modules/agents.store";
import PolicyHolders from "./modules/policyHolders.store";
import Policies from "./modules/policies.store";

export default new Vuex.Store({
  /* state,
	getters,
	mutations,
	actions, */
  modules: {
    Login,
    Dashboard,
    Users,
    Agents,
    PolicyHolders,
    Policies
  }
});
