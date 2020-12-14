<template>
    <div class="collection-page">
        <div class="my-collections section">
            <h1>My collections</h1>
            <InsertCollection
                class="form"
                @collectionCreated="updateCollections($event)"
            />
            <div v-for="k in getCollectionsKeys()" :key="k">
                <h3>{{k}}</h3>
                <div class="collection-list items-list">
                    <div
                        class="collection-item item"
                        v-for="coll in collections[k]"
                        :key="coll._id"
                        :class="
                            coll._id === selectedCollectionId ? 'active' : ''
                        "
                        @click="updateSelectedCollection(coll._id, myCollectionTag === k)"
                    >
                        <img
                            v-if="myCollectionTag === k"
                            src="../assets/icons/delete.svg"
                            @click.stop="deleteCollection(coll._id)"
                        />
                        <img
                            v-if="myCollectionTag === k"
                            src="../assets/icons/share.svg"
                            @click.stop="shareCollection(coll._id)"
                        />
                        <img
                            src="../assets/icons/statistics.svg"
                            v-on:click.stop="statsCollection(coll._id)"
                        />
                        <p class="name">{{ coll.name }}</p>
                        <p class="description">{{ coll.description }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-words section" v-if="selectedCollection !== null">
            <h1>{{ selectedCollection.name }}</h1>
            <InsertWord
                v-if="openedIsMine"
                class="form"
                :collectionId="selectedCollection._id"
                @wordCreated="updateSelectedCollection($event)"
            />
            <div class="collection-list items-list">
                <div
                    class="collection-item item"
                    v-for="word in selectedCollection.words"
                    :key="word._id"
                >
                    <img
                        v-if="openedIsMine"
                        src="../assets/icons/delete.svg"
                        @click.stop="
                            deleteWord(selectedCollection._id, word._id)
                        "
                    />
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
import InsertCollection from '@/components/InsertCollection.vue';
import * as Models from '@/models';
import * as collectionServices from '@/services/collection.services';
import * as shareServices from '@/services/share.services';
import router from '@/router';

export default defineComponent({
    name: 'Home',
    data: () => {
        return {
            myCollectionTag: 'Mine',
            collections: { } as { [from: string]: Models.Collection[] },
            selectedCollectionId: null as string | null,
            selectedCollection: null as Models.Collection | null,
            openedIsMine: false
        }
    },
    components: {
        InsertWord, InsertCollection
    },
    created: async function () {
        await this.updateCollections();
    },
    methods: {
        getCollectionsKeys: function(): string[] {
            const res = Object.keys(this.$data.collections);
            return res;
        },
        updateCollections: async function () {
            try {
                const mineTag = this.$data.myCollectionTag;
                this.$data.collections = {};
                const colls = await collectionServices.getAllCollections();
                const separetedColls: { [from: string]: Models.Collection[] } =  { };
                separetedColls[mineTag] = [];
                for (const c of colls) {
                    const k = c.inClassName ?? mineTag
                    if (separetedColls[k]) {
                        separetedColls[k].push(c);
                    } else {
                        separetedColls[k] = [c];
                    }
                }
                this.$data.collections = separetedColls;
            } catch (err) {
                console.log(err.info);
            }
        },
        updateSelectedCollection: async function (collId: string, mine: boolean) {
            this.$data.openedIsMine = mine;
            if (collId) {
                this.$data.selectedCollectionId = collId;
                try {
                    this.$data.selectedCollection = await collectionServices.getCollectionById(this.$data.selectedCollectionId);
                } catch (err) {
                    console.log(err.info);
                }
            }
        },
        deleteCollection: async function (collId: string) {
            if (!collId)
                return;
            if (this.$data.selectedCollectionId === collId) {
                this.$data.selectedCollectionId = null;
                this.$data.selectedCollection = null;
            }
            try {
                await collectionServices.deleteCollection(collId);
            } catch (err) {
                console.log(err.info);
            }
            this.updateCollections();
        },
        deleteWord: async function (collId: string, wordId: string) {
            if (!collId || !wordId)
                return;
            try {
                await collectionServices.deleteWord(collId, wordId);
            } catch (err) {
                console.log(err.info);
            }
            this.updateSelectedCollection(collId, true);
        },
        shareCollection: async function (collId: string) {
            if (!collId)
                return;
            try {
                const urlParts = (await shareServices.shareCollection(collId)).split('/');
                const id = urlParts[urlParts.length - 1];
                const importUrl = `${window.location.origin}/#/import/${collId}`
                navigator.clipboard.writeText(importUrl);
                alert(`Collection shared, url copied in the clipboard or use:\n${importUrl}`)
            } catch (err) {
                console.log(err.info);
            }
        },
        statsCollection: async function (collId: string) {
            if (!collId)
                return;
            router.push(`/stats/${collId}`);
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
        max-width: 600px;
        width: 90%;
        margin: auto inherit;
        padding: 0 1em;
        overflow: auto;
        justify-self: center;

        h3 {
            padding: 5px;
            padding-left: 2em;
            border-bottom: 1px solid white;
        }

        .items-list {
            margin: 1em 0;
            .item {
                border-bottom: 1px solid black;
                margin: 0 0.5em;
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

                img {
                    width: 25px;
                    float: right;
                    padding: 0.4em;
                    cursor: pointer;
                    border-radius: 3px;
                    filter: invert(1);
                    &:hover {
                        background-color: #ddd;
                    }
                }
            }
        }
    }
}
</style>