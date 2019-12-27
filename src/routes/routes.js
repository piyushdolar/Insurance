import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Agents from "@/pages/Agents.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import Login from "@/pages/Login.vue";
import Logout from "@/pages/Logout.vue";

const routes = [
	{
		path: "/",
		component: DashboardLayout,
		redirect: "/dashboard",
		children: [
			{
				path: "dashboard",
				name: "Dashboard",
				component: Dashboard
			},
			{
				path: "user",
				name: "User Profile",
				component: UserProfile
			},
			{
				path: "table",
				name: "Table List",
				component: TableList
			},
			{
				path: "agents",
				name: "Agents List",
				component: Agents
			},
			{
				path: "typography",
				name: "Typography",
				component: Typography
			},
			{
				path: "icons",
				name: "Icons",
				component: Icons
			},
			{
				path: "maps",
				name: "Maps",
				meta: {
					hideFooter: true
				},
				component: Maps
			},
			{
				path: "notifications",
				name: "Notifications",
				component: Notifications
			},
			{
				path: "login",
				name: "Login",
				component: Login,
				meta: {
					hideNavigation: true,
					hideSidebar: true,
					hideFooter: true
				}
			},
			{
				path: "logout",
				name: "logout",
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
