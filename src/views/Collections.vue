<template>
    <div class="collection-page">
        <div class="my-collections section form">
            <h1>My collections</h1>
            <InsertCollection
                @collectionCreated="updateCollections($event)"
            />
            <div v-for="k in getCollectionsKeys()" :key="k">
                <h3>{{k}}</h3>
                <ul class="lista clickable">
                    <li
                        class="collection-item item"
                        v-for="(coll, index) in collections[k]"
                        :key="coll._id"
                        :class="
                            coll._id === selectedCollectionId ? 'active' : ''
                        "
                        @click="updateSelectedCollection(coll._id, myCollectionTag === k)"
                    >
                        <div class="list-content">
                            <p class="title">{{ coll.name }}</p>
                            <p class="description">{{ coll.description }}</p>
                        </div>
                        <div class="actions">
                            <p v-if="myCollectionTag === k"
                                @click.stop="deleteCollection(coll._id)"
                            >Delete</p>
                            <p v-if="myCollectionTag === k"
                                :aria-label="shareBallonStatus[index]"
                                data-balloon-pos="up"
                                :data-balloon-visible="shareBallonStatus[index] ? 'true': 'false'"
                                @click.stop="shareCollection(coll._id, index)"
                            >Share</p>
                            <p v-on:click.stop="statsCollection(coll._id)"
                            >Stats</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="my-words section form" v-if="selectedCollection !== null">
            <h1>{{ selectedCollection.name }}</h1>
            <InsertWord
                v-if="openedIsMine"
                class="form"
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
                        <p v-if="openedIsMine"
                            @click.stop="deleteWord(selectedCollection._id, word._id)"
                        >Delete</p>
                    </div>
                </li>
            </ul>
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
            openedIsMine: false,
            shareBallonStatus: {} as { [index: number]: string }
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
        shareCollection: async function (collId: string, index: number) {
            if (!collId)
                return;
            this.$data.shareBallonStatus[index] = 'Loading ... ';
            let url = '';
            try {
                url = (await shareServices.shareCollection(collId));
            } catch (ex) {
                this.$data.shareBallonStatus[index] = 'Error sharing collectios';
                console.log('Error sharing collectios');
                setTimeout(() => this.$data.shareBallonStatus[index] = '', 1000);
                return;
            }
            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 1];
            const importUrl = `${window.location.origin}/#/import/${collId}`
            navigator.clipboard.writeText(importUrl);
            this.$data.shareBallonStatus[index] = 'Link copied to clipboard!';
            setTimeout(() => this.$data.shareBallonStatus[index] = '', 1000);
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
        margin: 3em;
        padding: 0 1em;
        overflow: auto;
        justify-self: center;

        h3 {
            padding: 5px;
            padding-left: 2em;
            border-bottom: 1px solid white;
        }
    }
}
</style>