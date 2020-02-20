<template>
  <div class="content">
    <div class="md-layout">
      <!-- dialog with button -->
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <!-- CREATE AGENT MODAL -->
        <md-dialog :md-active.sync="showDialog" class="modal-large">
          <md-dialog-title>{{ formModal.title }}</md-dialog-title>
          <md-dialog-content>
            <form novalidate @submit.prevent="validateUser" enctype="multipart/form-data">
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100 text-center">
                  <img :src="form.imagePreview" width="100" height="100" alt="profile-image" />
                  <md-field :class="getValidationClass('image')">
                    <label for="image">Profile Picture</label>
                    <md-file id="image" @change="onFileSelected" accept="image/x-png, image/jpeg" />
                  </md-field>
                </div>
              </div>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('firstName')">
                    <label for="first-name">First Name</label>
                    <md-input
                      name="first-name"
                      id="first-name"
                      autocomplete="first-name"
                      v-model="form.firstName"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.firstName.required"
                    >The first name is required</span>
                    <span
                      class="md-error"
                      v-else-if="!$v.form.firstName.minlength"
                    >Invalid first name</span>
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('lastName')">
                    <label for="last-name">Last Name</label>
                    <md-input
                      name="last-name"
                      id="last-name"
                      autocomplete="last-name"
                      v-model="form.lastName"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.lastName.required"
                    >The last name is required</span>
                    <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
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
                    <span
                      class="md-error"
                      v-else-if="!$v.form.phone.minlength"
                    >Invalid phone number, It must be 11 digits long.</span>
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
              </div>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('provinceId')">
                    <label for="locationProvince">Select Province</label>
                    <md-select
                      name="locationProvince"
                      id="locationProvince"
                      v-model="form.provinceId"
                      md-dense
                      :disabled="sending"
                      @md-selected="onProvinceSelect"
                    >
                      <md-option
                        v-for="province in getLocationProvince"
                        :key="province.id"
                        :value="province.id"
                      >{{province.nameEng}}</md-option>
                    </md-select>
                    <span class="md-error" v-if="!$v.form.provinceId.required">Province Required</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('provinceId')">
                    <label for="locationDistrict">Select District</label>
                    <md-select
                      name="locationDistrict"
                      id="locationDistrict"
                      v-model="form.districtId"
                      md-dense
                      :disabled="sending"
                    >
                      <md-option
                        v-for="district in getLocationDistrict"
                        :key="district.id"
                        :value="district.id"
                      >{{district.nameEng}}</md-option>
                    </md-select>
                    <span class="md-error" v-if="!$v.form.districtId.required">District Required</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('villageName')">
                    <label for="village-name">Village Name</label>
                    <md-input
                      name="village-name"
                      id="village-name"
                      autocomplete="village-name"
                      v-model="form.villageName"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.villageName.required"
                    >The village name is required</span>
                  </md-field>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="fax-number">FAX Number</label>
                    <md-input
                      name="fax-number"
                      id="fax-number"
                      autocomplete="fax-number"
                      v-model="form.faxNumber"
                      :disabled="sending"
                    />
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="bank-name">Bank Name</label>
                    <md-input
                      name="bank-name"
                      id="bank-name"
                      autocomplete="bank-name"
                      v-model="form.bankName"
                      :disabled="sending"
                    />
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label for="bank-ac-number">Bank A/c Number</label>
                    <md-input
                      name="bank-ac-number"
                      id="bank-ac-number"
                      autocomplete="bank-ac-number"
                      v-model="form.bankAcNumber"
                      :disabled="sending"
                    />
                  </md-field>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('familyBookNumber')">
                    <label for="family-book-number">Family Book Number</label>
                    <md-input
                      name="family-book-number"
                      id="family-book-number"
                      autocomplete="family-book-number"
                      v-model="form.familyBookNumber"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.familyBookNumber.required"
                    >The family book number is required</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-datepicker
                    v-model="form.familyBookDOI"
                    :md-disabled-dates="form.familyBookDOIConfig"
                    md-immediately
                  >
                    <label>Family Book Date of Issue</label>
                  </md-datepicker>
                </div>
              </div>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('personalIdNumber')">
                    <label for="personal-id-number">Personal ID Number</label>
                    <md-input
                      name="personal-id-number"
                      id="personal-id-number"
                      autocomplete="personal-id-number"
                      v-model="form.personalIdNumber"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.personalIdNumber.required"
                    >The Personal ID number is required</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-datepicker
                    v-model="form.personalIdDOI"
                    :md-disabled-dates="form.personalIdDOIConfig"
                    md-immediately
                  >
                    <label>Personal ID Card Date of Issue</label>
                  </md-datepicker>
                </div>
              </div>

              <div class="md-layout md-gutter" v-if="!formModal.isEdit">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('password')">
                    <label for="password">Password</label>
                    <md-input
                      type="password"
                      id="password"
                      name="password"
                      v-model="form.password"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.password.required"
                    >The password field is required.</span>
                    <span
                      class="md-error"
                      v-if="!$v.form.password.minLength"
                    >The password minimum length is 4 character long.</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('repeatPassword')">
                    <label for="repeatPassword">Repeat Password</label>
                    <md-input
                      type="password"
                      id="repeatPassword"
                      name="repeatPassword"
                      v-model="form.repeatPassword"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.repeatPassword.sameAs"
                    >The password dosen't match.</span>
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
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-switch v-model="form.status" class="md-primary">Active This Agent</md-switch>
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

        <div class="pull-right md-layout" v-if="checkAuthorization('write')">
          <md-button class="md-primary md-layout-item" @click="downloadCSV('agents')">
            <md-icon>cloud_download</md-icon>Generate Excel
          </md-button>
          <md-button class="md-info md-layout-item" @click="openDialog">
            <md-icon>add</md-icon>Add Agent
          </md-button>
        </div>
      </div>

      <!-- vuetable -->
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100 vuetable">
        <md-card class>
          <md-card-header data-background-color="purple">
            <h4 class="title">Agent's Database</h4>
            <p class="category">Here you can find and see every agent's details</p>
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
                  api-url="https://www.lcpi.la/api/users?user_type=3"
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
                  <template slot="picture" slot-scope="props">
                    <img
                      v-if="props.rowData.picture != null"
                      :src="`/images/avatars/agents/${props.rowData.picture}`"
                      alt="profile-image"
                    />
                    <img v-else :src="defaultImage" alt="profile-image" />
                  </template>

                  <template slot="status" slot-scope="props">
                    <md-chip class="md-primary" v-if="props.rowData.status == 1">Active</md-chip>
                    <md-chip class="md-accent" v-else>Deactive</md-chip>
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
  email,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { VuetableMixin } from "../mixins/VuetableMixin";
