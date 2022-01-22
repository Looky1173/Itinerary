<template>
    <div>
        <Navigation />
        <div class="content">
            <div class="card">
                <h1>Dashboard - {{ $auth.user().name }}</h1>
                <hr />
                <h2>Danger Zone</h2>
                <br />
                <button @click="deleteUser()" :disabled="isDeleteButtonDisabled" class="btn btn-danger">Delete my account and destroy my data</button>
            </div>
            <div class="card" v-if="$auth.user().admin">
                <h1>Admin tools</h1>
                <NuxtLink to="/dashboard/users" class="users-link">View all users</NuxtLink>
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
                if (confirm(`Are you sure you want to delete your account (${username}) and all your data?\n\n⚠ This operation cannot be undone! ⚠`)) {
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
                                alert(data.error.detail);
                            } else {
                                alert("An error has occurred and we couldn't delete your account! Please check the console for details.");
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