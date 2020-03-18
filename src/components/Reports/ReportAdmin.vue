<template>
  <div>
    <md-card>
      <md-card-header data-background-color="purple">
        <h4 class="title">Admin Reports</h4>
        <p class="category">Here you can find and see every admin's report</p>
      </md-card-header>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field>
              <label for="address">Search in the report</label>
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
          <div class="md-layout-item">
            <md-field>
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
              api-url="https://www.lcpi.la/api/report/users?user_type=2"
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
              <template
                slot="fullName"
                slot-scope="props"
              >{{props.rowData.firstName}} {{props.rowData.lastName}}</template>
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
</template>

<script>
import { VuetableMixin } from "@/mixins/VuetableMixin";
import { ReportMixin } from "@/mixins/ReportMixin";

export default {
  name: "ReportAdminComponent",
  mixins: [VuetableMixin, ReportMixin]
};
</script>
