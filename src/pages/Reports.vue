<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-button class="md-primary md-block md-wd" to="/reports/admin">Admin Report</md-button>
      </div>
      <div class="md-layout-item">
        <md-button class="md-primary md-block md-wd" to="/reports/agent">Agent Report</md-button>
      </div>
      <div class="md-layout-item">
        <md-button class="md-primary md-block md-wd" to="/reports/customer">Customer Report</md-button>
      </div>
      <div class="md-layout-item">
        <md-button class="md-primary md-block md-wd" to="/reports/policy">Policy Report</md-button>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100 vuetable">
        <!-- Empty state -->
        <md-empty-state
          v-show="bottomSection"
          class="md-primary"
          md-icon="done"
          md-label="Reports Section"
          md-description="Click above buttons to check reports of particular section."
        ></md-empty-state>

        <!-- Other page view -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReportComponent",
  computed: {
    bottomSection: v => {
      return v.$route.path == "/reports" ? true : false;
    }
  }
};
</script>