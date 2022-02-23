<template>
    <div class="container">
        <Navigation />
        <div class="content">
            <div class="card">
                <h2>{{ $t('auth.logInTitle') }}</h2>
                <p>{{ $t('auth.logInInfo') }}</p>
                <br />
                <button @click="login" class="btn btn-primary btn-full">{{ $t('auth.logIn') }}</button>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    export default {
        middleware: 'isAuthenticated',
        head: {
            title: 'Login | Itinerary',
        },
        data() {
            return {
                username: '',
                errorMessageLocaleKeys: ['failedAuth', 'serverError', 'banned'],
            };
        },
        mounted() {
            if (this.$route.query.error) {
                this.$notifications.notify({ content: { message: this.$t(`notifications.auth.${this.errorMessageLocaleKeys[this.$route.query.error]}`) }, type: 'error' });
            }
        },
        methods: {
            async login() {
                window.location.href = `${process.env.backendURL}/auth/begin?user=${this.username}`;
            },
        },
    };
</script>

<style scoped>
    .error {
        padding: 15px;
        background-color: var(--button-danger-background);
        color: var(--button-danger-text);
        margin-bottom: 10px;
    }
</style>