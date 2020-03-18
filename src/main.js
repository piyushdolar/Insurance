// Init Setup
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

// Helpers
import checkAuth from './helpers/authentication';

// Configure Router
const router = new VueRouter({
	routes, // short for routes: routes
	mode: 'history',
	base: process.env.BASE_URL,
	linkExactActiveClass: 'nav-item active'
});

// Router Configuration
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (window.localStorage.getItem('refreshToken') && router.app.$session.get('_timeout') && router.app.$session.get('userProfile')) {
			if (checkAuth('read', to.path, router.app.$session.get('userProfile').userType)) {
				let timeBefore = moment(router.app.$session.get('_timeout').date);
				let timeNow = moment(new Date());
				let timeDiff = moment.duration(timeNow.diff(timeBefore)).asMinutes();

				if (timeDiff > router.app.$session.get('_timeout').limit) {
					router.app.$session.clear();
					router.app.$session.flash.set('error', 'Session was expired.');
					next({ path: '/login' });
				} else {
					next();
				}
			} else {
				router.app.$session.flash.set('error', 'You are not authorized to access requested page.');
				next({ path: '/dashboard' });
			}
		} else {
			window.localStorage.setItem('refreshToken', null);
			router.app.$session.set('_timeout', null);
			router.app.$session.set('userProfile', null);
			next({ path: from.path == '/login' ? '/login' : from.path == '/administrator' ? '/administrator' : '/login' });
		}
	} else {
		next();
	}
});

// Global Prototypes
Vue.prototype.$Chartist = Chartist;
Vue.prototype.$alert = (type, message) => {
	VueJS.$notify({
		message: message,
		icon: 'add_alert',
		verticalAlign: 'top',
		horizontalAlign: 'right',
		type: type
	});
};
Vue.prototype.$checkAuth = rule => {
	return checkAuth(rule, router.app._route.path, router.app.$session.get('userProfile').userType);
};

// Use Components
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
