<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-size-30 mx-auto md-small-size-100">
        <md-card>
          <md-card-header data-background-color="purple">
            <h4 class="title">Login</h4>
            <p class="category">Enter your Email and Password to login with Insurance System.</p>
          </md-card-header>

          <md-card-content>
            <form novalidate class="md-layout" @submit.prevent="validateUser">
              <div class="md-layout">
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
                  <md-radio v-model="form.userType" value="1">Master Admin</md-radio>
                  <md-radio v-model="form.userType" value="2">Admin</md-radio>
                  <md-radio v-model="form.userType" value="3">Agent</md-radio>
                </div>
              </div>

              <div class="md-layout-item md-size-100 md-small-size-100">
                <md-button type="submit" class="md-primary" :disabled="sending">{{form.btn}}</md-button>
              </div>
            </form>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <!-- Instruction -->
    <div class="md-layout">
      <div class="md-layout-item md-size-30 mx-auto md-small-size-100">
        <md-dialog-alert
          :md-active.sync="showDialog"
          md-content="<p><strong>1.</strong> Enter your E-mail and Password.</p>
                      <p><strong>2.</strong> Select your profile mode (type).</p>
                      <p><strong>3.</strong> Click login button.</p>
                      <p><strong>4.</strong> Done.</p>
                    "
          md-confirm-text="Cool!"
        />
        <h3>Need Help?</h3>
        <a
          href="#"
          class="md-primary md-raised"
          @click="showDialog = true"
        >Can't Login? Then click here to see instruction.</a>
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
  data: () => {
    return {
      form: {
        password: null,
        email: null,
        btn: "Login",
        userType: "2"
      },
      sending: false,
      returnUrl: "",
      showDialog: false
    };
  },
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
      this.$router.push("/dashboard");
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
    async finalCheck() {
      this.sending = true;
      await this.$store
        .dispatch("checkLogin", this.form)
        .then(response => {
          this.$session.start();
          this.$session.set("userProfile", response);
          this.$session.set("_timeout", {
            date: new Date(),
            limit: "60"
          });
          this.$alert("success", "Successfully Logged In.");
          this.$router.go("/dashboard");
        })
        .catch(error => {
          this.sending = false;
          this.$alert("danger", error);
        });
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.form.email.$invalid && !this.$v.form.password.$invalid) {
        this.finalCheck();
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
