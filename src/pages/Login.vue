<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-30 mx-auto md-small-size-100">
        <md-card>
          <md-card-header data-background-color="purple">
            <h4 class="title">Login</h4>
            <p class="category">Enter your username and password to login with Insurance software.</p>
          </md-card-header>

          <md-card-content>
            <form novalidate class="md-layout" @submit.prevent="validateUser">
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-100 md-small-size-100">
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
                <div class="md-layout-item md-size-100 md-small-size-100">
                  <md-field :class="getValidationClass('password')">
                    <label for="password">Password</label>
                    <md-input
                      name="password"
                      id="password"
                      type="password"
                      v-model="form.password"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.password.required"
                    >The password is required</span>
                    <span class="md-error" v-else-if="!$v.form.password.minlength">Invalid password</span>
                  </md-field>
                </div>

                <div class="md-layout-item md-size-100 md-small-size-100">
                  <ul v-if="errors && errors.length">
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                  </ul>
                </div>
                <div class="md-layout-item md-size-100 md-small-size-100">
                  <md-progress-bar md-mode="indeterminate" v-if="sending" />
                </div>

                <div class="md-layout-item md-size-100 md-small-size-100">
                  <md-button type="submit" class="md-primary" :disabled="sending">Login</md-button>
                </div>
              </div>
            </form>
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
import moment from "moment";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    form: {
      password: null,
      email: null
    },
    sending: false,
    errors: [],
    returnUrl: ""
  }),
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      }
    }
  },
  created() {
    let url = this.$route.query.returnUrl || "/";
    if (localStorage.getItem("refreshToken")) {
      this.$router.push("/Dashboard");
    }
    if (this.$session.flash.get("sessionExpired")) {
      this.$notify({
        message: "Session Expired, Please login again.",
        icon: "add_alert",
        verticalAlign: "top",
        horizontalAlign: "right",
        type: "danger"
      });
    }
  },
  methods: {
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
      this.form.password = null;
      this.form.email = null;
    },
    saveUser() {
      this.sending = true;
      this.$store
        .dispatch("checkLogin", {
          userData: this.form
        })
        .then(response => {
          this.sending = false;
          this.clearForm();
          this.$session.start();
          this.$session.set("userProfile", response.data);
          this.$session.set("_timeout", {
            date: new Date(),
            limit: "60"
          });
          this.$router.push({
            path: "/dashboard"
          });
          this.$notify({
            message: response.message,
            icon: "add_alert",
            verticalAlign: "top",
            horizontalAlign: "right",
            type: "success"
          });
        })
        .catch(error => {
          this.sending = false;
          this.$notify({
            message: error,
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
  }
};
</script>

<style lang="scss" scoped>
.mx-auto {
  margin-left: auto !important;
  margin-right: auto !important;
}

.md-card {
  margin-top: 50px;
}

.table-responsive {
  overflow: auto;
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;

  thead tr th {
    font-size: 1.063rem;
    border-top-width: 0;
    font-weight: 300;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }

  & > tbody > tr > td,
  & > tbody > tr > th,
  & > tfoot > tr > td,
  & > tfoot > tr > th,
  & > thead > tr > td,
  & > thead > tr > th {
    padding: 12px 8px;
    vertical-align: middle;
  }

  & > tbody > tr {
    position: relative;
  }

  td,
  th {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }
}
</style>
