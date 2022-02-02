<template>
    <div class="container">
        <Navigation />
        <Modal :isOpen="!hideManagersModal" :hideSubHeader="false" @close="hideManagersModal = true" class="edit-managers-modal">
            <template #header>Edit managers</template>
            <template #sub-header>
                <div style="display: flex; align-items: center">
                    <h3 style="margin: 0">{{ isAdmin === true ? 'You are an administrator' : isManager ? 'You are a manager of this jam' : '' }}</h3>
                    <button v-if="isManager" @click="giveUpManagerRole()" :disabled="disableLeaveButton" class="btn btn-danger" style="margin-left: auto">Leave</button>
                </div>
            </template>
            <template>
                <div class="modal-inner">
                    <Loading v-if="loadingManagers" message="Loading managers..." />
                    <div v-else>
                        <p v-if="managers.length == 0">No managers yet... add people below!</p>
                        <Manager @remove-manager="removeManager" v-for="(manager, index) in managers" :key="index" :manager="manager" />
                        <hr />
                        <div style="display: flex; align-items: flex-end">
                            <div style="width: 100%">
                                <label for="add-manager" class="input-label"
                                    ><span class="required-wrapper">Username <span class="pill danger">Required</span></span></label
                                >
                                <input
                                    :disabled="disableAddManagerButton"
                                    style="margin-bottom: 0"
                                    type="text"
                                    id="add-manager"
                                    class="input"
                                    autocapitalize="off"
                                    autocorrect="off"
                                    placeholder="Username of the manager to add"
                                    ref="manager"
                                />
                            </div>
                            <button :disabled="disableAddManagerButton" @click="addManager()" class="btn btn-primary" style="height: 2.75rem; margin-left: 10px">
                                <span class="btn-icon">
                                    <Icon name="add-user" style="transform: scale(1.5)" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </template>
            <template #actions>
                <button @click="hideManagersModal = true" class="btn">Close</button>
            </template>
        </Modal>
        <Modal :isOpen="!hideSubmissionsModal" :hideSubHeader="true" @close="hideSubmissionsModal = true">
            <template #header>Enter the game jam</template>
            <template>
                <div class="modal-inner">
                    <label for="submission-project" class="input-label"
                        ><span class="required-wrapper">Game URL <span class="pill danger">Required</span></span></label
                    >
                    <input type="url" id="submission-project" class="input" autocapitalize="off" autocorrect="off" placeholder="Paste in the URL of your Scratch game" ref="submission" />
                </div>
            </template>
            <template #actions>
                <button :disabled="submitProjectButtonDisabled" @click="hideSubmissionsModal = true" class="btn">Cancel</button>
                <button :disabled="submitProjectButtonDisabled" @click="submitProject()" class="btn btn-primary" style="margin-left: 10px">Submit</button>
            </template>
        </Modal>
        <Modal :isOpen="!hideEditModal" :hideSubHeader="true" @close="hideEditModal = true">
            <template #header>Edit this game jam</template>
            <template>
                <div class="modal-inner">
                    <label for="jam-name" class="input-label"
                        ><span class="required-wrapper">Name <span class="pill danger">Required</span></span></label
                    >
                    <input type="text" id="jam-name" class="input" autocapitalize="off" autocorrect="off" placeholder="Give the game jam a short and catchy title" :value="jamName" ref="jamName" />
                    <hr />
                    <label for="jam-description" class="input-label">Description</label>
                    <textarea
                        style="height: 6rem; resize: vertical"
                        type="text"
                        id="jam-description"
                        class="input"
                        placeholder="Describe the game jam briefly. This description will be public even before the jam goes live so make sure to not give too much away."
                        :value="jamDescription"
                        ref="jamDescription"
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
                                ref="TEMPjamBody"
                                v-model="TEMPjamBody"
                            ></textarea></Tab
                        ><Tab title="Preview">
                            <div v-html="$md.render(TEMPjamBody ? TEMPjamBody : '*There is nothing to see here... yet!*')"></div>
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
                        :value="jamImage"
                        ref="jamImage"
                    />
                    <div class="dates">
                        <div>
                            <label for="jam-start" class="input-label"
                                ><span class="required-wrapper">Start <span class="pill danger">Required</span></span></label
                            >
                            <input type="datetime-local" id="jam-start" class="input" placeholder="When the game jam should start." :value="getDateString(jamStart)" ref="jamStart" />
                        </div>
                        <div>
                            <label for="jam-end" class="input-label"
                                ><span class="required-wrapper">End <span class="pill danger">Required</span></span></label
                            >
                            <input type="datetime-local" id="jam-end" class="input" placeholder="When the game jam should end." :value="getDateString(jamEnd)" ref="jamEnd" />
                        </div>
                    </div>
                </div>
            </template>
            <template #actions>
                <button :disabled="editButtonsDisabled" @click="hideEditModal = true" class="btn">Discard edits</button>
                <button :disabled="editButtonsDisabled" @click="updateJam()" class="btn btn-primary" style="margin-left: 10px">Update game jam</button>
            </template>
        </Modal>
        <div class="content" v-if="loadingJam">
            <div class="card">
                <Loading message="Loading game jam..." />
            </div>
        </div>
        <div v-if="!loadingJam">
            <section :style="{ backgroundImage: `url(${jamImage || backgroundImage})` }">
                <div class="header">
                    <div class="blur">
                        <h2>{{ jamName }} ({{ jamSlug }})</h2>
                        <p>
                            {{ jamDescription }}
                        </p>
                    </div>
                    <div class="blur" id="jam-countdown">
                        <h3>{{ jamStatus }}</h3>
                        <Countdown id="countdown" :date="countdown" v-if="countdown" @on-finish="calculateDates()" />
                    </div>
                </div>
            </section>
            <div class="content">
                <div class="jam-content">
                    <div class="card jam-info">
                        <div v-if="isLoggedIn">
                            <h3>You may cast {{ remainingVotes }} more vote{{ remainingVotes != 1 ? 's' : '' }}</h3>
                            <hr />
                            <h3>
                                {{
                                    hasParticipated === true
                                        ? 'You have entered this game jam.'
                                        : hasParticipated === false
                                        ? jamStatus == 'Ending in'
                                            ? 'Submit your project below!'
                                            : 'This jam is currently not accepting submissions.'
                                        : 'Loading...'
                                }}
                            </h3>
                            <div class="action-buttons">
                                <button @click="hideSubmissionsModal = false" :disabled="hasParticipated === null ? true : !enableSubmissions" class="btn btn-primary btn-full">
                                    {{ hasParticipated === null ? 'Loading...' : 'Submit your creation' }}
                                </button>
                                <button v-if="isAdmin || isManager" ref="admin-options" class="btn admin-options">
                                    <span class="btn-icon">
                                        <Icon name="vertical-dots" />
                                    </span>
                                </button>
                                <div class="dropdowns">
                                    <Dropdown
                                        v-if="isAdmin || isManager"
                                        :reference="'admin-options'"
                                        placement="right"
                                        :options="{ modifiers: [{ name: 'offset', options: { offset: [0, 10] } }] }"
                                        class="rounded"
                                    >
                                        <li class="dropdown-item hoverable" @click="openEditModal()">Edit game jam</li>
                                        <li class="dropdown-item hoverable" @click="hideManagersModal = false">Edit managers</li>
                                        <div class="divider"></div>
                                        <li
                                            class="dropdown-item hoverable danger disabled"
                                            title="This feature is not implemented yet. We are working on it and it should be available in the near future."
                                        >
                                            Clear all votes
                                        </li>
                                        <li
                                            class="dropdown-item hoverable danger disabled"
                                            title="This feature is not implemented yet. We are working on it and it should be available in the near future."
                                        >
                                            Clear all submissions
                                        </li>
                                        <li v-if="isAdmin" class="dropdown-item hoverable danger" @click="deleteJam()">Delete game jam</li>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <h3>Log in to participate!</h3>
                            <p>Once you've logged in, you will be able to upvote projects and submit your own ones.</p>
                            <br />
                            <button @click="$router.push('/login')" class="btn btn-full">Login</button>
                        </div>
                    </div>
                    <div class="jam-body">
                        <div v-if="jamStatus == 'Ended'" class="card">
                            <h3>Winners</h3>
                            <Loading v-if="loadingWinners" message="Loading winners..." />
                            <div v-if="!loadingWinners && winners.length > 0">
                                <br />
                                <div class="projects">
                                    <Project
                                        @vote-cast="getRemainingVotes()"
                                        @refresh-projects="
                                            fetchProjects();
                                            loadWinners();
                                            getUserData();
                                        "
                                        v-for="(project, index) in winners"
                                        :key="index"
                                        :data="project"
                                        :jamEnd="jamEnd"
                                        :isManager="isManager"
                                    />
                                </div>
                                <br />
                            </div>
                            <p v-if="!loadingWinners && winners.length < 1">No winners yet. Try upvoting some projects!</p>
                        </div>
                        <Tabs>
                            <Tab title="About this jam">
                                <div class="card">
                                    <div v-html="$md.render(jamBody ? jamBody : '*Uh, oh! No body was provided for this game jam.*')"></div>
                                </div>
                            </Tab>
                            <Tab :title="submissionsTitle">
                                <div class="card">
                                    <Loading v-if="loadingProjects" message="Loading projects..." />
                                    <div v-if="!loadingProjects" class="projects">
                                        <Project
                                            @vote-cast="getRemainingVotes()"
                                            @refresh-projects="
                                                fetchProjects();
                                                loadWinners();
                                                getUserData();
                                            "
                                            v-for="(project, index) in projects"
                                            :key="index"
                                            :data="project"
                                            :jamEnd="jamEnd"
                                            :isManager="isManager"
                                        />
                                    </div>
                                    <p v-if="!loadingProjects && projects.length < 1">No projects. Be the first to submit one!</p>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    import Countdown from '../../components/Countdown.vue';
    import Project from '../../components/Project.vue';

    export default {
        components: { Countdown, Project },
        data() {
            return {
                jamSlug: this.$route.params.jam,
                jamName: null,
                jamDescription: null,
                jamBody: null,
                TEMPjamBody: null,
                jamImage: null,
                jamStart: null,
                jamEnd: null,
                jamStatus: null,
                enableSubmissions: false,
                backgroundImage: null,
                images: ['/img/backgrounds/blue-watercolour.jpg', '/img/backgrounds/green-watercolour.jpg', '/img/backgrounds/red-watercolour.jpg', '/img/backgrounds/yellow-watercolour.jpg'],
                countdown: null,
                loadingJam: true,
                isAdmin: this.$auth.user()?.admin,
                isManager: false,
                hideSubmissionsModal: true,
                hideEditModal: true,
                editButtonsDisabled: false,
                submitProjectButtonDisabled: false,
                projects: null,
                loadingProjects: true,
                submissionsTitle: `Submissions <span class="pill" style="margin-left: 5px;">Loading...</span>`,
                remainingVotes: null,
                hasParticipated: null,
                loadingWinners: true,
                winners: null,
                isLoggedIn: this.$auth.loggedIn(),
                hideManagersModal: true,
                disableLeaveButton: false,
                disableAddManagerButton: false,
                loadingManagers: true,
                managers: null,
            };
        },
        computed: {
            projectsList() {
                return this.projects;
            },
        },
        methods: {
            getBackgroundImage(images) {
                this.backgroundImage = images[Math.floor(Math.random() * images.length)];
            },
            async loadJam() {
                this.loadingJam = true;

                this.getBackgroundImage(this.images);
                this.isLoggedIn && this.getRemainingVotes();

                let response = await fetch(`${process.env.backendURL}/api/jams/${this.jamSlug}`, {
                    method: 'GET',
                    headers: {
                        Authorization: this.$auth.token(),
                        'Content-Type': 'application/json',
                    },
                });
                response = await response.json();

                if (!response.slug) {
                    return this.$nuxt.error({ statusCode: 404, message: `Hmm, a game jam doesn't seem to exist with this URL!` });
                }

                this.jamName = response.name;
                this.jamDescription = response.content.description;
                this.jamBody = response.content.body;
                this.jamImage = response.content.headerImage;
                this.jamStart = response?.dates?.start;
                this.jamEnd = response?.dates?.end;

                this.calculateDates();

                this.loadingJam = false;

                this.fetchProjects();
                this.isLoggedIn && this.getUserData();
                this.isLoggedIn && this.getManagers();

                if (this.jamStatus == 'Ended') {
                    this.loadWinners();
                }
            },
            async getRemainingVotes() {
                let response = await fetch(`${process.env.backendURL}/api/jams/${this.jamSlug}/upvotes/`, {
                    method: 'GET',
                    headers: {
                        Authorization: this.$auth.token(),
                        'Content-Type': 'application/json',
                    },
                });
                response = await response.json();
                console.log('REMAINING', response);
                this.remainingVotes = response.remainingUpvotes;
            },
            async updateJam() {
                let jamName = this.$refs.jamName.value;
                let jamDescription = this.$refs.jamDescription.value;
                let jamBody = this.$refs.TEMPjamBody.value;
                let jamImage = this.$refs.jamImage.value;
                let jamStart = this.$refs.jamStart.value;
                let jamEnd = this.$refs.jamEnd.value;

                if (!jamName || !jamBody || !jamStart || !jamEnd) {
                    this.$notifications.notify({ type: 'error', content: { message: 'Please fill in the required fields!' } });
                    return;
                }

                this.editButtonsDisabled = true;
                let loadingNotification = await this.$notifications.notify({ content: { message: 'Updating your game jam...', loading: true }, disableTimeout: true, isCloseable: false });

                let response = await fetch(`${process.env.backendURL}/api/jams/${this.jamSlug}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: this.$auth.token(),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: jamName,
                        content: { headerImage: jamImage, description: jamDescription, body: jamBody },
                        dates: { start: new Date(jamStart).toISOString(), end: new Date(jamEnd).toISOString() },
                    }),
                });
                response = await response.json();

                if (response.ok) {
                    this.editButtonsDisabled = false;
                    this.hideEditModal = true;
                    if (response.ok.newSlug != this.jamSlug) {
                        this.$router.push(`/jams/${response.ok.newSlug}`);
                    } else {
                        this.loadJam();
                    }
                    this.$notifications.removeNotification(loadingNotification);
                    this.$notifications.notify({ type: 'success', content: { message: 'Your game jam was updated successfully!' } });
                }
            },
            async deleteJam() {
                if (
                    confirm(`Are you sure you want to delete the game jam ${this.jamName} (${this.jamSlug}) and all associated submissions, votes, and managers?\n\n⚠ This operation cannot be undone! ⚠`)
                ) {
                    let loadingNotification = await this.$notifications.notify({ content: { message: 'Deleting your game jam...', loading: true }, disableTimeout: true, isCloseable: false });

                    let res = await fetch(`${process.env.backendURL}/api/jams/${this.jamSlug}`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: this.$auth.token(),
                            'Content-Type': 'application/json',
                        },
                    });
                    res = await res.json();
                    this.$notifications.removeNotification(loadingNotification);

                    if (res.ok) {
                        this.$router.push(`/`);
                        this.$notifications.notify({ type: 'success', content: { message: 'Your game jam was deleted successfully!' } });
                    } else {
                        this.$notifications.notify({ type: 'error', content: { message: "Your game jam couldn't be deleted!" } });
                    }
                }
            },
            calculateDates() {
                let today = new Date().toISOString();

                if ((this.jamStart && new Date(this.jamStart).toISOString()) > today) {
                    this.jamStatus = 'Starting in';
                    this.countdown = new Date(this.jamStart);
                    this.enableSubmissions = false;
                } else if ((this.jamStart && new Date(this.jamStart).toISOString()) <= today && today < (this.jamEnd && new Date(this.jamEnd).toISOString())) {
                    this.jamStatus = 'Ending in';
                    this.countdown = new Date(this.jamEnd);
                    this.enableSubmissions = true;
                } else {
                    this.jamStatus = 'Ended';
                    this.countdown = null;
                    this.enableSubmissions = false;
                }
            },
            getDateString: (date) => {
                const newDate = date ? new Date(date) : new Date();
                return new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000).toISOString().slice(0, -1);
            },
            openEditModal() {
                this.TEMPjamBody = this.jamBody;
                this.hideEditModal = false;
            },
            async submitProject() {
                let projectURL = this.$refs.submission.value;
                if (!projectURL) {
                    this.$notifications.notify({ type: 'error', content: { message: 'Please fill in the required fields!' } });
                    return;
                }

                let projectRegex = /https:\/\/scratch\.mit\.edu\/projects\/([0-9]+)/i;
                if (!projectRegex.test(projectURL)) {
                    this.$notifications.notify({ type: 'error', content: { message: 'The URL entered is invalid!' } });
                    return;
                }

                let projectId = projectURL.match(projectRegex)[1];

                this.submitProjectButtonDisabled = true;
                let loadingNotification = await this.$notifications.notify({ content: { message: 'Submitting your project...', loading: true }, disableTimeout: true, isCloseable: false });

                let response = await fetch(`${process.env.backendURL}/api/jams/${this.jamSlug}/projects/`, {
                    method: 'PUT',
                    headers: {
                        Authorization: this.$auth.token(),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        jam: this.jamSlug,
                        project: projectId,
                    }),
                });
                response = await response.json();
                this.$notifications.removeNotification(loadingNotification);

                if (response.ok) {
                    this.$notifications.notify({ type: 'success', content: { message: 'Your project was submitted!' } });
                    this.hideSubmissionsModal = true;

                    this.fetchProjects();
                    this.getUserData();
                } else {
                    this.$notifications.notify({ type: 'error', content: { message: `${response.error.detail} (${response.error.code})` } });
                }

                this.submitProjectButtonDisabled = false;
            },
            async fetchProjects() {
                this.loadingProjects = true;

                let response = await fetch(`${process.env.backendURL}/api/jams/${this.jamSlug}/projects/`, {
                    method: 'GET',
                    headers: {
                        Authorization: this.$auth.token(),
                        'Content-Type': 'application/json',
                    },
                });
                response = await response.json();

                this.projects = response;
                this.submissionsTitle = `Submissions <span class="pill" style="margin-left: 5px;">${this.projects.length}</span>`;

                /*
                                                                                                                                                                    await Promise.all(this.projects.map(async (project) => {
                                                                                                                                                                        let response = await fetch(`https://scratchdb.lefty.one/v3/project/info/${value.project}`, {
                                                                                                                                                                            method: 'GET',
                                                                                                                                                                            headers: {
                                                                                                                                                                                'Content-Type': 'application/json',
                                                                                                                                                                            },
                                                                                                                                                                        });
                                                                                                                                                                        response = await response.json();

                                                                                                                                                                        this.projects[index] = { ...this.projects[index], username: response.username, title: response.title, description: response.description, instructions: response.instructions };

                                                                                                                                                                        console.log(this.projects);
                                                                                                                                                                    }));*/

                let promises = Object.keys(this.projects).map((k) => {
                    return new Promise((res, rej) => {
                        fetch(`https://scratchdb.lefty.one/v3/project/info/${this.projects[k].project}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                console.log('DATA', data);
                                this.$set(this.projects, k, { ...this.projects[k], username: data.username, title: data.title, description: data.description, instructions: data.instructions });
                                res();
                            });
                    });
                });

                Promise.all(promises).then(() => {
                    console.log('PROJECTS', this.projects);
                    this.loadingProjects = false;
                });
            },
            async getUserData() {
                this.hasParticipated = null;
                let response = await fetch(`${process.env.backendURL}/api/jams/${this.jamSlug}/user-data/`, {
                    method: 'GET',
                    headers: {
                        Authorization: this.$auth.token(),
                        'Content-Type': 'application/json',
                    },
                });
                response = await response.json();
                this.isManager = response.ok.manager;
                this.hasParticipated = response.ok.hasParticipated;
                if (this.hasParticipated === true) {
                    this.enableSubmissions = false;
                } else if (this.jamStatus == 'Ending in') {
                    this.enableSubmissions = true;
                }
            },
            async loadWinners() {
                this.loadingWinners = true;
                let response = await fetch(`${process.env.backendURL}/api/jams/${this.jamSlug}/winners/`, {
                    method: 'GET',
                    headers: {
                        Authorization: this.$auth.token(),
                        'Content-Type': 'application/json',
                    },
                });
                response = await response.json();
                this.winners = response.winners;

                let promises = Object.keys(this.winners).map((k) => {
                    return new Promise((res, rej) => {
                        fetch(`https://scratchdb.lefty.one/v3/project/info/${this.winners[k].project}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                console.log('WINNER DATA', data);
                                this.$set(this.winners, k, { ...this.winners[k], username: data.username, title: data.title, description: data.description, instructions: data.instructions });
                                res();
                            });
                    });
                });

                Promise.all(promises).then(() => {
                    let sorted = Object.values(this.winners).sort((a, b) => {
                        // Thanks https://stackoverflow.com/a/17387454/14226941
                        return a.selected === b.selected ? 0 : a.selected ? -1 : 1;
                    });
                    this.winners = sorted;
                    this.loadingWinners = false;
                });
            },
            async giveUpManagerRole() {
                if (
                    confirm(`Are you sure you want give up your manager role in this game jam (${this.jamName} - ${this.jamSlug})?\n\n⚠ You will no longer have access to manager options in this jam! ⚠`)
                ) {
                    this.disableLeaveButton = true;
                    let loadingNotification = await this.$notifications.notify({
                        content: { message: "Removing you from this jam's list of managers...", loading: true },
                        disableTimeout: true,
                        isCloseable: false,
                    });

                    let res = await fetch(`${process.env.backendURL}/api/jams/${this.jamSlug}/managers`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: this.$auth.token(),
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name: this.$auth.user().name }),
                    });
                    res = await res.json();
                    this.$notifications.removeNotification(loadingNotification);

                    if (res.ok) {
                        this.$notifications.notify({ type: 'success', content: { message: 'You are no longer a manager of this jam.' } });
                        this.hideManagersModal = true;
                        this.disableLeaveButton = false;
                        this.loadJam();
                    } else {
                        this.$notifications.notify({ type: 'error', content: { message: "For some reason, the server couldn't remove your manager role!" } });
                    }
                }
            },
            async removeManager(manager){
if (
                    confirm(`Are you sure you want to remove the manager role of "${manager}" for this game jam (${this.jamName} - ${this.jamSlug})?\n\n⚠ They will no longer have access to manager options! ⚠`)
                ) {
                   
                    let loadingNotification = await this.$notifications.notify({
                        content: { message: "Removing manager...", loading: true },
                        disableTimeout: true,
                        isCloseable: false,
                    });

                    let res = await fetch(`${process.env.backendURL}/api/jams/${this.jamSlug}/managers`, {
                        method: 'DELETE',
                        headers: {
                            Authorization: this.$auth.token(),
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name: manager }),
                    });
                    res = await res.json();
                    this.$notifications.removeNotification(loadingNotification);

                    if (res.ok) {
                        this.$notifications.notify({ type: 'success', content: { message: `Removed ${manager}'s manager role for this jam.` } });
                        this.getManagers();
                    } else {
                        this.$notifications.notify({ type: 'error', content: { message: `Couldn't remove "${manager}"'s manager role for this jam!` } });
                    }
                }
            },
            async addManager() {
                this.disableAddManagerButton = true;
                let loadingNotification = await this.$notifications.notify({
                    content: { message: 'Adding manager...', loading: true },
                    disableTimeout: true,
                    isCloseable: false,
                });

                let manager = this.$refs.manager.value;

                let response = await fetch(`${process.env.backendURL}/api/jams/${this.jamSlug}/managers/`, {
                    method: 'PUT',
                    headers: {
                        Authorization: this.$auth.token(),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: manager,
                    }),
                });
                response = await response.json();

                this.$notifications.removeNotification(loadingNotification);
                this.disableAddManagerButton = false;

                if (response.ok) {
                    this.$notifications.notify({ type: 'success', content: { message: `Made "${manager}" a manager of this jam!` } });
                    this.$refs.manager.value = '';
                    this.getManagers();
                } else {
                    this.$notifications.notify({ type: 'error', content: { message: response.error.detail } });
                }
            },
            async getManagers() {
                this.loadingManagers = true;
                let response = await fetch(`${process.env.backendURL}/api/jams/${this.jamSlug}/managers/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                response = await response.json();
                this.managers = response.managers;
                this.loadingManagers = false;
            },
        },
        mounted() {
            this.loadJam();
        },
    };
</script>

<style scoped>
    .jam-content {
        display: flex;
        flex-direction: row;
    }

    .jam-info {
        max-width: 30rem;
    }

    .jam-body {
        flex-grow: 1;
        margin-left: 20px;
    }

    .action-buttons {
        display: flex;
    }

    .admin-options {
        margin-left: 10px;
    }

    .admin-options[data-dropdown-open] {
        opacity: 0.9;
    }

    section {
        position: relative;
        width: 100%;
        background-size: cover;
        background-attachment: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    section .header {
        margin: 20px 0;
        color: rgb(28, 28, 28);
        max-width: 70%;
    }

    .dark-mode section .header {
        color: white;
    }

    section .header h2 {
        font-size: 2em;
        font-weight: 700;
    }

    section .header h3 {
        font-size: 1.5em;
        font-weight: 600;
    }

    section .header p {
        font-size: 1.5em;
    }

    .blur {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 20px;
        backdrop-filter: blur(12px);
        padding: 20px;
    }

    .dark-mode .blur {
        background-color: rgba(0, 0, 0, 0.3);
    }

    #jam-countdown {
        margin-top: 20px;
    }

    #countdown {
        color: rgb(28, 28, 28);
    }

    .dark-mode #countdown {
        color: white;
    }

    #countdown >>> .countdown-digit {
        font-size: 2rem;
    }

    @media only screen and (max-width: 720px) {
        section .header {
            max-width: unset;
            width: 100%;
            margin: 0;
        }

        .blur {
            border-radius: 0;
        }

        #jam-countdown {
            margin-top: 0;
        }
    }

    @media only screen and (max-width: 1000px) {
        .jam-content {
            flex-direction: column;
        }

        .jam-body {
            margin-left: 0;
        }
    }

    .modal-inner {
        padding: 20px;
    }

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

    .projects {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-auto-rows: auto;
        gap: 10px;
    }

    .edit-managers-modal >>> .modal-content {
        width: 30rem;
    }

    @media only screen and (max-width: 941px) {
        .edit-managers-modal >>> .modal-content {
            margin: 3.75rem auto;
        }
    }

    @media only screen and (max-width: 700px) {
        .edit-managers-modal >>> .modal-content {
            margin-top: 0;
            width: 100%;
            overflow: auto;
        }
    }
</style>