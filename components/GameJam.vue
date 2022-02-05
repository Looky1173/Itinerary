<template>
    <NuxtLink :to="'/jams/' + data.slug">
        <div class="card dark">
            <div class="cover-image" :style="{ backgroundImage: `url(${data.content.headerImage || backgroundImage})` }">
                <div class="blur">
                    <h3>{{ data.name }}</h3>
                </div>
            </div>
            <div class="info">
                <p class="description">
                    {{ data.content.description }}
                </p>
                <hr />
                <div class="dates">
                    <h4 class="jam-status">{{ jamStatus }}</h4>
                    <Countdown class="countdown" :date="countdown" v-if="countdown" @on-finish="calculateDates()" />
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<script>
    export default {
        data() {
            return {
                backgroundImage: null,
                images: ['/img/backgrounds/blue-watercolour.jpg', '/img/backgrounds/green-watercolour.jpg', '/img/backgrounds/red-watercolour.jpg', '/img/backgrounds/yellow-watercolour.jpg', '/img/backgrounds/pyramids_huge.png'],
                jamStatus: null,
                countdown: null,
                jamStart: this.data?.dates?.start,
                jamEnd: this.data?.dates?.end,
            };
        },
        props: ['data'],
        methods: {
            getBackgroundImage(images) {
                this.backgroundImage = images[Math.floor(Math.random() * images.length)];
            },
            calculateDates() {
                let today = new Date().toISOString();

                if ((this.jamStart && new Date(this.jamStart).toISOString()) > today) {
                    this.jamStatus = 'Starting in';
                    this.countdown = new Date(this.jamStart);
                } else if ((this.jamStart && new Date(this.jamStart).toISOString()) <= today && today < (this.jamEnd && new Date(this.jamEnd).toISOString())) {
                    this.jamStatus = 'Ending in';
                    this.countdown = new Date(this.jamEnd);
                    this.enableSubmissions = true;
                } else {
                    this.jamStatus = 'Ended';
                    this.countdown = null;
                }
            },
        },
        mounted() {
            this.getBackgroundImage(this.images);
            this.calculateDates();
        },
    };
</script>

<style scoped>
    .card {
        height: 100%;
        margin: 0 10px;
        padding: 0;
        overflow: hidden;
    }

    .first .card {
        margin-left: 0;
    }

    .last .card {
        margin-right: 0;
    }

    .cover-image {
        position: relative;
        width: 100%;
        background-size: cover;
        background-attachment: fixed;
        display: flex;
        justify-content: left;
        align-items: flex-end;
        height: 200px;
    }

    .blur {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 1rem;
        backdrop-filter: blur(12px);
        padding: 10px 20px;
        margin: 10px;
        max-width: 80%;
    }

    h3 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        font-size: 1.2rem;
        color: rgb(28, 28, 28);
    }

    .description {
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        height: 50px;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        color: var(--text);
    }

    .dark-mode h3 {
        color: white;
    }

    .dark-mode .blur {
        background-color: rgba(0, 0, 0, 0.3);
    }

    .info {
        padding: 20px;
    }

    .dates {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .jam-status {
        color: var(--text);
        font-size: 1.2em;
        margin-right: 10px;
    }

    .countdown {
        color: var(--text);
    }

    .countdown >>> .countdown-digit {
        font-size: 1rem;
    }

    .countdown >>> .countdown-block {
        padding: 0 5px;
    }

    .countdown >>> .countdown-text {
        font-size: 0.7em;
    }

    .countdown >>> .countdown-digit {
        font-size: 1.8em;
    }
</style>
