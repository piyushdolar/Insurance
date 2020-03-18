<template>
	<div>
		<md-dialog :md-active.sync="ResetPasswordDialogBox" :md-click-outside-to-close="false" :md-close-on-esc="false">
			<md-dialog-title>Reset Password</md-dialog-title>
			<md-dialog-content>
				<div class="md-layout">
					<div class="md-layout-item md-size-100" :class="getValidationClass('password')">
						<md-field :class="getValidationClass('password')">
							<label for="password">Password</label>
							<md-input type="password" id="password" name="password" v-model="form.password" :disabled="sending" />
							<span class="md-error" v-if="!$v.form.password.required">The password is required to update.</span>
							<span class="md-error" v-if="!$v.form.password.minLength">The password minimum length is 4 character long.</span>
						</md-field>
					</div>
					<div class="md-layout-item md-size-100">
						<md-field :class="getValidationClass('repeatPassword')">
							<label for="repeatPassword">Repeat Password</label>
							<md-input type="password" id="repeatPassword" name="repeatPassword" v-model="form.repeatPassword" :disabled="sending" />
							<span class="md-error" v-if="!$v.form.repeatPassword.sameAs">The password dosen't match.</span>
						</md-field>
					</div>
					<div class="md-layout-item md-size-100">
						<md-switch v-model="form.checkMe">Check here to confirm that you are changing password.</md-switch>
					</div>
				</div>
			</md-dialog-content>
			<md-dialog-actions>
				<md-button class="md-danger" @click="onClose()">Close</md-button>
				<md-button class="md-primary" @click="onSave()">Update Password</md-button>
			</md-dialog-actions>
		</md-dialog>
	</div>
</template>

<script>
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
	name: 'ResetPassword',
	props: {
		ResetPasswordDialogBox: {
			type: Boolean
		},
		tempData: {
			type: Object
		}
	},
	data() {
		return {
			sending: false,
			form: {
				password: null,
				repeatPassword: null,
				checkMe: false
			}
		};
	},
	mixins: [validationMixin],
	validations: {
		form: {
			password: {
				required,
				minLength: minLength(4),
				maxLength: maxLength(20)
			},
			repeatPassword: {
				sameAsPassword: sameAs('password')
			}
		}
	},
	methods: {
		getValidationClass(fieldName) {
			const field = this.$v.form[fieldName];
			if (field) {
				return {
					'md-invalid': field.$invalid && field.$dirty
				};
			}
		},
		resetData() {
			this.form.password = null;
			this.form.repeatPassword = null;
			this.form.checkMe = false;
		},
		onClose() {
			this.resetData();
			this.$emit('onResetPasswordDialogClose');
		},
		onSave() {
			this.$v.$touch();
			if (!this.$v.form.$invalid && this.form.checkMe) {
				this.tempData.resetPassword = this.form;
				this.updatePassword();
			}
		},
		async updatePassword() {
			await this.$store
				.dispatch('resetPassword', this.tempData)
				.then(response => {
					this.$alert('success', response);
					this.onClose();
				})
				.catch(error => {
					this.$alert('danger', error);
				});
		}
	}
};
</script>
