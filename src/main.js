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
// import 'vue-material/dist/vue-material.min.css';
// import 'vue-material/dist/theme/default.css';

import Chartist from 'chartist';
import moment from 'moment';

// configure router
const router = new VueRouter({
	routes, // short for routes: routes
	mode: 'history',
	base: process.env.BASE_URL,
	linkExactActiveClass: 'nav-item active'
});
router.beforeEach((to, from, next) => {
	/* const publicPages = ['/login'];
	const authRequired = !publicPages.includes(to.path);
	const token = router.app.$session.exists('userProfile');

	var timeBefore = moment(router.app.$session.get('_timeout').date);
	var timeNow = moment(new Date());
	var timeDiff = moment.duration(timeNow.diff(timeBefore)).asMinutes();

	console.log(timeDiff);
	router.app.$session.remove('userProfile');
	console.log(router.app.$session.get('userProfile'));

	if (authRequired && !token) {
		return next({
			path: '/login',
			query: { returnUrl: to.path }
		});
	}
	next(); */
	if (to.matched.some(record => record.meta.requiresAuth)) {
		let timeBefore = moment(router.app.$session.get('_timeout').date);
		let timeNow = moment(new Date());
		let timeDiff = moment.duration(timeNow.diff(timeBefore)).asMinutes();
		if (timeDiff > router.app.$session.get('_timeout').limit) {
			router.app.$session.clear();
			router.app.$session.flash.set('sessionExpired', 'Session expired please login again.');
			next({ path: '/login' });
		} else {
			next();
		}
	} else {
		next();
	}
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
