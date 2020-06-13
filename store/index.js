export const state = () => ({

});

export const mutations = {
  changeUser(state, data) {
      state.auth.user.data = data;
  },
};

export const actions = {

    async nuxtServerInit(context, route) {

    }
};

export const getters = {
  loggedIn (state) {
    return state.auth.loggedIn
  },
  user (state) {
    return state.auth.user.data
  },
};
