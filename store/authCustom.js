export const getters = {
    loggedIn (state) {
        return state.loggedIn
    },
    user (state) {
        return state.user
    },
    permissions (state) {
        return state.user.data.permissions
    },
}
export const mutations = {
    changeUser(state, data) {
        state.user.data = data;
    },
};
