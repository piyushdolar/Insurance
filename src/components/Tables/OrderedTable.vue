<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Country">{{ item.country }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      users: [
        {
          id: 1,
          name: "Dakota Rice",
          country: "Niger"
        },
        {
          id: 2,
          name: "Minerva Hooper",
          country: "Curaçao"
        },
        {
          id: 3,
          name: "Sage Rodriguez",
          country: "Netherlands"
        },
        {
          id: 4,
          name: "Philip Chaney",
          country: "Korea, South"
        }
      ]
    };
  }
};
</script>
