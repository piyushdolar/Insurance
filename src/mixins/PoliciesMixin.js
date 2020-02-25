import moment from 'moment';
import { mapGetters } from 'vuex';

export const PoliciesMixin = {
	data() {
		return {
			showDialog: false,
			sending: false,
			fireEvent: null,
			sortOrder: [
				{
					field: "id",
					sortField: "id",
					direction: "desc"
				}
			],
			showSingleUserDialog: false,
			singleUserForm: {
				name: null,
				gender: null,
				address: null,
				phone: null,
				email: null,
				status: null,
				createdAt: null
			},
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
				status: false,
				searchedList: [],
				comment: '-',
				startDateConfig: (date) => {
					if (this.form.endDate != null && date > this.form.endDate) {
						return true;
					}
				},
				endDateConfig: (date) => {
					if (this.form.startDate != null && this.form.startDate > date) {
						return true;
					}
				}
			},
			formModal: {
				title: 'CREATE NEW POLICY FOR POLICY HOLDER',
				btn: 'CREATE',
				isEdit: false
			},
			fields: [
				{
					name: 'policyNumber',
					title: 'Policy Number'
				},
				{
					name: 'policyName',
					sortField: 'policyName',
					title: 'Policy Name'
				},
				{
					name: '__slot:customer',
					sortField: 'firstName',
					title: 'Customer Name'
				},
				{
					name: 'sumInsured',
					sortField: 'sumInsured',
					title: 'Sum Insured'
				},
				{
					name: 'currencyType',
					sortField: 'currencyType',
					title: 'Currency Type'
				},
				{
					name: 'renew',
					sortField: 'renew',
					title: 'Contract',
					callback: function (value) {
						if (value != null) {
							return "Renewed";
						} else {
							return "New";
						}
					}
				},
				{
					name: 'startDate',
					sortField: 'startDate',
					title: 'Start Date',
					callback: function (value) {
						return moment(String(value)).format('MM/DD/YYYY');
					}
				},
				{
					name: 'endDate',
					sortField: 'endDate',
					title: 'End Date',
					callback: function (value) {
						return moment(String(value)).format('MM/DD/YYYY');
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
					callback: function (value) {
						return value.fullName;
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
					callback: function (value) {
						return moment(String(value)).format('MM/DD/YYYY hh:mm a');
					}
				},
				{
					name: 'createdBy',
					sortField: 'createdBy.id',
					title: 'Created By',
					callback: function (value) {
						return value.name;
					}
				},
				{
					name: 'updatedAt',
					sortField: 'updatedAt',
					title: 'Updated Date',
					callback: function (value) {
						return moment(String(value)).format('MM/DD/YYYY hh:mm a');
					}
				},
				{
					name: 'updatedBy',
					sortField: 'updatedBy.id',
					title: 'Updated By',
					callback: function (value) {
						return value.name;
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
		// md select over...
		onAction(action, data, index) {
			if (action == "edit") {
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
				this.form.startDate = new Date(data.startDate);
				this.form.endDate = new Date(data.endDate);
				this.form.status = data.status == 1 ? false : true;
				this.formModal.title = "EDIT POLICY";
				this.formModal.btn = "UPDATE";
				this.formModal.isEdit = true;
				this.showDialog = true;
			} else if (action == "delete") {
				if (confirm("Are you sure?")) {
					this.$store
						.dispatch("deletePolicy", {
							policyId: data.id
						})
						.then(response => {
							this.$alert("success", response);
							this.onFilterReset();
						})
						.catch(error => {
							this.$alert("danger", error);
						});
				}
			}
		},
		// validation only
		getValidationClass(fieldName) {
			const field = this.$v.form[fieldName];
			if (field) {
				return {
					"md-invalid": field.$invalid && field.$dirty
				};
			}
		},
		openDialog() {
			this.showDialog = true;
			this.formModal.btn = "CREATE";
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
			this.form.status = false;
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
					this.saveUser("edit");
				}
			} else {
				if (!this.$v.form.$invalid) {
					this.saveUser("add");
				}
			}
		},
		async saveUser(type) {
			this.sending = true;
			this.form.sessionId = this.$session.get("userProfile").id;
			if (type == "add") {
				await this.$store
					.dispatch("addPolicy", this.form)
					.then(response => {
						this.$alert("success", response);
						this.showDialog = false;
						this.clearForm();
						this.onFilterReset();
					})
					.catch(error => {
						this.$alert("danger", error);
					});
			} else if (type == "edit") {
				await this.$store
					.dispatch("editPolicy", this.form)
					.then(response => {
						this.$alert("success", response);
						this.showDialog = false;
						this.onFilterReset();
						this.clearForm();
					})
					.catch(error => {
						this.$alert("danger", error);
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
		onSelectSingleUser(id) {
			this.showSingleUserDialog = true;
			this.singleUserForm = this.getSingleCustomer(id);
		}
	},
	computed: {
		...mapGetters({
			customersList: "getCustomers",
			agentsList: "getUsers",
			getSingleCustomer: "getSingleCustomer"
		})
	},
	mounted() {
		this.$store.dispatch("getUsers", { user_type: 3, searchWord: "" });
		this.$store.dispatch("getCustomers", "");
	}
};
