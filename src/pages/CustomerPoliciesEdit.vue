<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-content data-background-color="red">
            <span>
              <strong>Admin's Message:</strong>
              {{ form.comment }}
            </span>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <form novalidate @submit.prevent="validate" enctype="multipart/form-data">
            <md-card-header data-background-color="orange">
              <h3 class="title">Customer Update Policy Form</h3>
              <p class="category">Your submitted policy needs some correction from admin.</p>
            </md-card-header>

            <md-card-content>
              <h3>1. Customer Information</h3>

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
                    >Invalid First name</span>
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
                    >The Last name is required</span>
                    <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid Last name</span>
                  </md-field>
                </div>
              </div>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('policyNumber')">
                    <label for="policy-number">Policy Number</label>
                    <md-input
                      name="policy-number"
                      id="policy-number"
                      autocomplete="policy-number"
                      v-model="form.policyNumber"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.policyNumber.required"
                    >The Policy number is required</span>
                    <span
                      class="md-error"
                      v-else-if="!$v.form.policyNumber.minlength"
                    >Invalid Policy number</span>
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
                    >The Phone number is required</span>
                    <span
                      class="md-error"
                      v-else-if="!$v.form.phone.minlength"
                    >Invalid Phone number, It must be 11 digits long</span>
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
                    <span class="md-error" v-if="!$v.form.address.required">Address is required</span>
                  </md-field>
                </div>
              </div>

              <h3>2. Vehicle Information</h3>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('make')">
                    <label for="last-name">Make</label>
                    <md-input
                      name="last-name"
                      id="last-name"
                      autocomplete="last-name"
                      v-model="form.make"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.make.required">The Make field is required</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('plateNumber')">
                    <label for="plate-number">Plate No.</label>
                    <md-input
                      name="plate-number"
                      id="plate-number"
                      autocomplete="plate-number"
                      v-model="form.plateNumber"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.plateNumber.required"
                    >Plate number is required</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('powerInCC')">
                    <label for="power-in-cc">Power In CC</label>
                    <md-input
                      name="power-in-cc"
                      id="power-in-cc"
                      autocomplete="power-in-cc"
                      v-model="form.powerInCC"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.powerInCC.required"
                    >Power In CC field is required</span>
                  </md-field>
                </div>
              </div>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('engineNumber')">
                    <label for="engine-number">Engine No.</label>
                    <md-input
                      name="engine-number"
                      id="engine-number"
                      autocomplete="engine-number"
                      v-model="form.engineNumber"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.engineNumber.required"
                    >Engine No. field is required</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('chassisNumber')">
                    <label for="chassis-number">Chassis No.</label>
                    <md-input
                      name="chassis-number"
                      id="chassis-number"
                      autocomplete="chassis-number"
                      v-model="form.chassisNumber"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.chassisNumber.required"
                    >Chassis No. field is required</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('grossWeightInTon')">
                    <label for="gross-weight-in-ton">Gross Weight In Ton</label>
                    <md-input
                      name="gross-weight-in-ton"
                      id="gross-weight-in-ton"
                      autocomplete="gross-weight-in-ton"
                      v-model="form.grossWeightInTon"
                      :disabled="sending"
                    />
                  </md-field>
                </div>
              </div>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('vehicleType')">
                    <label for="vehicle-type">Vehicle Type</label>
                    <md-select
                      name="vehicle-type"
                      id="vehicle-type"
                      v-model="form.vehicleType"
                      md-dense
                      :disabled="sending"
                    >
                      <md-option>Select Vehicle Type</md-option>
                      <md-option value="Motorcycle">Motorcycle</md-option>
                      <md-option value="Touk-Touk">Touk-Touk</md-option>
                      <md-option value="Car">Car</md-option>
                      <md-option value="Truck">Truck</md-option>
                      <md-option value="Inflammable Trans Truck">Inflammable Trans Truck</md-option>
                      <md-option value="Mini Van">Mini Van</md-option>
                      <md-option value="Bus">Bus</md-option>
                      <md-option value="Trailer">Trailer</md-option>
                      <md-option value="Truck Construction Machine">Truck Construction Machine</md-option>
                    </md-select>
                    <span class="md-error">Vehicle Type is required</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('vehicleColor')">
                    <label for="vehicleColor">Vehicle Color</label>
                    <md-input
                      name="vehicleColor"
                      id="vehicleColor"
                      autocomplete="vehicleColor"
                      v-model="form.vehicleColor"
                      :disabled="sending"
                    />
                    <span
                      class="md-error"
                      v-if="!$v.form.vehicleColor.required"
                    >Vehicle Color is required</span>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('seats')">
                    <label for="seats">Seats</label>
                    <md-input
                      name="seats"
                      id="seats"
                      autocomplete="seats"
                      v-model="form.seats"
                      :disabled="sending"
                    />
                    <span class="md-error" v-if="!$v.form.seats.required">Seats field is required</span>
                    <span class="md-error" v-if="!$v.form.seats.numeric">Seats can be in number only</span>
                  </md-field>
                </div>
              </div>

              <h3>3. Upload Form Photo</h3>

              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100 text-center">
                  <md-avatar class="md-large">
                    <img :src="form.picturePreview" alt="profile-picture" />
                  </md-avatar>
                  <md-field :class="getValidationClass('picture')">
                    <label for="picture">Form Photo</label>
                    <md-file
                      :disabled="sending"
                      id="picture"
                      @change="onFileSelected"
                      accept="picture/x-png, picture/jpeg"
                    />
                  </md-field>
                </div>
              </div>

              <h3>Last Uploaded Image:</h3>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-size-100">
                  <img :src="'/images/avatars/policy/'+form.picture" class="vuetable-image" />
                </div>
              </div>
              <md-progress-bar md-mode="indeterminate" v-if="sending" />
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100 text-right">
                  <md-button type="submit" class="md-primary" :disabled="sending">Submit To Admin</md-button>
                </div>
              </div>
            </md-card-content>
          </form>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  sameAs,
  numeric
} from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  name: "CustomerPoliciesCreate",
  mixins: [validationMixin],
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3),
        maxLength: minLength(3)
      },
      lastName: {
        required
      },
      address: {
        required
      },
      phone: {
        required,
        minLength: minLength(11),
        maxLength: maxLength(11)
      },
      policyNumber: {
        required,
        numeric
      },
      make: {
        required
      },
      plateNumber: {
        required
      },
      powerInCC: {
        required
      },
      engineNumber: {
        required
      },
      chassisNumber: {
        required
      },
      seats: {
        required,
        numeric
      },
      vehicleType: {
        required
      },
      vehicleColor: {
        required
      }
    }
  },
  data() {
    return {
      sending: false
    };
  },
  methods: {
    onFileSelected() {
      this.form.pictureNew = event.target.files[0];
      this.form.picturePreview = URL.createObjectURL(this.form.picture);
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    validate() {
      this.$v.$touch();
      if (!this.$v.form.$invalid) {
        this.savePolicy();
      }
    },
    async savePolicy() {
      this.sending = true;
      this.form.agentId = this.$session.get("userProfile").id;
      this.form.policyId = this.$router.app._route.params.id;
      await this.$store
        .dispatch("editPolicyByAgent", this.form)
        .then(response => {
          this.$alert("success", response);
          this.$router.push("/customer-policies");
        })
        .catch(error => {
          this.$alert("danger", error);
        });
      this.sending = false;
    }
  },
  mounted() {
    this.$store.dispatch("getPolicyById", this.$router.app._route.params.id);
  },
  computed: {
    form() {
      return this.$store.getters.getSinglePolicy;
    }
  }
};
</script>
