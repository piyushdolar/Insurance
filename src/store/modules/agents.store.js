import axios from '../../api/config';

axios.defaults.headers.common.Authorization = `Bearer ${window.localStorage.getItem('refreshToken')}`;

const state = {
	agents: []
};

const actions = {
	getAgents: ({ commit }) => {
		axios
			.get('/agents')
			.then(response => {
				commit('SET_AGENTS', response.data);
			})
			.catch(error => {
				console.log('Error-vuex-actions: ', error);
			});
	},

	addAgent: ({ commit }, { userData }) => {
		let rowData = {
			firstName: userData.fname,
			lastName: userData.lname,
			gender: userData.gender,
			address: userData.address,
			phone: userData.phone,
			email: userData.email,
			createdBy: userData.userId,
			status: 2
		};
		return axios({
			method: 'post',
			url: 'agents',
			data: rowData
		})
			.then(response => {
				return 'User has been added.';
			})
			.catch(error => {
				throw error.response;
			});
	}
};

const mutations = {
	SET_AGENTS: (state, agents) => {
		for (let i = 0; i < agents.data.length; i++) {
			let userAvailable = state.agents.find(agent => {
				return agent.email === agents.data[i].email;
			});
			if (!userAvailable) {
				state.agents.push({
					id: i + 1,
					fullName: agents.data[i].firstName + ' ' + agents.data[i].lastName,
					email: agents.data[i].email,
					gender: agents.data[i].gender,
					address: agents.data[i].address,
					phone: agents.data[i].phone,
					createdAt: moment(String(agents.data[i].createdAt)).format('DD/MM/YYYY hh:mm A'),
					updatedAt: moment(String(agents.data[i].updatedAt)).format('DD/MM/YYYY hh:mm A')
				});
			}
		}
	}
};

const getters = {};

export default {
	state,
	mutations,
	actions,
	getters
};
