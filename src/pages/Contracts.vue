<template>
  <div class="content">
    <div class="md-layout">
      <!-- dialog with button -->
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-dialog :md-active.sync="showDialog">
          <md-dialog-title>CREATE NEW CONTRACT</md-dialog-title>
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
          <md-icon>add</md-icon>Add Contract
        </md-button>
      </div>
      <!-- TABLE LISTING OF AGENTS -->
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="purple">
            <h4 class="title">Contract's Database</h4>
            <p class="category">Here you can find and see every Contract's details</p>
          </md-card-header>
          <md-card-content>
            <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
              <md-table-toolbar>
                <div class="md-toolbar-section-start">
                  <h1 class="md-title">Contracts</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input
                    placeholder="Search by name..."
                    v-model="search"
                    @input="searchOnTable"
                  />
                </md-field>
              </md-table-toolbar>

              <md-table-empty-state
                md-label="No contract found"
                :md-description="`No contract found for this '${search}' query. Try a different search term or create a new contract.`"
              >
                <md-button class="md-primary md-raised" @click="newUser">Create New Contract</md-button>
              </md-table-empty-state>

              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Full Name" md-sort-by="fullName">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>

                <md-table-cell md-label="Gender" md-sort-by="gender" v-if="item.gender == 'Male'">
                  <md-chip class="md-primary">Male</md-chip>
                </md-table-cell>
                <md-table-cell md-label="Gender" md-sort-by="gender" v-if="item.gender == 'FeMale'">
                  <md-chip class="md-primary">Male</md-chip>
                </md-table-cell>

                <md-table-cell md-label="Phone" md-sort-by="phone">{{ item.phone }}</md-table-cell>
                <md-table-cell md-label="Address" md-sort-by="address">{{ item.address }}</md-table-cell>
              </md-table-row>
            </md-table>
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

const toLower = text => {
  return text.toString().toLowerCase();
};
const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.fullName).includes(toLower(term)));
  }
  return items;
};
export default {
  name: "Contracts",
  mixins: [validationMixin],
  data: () => ({
    showDialog: false,
    search: null,
    searched: [],
    users: [],
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
    lastUser: null
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
    newUser() {
      window.alert("Noop");
    },
    searchOnTable() {
      this.searched = searchByName(this.users, this.search);
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

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`;
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    validateUser() {
      this.notifyVue("top", "right");
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
    async fetchAllAgents() {
      let data = await axios.get(`http://jsonplaceholder.typicode.com/users`);
      for (let i = 0; i < data.data.length; i++) {
        this.users.push({
          id: data.data[i].id,
          fullName: data.data[i].name,
          email: data.data[i].email,
          gender: "Male",
          phone: data.data[i].phone,
          address: data.data[i].address.street + "," + data.data[i].address.city
        });
      }
    }
  },
  created() {
    this.searched = this.users;
    this.fetchAllAgents();
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
</style>
