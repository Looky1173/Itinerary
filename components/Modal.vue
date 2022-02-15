<template>
    <div class="modal">
        <Transition name="fade">
            <div v-if="isOpen" @click="clickOnOverlay()" class="modal-overlay"></div>
        </Transition>
        <Transition name="bounce">
            <div v-if="isOpen" class="modal-content" tabindex="-1" role="dialog">
                <div v-if="!hideCloseIcon" @click="$emit('close')" class="modal-content-close">
                    <img alt="Close icon" class="modal-content-close-img" draggable="false" src="/img/close.svg" />
                </div>
                <div class="modal-header modal-title">
                    <slot name="header"></slot>
                </div>
                <div v-if="!hideSubHeader" class="modal-sub-header">
                    <slot name="sub-header"></slot>
                </div>
                <div class="modal-inner-content">
                    <slot></slot>
                </div>
                <div v-if="!hideActions" class="modal-actions">
                    <slot name="actions"></slot>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //isOpen: false,
                isSmallDevice: false,
                eventKeyupHandler: null
            };
        },

        props: {
            isOpen: {
                type: Boolean,
                default: false
            },
            closeByClickOnOverlay: {
                type: Boolean,
                default: true
            },
            hideCloseIcon: {
                type: Boolean,
                default: false
            },
            hideSubHeader: {
                type: Boolean,
                default: false
            },
            hideActions: {
                type: Boolean,
                default: false
            }
        },

        methods: {
            clickOnOverlay() {
                this.closeByClickOnOverlay && this.$emit('close');
            }
        }
    };
</script>

<style scoped>
    .modal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 500;
        pointer-events: none;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.4);
        pointer-events: all;
    }

    .modal-content {
        position: relative;
        margin: 3.75rem auto;
        border-radius: 1rem;
        box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.15);
        background-color: var(--background);
        color: var(--text);
        padding: 0;
        width: 48.75rem;
        pointer-events: all;
    }

    .modal-content:focus {
        outline: none;
    }

    @media only screen and (max-width: 941px) {
        .modal-content {
            margin-top: 0;
            width: 100%;
            overflow: auto;
        }
    }

    @media only screen and (max-width: 479px), only screen and (max-height: 479px) {
        .modal-content {
            border-radius: 0;
            box-shadow: none;
            height: 100%;
        }
    }

    .modal-content-close {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        border-radius: 1rem;
        background-color: rgba(0, 0, 0, 0.2);
        cursor: pointer;
        width: 2rem;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        transition: linear 0.2s;
    }

    .modal-content-close:hover {
        transform: scale(1.2);
        opacity: 0.9;
    }

    .modal-content-close img {
        padding-top: 0.5rem;
    }

    .modal-header {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 3rem;
        box-shadow: inset 0 -1px 0 0 #4280d7;
        background-color: var(--header-background);
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
    }

    .modal-title {
        color: white;
        font-size: 1rem;
        font-weight: bold;
    }

    .modal-sub-header {
        padding: 6px 12px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        width: unset;
    }

    .modal-inner-content {
        box-sizing: border-box;
        display: flex;
        border-radius: 0;
        flex-direction: column;
        background-color: var(--card-background);
        max-height: 70vh;
        overflow: auto;
    }

    .modal-actions {
        display: flex;
        justify-content: flex-end;
        padding: 6px 12px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    /* Transitions */
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.7s;
    }

    .fade-enter,
    .fade-leave-to {
        transition-delay: 0.4s;
        opacity: 0;
    }

    .bounce-enter-active {
        animation: bounce-in 0.5s;
    }

    .bounce-leave-active {
        animation: bounce-in 0.5s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
