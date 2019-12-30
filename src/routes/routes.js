import DashboardLayout from '@/pages/Layout/DashboardLayout.vue';

import Dashboard from '@/pages/Dashboard.vue';
import UserProfile from '@/pages/UserProfile.vue';
import Users from '@/pages/Users.vue';
import Agents from '@/pages/Agents.vue';
import Customers from '@/pages/Customers.vue';
import Contracts from '@/pages/Contracts.vue';
import Maps from '@/pages/Maps.vue';
import Notifications from '@/pages/Notifications.vue';
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
				component: Dashboard
			},
			{
				path: 'my-profile',
				name: 'User Profile',
				component: UserProfile
			},
			{
				path: 'users',
				name: 'Admin Users',
				component: Users
			},
			{
				path: 'agents',
				name: 'Agents List',
				component: Agents
			},
			{
				path: 'customers',
				name: 'Customers',
				component: Customers
			},
			{
				path: 'contracts',
				name: 'Contracts',
				component: Contracts
			},
			{
				path: 'maps',
				name: 'Maps',
				meta: {
					hideFooter: true
				},
				component: Maps
			},
			{
				path: 'notifications',
				name: 'Notifications',
				component: Notifications
			},
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
