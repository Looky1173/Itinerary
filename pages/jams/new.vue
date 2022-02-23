<template>
    <div class="container">
        <Navigation />
        <JamAdvancedOptionsModal :isOpen="showAdvancedOptions" @close="showAdvancedOptions = false" @save="saveAdvancedOptions" :originalOptions="advancedOptions" :newJam="true" />
        <div class="content">
            <div class="card">
                <div v-if="isAdmin">
                    <h1>{{ $t('gameJam.new.createGameJam') }}</h1>
                    <br />
                    <label for="jam-name" class="input-label"
                        ><span class="required-wrapper"
                            >{{ $t('gameJam.new.name') }} <span class="pill danger">{{ $t('forms.required') }}</span></span
                        ></label
                    >
                    <input type="text" id="jam-name" class="input" autocapitalize="off" autocorrect="off" :placeholder="$t('gameJam.new.namePlaceholder')" v-model="jamName" />
                    <hr />
                    <label for="jam-description" class="input-label">{{ $t('gameJam.new.description') }}</label>
                    <textarea
                        style="height: 6rem; resize: vertical"
                        type="text"
                        id="jam-description"
                        class="input"
                        :placeholder="$t('gameJam.new.descriptionPlaceholder')"
                        v-model="jamDescription"
                    ></textarea>
                    <label for="jam-text" class="input-label">
                        <span class="required-wrapper"
                            >{{ $t('gameJam.new.body') }} <span class="pill danger">{{ $t('forms.required') }}</span></span
                        >
                    </label>
                    <Tabs>
                        <Tab :title="$t('gameJam.new.markdown')">
                            <textarea
                                style="height: 12rem; resize: vertical"
                                type="text"
                                id="jam-text"
                                class="input"
                                :placeholder="$t('gameJam.new.bodyPlaceholder')"
                                v-model="jamText"
                            ></textarea></Tab
                        ><Tab :title="$t('gameJam.new.markdownPreview')">
                            <div v-html="$md.render(jamText ? jamText : $t('gameJam.new.noBody'))"></div>
                        </Tab>
                    </Tabs>
                    <label for="jam-image" class="input-label">{{ $t('gameJam.new.image') }}</label>
                    <input type="text" id="jam-image" class="input" autocapitalize="off" autocorrect="off" :placeholder="$t('gameJam.new.imagePlaceholder')" v-model="jamImage" />
                    <div class="dates">
                        <div>
                            <label for="jam-start" class="input-label"
                                ><span class="required-wrapper"
                                    >{{ $t('gameJam.new.start') }} <span class="pill danger">{{ $t('forms.required') }}</span></span
                                ></label
                            >
                            <input type="datetime-local" id="jam-start" class="input" :placeholder="$t('gameJam.new.startPlaceholder')" v-model="jamStart" />
                        </div>
                        <div>
                            <label for="jam-end" class="input-label"
                                ><span class="required-wrapper"
                                    >{{ $t('gameJam.new.end') }} <span class="pill danger">{{ $t('forms.required') }}</span></span
                                ></label
                            >
                            <input type="datetime-local" id="jam-end" class="input" :placeholder="$t('gameJam.new.endPlaceholder')" v-model="jamEnd" />
                        </div>
                    </div>
                    <hr />
                    <button class="btn" @click="showAdvancedOptions = true" :disabled="createButtonDisabled">{{ $t('gameJam.actions.advancedOptions') }}</button>
                    <button class="btn btn-primary" @click="create()" :disabled="createButtonDisabled">{{ $t('gameJam.actions.createGameJam') }}</button>
                </div>
                <div v-else>
                    <h2>{{ $t('gameJam.new.requestGameJamTitle') }}</h2>
                    <p v-html="$t('gameJam.new.requestGameJamExplanation')"></p>
                    <br />
                    <button @click="contact()" class="btn">{{ $t('gameJam.new.requestGameJamAction') }}</button>
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
                let loadingNotification = await this.$notifications.notify({
                    content: { message: this.$t('notifications.gameJams.new.creatingGameJam'), loading: true },
                    disableTimeout: true,
                    isCloseable: false,
                });

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