<template>
    <div class="pagination">
        <button class="btn" :disabled="!this.loading ? disablePrev : true" @click="$emit('previous')">{{ $t('explore.pagination.previous') }}</button>
        <h4>{{ $t('explore.pagination.pageInfo', { page: page, total: totalPages === null ? '-' : totalPages }) }}</h4>
        <button class="btn" :disabled="!this.loading ? disableNext : true" @click="$emit('next')">{{ $t('explore.pagination.next') }}</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: ['previousDisabled', 'nextDisabled', 'page', 'totalPages', 'auto', 'loading'],
        computed: {
            disablePrev: function () {
                return this.auto ? this.page == 1 : this.previousDisabled;
            },
            disableNext: function () {
                return this.auto ? this.page == this.totalPages : this.nextDisabled;
            },
        },
    };
</script>

<style scoped>
    .pagination {
        display: flex;
        align-items: center;
    }

    .pagination :not(button) {
        margin: 0;
    }

    .pagination button:first-of-type {
        margin-right: 0.5rem;
    }

    .pagination button:last-of-type {
        margin-left: 0.5rem;
    }
</style>