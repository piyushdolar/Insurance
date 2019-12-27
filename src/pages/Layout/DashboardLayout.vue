<template>
	<div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
		<notifications></notifications>

		<side-bar v-if="!$route.meta.hideSidebar">
			<mobile-menu slot="content"></mobile-menu>
			<sidebar-link to="/dashboard">
				<md-icon>dashboard</md-icon>
				<p>Dashboard</p>
			</sidebar-link>
			<sidebar-link to="/table">
				<md-icon>verified_user</md-icon>
				<p>Admin Users</p>
			</sidebar-link>
			<sidebar-link to="/agents">
				<md-icon>accessibility_new</md-icon>
				<p>Agents</p>
			</sidebar-link>
			<sidebar-link to="/typography">
				<md-icon>emoji_people</md-icon>
				<p>Customers</p>
			</sidebar-link>
			<sidebar-link to="/icons">
				<md-icon>bubble_chart</md-icon>
				<p>Icons</p>
			</sidebar-link>
			<sidebar-link to="/maps">
				<md-icon>location_on</md-icon>
				<p>Maps</p>
			</sidebar-link>
			<sidebar-link to="/notifications">
				<md-icon>notifications</md-icon>
				<p>Notifications</p>
			</sidebar-link>
			<sidebar-link to="/logout" class="active-pro">
				<md-icon>unarchive</md-icon>
				<p>Logout</p>
			</sidebar-link>
		</side-bar>

		<div v-bind:class="{ 'main-panel': !$route.meta.hideFooter }">
			<top-navbar v-if="!$route.meta.hideFooter"></top-navbar>

			<dashboard-content></dashboard-content>

			<content-footer v-if="!$route.meta.hideFooter"></content-footer>
		</div>
	</div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
	components: {
		TopNavbar,
		DashboardContent,
		ContentFooter,
		MobileMenu
	}
};
</script>
