<template>
  <div>
    <md-card>
      <md-card-header data-background-color="purple">
        <h4 class="title">Policy Reports</h4>
        <p class="category">Here you can find and see every policy's report</p>
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
            <md-button class="md-info md-just-icon" @click="doFilter">
              <md-icon>search</md-icon>
            </md-button>
            <md-button class="md-primary md-just-icon" @click="resetFilter">
              <md-icon>undo</md-icon>
            </md-button>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item table-responsive">
            <vuetable
              ref="vuetable"
              api-url="https://www.lcpi.la/api/report/policy"
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
              <template slot="customerName" slot-scope="props">{{props.rowData.customer.fullName}}</template>
              <template slot="agentName" slot-scope="props">{{props.rowData.agent.fullName}}</template>
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
import { ReportPolicyMixin } from "@/mixins/ReportPolicyMixin";

export default {
  name: "ReportPolicyComponent",
  mixins: [VuetableMixin, ReportPolicyMixin]
};
</script>