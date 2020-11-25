<template>
    <div class="insert-collection insert-modal">
        <p>{{ message }}</p>
        <input
            v-model="collection.name"
            type="text"
            placeholder="Name"
            name="name"
        />
        <input
            v-model="collection.description"
            type="text"
            placeholder="Description"
            name="description"
        />
        <button v-on:click="createCollection()">+ Insert new Word</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Models from '@/models';
import * as collectionServices from '@/services/collection.services';

export default defineComponent({
    name: 'InsertCollection',
    data: () => {
        return {
            collection: {
                index: 1,
                name: '',
                description: '',
                owner: 'asdasd',
                words: []
            } as Models.Collection,
            message: '',
            saving: false,
        }
    },
    methods: {
        createCollection: async function () {
            try {
                this.$data.saving = true;
                await collectionServices.createCollection(this.$data.collection);
                this.$data.message = 'Collection created successfully';
                this.$emit('collectionCreated');
                this.$data.saving = false;
            } catch (err) {
                this.$data.message = err.info;
            }
        }
    },
});
</script>
