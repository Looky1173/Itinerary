<template>
    <Modal :isOpen="isOpen" :hideSubHeader="true" @close="close()">
        <template #header>Advanced options</template>
        <template>
            <div class="modal-inner">
                <input type="checkbox" id="enable-mystery" class="checkbox" v-model="options.enableMystery" />
                <label for="enable-mystery" class="input-label checkbox">Hide the theme (the main body of text) of the game jam before it starts</label>
            </div>
        </template>
        <template #actions>
            <button @click="close()" class="btn" :disabled="disableButtons">Discard edits</button>
            <button @click="saveAndClose()" class="btn" style="margin-left: 10px" :disabled="disableButtons" v-if="!newJam">Save</button>
            <button @click="saveAndClose(true)" class="btn btn-primary" style="margin-left: 10px" :disabled="disableButtons">Save and close</button>
        </template>
    </Modal>
</template>

<script>
    export default {
        data() {
            return {
                options: { ...this.originalOptions },
            };
        },
        methods: {
            close() {
                this.options = { ...this.originalOptions };
                this.$emit('close');
            },
            saveAndClose(close = false) {
                this.$emit('save', { close: close, options: this.options });
            },
        },
        watch: {
            originalOptions() {
                this.options = { ...this.originalOptions };
            },
        },
        props: ['isOpen', 'originalOptions', 'disableButtons', 'newJam'],
    };
</script>

<style scoped>
    .modal-inner {
        padding: 20px;
    }
</style>