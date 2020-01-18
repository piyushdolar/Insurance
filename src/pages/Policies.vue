<template>
  <div class="content">
    <div class="md-layout">
      <!-- dialog with button -->
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <!-- CREATE POLICY MODAL -->
        <md-dialog :md-active.sync="showDialog">
          <md-dialog-title>{{ formModal.title }}</md-dialog-title>
          <form novalidate @submit.prevent="validateUser">
            <md-dialog-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('policyName')">
                    <label for="policy-name">Policy Name</label>
                    <md-input
                      name="policy-name"
                      id="policy-name"
                      v-model="form.policyName"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.policyName.required"
                    >The policy name is required</span>
                    <span
                      class="md-error"
                      v-else-if="!$v.form.policyName.minlength"
                    >Invalid policy name</span>
                  </md-field>
                </div>
              </div>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-autocomplete
                    v-model="form.customerSearched.name"
                    :md-options="form.searchedList"
                    md-autoselect="true"
                    @md-changed="getCustomers"
                    @md-opened="getCustomers"
                    @md-selected="onSelectCustomer"
                  >
                    <label>Select Customer *</label>
                    <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                      <md-highlight-text :md-term="term">{{ item.name }}</md-highlight-text>
                    </template>

                    <template
                      slot="md-autocomplete-empty"
                      slot-scope="{ term }"
                    >No customer matching "{{ term }}" were found.</template>
                  </md-autocomplete>
                </div>

                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('policyType')">
                    <label for="policy-type">Policy Type</label>
                    <md-select
                      name="policy-type"
                      id="policy-type"
                      v-model="form.policyType"
                      md-dense
                      :disabled="sending"
                    >
                      <md-option>Select Policy Type</md-option>
                      <md-option value="1">Motor</md-option>
                      <md-option value="2">Non-Motor</md-option>
                    </md-select>
                    <span class="md-error">The Policy Type is required</span>
                  </md-field>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-datepicker v-model="form.startDate" md-immediately>
                    <label>Policy Start Date</label>
                  </md-datepicker>
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-datepicker v-model="form.endDate" md-immediately>
                    <label>Policy End Date</label>
                  </md-datepicker>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-autocomplete
                    v-model="form.agentSearched.name"
                    :md-options="form.searchedList"
                    @md-changed="getAgents"
                    @md-opened="getAgents"
                    @md-selected="onSelectAgent"
                  >
                    <label>Select Agent</label>
                    <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                      <md-highlight-text :md-term="term">{{ item.name }}</md-highlight-text>
                    </template>

                    <template
                      slot="md-autocomplete-empty"
                      slot-scope="{ term }"
                    >No agent matching "{{ term }}" were found.</template>
                  </md-autocomplete>
                </div>
              </div>

              <md-progress-bar md-mode="indeterminate" v-if="sending" />
            </md-dialog-content>
            <md-dialog-actions>
              <md-button class="md-danger" @click="showDialog = false">CLOSE</md-button>
              <md-button type="submit" class="md-primary" :disabled="sending">{{ formModal.btn }}</md-button>
            </md-dialog-actions>
          </form>
        </md-dialog>

        <md-button class="md-primary pull-right" @click="openDialog">
          <md-icon>add</md-icon>CREATE POLICY
        </md-button>
      </div>

      <!-- vuetable -->
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100 vuetable">
        <md-card class>
          <md-card-header data-background-color="purple">
            <h4 class="title">Policy's Database</h4>
            <p class="category">Here you can find and see every policy's details</p>
          </md-card-header>
          <md-card-content>
            <div class="md-layout">
              <div class="md-layout-item md-layout">
                <md-field>
                  <label for="table">Search in the table</label>
                  <md-input v-model="filterItem.searchText" @keyup.enter="doFilter"></md-input>
                </md-field>
              </div>
              <div class="md-layout-item md-layout">
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
              <div class="md-layout-item md-layout">
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
              </div>
              <div class="md-layout-item md-layout md-size-15 text-center">
                <md-button class="md-info md-just-icon" @click="doFilter">
                  <md-icon>search</md-icon>
                </md-button>
                <md-button class="md-primary md-just-icon" @click="resetFilter">
                  <md-icon>undo</md-icon>
                </md-button>
              </div>
            </div>
            <!-- :api-mode="false"
            :data="tableData"-->
            <vuetable
              ref="vuetable"
              api-url="http://119.8.40.98/api/policy"
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
              <template slot="actions" scope="props">
                <div class="custom-actions">
                  <md-button
                    class="md-primary md-just-icon"
                    @click="onAction('edit', props.rowData, props.rowIndex)"
                  >
                    <md-icon>edit</md-icon>
                  </md-button>
                  <md-button
                    class="md-danger md-just-icon"
                    @click="onAction('delete', props.rowData, props.rowIndex)"
                  >
                    <md-icon>delete</md-icon>
                  </md-button>
                </div>
              </template>
            </vuetable>
            <vuetable-pagination-info id="vPageInfo" ref="paginationInfo"></vuetable-pagination-info>
            <vuetable-pagination
              id="vPage"
              ref="pagination"
              @vuetable-pagination:change-page="onChangePage"
            ></vuetable-pagination>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { VuetableMixin } from "../mixins/VuetableMixin";
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "PolicyComponent",
  mixins: [validationMixin, VuetableMixin],
  data: () => ({
    showDialog: false,
    form: {
      policyName: null,
      policyType: null,
      startDate: null,
      endDate: null,
      customerSearched: {
        id: null,
        name: null
      },
      agentSearched: {
        id: null,
        name: null
      },
      searchedList: []
    },
    formModal: {
      title: "CREATE NEW POLICY FOR POLICY HOLDER",
      btn: "CREATE",
      isEdit: false
    },
    sending: false,
    // vuetable
    fireEvent: null,
    sortOrder: [
      {
        field: "id",
        sortField: "id",
        direction: "desc"
      }
    ],
    fields: [
      {
        name: "policyNumber",
        title: "Policy Number"
      },
      {
        name: "policyName",
        sortField: "policyName",
        title: "Policy Name"
      },
      {
        name: "policyHolder",
        sortField: "policyHolder.id",
        title: "Customer Name",
        callback: function(value) {
          return '<a href="/userProfile">' + value.fullName + "</a>";
        }
      },
      {
        name: "startDate",
        sortField: "startDate",
        title: "Start Date",
        callback: function(value) {
          return moment(String(value)).format("DD/MM/YYYY");
        }
      },
      {
        name: "endDate",
        sortField: "endDate",
        title: "End Date",
        callback: function(value) {
          return moment(String(value)).format("DD/MM/YYYY");
        }
      },
      {
        name: "policyType",
        sortField: "policyType",
        title: "Policy Type",
        callback: function(value) {
          return value == 1 ? "Motor" : value == 2 ? "Non-Motor" : "Other";
        }
      },
      {
        name: "agent",
        sortField: "agent.id",
        title: "Agent Name",
        callback: function(value) {
          return value.fullName;
        }
      },
      {
        name: "status",
        sortField: "status",
        title: "Approve Status",
        callback: function(v) {
          return v == 1 ? "Pending" : "Approved";
        }
      },
      {
        name: "createdAt",
        sortField: "createdAt",
        title: "Created Date",
        callback: function(value) {
          return moment(String(value)).format("DD/MM/YYYY hh:mm a");
        }
      },
      {
        name: "createdBy",
        sortField: "createdBy.id",
        title: "Created By",
        callback: function(value) {
          return value.name;
        }
      },
      {
        name: "updatedAt",
        sortField: "updatedAt",
        title: "Updated Date",
        callback: function(value) {
          return moment(String(value)).format("DD/MM/YYYY hh:mm a");
        }
      },
      {
        name: "updatedBy",
        sortField: "updatedBy.id",
        title: "Updated By",
        callback: function(value) {
          return '<a href="/userProfile">' + value.name + "</a>";
        }
      },
      {
        name: "__slot:actions",
        title: "Actions"
      }
    ]
  }),
  validations: {
    form: {
      policyName: {
        required,
        minLength: minLength(3)
      },
      policyType: {
        required
      },
      startDate: {
        required
      },
      endDate: {
        required
      },
      customerSearched: {
        id: {
          required
        }
      },
      agentSearched: {
        id: {
          required
        }
      }
    }
  },
  methods: {
    // md select
    getCustomers(searchTerm) {
      this.form.searchedList = new Promise(resolve => {
        if (!searchTerm) {
          resolve(this.customersList);
        } else {
          const term = searchTerm.toLowerCase();
          resolve(
            this.customersList.filter(({ name }) =>
              name.toLowerCase().includes(term)
            )
          );
        }
      });
    },
    onSelectCustomer(selectedSearch) {
      this.form.customerSearched.id = selectedSearch.id;
      this.form.customerSearched.name = selectedSearch.name;
    },
    getAgents(searchTerm) {
      this.form.searchedList = new Promise(resolve => {
        if (!searchTerm) {
          resolve(this.agentsList);
        } else {
          const term = searchTerm.toLowerCase();
          resolve(
            this.agentsList.filter(({ name }) =>
              name.toLowerCase().includes(term)
            )
          );
        }
      });
    },
    onSelectAgent(selectedSearch) {
      this.form.agentSearched.id = selectedSearch.id;
      this.form.agentSearched.name = selectedSearch.name;
    },
    // md select over...
    onAction(action, data, index) {
      if (action == "edit") {
        this.form.id = data.id;
        this.form.policyName = data.policyName;
        this.form.policyType = data.policyType;
        this.form.customerSearched.id = data.policyHolder.id;
        this.form.customerSearched.name = data.policyHolder.fullName;
        this.form.agentSearched.id = data.agent.id;
        this.form.agentSearched.name = data.agent.fullName;
        this.form.startDate = new Date(data.startDate);
        this.form.endDate = new Date(data.endDate);
        this.formModal.title = "EDIT POLICY";
        this.formModal.btn = "UPDATE";
        this.formModal.isEdit = true;
        this.showDialog = true;
      } else if (action == "delete") {
        if (confirm("Are you sure?")) {
          this.$store
            .dispatch("deletePolicy", {
              policyId: data.id
            })
            .then(response => {
              this.$notify({
                message: response,
                icon: "add_alert",
                verticalAlign: "top",
                horizontalAlign: "right",
                type: "success"
              });
              this.onFilterReset();
            })
            .catch(error => {
              this.$notify({
                message: error.data.error,
                icon: "add_alert",
                verticalAlign: "top",
                horizontalAlign: "right",
                type: "danger"
              });
            });
        }
      }
    },
    // validation only
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    openDialog() {
      this.showDialog = true;
      this.formModal.btn = "CREATE";
      this.formModal.isEdit = false;
      this.clearForm();
    },
    clearForm() {
      this.$v.$reset();
      this.form.policyName = null;
      this.form.policyType = null;
    },
    validateUser(e) {
      this.$v.$touch();
      if (this.formModal.isEdit) {
        if (
          !this.$v.form.policyName.$invalid &&
          !this.$v.form.policyType.$invalid
        ) {
          this.saveUser("edit");
        } else {
          console.log("Edit From: ", "error");
        }
      } else {
        if (!this.$v.form.$invalid) {
          this.saveUser("add");
        }
      }
      //   console.log(this.$v.form);
    },
    async saveUser(type) {
      this.sending = true;
      this.form.sessionId = this.$session.get("userProfile").id;
      if (type == "add") {
        await this.$store
          .dispatch("addPolicy", this.form)
          .then(response => {
            this.$notify({
              message: response,
              icon: "add_alert",
              verticalAlign: "top",
              horizontalAlign: "right",
              type: "success"
            });
            this.showDialog = false;
            this.clearForm();
            this.onFilterReset();
          })
          .catch(error => {
            this.$notify({
              message: error.data.error,
              icon: "add_alert",
              verticalAlign: "top",
              horizontalAlign: "right",
              type: "danger"
            });
          });
      } else if (type == "edit") {
        await this.$store
          .dispatch("editPolicy", this.form)
          .then(response => {
            this.$notify({
              message: response,
              icon: "add_alert",
              verticalAlign: "top",
              horizontalAlign: "right",
              type: "success"
            });
            this.showDialog = false;
            this.onFilterReset();
            this.clearForm();
          })
          .catch(error => {
            this.$notify({
              message: error.data.error,
              icon: "add_alert",
              verticalAlign: "top",
              horizontalAlign: "right",
              type: "danger"
            });
          });
      }
      this.sending = false;
    }
  },
  mounted() {
    this.$store.dispatch("getAgents", "");
    this.$store.dispatch("getPolicyHolders", "");
  },
  computed: {
    ...mapGetters({
      customersList: "getCustomers",
      agentsList: "getAgents"
    })
  }
};
</script>
<style lang="scss" scoped>
.md-dialog {
  width: 800px;
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.vuetable-pagination-info {
  float: left;
  padding: 1rem;
}
.ui.right.floated.menu {
  margin: 0.5rem;
}
.vuetable img {
  height: 60px;
  width: auto;
}
</style>
