<template>
    <span>
        <NuxtLink v-if="to" :to="to" class="subnav-button"><slot></slot></NuxtLink>
        <button class="subnav-button" v-else><slot></slot></button>
    </span>
</template>

<script>
    export default {
        props: ['to'],
    };
</script>

<style scoped>
    .subnav-button {
        display: inline-block;
        margin: 0.625rem 0.5rem;
        border: 0;
        border-radius: 1.5rem;
        background-color: var(--header-background);
        cursor: pointer;
        padding: 0.5rem 1.5rem;
        color: white;
        font-size: 0.8rem;
        font-weight: bold;
    }
</style>