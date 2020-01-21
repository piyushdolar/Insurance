import moment from "moment";

let options = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("refreshToken")}`
  }
};

// SET LOGIN
export const SET_LOGIN = (state, userData) => {
  state.userLogin = userData.data;
};

// USERS:
export const SET_ADMIN_USERS = (state, users) => {
  for (let i = 0; i < users.data.length; i++) {
    let userAvailable = state.adminUsers.find(user => {
      return user.email === users.data[i].email;
    });
    if (!userAvailable) {
      state.adminUsers.push({
        id: i + 1,
        fullName: users.data[i].firstName + " " + users.data[i].lastName,
        email: users.data[i].email,
        gender: users.data[i].gender,
        createdAt: moment(String(users.data[i].createdAt)).format(
          "DD/MM/YYYY hh:mm A"
        ),
        updatedAt: moment(String(users.data[i].updatedAt)).format(
          "DD/MM/YYYY hh:mm A"
        )
      });
    }
  }
};

// AGENTS:
export const SET_AGENTS = (state, agents) => {
  for (let i = 0; i < agents.data.length; i++) {
    let userAvailable = state.agents.find(agent => {
      return agent.email === agents.data[i].email;
    });
    if (!userAvailable) {
      state.agents.push({
        id: i + 1,
        fullName: agents.data[i].firstName + " " + agents.data[i].lastName,
        email: agents.data[i].email,
        gender: agents.data[i].gender,
        address: agents.data[i].address,
        phone: agents.data[i].phone,
        createdAt: moment(String(agents.data[i].createdAt)).format(
          "DD/MM/YYYY hh:mm A"
        ),
        updatedAt: moment(String(agents.data[i].updatedAt)).format(
          "DD/MM/YYYY hh:mm A"
        )
      });
    }
  }
};
