<template>
    <div class="modal">
        <div class="content">
            <div class="user-details">
                <img :src="`${backendURL}/api/user/${user.name}/picture`" width="50" height="50" class="pfp" />
                <h2>Editing user "{{ user.name }}"</h2>
            </div>
            <br />
            <div class="card dark">
                <input type="checkbox" id="is-banned" class="checkbox dark" v-model="isBanned" />
                <label for="is-banned" class="input-label checkbox">Banned</label>
                <br />
                <input type="checkbox" id="is-admin" class="checkbox dark" v-model="isAdmin" />
                <label for="is-admin" class="input-label checkbox">Admin</label>
            </div>

            <br />
            <br />
            <div class="buttons">
                <button @click="updateUser()" :disabled="isUpdateButtonDisabled" class="btn btn-primary btn-full" style="margin-right: 10px">
                    {{ isUpdateButtonDisabled ? (wasUpdateSuccess ? 'Successfully updated user!' : 'Working...') : 'Update' }}
                </button>
                <button @click="$emit('close')" class="btn">Close</button>
            </div>
            <br />
            <button v-if="!editingOwnProfile" @click="deleteUser()" :disabled="isDeleteButtonDisabled" class="btn btn-full btn-danger">Delete user and destroy their data</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isBanned: this.user.banned,
                isAdmin: this.user.admin,
                isUpdateButtonDisabled: false,
                isDeleteButtonDisabled: false,
                wasUpdateSuccess: false,
                editingOwnProfile: this.user.name == this.$auth.user().name,
                editingOwnProfileWarningId: null,
                backendURL: process.env.backendURL
            };
        },
        props: ['user'],
        methods: {
            async updateUser() {
                // Refresh user details
                await this.$store.dispatch('auth/login', this.$auth.token());
                if (this.$auth.user()) {
                    this.isUpdateButtonDisabled = true;
                    let res = await fetch(`${process.env.backendURL}/api/user/${this.user.name}`, {
                        method: 'PUT',
                        headers: {
                            Authorization: this.$auth.token(),
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            banned: this.isBanned,
                            admin: this.isAdmin
                        })
                    });
                    let data = await res.json();
                    if (data) {
                        console.log(data);
                        if (!data.error) {
                            // Success
                            this.$emit('refresh');
                            this.wasUpdateSuccess = true;
                            setTimeout(() => {
                                this.wasUpdateSuccess = false;
                                this.isUpdateButtonDisabled = false;
                            }, 2000);
                        } else {
                            // Error
                            alert("An error has occured and we couldn't update the requested user! Please check the console for details.");
                            console.warn(data.error);
                            this.isUpdateButtonDisabled = false;
                        }
                    }
                } else {
                    this.$router.push({
                        path: '/login'
                    });
                }
            },
            async deleteUser() {
                if (confirm(`Are you sure you want to delete the user ${this.user.name} and all their data?\n\n⚠ This operation cannot be undone! ⚠`)) {
                    this.isDeleteButtonDisabled = true;
                    let res = await fetch(`${process.env.backendURL}/api/user/${this.user.name}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: this.$auth.token(),
                            'Content-Type': 'application/json'
                        }
                    });
                    let data = await res.json();
                    if (data) {
                        if (!data.error) {
                            // Success
                            this.$emit('refresh');
                            this.$emit('close');
                            this.isDeleteButtonDisabled = false;
                        } else {
                            // Error
                            if (data.error.code !== 'unknown') {
                                alert(data.error.detail);
                            } else {
                                alert("An error has occured and we couldn't delete the requested user! Please check the console for details.");
                            }
                            console.warn(data.error);
                            this.isDeleteButtonDisabled = false;
                        }
                    }
                }
            }
        },
        function() {
            if (this.user.admin) {
                this.isAdmin = true;
            }
        },
        async mounted() {
            if (this.editingOwnProfile) {
                this.editingOwnProfileWarningId = await this.$notifications.notify({
                    content: { message: 'You are editing your own profile; be careful when changing things!' },
                    type: 'warning',
                    timeout: 5000
                });
            }
        },
        destroyed() {
            if (this.editingOwnProfileWarningId) {
                this.$notifications.removeNotification(this.editingOwnProfileWarningId);
            }
        }
    };
</script>

<style scoped>
    .modal {
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .content {
        background-color: var(--modal-background);
        margin: 15% auto;
        padding: 20px;
        width: 80%;
        border-radius: 0.5rem;
        max-width: 50em;
    }

    .pfp {
        border-radius: 5px;
        margin-right: 10px;
    }
    .user-details,
    .buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>