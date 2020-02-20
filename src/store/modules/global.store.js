import axios from '../../api/config';

const state = {
	location: {
		province: [],
		district: []
	}
};

const actions = {
	downloadCSV({ commit }, apiUrlEndpoint) {
		axios.get('/' + apiUrlEndpoint + '/csv').then(response => {
			let blob = new Blob([response.data], { type: 'application/csv' });
			let link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = apiUrlEndpoint + '.csv';
			link.click();
		});
	},
	getLocation({ commit }, parent) {
		axios.get('/locations', {
			params: {
				parent: parent
			}
		}).then(response => {
			commit('SET_LOCATION', response.data.data);
		})
	}
};

const mutations = {
	SET_LOCATION(state, payload) {
		if (payload[0].parent == 0) {
			state.location.province = payload;
		} else {
			state.location.district = payload;
		}
	}
};

const getters = {
	getLocationProvince(state) {
		return state.location.province;
	},
	getLocationDistrict(state) {
		return state.location.district;
	}
};

export default {
	state,
	mutations,
	actions,
	getters
};
