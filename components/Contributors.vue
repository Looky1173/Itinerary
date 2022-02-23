<template>
    <div>
        <Loading v-if="$fetchState.pending" :message="$t('loaders.loadingContributors')" />
        <div v-else-if="!$fetchState.pending && !$fetchState.error" class="contributors-container">
            <Contributor v-for="(contributor, index) of contributors" :key="index" :contributor="contributor" />
        </div>
        <h3 v-else-if="$fetchState.error" id="contributors-error">{{ $t('credits.couldNotGetContributors') }}</h3>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                contributors: [],
            };
        },
        async fetch() {
            this.contributors = await fetch('https://raw.githubusercontent.com/Looky1173/Itinerary-Contributors/main/.all-contributorsrc').then((res) => res.json());
            this.contributors = this.contributors.contributors;
        },
        fetchOnServer: false,
    };
</script>

<style scoped>
    .contributors-container {
        width: 100%;
        display: grid;
        grid-gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }

    #contributors-error {
        color: var(--notification-error-background);
    }
</style>