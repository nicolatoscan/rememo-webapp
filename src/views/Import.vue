<template>
    <div class="full-page-message">
        <div class="content">
            <p>{{ message }}</p>
            <div v-if="collection !== null">
                <h3>Do you want to import the collection: {{ collection.name }}</h3>
                <p>{{ collection.description }}</p>
                <h4>Words:</h4>
                <ul>
                    <li v-for="word in collection.words" :key="word._id">
                        <b>{{ word.original }}</b>: {{ word.translation }}
                    </li>
                </ul>
                <button @click="importClass(collection._id)">
                    Import collection
                </button>
            </div>
        </div>
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
        const collectionId = this.$route.params.collectionId as string | undefined;
        if (typeof collectionId === 'string') {
            try {
                this.$data.collection = await collectionServices.getCollectionById(collectionId);
            } catch (err) {
                this.$data.message = 'Collection not found';
            }
        } else {
            this.$data.message = 'Nothing to import';
        }
    },
    methods: {
        importClass: async function (collectionId: string) {
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

<style scoped lang="scss">

</style>