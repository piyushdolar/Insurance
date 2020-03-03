import Vue from 'vue';
import Vuetable from 'vuetable-2/src/components/Vuetable';
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination';
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo';
import VueEvents from 'vue-events';
import moment from 'moment';

Vue.use(VueEvents);

export const VuetableMixin = {
	data() {
		return {
			accessToken: 'Bearer ' + localStorage.getItem('refreshToken'),
			filterText: '',
			filterDate: '',
			defaultDate: moment(new Date()).format('YYYY/MM/DD'),
			filterItem: {
				searchText: '',
				searchDate: null,
				startDate: this.defaultDate,
				endDate: this.defaultDate
			},
			moreParams: {},
			perPage: 10
		};
	},
	methods: {
		// Events
		handleLoadError(response) {
			this.$notify({
				message: response,
				icon: 'add_alert',
				verticalAlign: 'top',
				horizontalAlign: 'right',
				type: 'danger'
			});
		},
		handleDateChange(date) {
			this.filterItem.searchDate = moment(date[0]._d).format('YYYY/MM/DD') + '|' + moment(date[1]._d).format('YYYY/MM/DD');
		},
		onPaginationData(paginationData) {
			this.$refs.pagination.setPaginationData(paginationData);
			this.$refs.paginationInfo.setPaginationData(paginationData);
		},
		onChangePage(page) {
			this.$refs.vuetable.changePage(page);
		},
		// Filter set
		doFilter() {
			this.$events.fire('filter-set', this.filterItem);
		},
		onFilterSet(filter) {
			this.moreParams = {
				filter: filter.searchText.trim(),
				filter_date: filter.searchDate
			};
			Vue.nextTick(() => this.$refs.vuetable.refresh());
		},
		// Filter reset
		resetFilter() {
			this.filterItem.searchText = '';
			this.filterItem.searchDate = '';
			this.filterItem.startDate = this.defaultDate;
			this.filterItem.endDate = this.defaultDate;
			// this.$events.fire('filter-reset');
			// this.$router.go();
			// this.$router.go(this.$router.currentRoute);
			var location = this.$route.fullPath;
			this.$router.replace('/');
			this.$nextTick(() => this.$router.replace(location));
		},
		onFilterReset() {
			this.moreParams = {};
			Vue.nextTick(() => this.$refs.vuetable.refresh());
		},
		downloadCSV(api) {
			this.$store.dispatch('downloadCSV', api);
		}
	},
	mounted() {
		this.$events.$on('filter-set', eventData => this.onFilterSet(eventData));
		this.$events.$on('filter-reset', e => this.onFilterReset());
	},
	watch: {
		perPage(val, oldVal) {
			this.$nextTick(function () {
				this.$refs.vuetable.refresh();
			});
		}
	},
	components: {
		Vuetable,
		VuetablePagination,
		VuetablePaginationInfo
	}
};
