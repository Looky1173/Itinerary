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
        <div class="banner-subnav">
            <div class="subnav-container">
                <NuxtLink to="/about">
                    <div class="subnav-button">About Itinerary</div>
                </NuxtLink>
                <NuxtLink to="/developers">
                    <div class="subnav-button">For Developers</div>
                </NuxtLink>
            </div>
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
        background-image: url(~assets/img/banner-illustration.svg);
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
        margin-bottom: 10px;
        font-size: 1rem;
        margin-right: 0.75rem;
        font-weight: bold;
    }

    .banner-subnav {
        display: flex;
        background-color: var(--primary-color-very-light);
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

    @media only screen and (min-width: 480px) and (max-width: 899px) {
        .banner-container {
            flex-direction: column;
            background-position-x: calc(50% - 5vw);
            background-position-y: 250%;
            background-size: 30rem;
            background-image: url(~assets/img/banner-illustration.svg);
        }
        .banner-content {
            align-items: center;
            min-height: 8rem;
            margin: 0;
            flex: none;
        }
        .banner-header {
            margin-top: 1.75rem;
            font-size: 1.5rem;
        }
    }
    @media only screen and (max-width: 767px) {
        .banner-buttons,
        .banner-subnav {
            flex-direction: row;
        }
    }

    @media only screen and (max-width: 479px) {
        .banner-container {
            background-image: none;
        }
        .banner-content.column {
            margin: auto 5%;
            align-items: center;
            text-align: center;
            justify-content: center;
        }
        .banner-header {
            font-size: 1.5rem;
        }
    }
</style>