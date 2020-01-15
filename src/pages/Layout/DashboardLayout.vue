<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar v-if="!$route.meta.hideSidebar">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Home</p>
      </sidebar-link>
      <sidebar-link to="/users">
        <md-icon>verified_user</md-icon>
        <p>Users</p>
      </sidebar-link>
      <sidebar-link to="/agents">
        <md-icon>accessibility_new</md-icon>
        <p>Agent's Information</p>
      </sidebar-link>
      <sidebar-link to="/policy-holders">
        <md-icon>emoji_people</md-icon>
        <p>Policy Holders</p>
      </sidebar-link>
      <sidebar-link to="/policies">
        <md-icon>assignment</md-icon>
        <p>Policy</p>
      </sidebar-link>
      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/changelogs">
        <md-icon>notifications</md-icon>
        <p>Changelogs</p>
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
