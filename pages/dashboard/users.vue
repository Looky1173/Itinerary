<template>
    <div class="container">
        <Navigation />
        <UsersEditorModal v-if="showUsersEditorModal" @close="showUsersEditorModal = false" @refresh="refresh()" :user="user" />
        <div class="content">
            <div class="card">
                <div class="users-header">
                    <h1>User list</h1>
                    <button @click="refresh()" class="btn">Refresh</button>
                </div>
                <br />
                <client-only>
                    <Loading message="Fetching all users..." v-if="$fetchState.pending" />
                    <vue-good-table
                        v-if="!$fetchState.pending"
                        :columns="columns"
                        :rows="rows"
                        :pagination-options="{
                            enabled: true
                        }"
                        :search-options="{
                            enabled: true
                        }"
                        @on-row-click="onRowClick"
                        :theme="$colorMode.value == 'dark' ? 'nocturnal' : 'polar-bear'"
                    />
                </client-only>
            </div>
            <div class="card">
                <h1>Add user</h1>
                <p>If the user entered below isn't registered on Itinerary, an account will be created for them.</p>
                <br />
                <label for="username" class="input-label">Username</label>
                <input type="text" id="username" class="input" autocapitalize="off" autocomplete="off" autocorrect="off" placeholder="Username" spellcheck="false" v-model="username" />
                <button @click="createUser()" class="btn btn-full" :disabled="isCreateButtonDisabled">Create user</button>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    export default {
        middleware: 'isAdmin',
        head: {
            title: 'User list | Itinerary'
        },
        data() {
            return {
                columns: [
                    {
                        label: 'Internal ID',
                        field: '_id'
                    },
                    {
                        label: 'Name',
                        field: 'name'
                    },
                    {
                        label: 'Is admin?',
                        field: 'admin',
                        type: 'boolean'
                    },
                    {
                        label: 'Is banned?',
                        field: 'banned',
                        type: 'boolean'
                    },
                    {
                        label: 'Updated at',
                        field: 'meta.updated'
                    },
                    {
                        label: 'Updated by',
                        field: 'meta.updatedBy'
                    }
                ],
                rows: [],
                showUsersEditorModal: false,
                user: {
                    name: null,
                    banned: null,
                    admin: null
                },
                username: null,
                isCreateButtonDisabled: false
            }
        },
        methods: {
            refresh() {
                this.$fetch()
            },
            onRowClick(params) {
                console.log(params.row)
                this.user.name = params.row.name
                this.user.banned = params.row.banned
                this.user.admin = params.row.admin
                this.showUsersEditorModal = true
            },
            async createUser() {
                if (!this.username) {
                    alert('You must enter a username!')
                    return
                }
                // Refresh user details
                await this.$store.dispatch('auth/login', this.$auth.token())
                if (this.$auth.user()) {
                    this.isCreateButtonDisabled = true
                    let res = await fetch(`${process.env.backendURL}/api/user/${this.username}`, {
                        method: 'PUT',
                        headers: {
                            Authorization: this.$auth.token(),
                            'Content-Type': 'application/json'
                        }
                    })
                    let data = await res.json()
                    if (data) {
                        console.log(data)
                        if (!data.error) {
                            // Success
                            this.refresh()
                            this.isCreateButtonDisabled = false
                            this.username = ''
                        } else {
                            // Error
                            if (data.error.code !== 'unknown') {
                                alert(data.error.detail)
                            } else {
                                alert("An error has occured and we couldn't create the requested user! Please check the console for details.")
                            }
                            console.warn(data.error)
                            this.isCreateButtonDisabled = false
                        }
                    }
                } else {
                    this.$router.push({
                        path: '/login'
                    })
                }
            }
        },
        async fetch() {
            let res = await fetch(`${process.env.backendURL}/api/users`, {
                method: 'GET',
                headers: {
                    Authorization: this.$auth.token()
                }
            })
            let data = await res.json()
            console.log(data)
            data.forEach(function (item, index) {
                item.meta.updated = new Date(item.meta.updated).toLocaleString()
            })
            this.rows = data
        },
        fetchOnServer: false
    }
</script>

<style scoped>
    .users-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>