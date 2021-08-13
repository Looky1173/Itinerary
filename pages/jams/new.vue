<template>
    <div class="container">
        <Navigation />
        <div class="content">
            <div class="card">
                <h1>Create a new Game Jam</h1>
                <br />
                <label for="jam-name" class="input-label">Name</label>
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
                <label for="jam-text" class="input-label">Text</label>
                <textarea
                    style="height: 12rem; resize: vertical"
                    type="text"
                    id="jam-text"
                    class="input"
                    placeholder="Elaborate on the description. Explain the theme of the game jam, the rules & requipments, the prize, etc... "
                    v-model="jamText"
                ></textarea>
                <hr />
                <button class="btn btn-primary" :disabled="true">Create game jam (COMING SOON)</button>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    export default {
        middleware: 'isAdmin',
        data() {
            return {
                jamName: null,
                jamDescription: null,
                jamText: null
            };
        }
    };
</script>

<style scoped>
</style>