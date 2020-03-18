<template>
  <div class="content">
    <!-- DIALOG BOX -->
    <single-customer-component
      :showSingleCustomerDialog="showSingleCustomerDialog"
      :singleUserForm="singleCustomerForm"
      v-on:onDialogClose="showSingleCustomerDialog = false"
    ></single-customer-component>

    <!-- vuetable -->
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100 vuetable">
      <md-card>
        <md-card-header data-background-color="purple">
          <h4 class="title">Your Created Policies</h4>
          <p class="category">Here you can find and see every policy's details</p>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <md-field>
                <label for="table">Search in the table</label>
                <md-input v-model="filterItem.searchText" @keyup.enter="doFilter"></md-input>
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
            <div class="md-layout-item">
              <md-field>
                <v-md-date-range-picker
                  v-bind:start-date="filterItem.startDate"
                  v-bind:end-date="filterItem.endDate"
                  opens="right"
                  @change="handleDateChange"
                ></v-md-date-range-picker>
              </md-field>
            </div>
            <div class="md-layout-item text-center">
              <md-button class="md-primary md-just-icon" @click="doFilter">
                <md-icon>search</md-icon>
                <md-tooltip md-direction="top">Search</md-tooltip>
              </md-button>
              <md-button data-background-color="orange" class="md-just-icon" @click="resetFilter">
                <md-icon>undo</md-icon>
                <md-tooltip md-direction="top">Reset</md-tooltip>
              </md-button>
            </div>
          </div>
          <!-- :api-mode="false"
          :data="tableData"-->
          <div class="md-layout">
            <div class="md-layout-item table-responsive">
              <vuetable
                ref="vuetable"
                api-url="https://www.lcpi.la/api/policy"
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
                <template slot="customer" slot-scope="props">
                  <a
                    class="md-primary"
                    href="javascript:void(0)"
                    @click="onSelectSingleCustomer(props.rowData.customer.id)"
                  >{{ props.rowData.customer.fullName }}</a>
                </template>
                <template slot="policyType" slot-scope="props">
                  <md-chip class="md-primary" v-if="props.rowData.policyType == 1">Motor</md-chip>
                  <md-chip class="md-accent" v-else>Non-Motor</md-chip>
                </template>
                <template slot="status" slot-scope="props">
                  <md-chip data-background-color="red" v-if="props.rowData.status == 1">Pending</md-chip>
                  <md-chip data-background-color="green" v-else>Approved</md-chip>
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
</template>

<script>
import { validationMixin } from "vuelidate";
import { VuetableMixin } from "@/mixins/VuetableMixin";
import { PoliciesMixin } from "@/mixins/PoliciesMixin";
import SingleCustomerComponent from "@/components/SingleCustomerView";

export default {
  name: "customerPolicies",
  mixins: [validationMixin, VuetableMixin, PoliciesMixin],
  components: { SingleCustomerComponent },
  data() {
    return {
      moreParams: {
        agent_id: this.$session.get("userProfile").id
      },
      showDialogBox: false
    };
  },
  methods: {}
};
</script>