<template>
    <div class="banner">
        <div class="flex-row banner-container">
            <div class="flex-row banner-content column">
                <slot></slot>
            </div>
        </div>
        <div class="banner-subnav">
            <div class="subnav-container">
                <slot name="subnav"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {};
</script>

<style scoped>
    .banner {
        width: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        padding: 0;
        justify-content: space-between;
    }

    .flex-row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
    }

    .flex-row.column {
        flex-direction: column;
    }

    .banner-container {
        min-height: 5rem;
        background-color: var(--header-background);
        color: white;
    }

    .banner-subnav {
        display: flex;
        background-color: var(--header-light-background);
        overflow: auto;
        scrollbar-width: none;
        white-space: nowrap;
        flex-wrap: nowrap;
    }

    .banner-subnav::-webkit-scrollbar {
        display: none;
    }

    .subnav-container {
        display: flex;
        margin-left: auto;
        margin-right: auto;
    }
</style>