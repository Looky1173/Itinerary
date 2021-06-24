<template>
    <div class="WelcomeBanner">
        <div class="flex-row banner-container">
            <div class="flex-row banner-content column">
                <h1 class="banner-header">
                    <span>Supercharge your Scratch Workflow</span>
                    <br />
                    <span>Dive deep into the world of code</span>
                </h1>
                <div class="flex-row banner-buttons">
                    <NuxtLink class="banner-button create-button button" to="/create">Get started</NuxtLink>
                    <NuxtLink class="banner-button join-button button" to="#">Learn more</NuxtLink>
                </div>
            </div>
            <div class="flex-row intro-video-container">
                <div class="video-player intro-video"></div>
            </div>
        </div>
        <div class="flex-row banner-subnav">
            <NuxtLink to="/about">
                <div class="subnav-button">About Itinerary</div>
            </NuxtLink>
            <NuxtLink to="/developers">
                <div class="subnav-button">For Developers</div>
            </NuxtLink>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>
    .WelcomeBanner {
        width: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        padding: 0;
        justify-content: space-between;
        background-color: white;
        margin-bottom: 40px;
        background-position: center;
        background-size: cover;
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
        min-height: 24rem;
        justify-content: space-between;
        background-color: var(--primary-color);
        background-size: auto;
        background-repeat: no-repeat;
        background-position: right;
        /*background-image: url(~assets/img/fire-extinguisher.svg);*/
    }

    .banner-content {
        flex: 1;
        align-items: flex-start;
        margin-left: 5%;
        min-height: 20rem;
    }

    .banner-header {
        margin-bottom: 0.75rem;
        font-size: 2rem;
        color: white;
    }

    .banner-button {
        border-radius: 4px;
        background-color: white;
        color: var(--primary-color);
        padding: 0.625rem 0.75rem;
        font-size: 1rem;
        margin-right: 0.75rem;
        font-weight: bold;
    }

    .banner-subnav {
        justify-content: center;
        background-color: var(--primary-color-very-light);
    }

    .subnav-button {
        display: inline-block;
        margin: 0.625rem 0.5rem;
        border: 0;
        border-radius: 1.5rem;
        background-color: var(--primary-color);
        cursor: pointer;
        padding: 0.5rem 1.5rem;
        color: white;
        font-size: 0.8rem;
        font-weight: bold;
    }

    a:link,
    a:visited,
    a:active {
        text-decoration: none;
        color: var(--primary-color);
    }
</style>