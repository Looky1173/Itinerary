export default ({ store }, inject) => {
    let notifications = {
        async notify(notification) {
            return await store.dispatch('notifications/pushNotification', notification);
        },
        async removeNotification(id) {
            console.log(`The notification with the id "${id}" was removed!`);
            await store.dispatch('notifications/removeNotification', id);
            return true;
        }
    };
    inject('notifications', notifications);
};