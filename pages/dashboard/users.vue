<template>
    <div class="container">
        <Navigation />
        <UsersEditorModal v-if="showUsersEditorModal" @close="showUsersEditorModal = false" @refresh="refresh()" :user="user" />
        <div class="content">
            <div class="card">
                <div class="users-header">
                    <h1>{{ $t('dashboard.userList') }}</h1>
                    <button @click="refresh()" class="btn">{{ $t('dashboard.refreshUsers') }}</button>
                </div>
                <br />
                <client-only>
                    <Loading :message="$t('loaders.loadingUsers')" v-if="$fetchState.pending" />
                    <vue-good-table
                        v-if="!$fetchState.pending"
                        :columns="columns"
                        :rows="rows"
                        :pagination-options="{
                            enabled: true,
                        }"
                        :search-options="{
                            enabled: true,
                        }"
                        @on-row-click="onRowClick"
                        :theme="$colorMode.value == 'dark' ? 'nocturnal' : 'polar-bear'"
                    />
                </client-only>
            </div>
            <div class="card">
                <h1>{{ $t('dashboard.addUserTitle') }}</h1>
                <p>{{ $t('dashboard.addUserExplanation') }}</p>
                <br />
                <label for="username" class="input-label">{{ $t('dashboard.addUserUsername') }}</label>
                <input
                    type="text"
                    id="username"
                    class="input"
                    autocapitalize="off"
                    autocomplete="off"
                    autocorrect="off"
                    :placeholder="$t('dashboard.addUserUsername')"
                    spellcheck="false"
                    v-model="username"
                />
                <button @click="createUser()" class="btn btn-full" :disabled="isCreateButtonDisabled">{{ $t('dashboard.addUserAction') }}</button>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    export default {
        middleware: 'isAdmin',
        head: {
            title: 'User list | Itinerary',
        },
        data() {
            return {
                columns: [
                    {
                        label: this.$t('dashboard.internalID'),
                        field: '_id',
                    },
                    {
                        label: this.$t('dashboard.addUserUsername'),
                        field: 'name',
                    },
                    {
                        label: this.$t('dashboard.isAdmin'),
                        field: 'admin',
                        type: 'boolean',
                    },
                    {
                        label: this.$t('dashboard.isBanned'),
                        field: 'banned',
                        type: 'boolean',
                    },
                    {
                        label: this.$t('meta.updatedAt'),
                        field: 'meta.updated',
                    },
                    {
                        label: this.$t('meta.updatedBy'),
                        field: 'meta.updatedBy',
                    },
                ],
                rows: [],
                showUsersEditorModal: false,
                user: {
                    name: null,
                    banned: null,
                    admin: null,
                },
                username: null,
                isCreateButtonDisabled: false,
            };
        },
        methods: {
            refresh() {
                this.$fetch();
            },
            onRowClick(params) {
                console.log(params.row);
                this.user.name = params.row.name;
                this.user.banned = params.row.banned;
                this.user.admin = params.row.admin;
                this.showUsersEditorModal = true;
            },
            async createUser() {
                if (!this.username) {
                    this.$notifications.notify({ type: 'error', content: { message: this.$t('notifications.dashboard.missingUsername') } });
                    return;
                }
                // Refresh user details
                await this.$store.dispatch('auth/login', this.$auth.token());
                if (this.$auth.user()) {
                    this.isCreateButtonDisabled = true;
                    let res = await fetch(`${process.env.backendURL}/api/user/${this.username}`, {
                        method: 'PUT',
                        headers: {
                            Authorization: this.$auth.token(),
                            'Content-Type': 'application/json',
                        },
                    });
                    let data = await res.json();
                    if (data) {
                        console.log(data);
                        if (!data.error) {
                            // Success
                            this.refresh();
                            this.isCreateButtonDisabled = false;
                            this.username = '';
                        } else {
                            // Error
                            if (data.error.code !== 'unknown') {
                                this.$notifications.notify({ type: 'error', content: { message: data.error.detail } });
                            } else {
                                this.$notifications.notify({ type: 'error', content: { message: this.$t('notifications.dashboard.couldNotCreateUser') } });
                            }
                            console.warn(data.error);
                            this.isCreateButtonDisabled = false;
                        }
                    }
                } else {
                    this.$router.push({
                        path: '/login',
                    });
                }
            },
        },
        async fetch() {
            let res = await fetch(`${process.env.backendURL}/api/users`, {
                method: 'GET',
                headers: {
                    Authorization: this.$auth.token(),
                },
            });
            let data = await res.json();
            console.log(data);
            data.forEach(function (item, index) {
                item.meta.updated = new Date(item.meta.updated).toLocaleString();
            });
            this.rows = data;
        },
        fetchOnServer: false,
    };
</script>

<style scoped>
    .users-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>