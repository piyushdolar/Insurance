import moment from 'moment';
import { mapGetters } from 'vuex';

export const PoliciesMixin = {
	data() {
		return {
			showDialog: false,
			showHistoryModal: false,
			sending: false,
			fireEvent: null,
			sortOrder: [
				{
					field: 'id',
					sortField: 'id',
					direction: 'desc'
				}
			],
			showSingleCustomerDialog: false,
			singleCustomerForm: {
				name: null,
				gender: null,
				address: null,
				phone: null,
				email: null,
				status: null,
				createdAt: null
			},
			defaultImage: '/images/avatars/default.png',
			form: {
				policyName: null,
				policyType: null,
				startDate: null,
				endDate: null,
				customerSearched: {
					id: null,
					name: null
				},
				agentSearched: {
					id: null,
					name: null
				},
				sumInsured: null,
				currencyType: null,
				policyNumber: null,
				status: null,
				searchedList: [],
				comment: '-',
				startDateConfig: date => {
					if (this.form.endDate != null && date > this.form.endDate) {
						return true;
					}
				},
				endDateConfig: date => {
					if (this.form.startDate != null && this.form.startDate > date) {
						return true;
					}
				},
				vehicleType: null,
				make: null,
				plateNumber: null,
				vehicleColor: null,
				powerInCC: null,
				engineNumber: null,
				chassisNumber: null,
				grossWeightInTon: null,
				seats: null,
				picture: null,
				picturePreview: null
			},
			formModal: {
				title: 'CREATE NEW POLICY FOR CUSTOMER',
				btn: 'CREATE',
				isEdit: false
			},
			historyModalTitle: null,
			fields: [
				{
					name: '__slot:picture',
					title: 'Image'
				},
				{
					name: 'policyNumber',
					title: 'Policy Number'
				},
				{
					name: 'policyName',
					sortField: 'policyName',
					title: 'Policy Name',
					callback: value => {
						return value == null ? '-' : value;
					}
				},
				{
					name: '__slot:customer',
					sortField: 'firstName',
					title: 'Customer Name'
				},
				{
					name: 'sumInsured',
					sortField: 'sumInsured',
					title: 'Sum Insured',
					callback: value => {
						return value == null ? '-' : value;
					}
				},
				{
					name: 'currencyType',
					sortField: 'currencyType',
					title: 'Currency Type',
					callback: value => {
						return value == null ? '-' : value;
					}
				},
				{
					name: '__slot:contract',
					sortField: 'renew',
					title: 'Contract'
				},
				{
					name: 'startDate',
					sortField: 'startDate',
					title: 'Start Date',
					callback: function(value) {
						return value ? moment(String(value)).format('MM/DD/YYYY') : '-';
					}
				},
				{
					name: 'endDate',
					sortField: 'endDate',
					title: 'End Date',
					callback: function(value) {
						return value ? moment(String(value)).format('MM/DD/YYYY') : '-';
					}
				},
				{
					name: '__slot:policyType',
					sortField: 'policyType',
					title: 'Policy Type'
				},
				{
					name: 'agent',
					sortField: 'agent.id',
					title: 'Agent Name',
					callback: function(value) {
						return value.id ? value.fullName : '<i>Not Assigned</i>';
					}
				},
				{
					name: '__slot:status',
					sortField: 'status',
					title: 'Approve Status'
				},
				{
					name: 'createdAt',
					sortField: 'createdAt',
					title: 'Created Date',
					callback: function(value) {
						return moment(String(value)).format('MM/DD/YYYY hh:mm a');
					}
				},
				{
					name: 'createdBy',
					sortField: 'createdBy.id',
					title: 'Created By',
					callback: value => {
						return value.id == null ? '-' : value.name;
					}
				},
				{
					name: 'updatedAt',
					sortField: 'updatedAt',
					title: 'Updated Date',
					callback: function(value) {
						return moment(String(value)).format('MM/DD/YYYY hh:mm a');
					}
				},
				{
					name: 'updatedBy',
					sortField: 'updatedBy.id',
					title: 'Updated By',
					callback: value => {
						return value.id == null ? '-' : value.name;
					}
				},
				{
					name: '__slot:actions',
					title: 'Actions'
				}
			]
		};
	},
	methods: {
		checkAuthorization(rule) {
			return this.$checkAuth(rule);
		},
		onFileSelected() {
			this.form.picture = event.target.files[0];
			this.form.picturePreview = URL.createObjectURL(this.form.picture);
		},
		// md select over...
		onAction(action, data, index) {
			if (action == 'edit') {
				this.form.id = data.id;
				this.form.policyName = data.policyName;
				this.form.policyType = data.policyType;
				this.form.policyNumber = data.policyNumber;
				this.form.customerSearched.id = data.customer.id;
				this.form.customerSearched.name = data.customer.fullName;
				this.form.agentSearched.id = data.agent.id;
				this.form.agentSearched.name = data.agent.fullName;
				this.form.currencyType = data.currencyType;
				this.form.sumInsured = data.sumInsured;
				this.form.comment = data.comment;
				this.form.startDate = data.startDate ? new Date(data.startDate) : null;
				this.form.endDate = data.endDate ? new Date(data.endDate) : null;
				this.form.status = data.status;
				if (data.picture != null) {
					this.form.imagePreview = `/images/avatars/${data.picture}`;
				}
				this.form.vehicleType = data.vehicleType;
				this.form.make = data.make;
				this.form.plateNumber = data.plateNumber;
				this.form.vehicleColor = data.vehicleColor;
				this.form.powerInCC = data.powerInCC;
				this.form.engineNumber = data.engineNumber;
				this.form.chassisNumber = data.chassisNumber;
				this.form.grossWeightInTon = data.grossWeightInTon;
				this.form.seats = data.seats;

				this.formModal.title = 'EDIT POLICY';
				this.formModal.btn = 'UPDATE';
				this.formModal.isEdit = true;
				this.showDialog = true;
			} else if (action == 'delete') {
				if (confirm('Are you sure?')) {
					this.$store
						.dispatch('deletePolicy', {
							policyId: data.id
						})
						.then(response => {
							this.$alert('success', response);
							this.onFilterReset();
						})
						.catch(error => {
							this.$alert('danger', error);
						});
				}
			} else if (action == 'history') {
				this.showHistoryModal = true;
				this.historyModalTitle = data.updatedBy.name;
				this.$store.dispatch('getPolicyHistory', data.id);
			}
		},
		// validation only
		getValidationClass(fieldName) {
			const field = this.formModal.isEdit ? (fieldName == 'picture' ? null : this.$v.form[fieldName]) : this.$v.form[fieldName];
			if (field) {
				return {
					'md-invalid': field.$invalid && field.$dirty
				};
			}
		},
		openDialog() {
			this.showDialog = true;
			this.formModal.btn = 'CREATE';
			this.formModal.isEdit = false;
			this.clearForm();
		},
		clearForm() {
			this.$v.$reset();
			this.form.policyName = null;
			this.form.policyType = null;
			this.form.policyNumber = null;
			this.form.customerSearched.name = null;
			this.form.agentSearched.name = null;
			this.form.startDate = null;
			this.form.endDate = null;
			this.form.comment = '-';
			this.form.sumInsured = null;
			this.form.currencyType = null;
			this.form.status = null;

			this.form.make = null;
			this.form.vehicleType = null;
			this.form.plateNumber = null;
			this.form.vehicleColor = null;
			this.form.powerInCC = null;
			this.form.engineNumber = null;
			this.form.chassisNumber = null;
			this.form.grossWeightInTon = null;
			this.form.seats = null;
			this.form.picture = null;
			this.form.picturePreview = null;
		},
		validateUser(e) {
			this.$v.$touch();
			if (this.formModal.isEdit) {
				if (
					!this.$v.form.policyName.$invalid &&
					!this.$v.form.policyType.$invalid &&
					!this.$v.form.policyNumber.$invalid &&
					!this.$v.form.startDate.$invalid &&
					!this.$v.form.endDate.$invalid &&
					!this.$v.form.sumInsured.$invalid &&
					!this.$v.form.comment.$invalid &&
					!this.$v.form.currencyType.$invalid
				) {
					this.saveUser('edit');
				}
			} else {
				if (!this.$v.form.$invalid) {
					this.saveUser('add');
				}
			}
		},
		async saveUser(type) {
			this.sending = true;
			this.form.sessionId = this.$session.get('userProfile').id;
			if (type == 'add') {
				await this.$store
					.dispatch('createPolicyByAdmin', this.form)
					.then(response => {
						this.$alert('success', response);
						this.showDialog = false;
						this.clearForm();
						this.onFilterReset();
					})
					.catch(error => {
						this.$alert('danger', error);
					});
			} else if (type == 'edit') {
				await this.$store
					.dispatch('editPolicy', this.form)
					.then(response => {
						this.$alert('success', response);
						this.showDialog = false;
						this.onFilterReset();
						this.clearForm();
					})
					.catch(error => {
						this.$alert('danger', error);
					});
			}
			this.sending = false;
		},
		// md select
		getCustomers(searchTerm) {
			this.form.searchedList = new Promise(resolve => {
				if (!searchTerm) {
					resolve(this.customersList);
				} else {
					const term = searchTerm.toLowerCase();
					resolve(this.customersList.filter(({ name }) => name.toLowerCase().includes(term)));
				}
			});
		},
		onSelectCustomer(selectedSearch) {
			this.form.customerSearched.id = selectedSearch.id;
			this.form.customerSearched.name = selectedSearch.name;
		},
		getAgents(searchTerm) {
			this.form.searchedList = new Promise(resolve => {
				if (!searchTerm) {
					resolve(this.agentsList);
				} else {
					const term = searchTerm.toLowerCase();
					resolve(this.agentsList.filter(({ name }) => name.toLowerCase().includes(term)));
				}
			});
		},
		onSelectAgent(selectedSearch) {
			this.form.agentSearched.id = selectedSearch.id;
			this.form.agentSearched.name = selectedSearch.name;
		},
		onSelectSingleCustomer(id) {
			this.showSingleCustomerDialog = true;
			this.singleCustomerForm = this.getSingleCustomer(id);
		}
	},
	computed: {
		...mapGetters({
			customersList: 'getCustomers',
			agentsList: 'getUsers',
			getSingleCustomer: 'getSingleCustomer',
			getPolicyHistory: 'getPolicyHistory'
		})
	},
	mounted() {
		this.$store.dispatch('getUsers', { user_type: 3, searchWord: '' });
		this.$store.dispatch('getCustomers', '');
	}
};
