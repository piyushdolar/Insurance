<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item">
        <md-button class="md-primary md-lg md-block md-wd" to="/reports/admin">Admin Report</md-button>
      </div>
      <div class="md-layout-item">
        <md-button class="md-primary md-lg md-block md-wd" to="/reports/agent">Agent Report</md-button>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100 vuetable">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReportComponent"
};
</script>