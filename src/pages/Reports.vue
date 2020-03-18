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
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-divider class="mt-10 mb-10" />
        <md-card v-show="bottomSection">
          <md-card-header data-background-color="purple">
            <h4 class="title">Reports Section</h4>
            <p class="category">Press buttons of above to load the your desired reports.</p>
          </md-card-header>
          <md-card-content>
            <!-- Empty state -->
            <md-empty-state
              class="md-primary"
              md-icon="done"
              md-label="Reports Section"
              md-description="Click above buttons to check reports of particular section."
            ></md-empty-state>
          </md-card-content>
        </md-card>
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