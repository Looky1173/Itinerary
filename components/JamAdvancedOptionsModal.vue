<template>
    <Modal :isOpen="isOpen" :hideSubHeader="true" @close="close()">
        <template #header>{{ $t('gameJam.options.advancedOptionsTitle') }}</template>
        <template>
            <div class="modal-inner">
                <input type="checkbox" id="enable-mystery" class="checkbox" v-model="options.enableMystery" />
                <label for="enable-mystery" class="input-label checkbox">{{ $t('gameJam.options.mysteryDescription') }}</label>
            </div>
        </template>
        <template #actions>
            <button @click="close()" class="btn" :disabled="disableButtons">{{ $t('global.discard') }}</button>
            <button @click="saveAndClose()" class="btn" style="margin-left: 10px" :disabled="disableButtons" v-if="!newJam">{{ $t('global.save') }}</button>
            <button @click="saveAndClose(true)" class="btn btn-primary" style="margin-left: 10px" :disabled="disableButtons">{{ $t('global.saveAndClose') }}</button>
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