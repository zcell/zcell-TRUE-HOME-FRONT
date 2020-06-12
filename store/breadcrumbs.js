export const state = () => ({
   breadcrumbs: null
});

export const mutations = {
    changeBreadcrumbs(state, breadcrumbs) {
        state.breadcrumbs = breadcrumbs;
    },
};

export const getters = {
    getBreadcrumbs(state) {
        return state.breadcrumbs;
    },

};