import moment from "moment";
import checkAuth from "../helpers/authentication";
import { mapGetters } from "vuex";

export default {
  name: "AgentComponent",
  mixins: [validationMixin, VuetableMixin],
  data: () => ({
    showDialog: false,
    defaultImage: "/images/avatars/default.png",
    form: {
      firstName: null,
      lastName: null,
      gender: null,
      phone: null,
      email: null,
      password: null,
      repeatPassword: null,
      address: null,
      status: false,
      image: null,
      imagePreview: null,
      dob: null,
      provinceId: null,
      districtId: null,
      faxNumber: null,
      bankName: null,
      bankAcNumber: null,
      familyBookNumber: null,
      familyBookDOI: null,
      familyBookDOIConfig: date => {
        const fetchDate = date.getDate();
        const currentDate = new Date();
        if (currentDate.getDate() < fetchDate) {
          return true;
        }
      },
      personalIdNumber: null,
      personalIdDOI: null,
      personalIdDOIConfig: date => {
        const fetchDate = date.getDate();
        const currentDate = new Date();
        if (currentDate.getDate() < fetchDate) {
          return true;
        }
      },
      villageName: null
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
        title: "Image"
      },
      {
        name: "fullName",
        sortField: "firstName",
        title: "Full Name"
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
        name: "__slot:status",
        title: "Status",
        sortField: "status"
      },
      {
        name: "faxNumber",
        title: "faxNumber"
      },
      {
        name: "bankName",
        title: "bankName"
      },
      {
        name: "bankAcNumber",
        title: "bankAcNumber"
      },
      {
        name: "familyBookNumber",
        title: "familyBookNumber"
      },
      {
        name: "familyBookDOI",
        title: "familyBookDOI"
      },
      {
        name: "personalIdNumber",
        title: "personalIdNumber"
      },
      {
        name: "personalIdDOI",
        title: "personalIdDOI"
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
    ]
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      gender: {
        required
      },
      phone: {
        required,
        minLength: minLength(11),
        maxLength: maxLength(11)
      },
      email: {
        email
      },
      address: {
        required,
        minLength: minLength(4)
      },
      password: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(20)
      },
      repeatPassword: {
        sameAsPassword: sameAs("password")
      },
      provinceId: {
        required
      },
      districtId: {
        required
      },
      villageName: {
        required
      },
      familyBookNumber: {
        required
      },
      familyBookDOI: {
        required
      },
      personalIdNumber: {
        required
      },
      personalIdDOI: {
        required
      }
    }
  },
  methods: {
    onProvinceSelect(provinceId) {
      this.$store.dispatch("getLocation", provinceId);
    },
    checkAuthorization(rule) {
      return checkAuth(
        rule,
        this.$route.path,
        this.$session.get("userProfile").userType
      );
    },
    onFileSelected(event) {
      this.form.image = event.target.files[0];
      this.form.imagePreview = URL.createObjectURL(this.form.image);
    },
    onAction(action, data, index) {
      if (action == "edit") {
        this.form.id = data.id;
        this.form.firstName = data.firstName;
        this.form.lastName = data.lastName;
        this.form.gender = data.gender;
        this.form.phone = data.phone;
        this.form.email = data.email;
        this.form.faxNumber = data.faxNumber;
        this.form.bankName = data.bankName;
        this.form.bankAcNumber = data.bankAcNumber;
        this.form.familyBookNumber = data.familyBookNumber;
        this.form.familyBookDOI = data.familyBookDOI;
        this.form.personalIdNumber = data.personalIdNumber;
        this.form.personalIdDOI = data.personalIdDOI;
        this.form.address = data.address;
        this.form.status = data.status == 1 ? true : false;
        if (data.picture != null) {
          this.form.imagePreview = `/images/avatars/agents/${data.picture}`;
        }
        this.formModal.title = "EDIT AGENT DATA";
        this.formModal.btn = "UPDATE";
        this.formModal.isEdit = true;
        this.showDialog = true;
      } else if (action == "delete") {
        if (confirm("Are you sure?")) {
          this.$store
            .dispatch("deleteUser", {
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
      this.form.imagePreview = this.defaultImage;
      this.clearForm();
    },
    clearForm() {
      this.$v.$reset();
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.phone = null;
      this.form.gender = null;
      this.form.email = null;
      this.form.password = null;
      this.form.repeatPassword = null;
      this.form.address = null;
      this.form.image = null;
      this.form.status = false;
    },
    validateUser(e) {
      this.$v.$touch();
      if (this.formModal.isEdit) {
        if (
          !this.$v.form.firstName.$invalid &&
          !this.$v.form.lastName.$invalid &&
          !this.$v.form.gender.$invalid &&
          !this.$v.form.phone.$invalid &&
          !this.$v.form.email.$invalid &&
          !this.$v.form.address.$invalid
        ) {
          this.saveUser("edit");
        }
      } else {
        if (!this.$v.form.$invalid) {
          this.saveUser("add");
        }
      }
    },
    async saveUser(type) {
      this.sending = true;
      this.form.sessionId = this.$session.get("userProfile").id;
      if (type == "add") {
        await this.$store
          .dispatch("addAgent", this.form)
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
          .dispatch("editAgent", this.form)
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
    this.$store.dispatch("getLocation", 0);
  },
  computed: {
    ...mapGetters(["getLocationProvince", "getLocationDistrict"])
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
