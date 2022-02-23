<template>
    <div class="card dark">
        <div class="manager-content">
            <img :src="`${backendURL}/api/user/${manager.name}/picture`" class="profile-picture" />
            <h3>{{ manager.name }}</h3>
            <button class="btn more-options" ref="more-options">
                <span class="btn-icon">
                    <Icon name="vertical-dots" />
                </span>
            </button>
        </div>
        <div class="dropdowns">
            <Dropdown :reference="'more-options'" placement="right" :options="{ modifiers: [{ name: 'offset', options: { offset: [0, 10] } }] }" class="rounded">
                <li @click="viewOnScratch()" class="dropdown-item hoverable">{{ $t('gameJam.managers.viewUserOnScratch') }}</li>
                <div v-if="!ownUser" class="divider"></div>
                <li v-if="!ownUser" @click="$emit('remove-manager', manager.name)" class="dropdown-item hoverable danger">{{ $t('gameJam.managers.removeManager') }}</li>
            </Dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                backendURL: process.env.backendURL,
                ownUser: this.$auth?.user()?.name == this.manager.name,
            };
        },
        props: ['manager'],
        methods: {
            viewOnScratch() {
                window.open(`https://scratch.mit.edu/users/${this.manager.name}`, '_blank').focus();
            },
        },
        async mounted() {},
    };
</script>

<style scoped>
    .manager-content {
        display: flex;
        align-items: center;
    }

    h3 {
        margin: 0;
    }

    .profile-picture {
        border-radius: 10px;
        width: 40px;
        height: 40px;
        background-color: var(--card-background);
        margin-right: 10px;
    }

    .more-options {
        margin-left: auto;
    }

    .more-options[data-dropdown-open] {
        opacity: 0.9;
    }
</style>