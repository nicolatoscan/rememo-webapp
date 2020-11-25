<template>
    <div class="insert-word">
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
    created: function () {
        console.log(this.$props.collectionId)
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

<style scoped lang="scss">
.insert-word {
    input {
        display: block;
        width: 80%;
        margin: 1em auto;
        padding: 0.1em;
        font-size: 1.1em;
    }
    button {
        display: block;
        margin: auto;
        margin-bottom: 1em;
    }
    p {
        display: block;
        text-align: center;
    }
    padding: 0.5em 0;
    border-radius: 10px;
    border: 1px solid #444;
}
</style>
