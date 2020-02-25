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
import checkAuth from './helpers/authentication'

// configure router
const router = new VueRouter({
	routes, // short for routes: routes
	mode: 'history',
	base: process.env.BASE_URL,
	linkExactActiveClass: 'nav-item active'
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (window.localStorage.getItem('refreshToken') != undefined && window.localStorage.getItem('refreshToken') != null && window.localStorage.getItem('refreshToken') != '' && router.app.$session.get('_timeout')) {
			if (checkAuth('read', to.path, router.app.$session.get('userProfile').userType)) {
				let timeBefore = moment(router.app.$session.get('_timeout').date);
				let timeNow = moment(new Date());
				let timeDiff = moment.duration(timeNow.diff(timeBefore)).asMinutes();
				if (timeDiff > router.app.$session.get('_timeout').limit) {
					router.app.$session.clear();
					router.app.$session.flash.set('error', 'Session expired please login again.');
					next({ path: '/login' });
				} else { next(); }
			} else {
				router.app.$session.flash.set('error', "You are not authorized to access requested page.");
				next({ path: '/login' });
			}
		} else {
			router.app.$session.flash.set('error', "Session timed out.");
			next({ path: '/login' });
		}
	} else {
		next();
	}
});

Vue.prototype.$Chartist = Chartist;
Vue.prototype.$alert = (type, message) => {
	VueJS.$notify({
		message: message,
		icon: "add_alert",
		verticalAlign: "top",
		horizontalAlign: "right",
		type: type
	});
};

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(localStorage);
Vue.use(VueSession, { persist: true });
Vue.use(VMdDateRangePicker);

/* eslint-disable no-new */
let VueJS = new Vue({
	el: '#app',
	render: h => h(App),
	router,
	store,
	data: {
		Chartist: Chartist
	}
});

