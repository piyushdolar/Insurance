<template>
  <div class="content">
    <div class="md-layout">
      <!-- dialog with button -->
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <!-- CREATE AGENT MODAL -->
        <md-dialog :md-active.sync="showDialog">
          <md-dialog-title>{{ formModal.title }}</md-dialog-title>
          <form novalidate @submit.prevent="validateUser" enctype="multipart/form-data">
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
                  <md-field :class="getValidationClass('phone')">
                    <label for="phone">Phone</label>
                    <md-input
                      type="number"
                      name="phone"
                      id="phone"
                      v-model="form.phone"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.phone.required"
                    >The phone number is required</span>
                    <span class="md-error" v-else-if="!$v.form.phone.minlength">Invalid phone number</span>
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
                    <span class="md-error" v-if="!$v.form.email.email">Invalid email</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 text-center">
                  <img :src="form.imagePreview" width="100" height="100" />
                  <md-field :class="getValidationClass('image')">
                    <label for="image">Profile Picture</label>
                    <md-file id="image" @change="onFileSelected" accept="image/*" />
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
            </md-dialog-content>
            <md-dialog-actions>
              <md-button class="md-danger" @click="showDialog = false">CLOSE</md-button>
              <md-button type="submit" class="md-primary" :disabled="sending">{{ formModal.btn }}</md-button>
            </md-dialog-actions>
          </form>
        </md-dialog>

        <md-button class="md-primary pull-right" @click="openDialog">
          <md-icon>add</md-icon>ADD AGENT
        </md-button>
      </div>

      <!-- vuetable -->
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100 vuetable">
        <md-card class>
          <md-card-header data-background-color="purple">
            <h4 class="title">Agent's Database</h4>
            <p class="category">Here you can find and see every agent's details</p>
          </md-card-header>
          <md-card-content>
            <div class="md-layout">
              <div class="md-layout-item md-layout">
                <md-field>
                  <label for="address">Search in the table</label>
                  <md-input v-model="filter.searchText" @keyup.enter="doFilter"></md-input>
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
                      v-bind:start-date="filter.startDate"
                      v-bind:end-date="filter.endDate"
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
              api-url="http://119.8.40.98/api/agents"
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
              <template slot="picture" scope="props">
                <img
                  v-if="props.rowData.picture != null"
                  :src="require('@/assets/img/avatars/agents/' + props.rowData.picture)"
                  alt="profile-image"
                />
                <img v-else :src="require('@/assets/img/avatars/default.png')" alt="profile-image" />
              </template>
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
  email,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

// vuetable2
import { VuetableMixin } from "../mixins/VuetableMixin";

import moment from "moment";
import Vue from "vue";

export default {
  name: "AgentComponent",
  mixins: [validationMixin, VuetableMixin],
  data: () => ({
    showDialog: false,
    form: {
      fname: null,
      lname: null,
      gender: null,
      phone: null,
      email: null,
      address: null,
      image: null,
      imagePreview: require("@/assets/img/avatars/default.png")
    },
    formModal: {
      title: "CREATE NEW AGENT",
      btn: "CREATE",
      isEdit: false
    },
    sending: false,
    image: null,
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
        name: "id",
        title: "Agent ID"
      },
      {
        name: "__slot:picture",
        title: "Image",
        callback: image => {
          // return image == null ? 'default.png' : image;
          return "default.png";
        }
      },
      {
        name: "firstName",
        sortField: "firstName",
        title: "First Name"
      },
      {
        name: "lastName",
        sortField: "lastName",
        title: "Last Name"
      },
      {
        name: "gender",
        sortField: "gender",
        title: "Gender",
        callback: function(value) {
          return value == 1 ? "Male" : value == 2 ? "Female" : "Other";
        }
      },
      {
        name: "email",
        sortField: "email",
        title: "Email"
      },
      {
        name: "status",
        sortField: "status",
        title: "Status",
        callback: function(v) {
          return v == 1 ? "Active" : "Blocked";
        }
      },
      {
        name: "createdAt",
        title: "Created Date",
        sortField: "createdAt",
        callback: function(value) {
          return moment(String(value)).format("DD/MM/YYYY hh:mm a");
        }
      },
      {
        name: "updatedAt",
        title: "Updated Date",
        sortField: "updatedAt",
        callback: function(value) {
          return moment(String(value)).format("DD/MM/YYYY hh:mm a");
        }
      },
      {
        name: "__slot:actions", // <----
        title: "Actions"
      }
      /* {
        name: "__component:custom-actions", // <----
        title: "Actions"
      } */
    ]
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
      gender: {
        required
      },
      phone: {
        required,
        maxLength: maxLength(10),
        minLength: maxLength(10)
      },
      email: {
        email
      },
      address: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    onFileSelected(event) {
      this.form.image = event.target.files[0];
      this.form.imagePreview = URL.createObjectURL(this.form.image);
    },
    onAction(action, data, index) {
      if (action == "edit") {
        this.form.id = data.id;
        this.form.fname = data.firstName;
        this.form.lname = data.lastName;
        this.form.gender = data.gender;
        this.form.phone = data.phone;
        this.form.email = data.email;
        this.form.address = data.address;
        if (data.picture != null) {
          this.form.imagePreview = require("@/assets/img/avatars/agents/" +
            data.picture);
        }
        this.formModal.title = "EDIT AGENT DATA";
        this.formModal.btn = "UPDATE";
        this.formModal.isEdit = true;
        this.showDialog = true;
      } else if (action == "delete") {
        if (confirm("Are you sure?")) {
          this.$store
            .dispatch("deleteAgent", {
              userId: data.id
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
      this.form.imagePreview = require("@/assets/img/avatars/default.png");
      this.clearForm();
    },
    clearForm() {
      this.$v.$reset();
      this.form.fname = null;
      this.form.lname = null;
      this.form.phone = null;
      this.form.gender = null;
      this.form.email = null;
      this.form.address = null;
      this.form.image = null;
    },
    validateUser(e) {
      this.$v.$touch();
      if (this.formModal.isEdit) {
        if (
          !this.$v.form.fname.$invalid &&
          !this.$v.form.lname.$invalid &&
          !this.$v.form.gender.$invalid &&
          !this.$v.form.phone.$invalid &&
          !this.$v.form.email.$invalid &&
          !this.$v.form.address.$invalid
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
    saveUser(type) {
      this.sending = true;
      let alertMessage = null;
      let alertColor = "warning";
      this.form.sessionId = this.$session.get("userProfile").id;
      if (type == "add") {
        this.$store
          .dispatch("addAgent", {
            userData: this.form
          })
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
        this.$store
          .dispatch("editAgent", {
            userData: this.form
          })
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
      }
      this.sending = false;
    }
  }
  /* mounted() {
    this.$store.dispatch("getAgents");
  },   */
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
