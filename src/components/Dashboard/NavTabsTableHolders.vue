<template>
  <div>
    <md-table
      v-model="getDashboardRecentPolicyHolders"
      :table-header-color="tableHeaderColor"
    >
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name">{{
          item.firstName + " " + item.lastName
        }}</md-table-cell>
        <md-table-cell md-label="Phone">{{ item.phone }}</md-table-cell>
        <md-table-cell md-label="Address">{{ item.address }}</md-table-cell>
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
    ...mapGetters(["getDashboardRecentPolicyHolders"])
  }
};
</script>
