<template>
    <div class="container">
        <Navigation />
        <div class="content">
            <div class="card">
                <!--
                <div v-if="$route.query.error" class="error">
                    {{ errorMessages[$route.query.error] }}
                </div>
                -->
                <h2>Login to Itinerary</h2>
                <p>If you don't have an account yet, logging in will create one for you!</p>
                <br />
                <button @click="login" class="btn btn-primary btn-full">🐈 Login with Scratch</button>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    export default {
        middleware: 'isAuthenticated',
        head: {
            title: 'Login | Itinerary'
        },
        data() {
            return {
                username: '',
                errorMessages: [
                    'Failed FluffyScratch auth! Keep in mind that the login system currently does not support New Scratchers.',
                    "Our servers couldn't communicate with FluffyScratch and/or the Scratch API. Please try again later.",
                    'You are banned from Itinerary! You can still continue to use the website logged out.'
                ]
            };
        },
        mounted() {
            if (this.$route.query.error) {
                this.$notifications.notify({ content: { message: this.errorMessages[this.$route.query.error] }, type: 'error' });
            }
        },
        methods: {
            async login() {
                window.location.href = `${process.env.backendURL}/auth/begin?user=${this.username}`;
            }
        }
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