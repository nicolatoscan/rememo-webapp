<template>
    <div class="collection-page">
        <div
            class="my-collections section form"
            :class="selectedCollection !== null ? 'closed-small-screen' : ''"
        >
            <h1>My collections</h1>
            <InsertCollection @collectionCreated="updateCollections($event)" />
            <div v-for="k in getCollectionsKeys()" :key="k">
                <h3>{{ k }}</h3>
                <ul class="lista clickable">
                    <li
                        class="collection-item item"
                        v-for="(coll, index) in collections[k]"
                        :key="coll._id"
                        :class="
                            coll._id === selectedCollectionId ? 'active' : ''
                        "
                        @click="
                            updateSelectedCollection(
                                coll._id,
                                myCollectionTag === k
                            )
                        "
                    >
                        <div class="list-content">
                            <p class="title">{{ coll.name }}</p>
                            <p class="description">{{ coll.description }}</p>
                        </div>
                        <div class="actions">
                            <p
                                v-if="myCollectionTag === k"
                                :aria-label="shareBallonStatus[index]"
                                data-balloon-pos="up"
                                :data-balloon-visible="
                                    shareBallonStatus[index] ? 'true' : 'false'
                                "
                                @click.stop="shareCollection(coll._id, index)"
                            >
                                Share
                            </p>
                            <p @click.stop="statsCollection(coll._id)">
                                Stats
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div
            class="my-words section form"
            v-if="selectedCollection !== null"
            :class="selectedCollection === null ? 'closed-small-screen' : ''"
        >
            <button class="close-button" @click="closeCollection()">X</button>
            <div class="header">
                <div class="titles">
                    <h1>{{ selectedCollection.name }}</h1>
                    <p>{{ selectedCollection.description }}</p>
                </div>
                <div class="titles editing-area" v-if="editingCollection">
                    <label for="">Name</label>
                    <input
                        class="editing"
                        type="text"
                        name="collection-name"
                        v-model="editing.name"
                    />
                    <label for="">Description</label>
                    <input
                        class="editing"
                        type="text"
                        name="collection-description"
                        v-model="editing.description"
                    />
                </div>
                <div v-if="openedIsMine" class="actions line">
                    <p
                        :aria-label="shareBallonStatusOnCollPage"
                        data-balloon-pos="up"
                        :data-balloon-visible="shareBallonStatusOnCollPage ? 'true' : 'false'"
                        v-if="!editingCollection"
                        @click.stop="shareCollection(selectedCollection._id, undefined)"
                    >
                        Share
                    </p>
                    <p
                        v-if="!editingCollection"
                        @click.stop="statsCollection(selectedCollection._id)"
                    >
                        Stats
                    </p>
                    <p
                        v-if="!editingCollection"
                        @click="editingCollection = true"
                    >
                        Edit Name
                    </p>
                    <p
                        v-if="!editingCollection"
                        @click="deleteCollection(selectedCollection._id)"
                    >
                        Delete
                    </p>
                    <p
                        v-if="editingCollection"
                        @click="editingCollection = false"
                    >
                        Cancel
                    </p>
                    <p
                        v-if="editingCollection"
                        @click="updateCollectionInfo(selectedCollection._id)"
                    >
                        Save
                    </p>
                </div>
            </div>
            <InsertWord
                v-if="openedIsMine"
                class="insert-modal"
                :collectionId="selectedCollection._id"
                @wordCreated="updateSelectedCollection($event, openedIsMine)"
            />
            <ul class="lista">
                <li
                    class="collection-item item"
                    v-for="word in selectedCollection.words"
                    :key="word._id"
                >
                    <div class="list-content">
                        <p class="title">{{ word.original }}</p>
                        <p class="description">{{ word.translation }}</p>
                    </div>
                    <div class="actions">
                        <p
                            v-if="openedIsMine"
                            @click.stop="
                                deleteWord(selectedCollection._id, word._id)
                            "
                        >
                            Delete
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="full-screen-message closed-small-screen">
            <p>Select a collection</p>
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
            collections: {} as { [from: string]: Models.Collection[] },
            selectedCollectionId: null as string | null,
            selectedCollection: null as Models.Collection | null,
            openedIsMine: false,
            shareBallonStatus: {} as { [index: number]: string },
            editingCollection: false,
            shareBallonStatusOnCollPage: '',
            editing: {
                name: '',
                description: ''
            }
        }
    },
    components: {
        InsertWord, InsertCollection
    },
    created: async function () {
        await this.updateCollections();
    },
    methods: {
        getCollectionsKeys: function (): string[] {
            return Object.keys(this.$data.collections);
        },
        updateCollections: async function () {
            try {
                const mineTag = this.$data.myCollectionTag;
                this.$data.collections = await collectionServices.getAllCollectionsByClass(mineTag);
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
                    this.$data.editing.name = this.$data.selectedCollection.name;
                    this.$data.editing.description = this.$data.selectedCollection.description;
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
        shareCollection: async function (collId: string, index: number | undefined = undefined) {
            if (!collId)
                return;
            if (index !== undefined)
                this.$data.shareBallonStatus[index] = 'Loading ... ';
            else
                this.$data.shareBallonStatusOnCollPage = 'Loading ... ';
            let url = '';
            try {
                url = (await shareServices.shareCollection(collId));
            } catch (ex) {
                if (index !== undefined) {
                    this.$data.shareBallonStatus[index] = 'Error sharing collectios';
                    setTimeout(() => this.$data.shareBallonStatus[index] = '', 1000);
                } else {
                    this.$data.shareBallonStatusOnCollPage = 'Error sharing collectios';
                    setTimeout(() => this.$data.shareBallonStatusOnCollPage = '', 1000);

                }
                console.log('Error sharing collectios');
                return;
            }
            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 1];
            const importUrl = `${window.location.origin}/#/import/${collId}`
            navigator.clipboard.writeText(importUrl);
            if (index !== undefined) {
                this.$data.shareBallonStatus[index] = 'Link copied to clipboard!';
                setTimeout(() => this.$data.shareBallonStatus[index] = '', 1000);
            } else {
                this.$data.shareBallonStatusOnCollPage = 'Link copied to clipboard!';
                setTimeout(() => this.$data.shareBallonStatusOnCollPage = '', 1000);
            }
        },
        statsCollection: async function (collId: string) {
            if (!collId)
                return;
            router.push(`/stats/${collId}`);
        },
        updateCollectionInfo: async function (collId: string) {
            if (this.editingCollection && collId && this.$data.editing.name && this.$data.editing.description) {
                this.$data.editingCollection = false;
                await collectionServices.updateCollection(collId, this.$data.editing.name, this.$data.editing.description);
                this.updateSelectedCollection(collId, true);
            }
        },
        closeCollection: function () {
            this.$data.selectedCollectionId = null;
            this.$data.selectedCollection = null;
        }
    }
});
</script>

<style scoped lang="scss">
@media screen and (max-width: 900px) {
    .closed-small-screen {
        display: none;
    }
    .collection-page {
        display: flex !important;
    }
}

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
        margin: 3em;
        padding: 1em;
        overflow: auto;
        justify-self: center;

        h3 {
            padding: 5px;
            padding-left: 2em;
            border-bottom: 1px solid white;
        }
    }
}

.close-button {
    float: right;
    position: relative;
    cursor: pointer;
}
</style>