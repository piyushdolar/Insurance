<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <!-- <div class="md-autocomplete">
            <md-autocomplete class="search" v-model="selectedEmployee" :md-options="employees">
              <label>Search...</label>
            </md-autocomplete>
          </div>-->
          <md-list>
            <li class="md-list-item">
              <a
                href="javascript:void(0)"
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon>notifications</md-icon>
                      <span
                        class="notification"
                        v-show="getNotifications.total"
                      >{{ getNotifications.total }}</span>
                      <p class="hidden-lg hidden-md">Notifications</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right" v-if="getNotifications.total > 0">
                      <li
                        v-for="notification in getNotifications.messages"
                        v-bind:key="notification.message"
                      >
                        <a
                          :href="userType == 2 ? '/policies' : userType == 3 ? '/customer-policies-edit/' + notification.id : ''"
                          v-html="notification.message"
                        ></a>
                      </li>
                    </ul>
                    <ul class="dropdown-menu dropdown-menu-right" v-else>
                      <li>
                        <a href="javascript:void(0)">No new notification available.</a>
                      </li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>

            <md-list-item to="/dashboard">
              <i class="material-icons">dashboard</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
              <md-tooltip md-direction="bottom">Dashboard</md-tooltip>
            </md-list-item>

            <md-list-item to="/my-profile">
              <i class="material-icons">person</i>
              <p class="hidden-lg hidden-md">Profile</p>
              <md-tooltip md-direction="left">My Profile</md-tooltip>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedEmployee: null,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ],
      userType: null
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    initNotification() {
      this.userType = this.$session.get("userProfile").userType;
      this.$store.dispatch("fetchNotifications");
    }
  },
  mounted() {
    this.initNotification();
  },
  computed: {
    ...mapGetters(["getNotifications"])
  },
  watch: {
    $route(to, from) {
      this.initNotification();
    }
  }
};
</script>

<style lang="css"></style>
