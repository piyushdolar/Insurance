<template>
  <form novalidate @submit.prevent="validateUser" enctype="multipart/form-data">
    <md-card class="md-card-profile">
      <div class="md-card-avatar">
        <img
          class="img"
          v-if="form.picture != null"
          :src="`/images/avatars/agents/${form.picture}`"
          alt="image-preview"
        />
        <img class="img" v-else :src="imagePreview" alt="image-preview" />
      </div>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('firstName')">
              <label>First Name</label>
              <md-input v-model="form.firstName" type="text"></md-input>
              <span class="md-error" v-if="!$v.form.firstName.required">First name is required.</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('lastName')">
              <label>Last Name</label>
              <md-input v-model="form.lastName" type="text"></md-input>
              <span class="md-error" v-if="!$v.form.lastName.required">Last name is required.</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('gender')">
              <label>Gender</label>
              <md-select v-model="form.gender" name="gender" id="gender">
                <md-option value="1">Male</md-option>
                <md-option value="2">Female</md-option>
                <md-option value="3">Other</md-option>
              </md-select>
              <span class="md-error" v-if="!$v.form.gender.required">Gender is required.</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('email')">
              <label>Email Address</label>
              <md-input v-model="form.email" type="email"></md-input>
              <span class="md-error" v-if="!$v.form.email.required">Email is required.</span>
              <span class="md-error" v-else-if="!$v.form.email.email">Enter valid email format.</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Profile image</label>
              <md-file @change="onFileSelected" accept="image/x-png, image/jpeg" />
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('phone')">
              <label>Phone</label>
              <md-input v-model="form.phone" type="number"></md-input>
              <span class="md-error" v-if="!$v.form.phone.required">Phone number is required.</span>
              <span
                class="md-error"
                v-else-if="!$v.form.phone.minlength"
              >Invalid phone number, It must be 11 digits long.</span>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field :class="getValidationClass('password')">
              <label>Enter Password</label>
              <md-input v-model="form.password" type="password"></md-input>
              <span
                class="md-error"
                v-if="!$v.form.password.minLength"
              >The password minimum length is 6 character long.</span>
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
            <md-field :class="getValidationClass('address')">
              <label for="address">Address</label>
              <md-textarea
                name="address"
                id="address"
                autocomplete="address"
                v-model="form.address"
              />
              <span class="md-error" v-if="!$v.form.address.required">Address is required.</span>
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
      image: null,
      imagePreview: "/images/avatars/default.png",
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
        maxLength: maxLength(11),
        minLength: maxLength(11)
      },
      email: {
        required,
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
    onFileSelected(event) {
      this.form.image = event.target.files[0];
      this.imagePreview = URL.createObjectURL(this.form.image);
    },
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
        this.saveUser();
      }
    },
    async saveUser() {
      this.sending = true;
      await this.$store
        .dispatch("editUser", this.form)
        .then(response => {
          this.$alert("success", response);
        })
        .catch(error => {
          this.$alert("danger", error);
        });
      this.sending = false;
    }
  },
  created() {
    this.$store.dispatch("getSingleUser", this.$session.get("userProfile").id);
  },
  computed: {
    ...mapGetters({ form: "getSingleUser" })
  }
};
</script>
<style></style>
