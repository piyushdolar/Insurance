<template>
	<div class="content">
		<div class="md-layout">
			<!-- dialog with button -->
			<div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
				<md-dialog :md-active.sync="showDialog">
					<md-dialog-title>CREATE NEW USER</md-dialog-title>
					<form novalidate @submit.prevent="validateUser">
						<md-dialog-content>
							<div class="md-layout md-gutter">
								<div class="md-layout-item md-small-size-100">
									<md-field :class="getValidationClass('fname')">
										<label for="first-name">First Name</label>
										<md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.fname" :disabled="sending" />
										<span class="md-error" v-if="!$v.form.fname.required">The first name is required</span>
										<span class="md-error" v-else-if="!$v.form.fname.minlength">Invalid first name</span>
									</md-field>
								</div>

								<div class="md-layout-item md-small-size-100">
									<md-field :class="getValidationClass('lname')">
										<label for="last-name">Last Name</label>
										<md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lname" :disabled="sending" />
										<span class="md-error" v-if="!$v.form.lname.required">The last name is required</span>
										<span class="md-error" v-else-if="!$v.form.lname.minlength">Invalid last name</span>
									</md-field>
								</div>
							</div>

							<div class="md-layout md-gutter">
								<div class="md-layout-item md-small-size-100">
									<md-field :class="getValidationClass('gender')">
										<label for="gender">Gender</label>
										<md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="sending">
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
										<md-input type="number" id="phone" name="phone" autocomplete="phone" v-model="form.phone" :disabled="sending" />
										<span class="md-error" v-if="!$v.form.phone.required">The phone is required</span>
										<span class="md-error" v-else-if="!$v.form.phone.maxlength">Invalid phone</span>
									</md-field>
								</div>
							</div>

							<div class="md-layout md-gutter">
								<div class="md-layout-item md-small-size-100">
									<md-field :class="getValidationClass('password')">
										<label for="password">Password</label>
										<md-input type="password" id="password" name="password" autocomplete="password" v-model="form.password" :disabled="sending" />
										<span class="md-error" v-if="!$v.form.password.minLength">The password minimum length is 4 character long.</span>
									</md-field>
								</div>
								<div class="md-layout-item md-small-size-100">
									<md-field :class="getValidationClass('repeatPassword')">
										<label for="repeatPassword">Repeat Password</label>
										<md-input type="password" id="repeatPassword" name="repeatPassword" autocomplete="repeatPassword" v-model="form.repeatPassword" :disabled="sending" />
										<span class="md-error" v-if="!$v.form.repeatPassword.sameAs">The password dosen't match.</span>
									</md-field>
								</div>
							</div>

							<div class="md-layout md-gutter">
								<div class="md-layout-item md-small-size-100">
									<md-field :class="getValidationClass('email')">
										<label for="email">Email</label>
										<md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
										<span class="md-error" v-if="!$v.form.email.required">The email is required</span>
										<span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
									</md-field>
								</div>
							</div>

							<div class="md-layout md-gutter">
								<div class="md-layout-item md-small-size-100">
									<md-field :class="getValidationClass('address')">
										<label for="address">Address</label>
										<md-textarea name="address" id="address" autocomplete="address" v-model="form.address" :disabled="sending" />
										<span class="md-error" v-if="!$v.form.address.required">The address is required</span>
										<span class="md-error" v-else-if="!$v.form.address.email">Invalid Address</span>
									</md-field>
								</div>
							</div>

							<md-progress-bar md-mode="indeterminate" v-if="sending" />

							<md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
						</md-dialog-content>
						<md-dialog-actions>
							<md-button class="md-danger" @click="showDialog = false">CLOSE</md-button>
							<md-button type="submit" class="md-primary" :disabled="sending">CREATE</md-button>
						</md-dialog-actions>
					</form>
				</md-dialog>
				<md-button class="md-primary pull-right" @click="showDialog = true"> <md-icon>add</md-icon>Add User </md-button>
			</div>
			<!-- TABLE LISTING OF AGENTS -->
			<div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
				<md-card>
					<md-card-header data-background-color="green">
						<h4 class="title">User's Database</h4>
						<p class="category">Here you can find and see every user's details</p>
					</md-card-header>
					<md-card-content>
						<md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
							<md-table-toolbar>
								<div class="md-toolbar-section-start">
									<h1 class="md-title">Users</h1>
								</div>

								<md-field md-clearable class="md-toolbar-section-end">
									<md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
								</md-field>
							</md-table-toolbar>

							<md-table-empty-state md-label="No users found" :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
								<md-button class="md-primary md-raised" @click="newUser">Create New User</md-button>
							</md-table-empty-state>

							<md-table-row slot="md-table-row" slot-scope="{ item }">
								<md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
								<md-table-cell md-label="Full Name" md-sort-by="fullName">{{ item.fullName }}</md-table-cell>
								<md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>

								<md-table-cell md-label="Gender" md-sort-by="gender" v-if="item.gender == 1">
									<md-chip class="md-primary">Male</md-chip>
								</md-table-cell>
								<md-table-cell md-label="Gender" md-sort-by="gender" v-if="item.gender == 2">
									<md-chip class="md-primary">Female</md-chip>
								</md-table-cell>
								<md-table-cell md-label="Gender" md-sort-by="gender" v-if="item.gender == 3">
									<md-chip class="md-primary">Other</md-chip>
								</md-table-cell>

								<md-table-cell md-label="Created At" md-sort-by="createdAt">{{ item.createdAt }}</md-table-cell>
								<md-table-cell md-label="Updated At" md-sort-by="UpdatedAt">{{ item.updatedAt }}</md-table-cell>
							</md-table-row>
						</md-table>
					</md-card-content>
				</md-card>
			</div>

			<!-- vuetable -->
			<div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
				<md-card class="">
					<div class="filter-bar ui basic segment grid">
						<div class="ui form">
							<div class="inline field">
								<label>Search for:</label>
								<input type="text" v-model="filterText" class="three wide column" @keyup.enter="doFilter" placeholder="name, nickname, or email" />
								<button class="ui primary button" @click="doFilter">Go</button>
								<button class="ui button" @click="resetFilter">Reset</button>
							</div>
						</div>
					</div>
					<vuetable
						ref="vuetable"
						api-url="https://vuetable.ratiw.net/api/users"
						:fields="fields"
						pagination-path=""
						@vuetable:pagination-data="onPaginationData"
						:multi-sort="true"
						multi-sort-key="ctrl"
						:sort-order="sortOrder"
						:append-params="moreParams"
					></vuetable>
					<vuetable-pagination-info id="vPageInfo" ref="paginationInfo"></vuetable-pagination-info>
					<vuetable-pagination id="vPage" ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
					<!-- <vuetable
						:api-mode="false"
						:data="localData"
					></vuetable> -->
				</md-card>
			</div>
		</div>
	</div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators';
