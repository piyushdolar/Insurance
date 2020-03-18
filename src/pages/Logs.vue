<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100">
        <md-card class>
          <md-card-header data-background-color="purple">
            <h4 class="title">Admin's Database</h4>
            <p class="category">Here you can find and see every user's details</p>
          </md-card-header>
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item">
                <md-field>
                  <label for="address">Search in the table</label>
                  <md-input v-model="filterItem.searchText" @keyup.enter="doFilter"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item">
                <md-field>
                  <v-md-date-range-picker
                    v-bind:start-date="filterItem.startDate"
                    v-bind:end-date="filterItem.endDate"
                    time-picker="true"
                    opens="right"
                    @change="handleDateChange"
                  ></v-md-date-range-picker>
                </md-field>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item">
                <md-field>
                  <label>User Type</label>
                  <md-select
                    placeholder="User Type"
                    style="margin:auto"
                    v-model="moreParams.user_type"
                  >
                    <md-option value="0">All</md-option>
                    <md-option value="1">Master Admin</md-option>
                    <md-option value="2">Admin</md-option>
                    <md-option value="3">Agent</md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item">
                <md-field>
                  <label>Per page</label>
                  <md-select v-model="perPage" placeholder="Item per page" style="margin:auto">
                    <md-option :value="10">10</md-option>
                    <md-option :value="15">15</md-option>
                    <md-option :value="20">20</md-option>
                    <md-option :value="50">50</md-option>
                    <md-option :value="100">100</md-option>
                    <md-option :value="150">150</md-option>
                    <md-option :value="200">200</md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item text-center">
                <md-button class="md-primary md-just-icon mr-10" @click="doFilter">
                  <md-icon>search</md-icon>
                  <md-tooltip md-direction="top">Search</md-tooltip>
                </md-button>
                <md-button data-background-color="orange" class="md-just-icon" @click="resetFilter">
                  <md-icon>undo</md-icon>
                  <md-tooltip md-direction="top">Reset</md-tooltip>
                </md-button>
              </div>
            </div>
            <div class="md-layout">
              <div class="md-layout-item table-responsive">
                <vuetable
                  ref="vuetable"
                  api-url="https://www.lcpi.la/api/logs"
                  :fields="fields"
                  :http-options="{ headers: { Authorization: accessToken } }"
                  pagination-path
                  @vuetable:pagination-data="onPaginationData"
                  :multi-sort="true"
                  multi-sort-key="ctrl"
                  :sort-order="sortOrder"
                  :append-params="moreParams"
                  :per-page="perPage"
                  @vuetable:load-error="handleLoadError"
                >
                  <template slot="userType" slot-scope="props">
                    <md-chip
                      data-background-color="purple"
                      v-if="props.rowData.userType == 1"
                    >Master Admin</md-chip>
                    <md-chip
                      data-background-color="blue"
                      v-else-if="props.rowData.userType == 2"
                    >Admin</md-chip>
                    <md-chip data-background-color="orange" v-else>Agent</md-chip>
                  </template>
                </vuetable>
                <vuetable-pagination-info id="vPageInfo" ref="paginationInfo"></vuetable-pagination-info>
                <vuetable-pagination
                  id="vPage"
                  ref="pagination"
                  @vuetable-pagination:change-page="onChangePage"
                ></vuetable-pagination>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { VuetableMixin } from "@/mixins/VuetableMixin";
import moment from "moment";

export default {
  data() {
    return {
      fields: [
        {
          name: "__sequence",
          title: "#"
        },
        {
          name: "logDetail",
          title: "Log Details"
        },
        {
          name: "__slot:userType",
          title: "User Type",
          sortField: "userType"
        },
        {
          name: "createdAt",
          title: "Created Time",
          sortField: "createdAt",
          callback: function(value) {
            return moment(String(value)).format("MM/DD/YYYY hh:mm a");
          }
        }
      ],
      sortOrder: [
        {
          field: "id",
          sortField: "id",
          direction: "desc"
        }
      ]
    };
  },
  mixins: [VuetableMixin]
};
</script>
