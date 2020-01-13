<template>
  <div class="content">
    <div class="md-layout">
      <!-- dialog with button -->
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-dialog :md-active.sync="showDialog">
          <md-dialog-title>CREATE NEW AGENT</md-dialog-title>
          <form novalidate @submit.prevent="validateUser">
            <md-dialog-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('fname')">
                    <label for="first-name">First Name</label>
                    <md-input
                      name="first-name"
                      id="first-name"
                      autocomplete="given-name"
                      v-model="form.fname"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.fname.required">The first name is required</span>
                    <span class="md-error" v-else-if="!$v.form.fname.minlength">Invalid first name</span>
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('lname')">
                    <label for="last-name">Last Name</label>
                    <md-input
                      name="last-name"
                      id="last-name"
                      autocomplete="family-name"
                      v-model="form.lname"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.lname.required">The last name is required</span>
                    <span class="md-error" v-else-if="!$v.form.lname.minlength">Invalid last name</span>
                  </md-field>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('gender')">
                    <label for="gender">Gender</label>
                    <md-select
                      name="gender"
                      id="gender"
                      v-model="form.gender"
                      md-dense
                      :disabled="sending"
                    >
                      <md-option>Select your gender</md-option>
                      <md-option value="1">Male</md-option>
                      <md-option value="2">Female</md-option>
                      <md-option value="3">Other</md-option>
                    </md-select>
                    <span class="md-error">The gender is required</span>
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('age')">
                    <label for="phone">Phone</label>
                    <md-input
                      type="number"
                      id="phone"
                      name="phone"
                      autocomplete="phone"
                      v-model="form.phone"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.phone.required">The phone is required</span>
                    <span class="md-error" v-else-if="!$v.form.phone.maxlength">Invalid phone</span>
                  </md-field>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('email')">
                    <label for="email">Email</label>
                    <md-input
                      type="email"
                      name="email"
                      id="email"
                      autocomplete="email"
                      v-model="form.email"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                    <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
                  </md-field>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('address')">
                    <label for="address">Address</label>
                    <md-textarea
                      name="address"
                      id="address"
                      autocomplete="address"
                      v-model="form.address"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.address.required">The address is required</span>
                    <span class="md-error" v-else-if="!$v.form.address.email">Invalid Address</span>
                  </md-field>
                </div>
              </div>

              <md-progress-bar md-mode="indeterminate" v-if="sending" />

              <md-snackbar
                :md-active.sync="userSaved"
              >The user {{ lastUser }} was saved with success!</md-snackbar>
            </md-dialog-content>
            <md-dialog-actions>
              <md-button class="md-danger" @click="showDialog = false">CLOSE</md-button>
              <md-button type="submit" class="md-primary" :disabled="sending">CREATE</md-button>
            </md-dialog-actions>
          </form>
        </md-dialog>
        <md-button class="md-primary pull-right" @click="showDialog = true">
          <md-icon>add</md-icon>Add Agent
        </md-button>
      </div>

      <!-- DataTable -->
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card class>
          <md-card-header data-background-color="purple">
            <h4 class="title">Agent's Database</h4>
            <p class="category">Here you can find and see every agents details</p>
          </md-card-header>
          <md-card-content>
            <div class="md-layout">
              <div class="md-layout-item">
                <md-field>
                  <label for="address">Search in the table</label>
                  <md-input v-model="filterText" @keyup.enter="doFilter"></md-input>
                  <md-button class="md-info md-just-icon" @click="doFilter">
                    <md-icon>search</md-icon>
                  </md-button>
                  <md-button class="md-primary md-just-icon" @click="resetFilter">
                    <md-icon>undo</md-icon>
                  </md-button>
                </md-field>
              </div>
              <div class="md-layout-item">
                <md-field>
                  <md-select v-model="perPage" placeholder="Per Page">
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
            </div>
            <vuetable
              ref="vuetable"
              api-url="https://vuetable.ratiw.net/api/users"
              :fields="fields"
              pagination-path
              @vuetable:pagination-data="onPaginationData"
              :multi-sort="true"
              multi-sort-key="ctrl"
              :sort-order="sortOrder"
              :append-params="moreParams"
              :per-page="perPage"
            ></vuetable>
            <vuetable-pagination-info id="vPageInfo" ref="paginationInfo"></vuetable-pagination-info>
            <vuetable-pagination
              id="vPage"
              ref="pagination"
              @vuetable-pagination:change-page="onChangePage"
            ></vuetable-pagination>
            <!-- <vuetable
						:api-mode="false"
						:data="localData"
            ></vuetable>-->
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
import axios from "axios";
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo";
import Vue from "vue";
import VueEvents from "vue-events";
Vue.use(VueEvents);

