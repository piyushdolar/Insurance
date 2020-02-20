import moment from 'moment';
import { mapGetters } from 'vuex';

export const Policies = {
	data() {
		return {
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
				searchedList: []
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
					name: '__slot:policyHolder',
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
						return moment(String(value)).format('DD/MM/YYYY');
					}
				},
				{
					name: 'endDate',
					sortField: 'endDate',
					title: 'End Date',
					callback: function (value) {
						return moment(String(value)).format('DD/MM/YYYY');
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
						return moment(String(value)).format('DD/MM/YYYY hh:mm a');
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
						return moment(String(value)).format('DD/MM/YYYY hh:mm a');
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
			this.form.agentSearched.name = selectedSearch.fullName;
		},
		onSelectSingleUser(id) {
			this.showSingleUserDialog = true;
			this.singleUserForm = this.getSingleCustomer(id);
		}
	},
	computed: {
		...mapGetters(['getSingleCustomer'])
	}
};
