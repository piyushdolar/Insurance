import DashboardLayout from '@/pages/Layout/DashboardLayout.vue';

import Dashboard from '@/pages/Dashboard.vue';
import MyProfile from '@/pages/MyProfile.vue';
import Admins from '@/pages/Admins.vue';
import Agents from '@/pages/Agents.vue';
import PolicyHolders from '@/pages/PolicyHolders.vue';
import Policies from '@/pages/Policies.vue';
import Maps from '@/pages/Maps.vue';
import Changelogs from '@/pages/Changelogs.vue';
import Login from '@/pages/Login.vue';
import LoginMaster from '@/pages/LoginMaster.vue';
import Logout from '@/pages/Logout.vue';

const routes = [
	{
		path: '/',
		component: DashboardLayout,
		redirect: '/dashboard',
		children: [
			{
				path: 'dashboard',
				name: 'Dashboard',
				meta: {
					requiresAuth: true,
					role: ['admin', 'user', 'agent']
				},
				component: Dashboard
			},
			{
				path: 'my-profile',
				name: 'My Profile',
				meta: {
					requiresAuth: true
				},
				component: MyProfile
			},
			{
				path: 'admins',
				name: 'Admins',
				meta: {
					requiresAuth: true
				},
				component: Admins
			},
			{
				path: 'agents',
				name: 'Agents',
				meta: {
					requiresAuth: true
				},
				component: Agents
			},
			{
				path: 'policy-holders',
				name: 'Customers',
				meta: {
					requiresAuth: true
				},
				component: PolicyHolders
			},
			{
				path: 'policies',
				name: 'Policies',
				meta: {
					requiresAuth: true
				},
				component: Policies
			},
			{
				path: 'maps',
				name: 'Maps',
				meta: {
					hideFooter: true,
					requiresAuth: true
				},
				component: Maps
			},
			{
				path: '/changelogs',
				name: 'Change logs',
				meta: {
					requiresAuth: true
				},
				component: Changelogs
			},

			// LOGIN / LOGOUT SECTION
			{
				path: '/administrator',
				name: 'Administrator Login',
				component: LoginMaster,
				meta: {
					hideNavigation: true,
					hideSidebar: true,
					hideFooter: true
				}
			},
			{
				path: '/login',
				name: 'Login',
				component: Login,
				meta: {
					hideNavigation: true,
					hideSidebar: true,
					hideFooter: true
				}
			},
			{
				path: '/logout',
				name: 'Logout',
				component: Logout,
				meta: {
					hideNavigation: true,
					hideSidebar: true,
					hideFooter: true
				}
			}
		]
	}
];

export default routes;
