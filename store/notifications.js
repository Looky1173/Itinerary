export const state = () => ({
    notifications: []
});

export const getters = {
    allNotifications: state => state.notifications
};

export const mutations = {
    PUSH_NOTIFICATION(state, notification) {
        state.notifications.push(notification);
    },
    REMOVE_NOTIFICATION(state, notificationToRemove) {
        state.notifications = [
            ...state.notifications.filter(notification => notification.id != notificationToRemove)
        ];
    }
};

export const actions = {
    async pushNotification({ commit }, notification) {
        return new Promise((resolve, reject) => {
            if (!notification) {
                return reject('No notification object passed.');
            }
            if (!notification.content) {
                return reject('Missing notification content');
            }
            if (!notification.type) {
                notification.type = 'default';
            }
            if (notification.isCloseable == undefined) {
                notification.isCloseable = true;
            }
            notification = {
                ...notification,
                id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
            };
            commit('PUSH_NOTIFICATION', notification);
            resolve(notification.id);
        });
    },
    async removeNotification({ commit }, id) {
        return new Promise((resolve, reject) => {
            commit('REMOVE_NOTIFICATION', id);
            resolve();
        });
    }
};