<template>
    <div class="Loading">
        <div class="icon">
            <div class="spinner"></div>
        </div>
        <div class="message">
            <span>{{ message || 'Loading...' }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['message']
    }
</script>

<style scoped>
    .Loading {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 2rem 0;
    }

    .icon {
        font-size: 16px;
        min-width: 1.25rem;
        min-height: 1.25rem;
        display: flex;
        padding-right: 1rem;
    }

    .spinner {
        width: 1.25rem;
        height: 1.25rem;
        display: inline-block;
        position: relative;
        border-radius: 50%;
        border-width: 0.1875rem;
        border-style: solid;
        border-color: var(--background);
        box-sizing: content-box;
    }
    .spinner::before,
    .spinner::after {
        width: 1.25rem;
        height: 1.25rem;
        content: '';
        border-radius: 50%;
        display: block;
        box-sizing: content-box;
    }
    .spinner::after {
        position: absolute;
        top: -0.1875rem;
        left: -0.1875rem;
        border: 0.1875rem solid transparent;
        border-top-color: var(--text);
        animation: spin 1.5s cubic-bezier(0.4, 0.1, 0.4, 1) infinite;
    }
    .spinner.spinner-success {
        border-color: hsla(163, 85%, 40%, 0.35);
    }
    .spinner.spinner-success::after {
        border-top-color: hsla(163, 85%, 40%, 1);
    }

    @keyframes spin {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    .message {
        color: var(--text);
        font-weight: bold;
        font-size: 0.8125rem;
        line-height: 0.875rem;
        display: flex;
        align-items: center;
        padding-right: 0.5rem;
    }
</style>