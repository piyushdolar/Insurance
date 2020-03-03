<template>
  <div>
    <md-table v-model="getDashboardRecentPolicies" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name">{{ item.policyNumber }}</md-table-cell>
        <md-table-cell md-label="Phone">{{ item.policyName }}</md-table-cell>
        <md-table-cell md-label="Address">{{ item.endDate }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getDashboardRecentPolicies"])
  }
};
</script>
