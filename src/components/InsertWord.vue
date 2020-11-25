<template>
    <div class="insert-word insert-modal">
        <p>{{ message }}</p>
        <input
            v-model="word.original"
            type="text"
            placeholder="Original"
            name="original"
        />
        <input
            v-model="word.translation"
            type="text"
            placeholder="Tranlation"
            name="translation"
        />
        <button v-on:click="sendWord()">+ Insert new Word</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Models from '@/models';
import * as collectionServices from '@/services/collection.services';

export default defineComponent({
    name: 'InsertWord',
    props: {
        collectionId: String
    },
    data: () => {
        return {
            word: {
                index: 0,
                original: '',
                translation: '',
                languageFrom: undefined,
                languageTo: undefined
            } as Models.Word,
            message: '',
            saving: false,
        }
    },
    methods: {
        sendWord: async function () {
            if (this.$props.collectionId) {
                try {
                    this.$data.saving = true;
                    await collectionServices.createWord(this.$props.collectionId, this.$data.word);
                    this.$data.message = 'Word created successfully';
                    this.$emit('wordCreated', this.$props.collectionId);
                    this.$data.saving = false;
                } catch (err) {
                    this.$data.message = err.info;
                }
            } else {
                this.$data.message = 'No collection selected';
            }
        }
    },
});
</script>
