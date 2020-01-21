import axios from "../Api/config";
import moment from "moment";
axios.defaults.headers.common.Authorization = `Bearer ${window.localStorage.getItem(
  "refreshToken"
)}`;
/* let options = {
	headers: {
		Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
	}
}; */

// LOGINS:
export const checkLogin = ({ commit }, { userData }) => {
  return axios
    .post(`/users/login`, {
      email: userData.email,
      password: userData.password
    })
    .then(response => {
      localStorage.setItem("refreshToken", response.headers.token);
      commit("SET_LOGIN", response.data);
      return response.data;
    })
    .catch(error => {
      throw error.response.data.error;
    });
};

// USERS:
// Get all admin user
export const getAdminUsers = ({ commit }) => {
  axios
    .get("/users")
    .then(response => {
      localStorage.setItem("refreshToken", response.headers.token);
      axios.defaults.headers.common.Authorization = `Bearer ${response.headers.token}`;
      commit("SET_ADMIN_USERS", response.data.data);
    })
    .catch(error => {
      console.log("Error-vuex-actions: ", error);
    });
};
// Create admin user
export const addAdminUser = ({ commit }, { userData }) => {
  let rowData = {
    firstName: userData.fname,
    lastName: userData.lname,
    gender: userData.gender,
    email: userData.email,
    phone: userData.phone,
    password: userData.repeatPassword,
    userType: 2
  };
  return axios({
    method: "post",
    url: "users",
    data: rowData
  })
    .then(response => {
      return "User has been added.";
    })
    .catch(error => {
      throw error.response;
    });
};

// AGENTS:
// Get all agents
export const getAgents = ({ commit }) => {
  axios
    .get("/agents")
    .then(response => {
      commit("SET_AGENTS", response.data);
    })
    .catch(error => {
      console.log("Error-vuex-actions: ", error);
    });
};

// create agent
export const addAgent = ({ commit }, { userData }) => {
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
    method: "post",
    url: "agents",
    data: rowData
  })
    .then(response => {
      return "User has been added.";
    })
    .catch(error => {
      throw error.response;
    });
};
