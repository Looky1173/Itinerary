<template>
    <div class="notifications">
        <div class="notification-bounds">
            <Notification v-for="notification in notifications" :key="notification.id" :notification="notification" :style="notification.type"></Notification>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            // Thank you Konstantin (https://stackoverflow.com/a/68726319/14226941)
            notifications() {
                return this.$store.getters['notifications/allNotifications'];
            }
        },
        methods: {
            test() {
                this.$notifications.notify({ content: 'Test' });
            }
        }
    };
</script>

<style scoped>
    .notifications {
        display: flex;
        justify-content: center;
        width: 100%;
        z-index: 600;
        position: absolute;
        margin-top: 53px;
        pointer-events: none;
    }

    .notification-bounds {
        min-width: 200px;
        max-width: 600px;
    }
</style>