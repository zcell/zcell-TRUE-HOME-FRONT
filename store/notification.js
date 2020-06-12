export const state = () => ({
    notification: {
        save: 'Сохранено',
        error: 'Error',
        send: 'Отправлено',
        active: {
            status: false,
            name: '',
            text: ''
        },
    }
});

export const mutations = {
    changeNotification(state, obj) {
        state.notification.active.status = true;
        state.notification.active.text = obj.text;
        state.notification.active.name = obj.name;

    },
    defaultNotification(state) {
        state.notification.active.status = false;
        state.notification.active.name = '';
        state.notification.active.text = '';

    }
};

export const getters = {
    getNotification(state) {
        return state.notification;
    },

};