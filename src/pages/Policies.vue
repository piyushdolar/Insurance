<template>
<div class="content">
  <div class="md-layout">
    <!-- dialog with button -->
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
      <!-- Policy History Modal -->
      <md-dialog :md-active.sync="showHistoryModal" class="modal-large">
        <md-dialog-title>{{historyModalTitle}}'s History</md-dialog-title>
        <md-dialog-content>
          <md-list class="md-double-line" v-for="history in getPolicyHistory" v-bind:key="history.id">
            <md-list-item>
              <div class="md-list-item-text">
                <span v-html="history.comment"></span>
                <p>{{history.createdAt}}</p>
              </div>
            </md-list-item>
            <md-divider />
          </md-list>
          <md-list class="md-double-line" v-if="getPolicyHistory.length == 0">
            <md-list-item>
              <div class="md-list-item-text">
                <span>History not found</span>
                <span>NOT_FOUND</span>
              </div>
            </md-list-item>
            <md-divider />
          </md-list>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-danger" @click="showHistoryModal = false">CLOSE</md-button>
        </md-dialog-actions>
      </md-dialog>

      <!-- CREATE POLICY MODAL -->
      <md-dialog :md-active.sync="showDialog" class="modal-large">
        <md-dialog-title>{{ formModal.title }}</md-dialog-title>
        <md-dialog-content>
          <form novalidate @submit.prevent="validateUser">
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('policyName')">
                  <label for="policy-name">Policy Name</label>
                  <md-input name="policy-name" id="policy-name" v-model="form.policyName" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.policyName.required">The policy name is required</span>
                  <span class="md-error" v-else-if="!$v.form.policyName.minlength">Invalid policy name</span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('policyNumber')">
                  <label for="policy-number">Policy Number</label>
                  <md-input name="policy-number" id="policy-number" v-model="form.policyNumber" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.policyNumber.required">The policy number is required</span>
                  <span class="md-error" v-else-if="!$v.form.policyNumber.numeric">Invalid policy number</span>
                </md-field>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-autocomplete v-model="form.customerSearched.name" :md-options="form.searchedList" md-autoselect="true" @md-changed="getCustomers" @md-opened="getCustomers" @md-selected="onSelectCustomer" :class="getValidationClass('customerSearched')">
                  <label>Select Customer *</label>
                  <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                    <md-highlight-text :md-term="term">{{ item.name }}</md-highlight-text>
                  </template>

                  <template slot="md-autocomplete-empty" slot-scope="{ term }">No customer matching "{{ term }}" were found.</template>
                <span class="md-error text-danger" v-if="!$v.form.customerSearched.name.required">Select the customer to proceed further</span>
                </md-autocomplete>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('policyType')">
                  <label for="policy-type">Policy Type</label>
                  <md-select name="policy-type" id="policy-type" v-model="form.policyType" md-dense :disabled="sending">
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
                <md-datepicker v-model="form.startDate" md-immediately :md-disabled-dates="form.startDateConfig" :class="getValidationClass('startDate')">
                  <label>Policy Start Date</label>
                  <span class="md-error">The Policy Start date is required</span>
                </md-datepicker>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-datepicker v-model="form.endDate" md-immediately :md-disabled-dates="form.endDateConfig" :class="getValidationClass('endDate')">
                  <label>Policy End Date</label>
                  <span class="md-error">The Policy End date is required</span>
                </md-datepicker>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-autocomplete v-model="form.agentSearched.name" :md-options="form.searchedList" @md-changed="getAgents" @md-opened="getAgents" @md-selected="onSelectAgent">
                  <label>Assign the Agent</label>
                  <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                    <md-highlight-text :md-term="term">{{ item.name }}</md-highlight-text>
                  </template>

                  <template slot="md-autocomplete-empty" slot-scope="{ term }">No agent matching "{{ term }}" were found.</template>
                </md-autocomplete>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('sumInsured')">
                  <label for="sum-insured">Sum Insured</label>
                  <md-input name="sum-insured" id="sum-insured" v-model="form.sumInsured" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.sumInsured.required">The Sum insured is required</span>
                </md-field>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('currencyType')">
                  <label for="currency-type">Currency Type (USD,LAK,BAHT or Other)</label>
                  <md-input name="currency-type" id="currency-type" v-model="form.currencyType" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.currencyType.required">The Currency Type is required</span>
                </md-field>
              </div>
            </div>

            <!-- VEHICLE DETAILS -->
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('vehicleType')">
                  <label for="vehicle-type">Vehicle Type</label>
                  <md-select name="vehicle-type" id="vehicle-type" v-model="form.vehicleType" md-dense :disabled="sending">
                    <md-option>Select Vehicle Type</md-option>
                    <md-option value="Motorcycle">Motorcycle</md-option>
                    <md-option value="Touk-Touk">Touk-Touk</md-option>
                    <md-option value="Car">Car</md-option>
                    <md-option value="Truck">Truck</md-option>
                    <md-option value="Inflammable Trans Truck">Inflammable Trans Truck</md-option>
                    <md-option value="Mini Van">Mini Van</md-option>
                    <md-option value="Bus">Bus</md-option>
                    <md-option value="Trailer">Trailer</md-option>
                    <md-option value="Truck Construction Machine">Truck Construction Machine</md-option>
                  </md-select>
                  <span class="md-error">Vehicle Type is required</span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('make')">
                  <label for="make">Make</label>
                  <md-input name="make" id="make" v-model="form.make" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.make.required">Make is required</span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('plateNumber')">
                  <label for="plateNumber">Plate No.</label>
                  <md-input name="plateNumber" id="plateNumber" v-model="form.plateNumber" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.plateNumber.required">Plate No. is required</span>
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('vehicleColor')">
                  <label for="vehicleColor">Vehicle Color</label>
                  <md-input name="vehicleColor" id="vehicleColor" v-model="form.vehicleColor" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.vehicleColor.required">Vehicle Color is required</span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('powerInCC')">
                  <label for="powerInCC">Power In CC</label>
                  <md-input name="powerInCC" id="powerInCC" v-model="form.powerInCC" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.powerInCC.required">Power In CC is required</span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('engineNumber')">
                  <label for="engineNumber">Engine No.</label>
                  <md-input name="engineNumber" id="engineNumber" v-model="form.engineNumber" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.engineNumber.required">Engine No. is required</span>
                </md-field>
              </div>
            </div>

            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('chassisNumber')">
                  <label for="chassisNumber">Chassis No.</label>
                  <md-input name="chassisNumber" id="chassisNumber" v-model="form.chassisNumber" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.chassisNumber.required">Chassis No. is required</span>
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('grossWeightInTon')">
                  <label for="grossWeightInTon">Gross Weight In Ton</label>
                  <md-input name="grossWeightInTon" id="grossWeightInTon" v-model="form.grossWeightInTon" :disabled="sending" />
                </md-field>
              </div>
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('seats')">
                  <label for="seats">Seats</label>
                  <md-input name="seats" id="seats" v-model="form.seats" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.seats.required">Seats is required</span>
                </md-field>
              </div>
            </div>

            <!-- WHEN SOOMEONE UPDATE THE FORM THEY NEED TO COMMENT SOMETHING -->
            <div class="md-layout md-gutter" v-if="formModal.isEdit">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('comment')">
                  <label for="comment">Why are you here?</label>
                  <md-textarea name="comment" id="comment" autocomplete="comment" v-model="form.comment" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.comment.required">The comment is required while updating policy.</span>
                  <span class="md-error" v-else-if="!$v.form.comment.email">Invalid comment</span>
                </md-field>
              </div>
            </div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-switch v-model="form.status" class="md-primary">Un-Approved/Approved Status</md-switch>
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
          <md-tooltip md-direction="top">Generate Excel & Download it.</md-tooltip>
        </md-button>
        <md-button class="md-info md-layout-item" @click="openDialog" v-if="checkAuthorization('write')">
          <md-icon>add</md-icon>Create Policy
          <md-tooltip md-direction="top">Create Policy for Customer</md-tooltip>
        </md-button>
      </div>
    </div>

    <!-- SINGLE USER DIALOG BOX -->
    <single-customer-component :showSingleCustomerDialog="showSingleCustomerDialog" :singleUserForm="singleCustomerForm" @onDialogClose="showSingleCustomerDialog=false"></single-customer-component>
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
                <v-md-date-range-picker v-bind:start-date="filterItem.startDate" v-bind:end-date="filterItem.endDate" opens="right" @change="handleDateChange"></v-md-date-range-picker>
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
                <md-tooltip md-direction="top">Search</md-tooltip>
              </md-button>
              <md-button class="md-primary md-just-icon" @click="resetFilter">
                <md-icon>undo</md-icon>
                <md-tooltip md-direction="top">Reset</md-tooltip>
              </md-button>
            </div>
          </div>
          <!-- :api-mode="false"
            :data="tableData"-->
          <div class="md-layout">
            <div class="md-layout-item table-responsive">
              <vuetable ref="vuetable" api-url="https://www.lcpi.la/api/policy" :fields="fields" :http-options="{ headers: { Authorization: accessToken } }" pagination-path @vuetable:pagination-data="onPaginationData" :multi-sort="true"
                multi-sort-key="ctrl" :sort-order="sortOrder" :append-params="moreParams" :per-page="perPage" @vuetable:load-error="handleLoadError">
                <template slot="customer" slot-scope="props">
                  <a class="md-primary" href="javascript:void(0)" @click="onSelectSingleCustomer(props.rowData.customer.id)">{{ props.rowData.customer.fullName }}</a>
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
                    <md-button class="md-primary md-just-icon" @click="onAction('history', props.rowData, props.rowIndex)" v-if="props.rowData.updatedBy.name != null">
                      <md-icon>history</md-icon>
                      <md-tooltip md-direction="top">Comment's History</md-tooltip>
                    </md-button>
                    <md-button class="md-primary md-just-icon" @click="onAction('edit', props.rowData, props.rowIndex)">
                      <md-icon>edit</md-icon>
                      <md-tooltip md-direction="top">Edit</md-tooltip>
                    </md-button>
                    <md-button class="md-danger md-just-icon" @click="
                          onAction('delete', props.rowData, props.rowIndex)
                        ">
                      <md-icon>delete</md-icon>
                      <md-tooltip md-direction="top">Delete</md-tooltip>
                    </md-button>
                  </div>
                </template>
              </vuetable>
              <vuetable-pagination-info id="vPageInfo" ref="paginationInfo"></vuetable-pagination-info>
              <vuetable-pagination id="vPage" ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
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
import {
  validationMixin
} from "vuelidate";
import {
  VuetableMixin
} from "@/mixins/VuetableMixin";
import {
  PoliciesMixin
} from "@/mixins/PoliciesMixin";
import SingleCustomerComponent from "@/components/SingleCustomerView";

export default {
  name: "PolicyComponent",
  mixins: [validationMixin, VuetableMixin, PoliciesMixin],
  components: {
    SingleCustomerComponent
  },
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
      comment: {
        required
      },
      vehicleType: {
        required
      },
      make: {
        required
      },
      plateNumber: {
        required
      },
      vehicleColor: {
        required
      },
      powerInCC: {
        required
      },
      engineNumber: {
        required
      },
      chassisNumber: {
        required
      },
      seats: {
        required
      }
    }
  }
};
</script>
