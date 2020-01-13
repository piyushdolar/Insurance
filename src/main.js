import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import VueSession from 'vue-session';
import store from './store';

// router setup
import routes from './routes/routes';

// Plugins
import GlobalComponents from './globalComponents';
import GlobalDirectives from './globalDirectives';
import Notifications from './components/NotificationPlugin';

// MaterialDashboard plugin
import MaterialDashboard from './material';
import VMdDateRangePicker from 'v-md-date-range-picker';

import Chartist from 'chartist';

// configure router
const router = new VueRouter({
	routes, // short for routes: routes
	mode: 'history',
	linkExactActiveClass: 'nav-item active'
});
router.beforeEach((to, from, next) => {
	// redirect to login page if not logged in and trying to access a restricted page
	const publicPages = ['/login'];
	const authRequired = !publicPages.includes(to.path);
	const token = router.app.$session.exists('userProfile');
	if (authRequired && !token) {
		return next({
			path: '/login',
			query: { returnUrl: to.path }
		});
	}
	next();
});
Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(localStorage);
Vue.use(VueSession, { persist: true });
Vue.use(VMdDateRangePicker);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	render: h => h(App),
	router,
	store,
	data: {
		Chartist: Chartist
	}
});
