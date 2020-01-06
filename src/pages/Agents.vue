<template>
	<div class="content">
		<div class="md-layout">
			<!-- dialog with button -->
			<div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
				<md-dialog :md-active.sync="showDialog">
					<md-dialog-title>CREATE NEW AGENT</md-dialog-title>
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
				<md-button class="md-primary pull-right" @click="showDialog = true"> <md-icon>add</md-icon>Add Agent </md-button>
			</div>
			<!-- TABLE LISTING OF AGENTS -->
			<div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
				<md-card>
					<md-card-header data-background-color="green">
						<h4 class="title">Agent's Database</h4>
						<p class="category">Here you can find and see every agents details</p>
					</md-card-header>
					<md-card-content>
						<md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
							<md-table-toolbar>
								<div class="md-toolbar-section-start">
									<h1 class="md-title">Agents</h1>
								</div>

								<md-field md-clearable class="md-toolbar-section-end">
									<md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
								</md-field>
							</md-table-toolbar>

							<md-table-empty-state md-label="No agent found" :md-description="`No agent found for this '${search}' query. Try a different search term or create a new agent.`">
								<md-button class="md-primary md-raised" @click="newUser">Create New User</md-button>
							</md-table-empty-state>

							<md-table-row slot="md-table-row" slot-scope="{ item }">
								<md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
								<md-table-cell md-label="Full Name" md-sort-by="fullName">{{ item.fullName }}</md-table-cell>
								<md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>

								<md-table-cell md-label="Gender" md-sort-by="gender" v-if="item.gender == 'Male'">
									<md-chip class="md-primary">Male</md-chip>
								</md-table-cell>
								<md-table-cell md-label="Gender" md-sort-by="gender" v-if="item.gender == 'FeMale'">
									<md-chip class="md-info">Male</md-chip>
								</md-table-cell>

								<md-table-cell md-label="Phone" md-sort-by="phone">{{ item.phone }}</md-table-cell>
								<md-table-cell md-label="Address" md-sort-by="address">{{ item.address }}</md-table-cell>
							</md-table-row>
						</md-table>
					</md-card-content>
				</md-card>
			</div>

			<!-- DataTable -->
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
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators';
import axios from 'axios';
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
			address: null
		},
		userSaved: false,
		sending: false,
		lastUser: null,
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
			}
		}
	},
	methods: {
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
		// Other
		newUser() {
			window.alert('Noop');
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
		},
		saveUser() {
			this.sending = true;
			this.form.userId = this.$session.get('userProfile').userId;
			this.$store
				.dispatch('addAgent', {
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
		},
		validateUser() {
			this.$v.$touch();
			if (!this.$v.$invalid) {
				this.saveUser();
			}
		}
		/* async fetchAllAgents() {
			let data = await axios.get(`http://jsonplaceholder.typicode.com/users`);
			for (let i = 0; i < data.data.length; i++) {
				this.users.push({
					id: data.data[i].id,
					fullName: data.data[i].name,
					email: data.data[i].email,
					gender: 'Male',
					phone: data.data[i].phone,
					address: data.data[i].address.street + ',' + data.data[i].address.city
				});
			}
		} */
	},
	created() {
		this.searched = this.users;
		// this.fetchAllAgents();
	},
	mounted() {
		this.$events.$on('filter-set', eventData => this.onFilterSet(eventData));
		this.$events.$on('filter-reset', e => this.onFilterReset());
		this.$store.dispatch('getAgents');
	},
	computed: {
		users() {
			return this.$store.state.agents;
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
.vuetable-pagination-info {
	float: left;
	padding: 1rem;
}
.ui.right.floated.menu {
	margin: 0.5rem;
}
</style>
