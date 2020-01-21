import axios from "../../api/config";
// axios.defaults.headers.common.Authorization = `Bearer ${window.localStorage.getItem('refreshToken')}`;

const state = {
  userLogin: null,
  token: null
};

const actions = {
  checkLogin: ({ commit }, { userData }) => {
    return axios
      .post(`/users/login`, {
        email: userData.email,
        password: userData.password
      })
      .then(response => {
        commit("SET_LOGIN", response);
        return response.data;
      })
      .catch(error => {
        throw error.response.data.error;
      });
  }
};

const mutations = {
  SET_LOGIN: (state, userData) => {
    state.token = userData.headers.token;
    window.localStorage.setItem("refreshToken", state.token);
    state.userLogin = userData.data.data;
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
};