import axios from 'axios';
import { mapActions, mapState, mapGetters } from 'vuex';

// vuetable2
import Vuetable from 'vuetable-2/src/components/Vuetable';
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo';
import Vue from 'vue';
import VueEvents from 'vue-events';
Vue.use(VueEvents);

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
	name: 'TableSearch',
	mixins: [validationMixin],
	data: () => ({
		showDialog: false,
		search: null,
		searched: [],
		// users: [],
		form: {
			fname: null,
			lname: null,
			gender: null,
			phone: null,
			email: null,
			address: null,
			password: null
		},
		userSaved: false,
		sending: false,
		lastUser: null,

		// vuetable
		sortOrder: [
			{
				field: 'email',
				sortField: 'email',
				direction: 'asc'
			}
		],
		fields: [
			{
				name: 'name',
				sortField: 'name'
			},
			{
				name: 'email',
				sortField: 'email'
			},
			{
				name: 'birthdate',
				sortField: 'birthdate',
				titleClass: 'text-center',
				dataClass: 'text-center'
			},
			{
				name: 'nickname',
				sortField: 'nickname',
				callBack: 'allcap'
			},
			{
				name: 'gender',
				sortField: 'gender',
				titleClass: 'text-center',
				dataClass: 'text-center',
				callBack: 'genderLabel'
			},
			{
				name: 'salary',
				sortField: 'salary',
				titleClass: 'text-center',
				dataClass: 'right aligned',
				callBack: 'formatNumber'
			}
		],
		filterText: '',
		moreParams: {}
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
			},
			password: {
				required,
				minLength: minLength(4)
			},
			repeatPassword: {
				sameAsPassword: sameAs('password')
			}
		}
	},
	methods: {
		// vuetable
		allcap: function(value) {
			return value.toUpperCase();
		},
		genderLabel(value) {
			return value == 'M' ? '<md-chip class="md-primary">Male</md-chip>' : '<md-chip class="md-primary">Female</md-chip>';
		},
		onPaginationData(paginationData) {
			this.$refs.pagination.setPaginationData(paginationData);
			this.$refs.paginationInfo.setPaginationData(paginationData);
		},
		onChangePage(page) {
			this.$refs.vuetable.changePage(page);
		},
		formatNumber(value) {
			return accounting.formatNumber(value, 2);
		},
		doFilter() {
			this.$events.fire('filter-set', this.filterText);
		},
		resetFilter() {
			this.filterText = ''; // clear the text in text input
			this.$events.fire('filter-reset');
		},
		onFilterSet(filterText) {
			this.moreParams = {
				filter: filterText
			};
			Vue.nextTick(() => this.$refs.vuetable.refresh());
		},
		onFilterReset() {
			this.moreParams = {};
			Vue.nextTick(() => this.$refs.vuetable.refresh());
		},

		// other
		newUser() {
			this.showDialog = true;
		},
		searchOnTable() {
			this.searched = searchByName(this.users, this.search);
		},
		// validation only
		getValidationClass(fieldName) {
			const field = this.$v.form[fieldName];

			if (field) {
				return {
					'md-invalid': field.$invalid && field.$dirty
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
			this.form.password = null;
			this.form.repeatPassword = null;
		},
		validateUser() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				this.saveUser();
			}
		},
		saveUser() {
			this.sending = true;
			this.$store
				.dispatch('addAdminUser', {
					userData: this.form
				})
				.then(response => {
					this.userSaved = true;
					this.sending = false;
					this.clearForm();
					this.showDialog = false;
					this.$notify({
						message: response,
						icon: 'add_alert',
						verticalAlign: 'top',
						horizontalAlign: 'right',
						type: 'success'
					});
				})
				.catch(error => {
					this.sending = false;
					this.$notify({
						message: error.data.message + ': ' + error.data.error,
						icon: 'add_alert',
						verticalAlign: 'top',
						horizontalAlign: 'right',
						type: 'danger'
					});
				});
		}
	},
	created() {
		this.searched = this.users;
	},
	mounted() {
		this.$store.dispatch('getAdminUsers');

		// vuetable
		this.$events.$on('filter-set', eventData => this.onFilterSet(eventData));
		this.$events.$on('filter-reset', e => this.onFilterReset());
	},
	computed: {
		users() {
			return this.$store.state.adminUsers;
		}
	},
	components: {
		Vuetable,
		VuetablePagination,
		VuetablePaginationInfo
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
