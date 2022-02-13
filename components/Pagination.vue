<template>
    <div class="pagination">
        <button class="btn" :disabled="disablePrev" @click="$emit('previous')">Previous</button>
        <h4>Page {{ page }} of {{ totalPages }}</h4>
        <button class="btn" :disabled="disableNext" @click="$emit('next')">Next</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: ['previousDisabled', 'nextDisabled', 'page', 'totalPages', 'auto'],
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