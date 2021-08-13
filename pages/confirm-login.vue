<template>
    <div class="container">
        <Navigation />
        <div class="content">
            <div class="card">
                <div class="login-details">
                    <img :src="`${backendURL}/api/user/${name}/picture`" width="50" height="50" class="confirm-pfp" />
                    <h2>Login as {{ name }}</h2>
                </div>
                <br />
                <p>Logging in will grant you access to more features.</p>
                <br />
                <div class="buttons">
                    <button @click="confirm" :disabled="disabled" class="btn btn-primary btn-full" style="margin-right: 10px">Confirm</button>
                    <button @click="deny" :disabled="disabled" class="btn">Deny</button>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    import cookies from 'js-cookie';
    export default {
        middleware: 'isAuthenticated',
        head: {
            title: 'Confirm login | Itinerary'
        },
        data() {
            return {
                disabled: false,
                name: '',
                token: '',
                oneTimeToken: this.$route.query.token,
                backendURL: process.env.backendURL
            };
        },
        methods: {
            disableButtons() {
                this.disabled = true;
            },
            async confirm() {
                this.disableButtons();
                cookies.set('itinerary-token', this.token, { expires: new Date(253402300000000) });
                await this.$store.dispatch('auth/login', this.token);
                this.$router.push({
                    path: '/'
                });
            },
            async deny() {
                this.disableButtons();
                let res = await fetch(`${process.env.backendURL}/auth/remove/?token=${this.token}`, {
                    method: 'POST'
                });
                let data = await res.json();
                console.log(data);
                if (data.error) {
                    console.warn(data.error);
                } else {
                    this.$router.push({
                        path: '/'
                    });
                }
            }
        },
        async asyncData({ route, redirect, error }) {
            let res = await fetch(`${process.env.backendURL}/auth/info/?token=${route.query.token}`);
            let data = await res.json();
            if (data.error) {
                error(`error: ${data.error}`);
            } else {
                return { name: data.name, token: data.token };
            }
        }
    };
</script>

<style scoped>
    .confirm-pfp {
        border-radius: 5px;
        margin-right: 10px;
    }

    .login-details,
    .buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>