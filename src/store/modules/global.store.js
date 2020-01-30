import axios from '../../api/config';

const state = {};

const actions = {
	downloadCSV({ commit }, apiUrlEndpoint) {
		axios.get('/' + apiUrlEndpoint + '/csv').then(response => {
			let blob = new Blob([response.data], { type: 'application/csv' });
			let link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = apiUrlEndpoint + '.csv';
			link.click();
		});
	}
};

const mutations = {};

const getters = {};

export default {
	state,
	mutations,
	actions,
	getters
};
