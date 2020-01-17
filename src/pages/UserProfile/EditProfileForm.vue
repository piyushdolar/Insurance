<template>
  <form novalidate @submit.prevent="validateUser" enctype="multipart/form-data">
    <md-card class="md-card-profile">
      <div class="md-card-avatar">
        <img
          class="img"
          v-if="form.picture != null"
          :src="require('@/assets/img/avatars/users/' + form.picturePreview)"
        />
        <img class="img" v-else :src="require('@/assets/img/avatars/default.png')" />
      </div>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
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
            <md-button class="md-raised md-primary">Update Profile</md-button>
          </div>
        </div>
      </md-card-content>
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
export default {
  name: "edit-profile-form",
  data() {
    return {
      form: {
        firstName: null,
        lastName: null,
        gender: null,
        phone: null,
        email: null,
        address: null,
        picture: null,
        picturePreview: require("@/assets/img/avatars/default.png")
      }
    };
  },
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
      }
    }
  },
  method: {
    validateUser(e) {
      this.$v.$touch();
      if (!this.$v.form.$invalid) {
        this.saveUser("add");
      }
    }
  },
  mounted() {
    this.form = {
      firstName: this.$session.get("userProfile").firstName,
      lastName: this.$session.get("userProfile").lastName,
      gender: this.$session.get("userProfile").gender,
      phone: this.$session.get("userProfile").phone,
      picture: this.$session.get("userProfile").picture,
      address: this.$session.get("userProfile").address
    };
  }
};
</script>
<style></style>
