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
                  <md-avatar class="md-large">
                    <img :src="form.imagePreview" alt="profile-image" />
                  </md-avatar>
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
                  <md-field :class="getValidationClass('districtId')">
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
                  <md-field :class="getValidationClass('bankName')">
                    <label for="bank-name">Bank Name</label>
                    <md-input
                      name="bank-name"
                      id="bank-name"
                      autocomplete="bank-name"
                      v-model="form.bankName"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.bankName.required"
                    >The bank account name is required</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('bankAcNumber')">
                    <label for="bank-ac-number">Bank A/c Number</label>
                    <md-input
                      name="bank-ac-number"
                      id="bank-ac-number"
                      autocomplete="bank-ac-number"
                      v-model="form.bankAcNumber"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.bankAcNumber.required"
                    >The bank account number is required</span>
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
                    :class="getValidationClass('familyBookDOI')"
                  >
                    <label>Family Book Date of Issue</label>
                    <span
                      class="md-error"
                      v-if="!$v.form.familyBookDOI.required"
                    >The family book date of issue is required</span>
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
                    :class="getValidationClass('personalIdDOI')"
                  >
                    <label>Personal ID Card Date of Issue</label>
                    <span
                      class="md-error"
                      v-if="!$v.form.personalIdDOI.required"
                    >The family book date of issue is required</span>
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
                  <md-switch v-model="form.loginStatus" class="md-primary">Active This Agent</md-switch>
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
          <md-button
            class="md-primary md-layout-item"
            @click="downloadCSV({url: 'users',userType: 2})"
          >
            <md-icon>cloud_download</md-icon>Generate Excel
          </md-button>
          <md-button
            class="md-info md-layout-item"
            @click="openDialog"
            v-if="checkAuthorization('write')"
          >
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
                  <v-md-date-range-picker
                    v-bind:start-date="filterItem.startDate"
                    v-bind:end-date="filterItem.endDate"
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
                      :src="`/images/avatars/users/${props.rowData.picture}`"
                      alt="profile-image"
                    />
                    <img v-else :src="defaultImage" alt="profile-image" />
                  </template>

                  <template slot="status" slot-scope="props">
                    <md-chip class="md-primary" v-if="props.rowData.userStatus == 1">Active</md-chip>
                    <md-chip class="md-accent" v-else>Deactive</md-chip>
                  </template>

                  <template
                    slot="location"
                    slot-scope="props"
                    v-if="props.rowData.locationId != null"
                  >{{props.rowData.provinceNameEng}}, {{props.rowData.districtNameEng}}, {{props.rowData.villageName}}</template>

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
import { validationMixin } from "vuelidate";
import { VuetableMixin } from "@/mixins/VuetableMixin";
import { AgentMixin } from "@/mixins/AgentMixin";
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs
} from "vuelidate/lib/validators";

export default {
  name: "AgentComponent",
  mixins: [validationMixin, VuetableMixin, AgentMixin],
  data: () => ({}),
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
      },
      bankName: {
        required
      },
      bankAcNumber: {
        required
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
