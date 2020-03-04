import DashboardLayout from '@/pages/Layout/DashboardLayout.vue';

import Dashboard from '@/pages/Dashboard.vue';
import MyProfile from '@/pages/MyProfile.vue';
import Admins from '@/pages/Admins.vue';
import Agents from '@/pages/Agents.vue';
import Customers from '@/pages/Customers.vue';
import Policies from '@/pages/Policies.vue';
import CustomerPolicies from '@/pages/CustomerPolicies.vue';
import CustomerPoliciesCreate from '@/pages/CustomerPoliciesCreate.vue';

import Reports from '@/pages/Reports.vue';
import ReportAdmin from '@/components/ReportAdmin.vue';
import ReportAgent from '@/components/ReportAgent.vue';

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

			// ADMIN/AGENT LOGIN
			{
				path: 'dashboard',
				name: 'Dashboard',
				meta: {
					requiresAuth: true,
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
				path: 'customers',
				name: 'Customers',
				meta: {
					requiresAuth: true
				},
				component: Customers
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
				path: 'customer-policies',
				name: "Customer's Policies",
				meta: {
					requiresAuth: true
				},
				component: CustomerPolicies,
			},
			{
				path: 'customer-policies-create',
				name: "Customer's Policies Create",
				meta: {
					requiresAuth: true
				},
				component: CustomerPoliciesCreate,
			},
			{
				path: 'reports',
				name: "Reports",
				meta: {
					requiresAuth: true
				},
				component: Reports,
				children: [
					{
						path: 'admin',
						component: ReportAdmin
					},
					{
						path: 'agent',
						component: ReportAgent
					}
				]
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

			// LOGIN / LOGOUT SECTION
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
			},

			// ADMINISTRATOR LOGIN ONLY
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

			// CHANGE LOGS ABOUT PROJECT
			{
				path: '/changelogs',
				name: 'Change logs',
				meta: {
					requiresAuth: true
				},
				component: Changelogs
			},
		]
	}
];

export default routes;