export default {
  name: "TableSearch",
  mixins: [validationMixin],
  data: () => ({
    showDialog: false,
    // users: [],
    form: {
      fname: null,
      lname: null,
      gender: null,
      phone: null,
      email: null,
      address: null
    },
    userSaved: false,
    sending: false,
    lastUser: null,
    sortOrder: [
      {
        field: "email",
        sortField: "email",
        direction: "asc"
      }
    ],
    fields: [
      {
        name: "name",
        sortField: "name"
      },
      {
        name: "email",
        sortField: "email"
      },
      {
        name: "birthdate",
        sortField: "birthdate",
        titleClass: "text-center",
        dataClass: "text-center"
      },
      {
        name: "nickname",
        sortField: "nickname",
        callBack: function(value) {
          return value.toUpperCase();
        }
      },
      {
        name: "gender",
        sortField: "gender",
        titleClass: "text-center",
        dataClass: "text-center",
        callBack: function(value) {
          return value == "M"
            ? '<md-chip class="md-primary">Male</md-chip>'
            : '<md-chip class="md-primary">Female</md-chip>';
        }
      },
      {
        name: "salary",
        sortField: "salary",
        titleClass: "text-center",
        dataClass: "right aligned",
        callBack: "formatNumber"
      }
    ],
    filterText: "",
    moreParams: {},
    perPage: 10
  }),
  validations: {
    form: {
      fname: {
        required,
        minLength: minLength(3)
      },
      lname: {
        required,
        minLength: minLength(3)
      },
      phone: {
        required,
        maxLength: maxLength(15)
      },
      gender: {
        required
      },
      email: {
        required,
        email
      },
      address: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
      this.$refs.paginationInfo.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    doFilter() {
      this.$events.fire("filter-set", this.filterText);
    },
    resetFilter() {
      this.filterText = ""; // clear the text in text input
      this.$events.fire("filter-reset");
    },
    onFilterSet(filterText) {
      this.moreParams = {
        filter: filterText
      };
      Vue.nextTick(() => this.$refs.vuetable.refresh());
    },
    onFilterReset() {
      this.moreParams = {};
      Vue.nextTick(() => this.$refs.vuetable.refresh());
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
    clearForm() {
      this.$v.$reset();
      this.form.fname = null;
      this.form.lname = null;
      this.form.phone = null;
      this.form.gender = null;
      this.form.email = null;
      this.form.address = null;
    },
    saveUser() {
      this.sending = true;
      this.form.userId = this.$session.get("userProfile").userId;
      this.$store
        .dispatch("addAgent", {
          userData: this.form
        })
        .then(response => {
          this.userSaved = true;
          this.sending = false;
          this.clearForm();
          this.showDialog = false;
          this.$notify({
            message: response,
            icon: "add_alert",
            verticalAlign: "top",
            horizontalAlign: "right",
            type: "success"
          });
        })
        .catch(error => {
          this.sending = false;
          this.$notify({
            message: error.data.message + ": " + error.data.error,
            icon: "add_alert",
            verticalAlign: "top",
            horizontalAlign: "right",
            type: "danger"
          });
        });
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saveUser();
      }
    }
  },
  watch: {
    perPage(val, oldVal) {
      this.$nextTick(function() {
        this.$refs.vuetable.refresh();
      });
    }
  },
  mounted() {
    this.$events.$on("filter-set", eventData => this.onFilterSet(eventData));
    this.$events.$on("filter-reset", e => this.onFilterReset());
    this.$store.dispatch("getAgents");
  },
  computed: {
    users() {
      return this.$store.state.agents;
    }
  },
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
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
</style>