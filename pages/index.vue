<template>
    <div class="container">
        <Navigation />
        <WelcomeBanner />
        <div class="content">
            <div class="card">
                <h2>Game jams</h2>
                <Loading v-if="loadingJams" message="Fetching game jams..." />
                <hooper v-if="!loadingJams" :trimWhiteSpace="true" :settings="hooperSettings" class="carousel">
                    <slide v-for="(jam, index) in jams" :key="jam.slug"><GameJam :data="jam" :class="{ first: index === 0, last: jams.length - 1 === index }" /></slide>

                    <hooper-navigation slot="hooper-addons" class="navigation-handles"></hooper-navigation>
                </hooper>
            </div>
            <div class="card">
                <p>
                    <strong>Welcome to Itinerary!</strong>
                </p>
                <br />
                <p>
                    You can follow and contribute to the development of Itinerary at the official <a href="https://github.com/Looky1173/Itinerary">Itinerary</a> and
                    <a href="https://github.com/Looky1173/Itinerary-Server">Itinerary-Server</a> GitHub repositories.
                </p>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';
    import 'hooper/dist/hooper.css';
    export default {
        data() {
            return {
                loadingJams: true,
                jams: null,
                hooperSettings: {
                    itemsToShow: 1,
                    breakpoints: {
                        800: {
                            itemsToShow: 2,
                        },
                        1200: {
                            itemsToShow: 3,
                        },
                        1600: {
                            itemsToShow: 4,
                        },
                    },
                },
            };
        },
        components: {
            Hooper,
            Slide,
            HooperNavigation,
        },
        methods: {
            async fetchJams() {
                let response = await fetch(`${process.env.backendURL}/api/jams/`, {
                    method: 'GET',
                    headers: {
                        Authorization: this.$auth.token(),
                        'Content-Type': 'application/json',
                    },
                });
                response = await response.json();

                this.jams = response;

                this.loadingJams = false;
            },
        },
        mounted() {
            this.fetchJams();
        },
    };
</script>

<style scoped>
    .navigation-handles >>> .hooper-next,
    .navigation-handles >>> .hooper-prev {
        fill: white;
        background-color: var(--header-background);
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    .navigation-handles >>> .hooper-next.is-disabled,
    .navigation-handles >>> .hooper-prev.is-disabled {
        opacity: 0.7;
    }

    .carousel >>> .hooper-next {
        right: -65px;
    }

    .carousel >>> .hooper-prev {
        left: -65px;
    }

    @media only screen and (max-width: 30em) {
        .carousel >>> .hooper-next {
            right: -20px;
            top: 20px;
            transform: scale(0.9);
        }

        .carousel >>> .hooper-prev {
            left: -20px;
            top: 20px;
            transform: scale(0.9);
        }
    }

    .carousel {
        height: 350px;
    }
</style>
