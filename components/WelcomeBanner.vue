<template>
    <div class="WelcomeBanner">
        <div class="flex-row banner-container">
            <div class="flex-row banner-content column">
                <h1 class="banner-header">
                    <span>{{ $t('welcomeBanner.gameJamSlogan') }}</span>
                    <br />
                    <span>{{ $t('welcomeBanner.communitySlogan') }}</span>
                </h1>
                <div class="flex-row banner-buttons">
                    <NuxtLink class="banner-button create-button button" :to="localePath('/explore')">{{ $t('welcomeBanner.start') }}</NuxtLink>
                    <NuxtLink class="banner-button join-button button" :to="localePath('/about')">{{ $t('welcomeBanner.moreInfo') }}</NuxtLink>
                </div>
            </div>
            <div class="flex-row intro-video-container">
                <div class="video-player intro-video"></div>
            </div>
        </div>
        <div class="banner-subnav">
            <div class="subnav-container">
                <NuxtLink :to="localePath('/about')">
                    <div class="subnav-button">{{ $t('footer.aboutTheSite') }}</div>
                </NuxtLink>
                <NuxtLink :to="localePath('/developers')">
                    <div class="subnav-button">{{ $t('footer.forDevelopers') }}</div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
    export default {};
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
        background-color: var(--header-background);
        background-size: 20rem;
        background-repeat: no-repeat;
        background-position: 95%;
        background-image: url('/img/Itinerary.png');
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
        border-radius: 9999px;
        background-color: white;
        color: var(--header-background);
        padding: 1rem 2rem;
        margin-bottom: 10px;
        font-size: 1rem;
        margin-right: 0.75rem;
        font-weight: bold;
        transition: 0.5s;
    }

    .banner-button:hover {
        transform: scale(1.1);
        opacity: 0.8;
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

    a:link,
    a:visited,
    a:active {
        text-decoration: none;
        color: var(--header-background);
    }

    @media only screen and (min-width: 480px) and (max-width: 899px) {
        .banner-container {
            flex-direction: column;
            background-position-x: center;
            background-position-y: 95%;
            background-size: 15rem;
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