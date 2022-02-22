<template>
    <div :class="`notification ${notification.type} ${closing ? 'closing' : ''}`">
        <Loading v-if="notification.content.loading" type="notification" />
        <div class="message">{{ notification.content.message }}</div>
        <span v-if="notification.isCloseable" @click="close()" class="close">{{ $t('global.close') }}</span>
    </div>
</template>

<script>
    export default {
        props: ['notification'],
        data() {
            return {
                closing: false,
            };
        },
        methods: {
            close() {
                this.closing = true;
                setTimeout(() => {
                    this.$notifications.removeNotification(this.notification.id);
                }, 500);
            },
        },
        created() {
            if (!this.notification.disableTimeout) {
                setTimeout(() => {
                    this.close();
                }, this.notification.timeout || 5000);
            }
        },
    };
</script>

<style scoped>
    .notification {
        width: 100%;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        justify-content: flex-start;
        border-radius: 0.5rem;
        padding-top: 0.875rem;
        padding-bottom: 0.875rem;
        padding-left: 1rem;
        padding-right: 1rem;
        margin-bottom: 7px;
        min-height: 1.5rem;
        pointer-events: all;
        border: 1px solid rgba(0, 0, 0, 30%);
    }

    .message {
        display: flex;
        align-items: center;
        font-weight: 600;
    }

    .default {
        background: var(--notification-background);
        box-shadow: 0px 0px 0px 2px var(--notification-background);
        color: var(--notification-text);
    }

    .success {
        background: var(--notification-success-background);
        box-shadow: 0px 0px 0px 2px var(--notification-success-background);
        color: var(--notification-success-text);
    }

    .warning {
        background: var(--notification-warning-background);
        box-shadow: 0px 0px 0px 2px var(--notification-warning-background);
        color: var(--notification-warning-text);
    }

    .error {
        background: var(--notification-error-background);
        box-shadow: 0px 0px 0px 2px var(--notification-error-background);
        color: var(--notification-error-text);
    }

    .close {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex: 1;
        margin-left: 1rem;
        font-weight: 500;
    }

    .default .close {
        color: var(--notification-close-text);
    }

    .success .close {
        color: var(--notification-success-close-text);
    }

    .warning .close {
        color: var(--notification-warning-close-text);
    }

    .error .close {
        color: var(--notification-error-close-text);
    }

    .closing {
        opacity: 0;
        transition: opacity 0.5s ease-out;
    }
</style>