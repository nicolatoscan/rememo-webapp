<template>
    <div class="collection-page">
        <div class="my-collections section">
            <h1>My collections</h1>
            <div class="collection-list items-list">
                <div
                    class="collection-item item"
                    v-for="coll in collections"
                    :key="coll._id"
                    v-bind:class="
                        coll._id === selectedCollectionId ? 'active' : ''
                    "
                    v-on:click="updateSelectedCollection(coll._id)"
                >
                    <p class="name">{{ coll.name }}</p>
                    <p class="description">{{ coll.description }}</p>
                </div>
            </div>
        </div>
        <div class="my-words section" v-if="selectedCollection !== null">
            <h1>{{ selectedCollection.name }}</h1>
            <div class="collection-list items-list">
                <InsertWord
                    v-bind:collectionId="selectedCollection._id"
                    msg="ciaone"
                    v-on:wordCreated="updateSelectedCollection($event)"
                />
                <div
                    class="collection-item item"
                    v-for="word in selectedCollection.words"
                    :key="word._id"
                >
                    <p class="description">{{ word.original }}</p>
                    <p class="description">{{ word.translation }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InsertWord from '@/components/InsertWord.vue';
import * as Models from '@/models';
import * as collectionServices from '@/services/collection.services';

export default defineComponent({
    name: 'Home',
    data: () => {
        return {
            collections: [] as Models.Collection[],
            selectedCollectionId: null as string | null,
            selectedCollection: null as Models.Collection | null,
        }
    },
    components: {
        InsertWord
    },
    created: async function () {
        try {
            this.$data.collections = await collectionServices.getMyCollections();
        } catch (err) {
            console.log(err.info);
        }
    },
    methods: {
        updateSelectedCollection: async function (collId: string) {
            if (collId) {
                console.log(collId)
                this.$data.selectedCollectionId = collId;
                try {
                    this.$data.selectedCollection = await collectionServices.getCollectionById(this.$data.selectedCollectionId);
                } catch (err) {
                    console.log(err.info);
                }
            }
        }
    }
});
</script>

<style scoped lang="scss">
.collection-page {
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 50% 50%;
    height: 100%;

    h1 {
        text-align: center;
    }

    .section {
        overflow: auto;
        .items-list {
            margin: 1em;
            .item {
                border-bottom: 1px solid black;
                padding: 1em;
                cursor: pointer;
                transition: 0.3s ease background-color;

                &:hover,
                &.active {
                    background-color: #333;
                }

                p {
                    margin: 0;
                    &.name {
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                }
            }
        }
    }
}
</style>