<template>
  <form novalidate @submit.prevent="validateUser" enctype="multipart/form-data">
    <md-card class="md-card-profile">
      <div class="md-card-avatar">
        <img class="img" v-if="form.picture != null" :src="picturePreview" alt="image-preview" />
        <img class="img" v-else src="/images/avatars/default.png" alt="image-preview" />
      </div>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('firstName')">
              <label>First Name</label>
              <md-input v-model="form.firstName" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Last Name</label>
              <md-input v-model="form.lastName" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Gender</label>
              <md-select v-model="form.gender" name="gender" id="gender">
                <md-option value="1">Male</md-option>
                <md-option value="2">Female</md-option>
                <md-option value="3">Other</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Email Address</label>
              <md-input v-model="form.email" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Profile Picture</label>
              <md-file v-model="form.picture" />
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Phone</label>
              <md-input v-model="form.phone" type="number"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('password')">
              <label>Enter Password</label>
              <md-input v-model="form.password" type="password"></md-input>
              <span
                class="md-error"
                v-if="!$v.form.password.minLength"
              >The password minimum length is 4 character long.</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('passwordRepeat')">
              <label>Repeat Password</label>
              <md-input v-model="form.passwordRepeat" type="password"></md-input>
              <span
                class="md-error"
                v-if="!$v.form.passwordRepeat.sameAs"
              >The password dosen't match.</span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label for="address">Address</label>
              <md-textarea
                name="address"
                id="address"
                autocomplete="address"
                v-model="form.address"
              />
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button type="submit" class="md-raised md-primary" :disabled="sending">Update Profile</md-button>
          </div>
        </div>
      </md-card-content>
      <md-progress-bar md-mode="indeterminate" v-if="sending" />
    </md-card>
  </form>
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
import { mapGetters } from "vuex";

export default {
  name: "edit-profile-form",
  data() {
    return {
      picturePreview: "/images/avatars/default.png",
      sending: false
    };
  },
  mixins: [validationMixin],
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
        maxLength: maxLength(10),
        minLength: maxLength(10)
      },
      email: {
        email
      },
      address: {
        required,
        minLength: minLength(4)
      },
      password: {
        minLength: minLength(6)
      },
      passwordRepeat: {
        sameAsPassword: sameAs("password")
      }
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
    validateUser(e) {
      this.$v.$touch();
      if (!this.$v.form.$invalid) {
        this.saveUser("edit");
      }
    },
    async saveUser(type) {
      this.sending = true;
      await this.$store
        .dispatch("editAdminUser", this.form)
        .then(response => {
          this.$alert.notify("success", response);
        })
        .catch(error => {
          this.$alert.notify("danger", error);
        });
      this.sending = false;
    }
  },
  created() {
    this.$store.dispatch(
      "getSingleAdminUser",
      this.$session.get("userProfile").id
    );
  },
  computed: {
    ...mapGetters({ form: "getSingleAdminUser" })
  }
};
</script>
<style></style>
