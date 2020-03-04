<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar v-if="!$route.meta.hideSidebar">
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard" v-if="checkAuthorization('/dashboard')">
        <md-icon>dashboard</md-icon>
        <p>Home</p>
      </sidebar-link>
      <sidebar-link to="/admins" v-if="checkAuthorization('/admins')">
        <md-icon>verified_user</md-icon>
        <p>Admins</p>
      </sidebar-link>
      <sidebar-link to="/agents" v-if="checkAuthorization('/agents')">
        <md-icon>accessibility_new</md-icon>
        <p>Agents</p>
      </sidebar-link>

      <!-- Agent Login To Create-->
      <sidebar-link
        to="/customer-policies-create"
        v-if="checkAuthorization('/customer-policies-create')"
      >
        <md-icon>create</md-icon>
        <p>Create Policy</p>
      </sidebar-link>
      <sidebar-link to="/customer-policies" v-if="checkAuthorization('/customer-policies')">
        <md-icon>assignment</md-icon>
        <p>Policies</p>
      </sidebar-link>
      <!-- Agent Login To Create Over-->

      <sidebar-link to="/customers" v-if="checkAuthorization('/customers')">
        <md-icon>emoji_people</md-icon>
        <p>Customers</p>
      </sidebar-link>
      <sidebar-link to="/policies" v-if="checkAuthorization('/policies')">
        <md-icon>assignment</md-icon>
        <p>Policy</p>
      </sidebar-link>
      <sidebar-link to="/reports" v-if="checkAuthorization('/reports')">
        <md-icon>assessment</md-icon>
        <p>Reports</p>
      </sidebar-link>

      <!-- <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Maps</p>
      </sidebar-link>-->
      <sidebar-link to="/changelogs" v-if="checkAuthorization('/changelogs')">
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
import checkAuth from "../../helpers/authentication";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  methods: {
    checkAuthorization(url) {
      return checkAuth("read", url, this.$session.get("userProfile").userType);
    }
  }
};
</script>
