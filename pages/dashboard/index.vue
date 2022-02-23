<template>
    <div class="container">
        <Navigation />
        <div class="content">
            <div class="card">
                <h1>{{ $t('dashboard.title') }} - {{ $auth.user().name }}</h1>
                <hr />
                <h2>{{ $t('dashboard.dangerTitle') }}</h2>
                <br />
                <button @click="deleteUser()" :disabled="isDeleteButtonDisabled" class="btn btn-danger">{{ $t('dashboard.deleteOwnAccount') }}</button>
            </div>
            <div class="card" v-if="$auth.user().admin">
                <h1>{{ $t('dashboard.adminTitle') }}</h1>
                <NuxtLink :to="localePath('/dashboard/users/')" class="users-link">{{ $t('dashboard.viewAllUsers') }}</NuxtLink>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    export default {
        middleware: 'isNotAuthenticated',
        data() {
            return {
                isDeleteButtonDisabled: false,
            };
        },
        methods: {
            async deleteUser() {
                let username = this.$auth.user().name;
                if (confirm(this.$t('dashboard.deleteOwnAccountConfirmation', { name: username }))) {
                    this.isDeleteButtonDisabled = true;
                    let res = await fetch(`${process.env.backendURL}/api/user/${username}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: this.$auth.token(),
                            'Content-Type': 'application/json',
                        },
                    });
                    let data = await res.json();
                    if (data) {
                        if (!data.error) {
                            // Success
                            await this.$store.dispatch('auth/clearLoggedInState');
                            this.$router.push({
                                path: '/',
                            });
                        } else {
                            // Error
                            if (data.error.code !== 'unknown') {
                                this.$notifications.notify({ type: 'error', content: { message: data.error.detail } });
                            } else {
                                this.$notifications.notify({ type: 'error', content: { message: this.$t('notifications.dashboard.couldNotDeleteOwnAccount') } });
                            }
                            console.warn(data.error);
                            this.isDeleteButtonDisabled = false;
                        }
                    }
                }
            },
        },
    };
</script>

<style scoped>
    .users-link {
        font-size: 1rem;
        font-weight: 500;
    }
</style>