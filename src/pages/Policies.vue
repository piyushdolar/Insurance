<template>
  <div class="content">
    <div class="md-layout">
      <!-- dialog with button -->
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <!-- CREATE POLICY MODAL -->
        <md-dialog :md-active.sync="showDialog" class="modal-large">
          <md-dialog-title>{{ formModal.title }}</md-dialog-title>
          <md-dialog-content>
            <form novalidate @submit.prevent="validateUser">
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
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('policyNumber')">
                    <label for="policy-number">Policy Number</label>
                    <md-input
                      name="policy-number"
                      id="policy-number"
                      v-model="form.policyNumber"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.policyNumber.required"
                    >The policy number is required</span>
                    <span
                      class="md-error"
                      v-else-if="!$v.form.policyNumber.numeric"
                    >Invalid policy number</span>
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
                  <span
                    class="md-error text-danger"
                    v-if="!$v.form.customerSearched.name.required"
                  >Select the customer to proceed further</span>
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
                    <label>Assign the agent</label>
                    <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                      <md-highlight-text :md-term="term">{{ item.name }}</md-highlight-text>
                    </template>

                    <template
                      slot="md-autocomplete-empty"
                      slot-scope="{ term }"
                    >No agent matching "{{ term }}" were found.</template>
                  </md-autocomplete>
                  <span
                    class="md-error text-danger"
                    v-if="!$v.form.agentSearched.name.required"
                  >You must have to assign the agent to this customer.</span>
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('sumInsured')">
                    <label for="sum-insured">Sum Insured</label>
                    <md-input
                      name="sum-insured"
                      id="sum-insured"
                      v-model="form.sumInsured"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.sumInsured.required"
                    >The Sum insured is required</span>
                  </md-field>
                </div>
              </div>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('currencyType')">
                    <label for="currency-type">Currency Type (USD,LAK,BAHT or Other)</label>
                    <md-input
                      name="currency-type"
                      id="currency-type"
                      v-model="form.currencyType"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.currencyType.required"
                    >The Currency Type is required</span>
                  </md-field>
                </div>
              </div>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-switch v-model="form.status" class="md-primary">UnApproved/Approved Status</md-switch>
                </div>
              </div>
              <md-progress-bar md-mode="indeterminate" v-if="sending" />
              <md-dialog-actions>
                <md-button class="md-danger" @click="showDialog = false">CLOSE</md-button>
                <md-button type="submit" class="md-primary" :disabled="sending">{{ formModal.btn }}</md-button>
              </md-dialog-actions>
            </form>
          </md-dialog-content>
        </md-dialog>

        <div class="pull-right md-layout">
          <md-button class="md-primary md-layout-item" @click="downloadCSV({url: 'policy'})">
            <md-icon>cloud_download</md-icon>Generate Excel
          </md-button>
          <md-button class="md-info md-layout-item" @click="openDialog">
            <md-icon>add</md-icon>Create Policy
          </md-button>
        </div>
      </div>

      <!-- SINGLE USER DIALOG BOX -->
      <md-dialog :md-active.sync="showSingleUserDialog">
        <md-dialog-title>{{ singleUserForm.name }}'s Detail</md-dialog-title>
        <md-dialog-content>
          <md-list class="md-double-line">
            <div class="md-layout md-gutter">
              <div class="md-layout-item">
                <md-list-item>
                  <md-icon class="md-primary">face</md-icon>
                  <div class="md-list-item-text">
                    <span>{{ singleUserForm.name }}</span>
                    <span>Full Name</span>
                  </div>
                </md-list-item>
                <md-list-item>
                  <md-icon class="md-primary fas fa-gender">email</md-icon>
                  <i class="fas fa-gender"></i>
                  <div class="md-list-item-text">
                    <span>{{ singleUserForm.email }}</span>
                    <span>Personal</span>
                  </div>
                </md-list-item>
                <md-list-item>
                  <md-icon class="md-primary">supervised_user_circle</md-icon>
                  <div class="md-list-item-text">
                    <span v-if="singleUserForm.gender == 1">Male</span>
                    <span v-if="singleUserForm.gender == 2">Female</span>
                    <span v-if="singleUserForm.gender == 3">Other</span>
                    <span>Gender</span>
                  </div>
                </md-list-item>
                <md-list-item>
                  <md-icon class="md-primary">home</md-icon>
                  <div class="md-list-item-text">
                    <span>{{ singleUserForm.address }}</span>
                    <span>Address</span>
                  </div>
                </md-list-item>
              </div>
              <div class="md-layout-item">
                <md-list-item>
                  <md-icon class="md-primary">phone</md-icon>
                  <div class="md-list-item-text">
                    <span>{{ singleUserForm.phone }}</span>
                    <span>Phone</span>
                  </div>
                </md-list-item>
                <md-list-item>
                  <md-icon class="md-primary">fiber_manual_record</md-icon>
                  <div class="md-list-item-text">
                    <span v-if="singleUserForm.status == 1">Active</span>
                    <span v-else>Deactive</span>
                    <span>Status</span>
                  </div>
                </md-list-item>
                <md-list-item>
                  <md-icon class="md-primary">watch_later</md-icon>
                  <div class="md-list-item-text">
                    <span>{{ singleUserForm.createdAt }}</span>
                    <span>Created At</span>
                  </div>
                </md-list-item>
              </div>
            </div>
          </md-list>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showSingleUserDialog = false">Close</md-button>
        </md-dialog-actions>
      </md-dialog>
      <!-- DIALOG BOX OVER -->

      <!-- vuetable -->
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100 vuetable">
        <md-card class>
          <md-card-header data-background-color="purple">
            <h4 class="title">Policy's Database</h4>
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
                  <template slot="policyHolder" slot-scope="props">
                    <a
                      class="md-primary"
                      href="javascript:void(0)"
                      @click="onSelectSingleUser(props.rowData.policyHolder.id)"
                    >{{ props.rowData.policyHolder.fullName }}</a>
                  </template>
                  <template slot="policyType" slot-scope="props">
                    <md-chip class="md-primary" v-if="props.rowData.policyType == 1">Motor</md-chip>
                    <md-chip class="md-accent" v-else>Non-Motor</md-chip>
                  </template>
                  <template slot="status" slot-scope="props">
                    <md-chip class="md-accent" v-if="props.rowData.status == 1">Pending</md-chip>
                    <md-chip class="md-primary" v-else>Approved</md-chip>
                  </template>
                  <template slot="actions" slot-scope="props">
                    <div class="custom-actions">
                      <md-button
                        class="md-primary md-just-icon"
                        @click="onAction('edit', props.rowData, props.rowIndex)"
                      >
                        <md-icon>edit</md-icon>
                      </md-button>
                      <md-button
                        class="md-danger md-just-icon"
                        @click="
                          onAction('delete', props.rowData, props.rowIndex)
                        "
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
              </div>
            </div>
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
  sameAs,
  numeric
} from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { VuetableMixin } from "../mixins/VuetableMixin";
import { PoliciesMixin } from "../mixins/PoliciesMixin";
import { mapGetters } from "vuex";

export default {
  name: "PolicyComponent",
  mixins: [validationMixin, VuetableMixin, PoliciesMixin],
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
      },
      sumInsured: {
        required
      },
      currencyType: {
        required
      },
      policyNumber: {
        required,
        numeric
      },
      customerSearched: {
        name: {
          required
        }
      },
      agentSearched: {
        name: {
          required
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
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
