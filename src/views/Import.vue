<template>
    <p>{{ message }}</p>
    <div v-if="collection !== null">
        <p>Do you want to import:</p>
        <p>{{ collection.name }} - {{ collection.description }}</p>
        <ul>
            <li v-for="word in collection.words" :key="word._id">
                {{ word.original }} - {{ word.translation }}
            </li>
        </ul>
        <button @click="ciao(collection._id)">Import It</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Models from '@/models';
import * as collectionServices from '@/services/collection.services';
import * as shareServices from '@/services/share.services';
import router from '@/router';

export default defineComponent({
    name: 'import',
    data: () => {
        return {
            message: '',
            collection: null as (Models.Collection | null)
        }
    },
    created: async function () {
        if (typeof this.$route.query.collectionId === 'string') {
            try {
                this.$data.collection = await collectionServices.getCollectionById(this.$route.query.collectionId);
            } catch (err) {
                this.$data.message = 'Collection not found';
            }
        } else {
            this.$data.message = 'Nothing to import';
        }
    },
    methods: {
        ciao: async function (collectionId: string) {
            try {
                await shareServices.importCollection(collectionId);
            } catch (err) {
                this.$data.message = 'Collection not found';
            }
            router.push('/collections');
        }
    }
});
</script>
