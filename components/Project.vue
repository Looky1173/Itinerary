<template>
    <div :class="`card dark ${isWinner || isCommunityWinner ? 'winner' : ''} ${isCommunityWinner ? 'community-winner' : ''}`">
        <div class="winner-outline"></div>
        <div v-if="isWinner || isCommunityWinner" class="winner-badge">{{ isWinner ? 'Winner' : 'Selected by the community' }}</div>
        <div class="project-content">
            <div class="cover-image" :style="{ backgroundImage: `url(https://uploads.scratch.mit.edu/get_image/project/${data.project}_9000x7200.png)` }">
                <button @click="handleUpvote()" :disabled="disableUpvoting" :class="`btn upvote ${upvoted ? 'upvoted' : ''}`">
                    {{ upvoted ? 'Upvoted' : 'Upvote' }} <span class="pill" style="margin-left: 5px">{{ upvotes }}</span>
                </button>
                <div class="blur">
                    <h3>{{ data.title }}</h3>
                </div>
            </div>
            <div class="info">
                <img :src="`${backendURL}/api/user/${data.username}/picture`" class="profile-picture" />
                <h4 class="jam-status">{{ data.username || data.meta.submittedBy }}</h4>
                <button class="btn more-options" ref="more-options">
                    <span class="btn-icon">
                        <Icon name="vertical-dots" />
                    </span>
                </button>
            </div>
        </div>
        <div class="dropdowns">
            <Dropdown :reference="'more-options'" placement="right" :options="{ modifiers: [{ name: 'offset', options: { offset: [0, 10] } }] }" class="rounded">
                <li @click="selectAsWinner()" v-if="isLoggedIn && canBeMadeWinner" class="dropdown-item hoverable">Select as winner</li>
                <li @click="viewOnScratch()" class="dropdown-item hoverable">View project on Scratch</li>
                <div v-if="hasRightsToProject" class="divider"></div>
                <li @click="removeSubmission()" v-if="hasRightsToProject" class="dropdown-item hoverable danger">Remove submission</li>
                <li @click="revokeWinnerStatus()" v-if="(isAdmin || isManager) && isWinner" class="dropdown-item hoverable danger">Revoke winner status</li>
            </Dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                backgroundImage: null,
                images: ['/img/backgrounds/blue-watercolour.jpg', '/img/backgrounds/green-watercolour.jpg', '/img/backgrounds/red-watercolour.jpg', '/img/backgrounds/yellow-watercolour.jpg'],
                backendURL: process.env.backendURL,
                hasRightsToProject: this.$auth?.user()?.name != null ? this.data.username === this.$auth?.user()?.name || this.$auth?.user()?.admin || this.isManager : false,
                disableUpvoting: true,
                upvotes: 0,
                upvoted: false,
                canBeMadeWinner: false,
                isWinner: this.data.selected || false,
                isCommunityWinner: this.data.selectedByTheCommunity || false,
                isLoggedIn: this.$auth.loggedIn(),
                isAdmin:this.$auth.user()?.admin,
            };
        },
        props: ['data', 'jamEnd', 'isManager'],
        methods: {
            getBackgroundImage(images) {
                this.backgroundImage = images[Math.floor(Math.random() * images.length)];
            },
            viewOnScratch() {
                window.open(`https://scratch.mit.edu/projects/${this.data.project}`, '_blank').focus();
            },
            handleUpvote() {
                if (!this.isLoggedIn) {
                    this.$notifications.notify({ type: 'error', content: { message: 'Please log in to upvote projects!' } });
                    return;
                }
                this.upvoted ? this.removeUpvote() : this.castUpvote();
            },
            async removeSubmission() {
                if (
                    confirm(
                        `Are you sure you want to remove your submission "${this.data.title}"? The number of upvotes will be reset for this project to 0 as well!\n\n⚠ This operation cannot be undone! ⚠`,
                    )
                ) {
                    let loadingNotification = await this.$notifications.notify({ content: { message: 'Removing your submission...', loading: true }, disableTimeout: true, isCloseable: false });

                    let res = await fetch(`${process.env.backendURL}/api/jams/${this.data.jam}/projects/${this.data.project}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: this.$auth.token(),
                            'Content-Type': 'application/json',
                        },
                    });
                    res = await res.json();
                    this.$notifications.removeNotification(loadingNotification);

                    if (res.ok) {
                        this.$notifications.notify({ type: 'success', content: { message: 'Your project was removed from this game jam!' } });
                        this.$emit('refresh-projects');
                        this.$emit('vote-cast');
                    } else {
                        this.$notifications.notify({ type: 'error', content: { message: "Your project couldn't be removed from this game jam!" } });
                    }
                }
            },
            async getUpvotes() {
                this.disableUpvoting = true;
                let headers = { 'Content-Type': 'application/json' };
                if (this.isLoggedIn) {
                    headers = { ...headers, Authorization: this.$auth.token() };
                }

                let response = await fetch(`${process.env.backendURL}/api/jams/${this.data.jam}/upvotes/${this.data.project}`, {
                    method: 'GET',
                    headers: headers,
                });
                response = await response.json();
                console.log(response);
                this.upvotes = response.count;
                this.upvoted = response.upvoted;
                this.disableUpvoting = false;
            },
            async castUpvote() {
                this.disableUpvoting = true;
                let response = await fetch(`${process.env.backendURL}/api/jams/${this.data.jam}/upvotes/${this.data.project}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: this.$auth.token(),
                        'Content-Type': 'application/json',
                    },
                });
                response = await response.json();
                if (response.error) {
                    this.disableUpvoting = false;
                    return this.$notifications.notify({ type: 'error', content: { message: response.error.detail }, timeout: 15000 });
                }

                this.getUpvotes();
                this.$emit('vote-cast');
            },
            async removeUpvote() {
                this.disableUpvoting = true;
                let response = await fetch(`${process.env.backendURL}/api/jams/${this.data.jam}/upvotes/${this.data.project}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: this.$auth.token(),
                        'Content-Type': 'application/json',
                    },
                });
                response = await response.json();
                if (response.error) {
                    this.disableUpvoting = false;
                    return this.$notifications.notify({ type: 'error', content: { message: response.error.detail }, timeout: 15000 });
                }

                this.getUpvotes();
                this.$emit('vote-cast');
            },
            async selectAsWinner() {
                let loadingNotification = await this.$notifications.notify({ content: { message: 'Selecting as winner...', loading: true }, disableTimeout: true, isCloseable: false });

                let response = await fetch(`${process.env.backendURL}/api/jams/${this.data.jam}/winners/`, {
                    method: 'PUT',
                    headers: {
                        Authorization: this.$auth.token(),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        project: this.data.project,
                    }),
                });
                response = await response.json();
                this.$notifications.removeNotification(loadingNotification);
                if (response.ok) {
                    this.$notifications.notify({ type: 'success', content: { message: "Hooray, we've got a winner!" } });
                    this.$emit('refresh-projects');
                }
            },
            async revokeWinnerStatus() {
                let loadingNotification = await this.$notifications.notify({ content: { message: 'Removing winner status...', loading: true }, disableTimeout: true, isCloseable: false });

                let response = await fetch(`${process.env.backendURL}/api/jams/${this.data.jam}/winners/`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: this.$auth.token(),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        project: this.data.project,
                    }),
                });
                response = await response.json();
                this.$notifications.removeNotification(loadingNotification);
                if (response.ok) {
                    this.$notifications.notify({ type: 'success', content: { message: 'Winner status removed from the project.' } });
                    this.$emit('refresh-projects');
                }
            },
        },
        async mounted() {
            this.getBackgroundImage(this.images);
            this.getUpvotes();

            if ((this.isAdmin || this.isManager) && this.data?.selected != true && new Date(this.jamEnd).toISOString() <= new Date().toISOString()) {
                this.canBeMadeWinner = true;
            }
        },
    };
</script>

<style scoped>
    .card {
        margin: 0 10px;
        padding: 0;
        --border-width: 2px;
        border: var(--border-width) solid var(--header-background);
        position: relative;
    }

    .project-content {
        overflow: hidden;
        width: 100%;
        height: 100%;
        position: relative;
        border-radius: 0.85rem;
    }

    .winner-badge {
        position: absolute;
        bottom: -15px;
        margin: 0 auto;
        left: 0;
        right: 0;
        z-index: 10;
        border-radius: 6px;
        padding: 5px 30px;
        background-color: var(--header-background);
        text-transform: uppercase;
        font-weight: 800;
        color: white;
        width: fit-content;
    }

    .card.winner {
        --border-width: 7px;
        border: none;
        overflow: visible;
    }

    .card.winner .winner-outline:after {
        content: '';
        position: absolute;
        top: calc(-1 * var(--border-width));
        left: calc(-1 * var(--border-width));
        height: calc(100% + var(--border-width) * 2);
        width: calc(100% + var(--border-width) * 2);
        background: linear-gradient(
            60deg,
            rgba(255, 253, 184, 1) 0%,
            rgba(253, 246, 140, 1) 20%,
            rgba(244, 205, 42, 1) 40%,
            rgba(237, 163, 35, 1) 60%,
            rgba(210, 141, 13, 1) 80%,
            rgba(237, 163, 35, 1) 90%,
            rgba(244, 205, 42, 1) 100%
        );
        animation: animated-gradient 3s ease alternate infinite;
        background-size: 300% 300%;
        border-radius: calc(2 * var(--border-width));
    }

    .card.community-winner .winner-outline:after {
        background: linear-gradient(
            60deg,
            rgba(238, 238, 238, 1) 0%,
            rgba(208, 203, 203, 1) 20%,
            rgba(180, 179, 179, 1) 40%,
            rgba(163, 160, 160, 1) 60%,
            rgba(150, 150, 150, 1) 80%,
            rgba(163, 160, 160, 1) 90%,
            rgba(180, 179, 179, 1) 100%
        );
        animation: animated-gradient 3s ease alternate infinite;
        background-size: 300% 300%;
    }

    @keyframes animated-gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    .cover-image {
        position: relative;
        width: 100%;
        background-size: contain;
        display: flex;
        justify-content: left;
        align-items: flex-end;
        aspect-ratio: 4/3;
        border-top-left-radius: calc(2 * var(--border-width));
        border-top-right-radius: calc(2 * var(--border-width));
    }

    .blur {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 1rem;
        backdrop-filter: blur(12px);
        padding: 10px 20px;
        margin: 10px;
        max-width: 80%;
    }

    .upvote {
        position: absolute;
        top: 10px;
        left: 10px;
        border-radius: 5px;
        backdrop-filter: blur(12px);
    }

    .upvote .pill {
        color: var(--button-background);
        background-color: var(--button-text);
    }

    .upvote .pill:before {
        background-color: var(--button-background);
    }

    .upvote.upvoted {
        background-color: var(--notification-success-background);
    }

    .upvote.upvoted .pill {
        color: var(--notification-success-background);
        background-color: var(--notification-success-text);
    }

    .upvote.upvoted .pill:before {
        background-color: var(--notification-success-background);
    }

    h3 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        font-size: 1.2rem;
        color: rgb(28, 28, 28);
    }

    .dark-mode h3 {
        color: white;
    }

    .dark-mode .blur {
        background-color: rgba(0, 0, 0, 0.3);
    }

    .info {
        padding: 20px;
        display: flex;
        align-items: center;
        background-color: var(--card-background);
        border-bottom-left-radius: calc(2 * var(--border-width));
        border-bottom-right-radius: calc(2 * var(--border-width));
    }

    .jam-status {
        color: var(--text);
        font-size: 1.2em;
        margin-right: 10px;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .profile-picture {
        border-radius: 10px;
        width: 40px;
        height: 40px;
        background-color: var(--card-background);
        margin-right: 10px;
    }

    .more-options {
        margin-left: auto;
    }

    .more-options[data-dropdown-open] {
        opacity: 0.9;
    }
</style>
