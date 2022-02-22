<template>
    <div class="container">
        <Navigation />
        <JamAdvancedOptionsModal :isOpen="showAdvancedOptions" @close="showAdvancedOptions = false" @save="saveAdvancedOptions" :originalOptions="advancedOptions" :newJam="true" />
        <div class="content">
            <div class="card">
                <div v-if="isAdmin">
                    <h1>Create a new Game Jam</h1>
                    <br />
                    <label for="jam-name" class="input-label"
                        ><span class="required-wrapper">Name <span class="pill danger">Required</span></span></label
                    >
                    <input type="text" id="jam-name" class="input" autocapitalize="off" autocorrect="off" placeholder="Give the game jam a short and catchy title" v-model="jamName" />
                    <hr />
                    <label for="jam-description" class="input-label">Description</label>
                    <textarea
                        style="height: 6rem; resize: vertical"
                        type="text"
                        id="jam-description"
                        class="input"
                        placeholder="Describe the game jam briefly. This description will be public even before the jam goes live so make sure to not give too much away."
                        v-model="jamDescription"
                    ></textarea>
                    <label for="jam-text" class="input-label">
                        <span class="required-wrapper">Text <span class="pill danger">Required</span></span>
                    </label>
                    <Tabs>
                        <Tab title="Markdown">
                            <textarea
                                style="height: 12rem; resize: vertical"
                                type="text"
                                id="jam-text"
                                class="input"
                                placeholder="Elaborate on the description. Explain the theme of the game jam, the rules & requirements, the prize, etc... "
                                v-model="jamText"
                            ></textarea></Tab
                        ><Tab title="Preview">
                            <div v-html="$md.render(jamText ? jamText : '*There is nothing to see here... yet!*')"></div>
                        </Tab>
                    </Tabs>
                    <label for="jam-image" class="input-label">Image</label>
                    <input
                        type="text"
                        id="jam-image"
                        class="input"
                        autocapitalize="off"
                        autocorrect="off"
                        placeholder="A link to the image (thumbnail) that represents your game jam."
                        v-model="jamImage"
                    />
                    <div class="dates">
                        <div>
                            <label for="jam-start" class="input-label"
                                ><span class="required-wrapper">Start <span class="pill danger">Required</span></span></label
                            >
                            <input type="datetime-local" id="jam-start" class="input" placeholder="When the game jam should start." v-model="jamStart" />
                        </div>
                        <div>
                            <label for="jam-end" class="input-label"
                                ><span class="required-wrapper">End <span class="pill danger">Required</span></span></label
                            >
                            <input type="datetime-local" id="jam-end" class="input" placeholder="When the game jam should end." v-model="jamEnd" />
                        </div>
                    </div>
                    <hr />
                    <button class="btn" @click="showAdvancedOptions = true" :disabled="createButtonDisabled">Advanced options</button>
                    <button class="btn btn-primary" @click="create()" :disabled="createButtonDisabled">Create game jam</button>
                </div>
                <div v-else>
                    <h2>Ask an administrator to create a game jam for you!</h2>
                    <p>
                        Itinerary is currently in beta and we need to limit the number of game jams created while we are finalizing the site. Nevertheless, we welcome early testers and adopters!
                        <b>If you would like a game jam for yourself and your followers, please contact an administrator.</b>
                    </p>
                    <br />
                    <button @click="contact()" class="btn">Contact Looky1173 (administrator) on Scratch</button>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                jamName: null,
                jamDescription: null,
                jamText: null,
                jamImage: null,
                jamStart: null,
                jamEnd: null,
                createButtonDisabled: false,
                isAdmin: this.$auth.user()?.admin,
                showAdvancedOptions: false,
                advancedOptions: {},
            };
        },
        methods: {
            contact() {
                window.open(`https://scratch.mit.edu/users/Looky1173/#comments`, '_blank').focus();
            },
            async create() {
                if (!this.jamName || !this.jamText || !this.jamStart || !this.jamEnd) {
                    this.$notifications.notify({ type: 'error', content: { message: this.$t('notifications.global.fillInRequiredFields') } });
                    return;
                }

                this.createButtonDisabled = true;
                let loadingNotification = await this.$notifications.notify({ content: { message: this.$t('notifications.gameJams.new.creatingGameJam'), loading: true }, disableTimeout: true, isCloseable: false });

                let response = await fetch(`${process.env.backendURL}/api/jams`, {
                    method: 'PUT',
                    headers: {
                        Authorization: this.$auth.token(),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: this.jamName,
                        content: { headerImage: this.jamImage, description: this.jamDescription, body: this.jamText },
                        dates: { start: new Date(this.jamStart).toISOString(), end: new Date(this.jamEnd).toISOString() },
                        options: this.advancedOptions,
                    }),
                });
                response = await response.json();

                if (response.ok) {
                    this.$router.push(`/jams/${response.slug}`);
                    this.$notifications.removeNotification(loadingNotification);
                    this.$notifications.notify({ type: 'success', content: { message: this.$t('notifications.gameJams.new.createdGameJam') } });
                }
            },
            saveAdvancedOptions(event) {
                this.advancedOptions = event.options;
                this.showAdvancedOptions = false;
            },
        },
    };
</script>

<style scoped>
    .required-wrapper {
        display: flex;
        align-items: center;
    }

    .required-wrapper .pill {
        margin-left: 5px;
    }

    .dates {
        display: flex;
    }

    .dates div {
        width: 100%;
    }

    .dates div:last-child {
        margin-left: 20px;
    }

    @media only screen and (max-width: 720px) {
        .dates {
            flex-direction: column;
        }

        .dates div:last-child {
            margin-left: 0;
        }
    }
</style>