import DashboardLayout from '@/pages/Layout/DashboardLayout.vue';

import Dashboard from '@/pages/Dashboard.vue';
import UserProfile from '@/pages/UserProfile.vue';
import Users from '@/pages/Users.vue';
import Agents from '@/pages/Agents.vue';
import Customers from '@/pages/Customers.vue';
import Contracts from '@/pages/Contracts.vue';
import Maps from '@/pages/Maps.vue';
import Changelogs from '@/pages/Changelogs.vue';
import Login from '@/pages/Login.vue';
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
					requiresAuth: true
				},
				component: Dashboard
			},
			{
				path: 'my-profile',
				name: 'User Profile',
				meta: {
					requiresAuth: true
				},
				component: UserProfile
			},
			{
				path: 'users',
				name: 'Admin Users',
				meta: {
					requiresAuth: true
				},
				component: Users
			},
			{
				path: 'agents',
				name: 'Agents List',
				meta: {
					requiresAuth: true
				},
				component: Agents
			},
			{
				path: 'customers',
				name: 'Customers',
				meta: {
					requiresAuth: true
				},
				component: Customers
			},
			{
				path: 'contracts',
				name: 'Contracts',
				meta: {
					requiresAuth: true
				},
				component: Contracts
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
				name: 'changelogs',
				meta: {
					requiresAuth: true
				},
				component: Changelogs
			},

			// LOGIN / LOGOUT SECTION
			{
				path: 'login',
				name: 'Login',
				component: Login,
				meta: {
					hideNavigation: true,
					hideSidebar: true,
					hideFooter: true
				}
			},
			{
				path: 'logout',
				name: 'logout',
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
