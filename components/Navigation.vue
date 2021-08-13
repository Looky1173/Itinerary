<template>
    <div class="Navigation">
        <div class="wrapper">
            <div class="navigation-general">
                <div class="navigation-group">
                    <NuxtLink to="/" class="navigation-item hoverable link"> Home </NuxtLink>
                    <NuxtLink to="/about" class="navigation-item hoverable link"> About </NuxtLink>
                    <NuxtLink to="/developers" class="navigation-item hoverable link"> Developers </NuxtLink>
                </div>
                <div class="navigation-divider"></div>
                <div class="navigation-item">
                    <a href="https://scratch.mit.edu/users/SuperScratcher_1234/#comments" rel="noopener noreferrer" target="_blank" class="navigation-feedback">
                        <span class="navigation-button outlined" role="button">
                            <div class="button-content">
                                <span>Feedback</span>
                            </div>
                        </span>
                    </a>
                </div>
            </div>
            <div class="navigation-account">
                <div class="account" v-if="isLoggedIn">
                    <div ref="new-stuff-button" class="navigation-item hoverable link">New</div>
                    <NuxtLink to="/dashboard">
                        <div class="navigation-item hoverable link"><img :src="`${backendURL}/api/user/${$auth.user().name}/picture`" class="profile-picture" />{{ $auth.user().name }}</div>
                    </NuxtLink>
                    <div class="navigation-divider"></div>
                    <a @click="logout()" class="navigation-item hoverable link">Logout</a>
                </div>
                <NuxtLink to="/login" class="navigation-item hoverable link" v-else>Login</NuxtLink>
            </div>
        </div>
        <div class="dropdowns">
            <Dropdown :reference="'new-stuff-button'" placement="bottom-end">
                <div v-if="isAdmin">
                    <NuxtLink to="/jams/new" class="dropdown-item hoverable">Scratch Game Jam</NuxtLink>
                    <div class="divider"></div>
                </div>
                <li class="dropdown-item hoverable disabled" title="Projects are under construction and not available yet.">Project</li>
            </Dropdown>
        </div>
    </div>
</template>

<script>
    import Dropdown from './Dropdown.vue';
    export default {
        components: { Dropdown },
        data() {
            return {
                backendURL: process.env.backendURL,
                isLoggedIn: this.$auth.loggedIn(),
                isAdmin: this.$auth.user()?.admin
            };
        },
        methods: {
            async logout() {
                await this.$store.dispatch('auth/logout');
                this.$router.push({
                    path: '/'
                });
                this.$notifications.notify({ content: { message: 'You have been logged out.' }, timeout: 5000 });
            }
        }
    };
</script>

<style scoped>
    .wrapper {
        position: sticky;
        top: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: nowrap;
        box-sizing: border-box;
        height: 3rem;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 0.75rem;
        font-weight: bold;
        background-color: var(--header-background);
        color: white;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 0 3px rgb(0 0 0 / 25%);
        overflow: auto;
        scrollbar-width: none;
        z-index: 10;
    }

    .wrapper::-webkit-scrollbar {
        display: none;
    }

    .dropdowns {
        z-index: 20;
    }

    .navigation-general {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: nowrap;
        align-items: center;
        flex-grow: 1;
    }

    .navigation-account {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .navigation-group {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .navigation-item {
        display: flex;
        padding: 0 0.75rem;
        align-self: center;
        position: relative;
        align-items: center;
        white-space: nowrap;
        height: 3rem;
    }

    .navigation-item.link {
        text-decoration: none;
        color: white;
        user-select: none;
    }

    .navigation-item.hoverable:hover {
        background-color: hsla(0, 0%, 0%, 0.15);
    }

    .navigation-item.hoverable[data-dropdown-open] {
        background-color: hsla(0, 0%, 0%, 0.15);
    }

    .hoverable {
        cursor: pointer;
    }

    .navigation-divider {
        margin: 0 0.5rem;
        height: 34px;
        border-right: 1px dashed rgba(255, 255, 255, 0.5);
    }

    .navigation-feedback {
        text-decoration: none;
    }

    .navigation-button {
        height: 34px;
        cursor: pointer;
        border-radius: calc(0.5rem / 2);
        font-weight: bold;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
    }

    .navigation-button.outlined {
        background-color: white;
    }

    .navigation-button > .button-content {
        white-space: nowrap;
        color: var(--header-background);
    }

    .profile-picture {
        border-radius: 5px;
        width: 24px;
        height: 24px;
        margin-right: 5px;
        aspect-ratio: auto 24 / 24;
    }

    .account {
        display: flex;
        align-items: center;
    }

    .account a {
        text-decoration: none;
    }
</style>