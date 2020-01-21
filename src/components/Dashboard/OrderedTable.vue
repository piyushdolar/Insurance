<template>
  <div>
    <md-table
      v-model="getDashboardRecent"
      :table-header-color="tableHeaderColor"
    >
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name">{{
          item.firstName + " " + item.lastName
        }}</md-table-cell>
        <md-table-cell md-label="Phone">{{ item.phone }}</md-table-cell>
        <md-table-cell md-label="Last Login">{{
          item.lastLogin
        }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
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
    ...mapGetters(["getDashboardRecent"])
  }
};
</script>
