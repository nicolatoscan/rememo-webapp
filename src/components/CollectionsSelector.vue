<template>
<div>
    <h2>Select collections</h2>
    <div class="collection-list">
        <p class="error-message" v-if="errorMsg">{{ errorMsg }}</p>
        <div class="class-wrapper" v-for="k in getCollectionsKeys()" :key="k">
            <p class="title">{{ k }}</p>
            <ul>
                <li v-for="coll in collections[k]" :key="coll._id">
                    <input
                        v-if="multiSelect"
                        :id="coll._id"
                        :value="coll._id"
                        name="collection"
                        type="checkbox"
                        v-model="selectedCollections"
                    />
                    <input
                        v-else
                        :id="coll._id"
                        :value="coll._id"
                        name="collection"
                        type="radio"
                        v-model="selectedCollection"
                    />
                    <label :for="coll._id">{{ coll.name }}</label>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Models from '@/models';
import * as collectionServices from '@/services/collection.services';

export default defineComponent({
    name: 'CollectionsSelector',
    emits: ['collectionUpdated'],
    props: {
        multiSelect: { type: Boolean, default: false }
    },
    data: () => {
        return {
            collections: {} as { [from: string]: Models.Collection[] },
            selectedCollections: [] as string[],
            selectedCollection: undefined as string | undefined,
            errorMsg: '',
        };
    },
    created: async function () {
        try {
            this.$data.collections = await collectionServices.getAllCollectionsByClass();
        } catch (err) {
            console.log(err.info);
        }
    },
    methods: {
        getCollectionsKeys: function (): string[] {
            return Object.keys(this.$data.collections);
        },
        log: function (a: any) {
            console.log(JSON.stringify(a));
        },
    },
    watch: {
        selectedCollections: function (val: string[]) {
            if (this.$props.multiSelect)
                this.$emit('collectionUpdated', val);
        },
        selectedCollection: function (val: string) {
            if (!this.$props.multiSelect)
                this.$emit('collectionUpdated', val);
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../style/_variables.scss";

h2 {
    text-align: center;
}

.collection-list {
    .title {
        margin-top: 2em;
        font-size: 1.3em;
        text-align: center;
        padding: 0 1em;
        margin-bottom: 10px;
        border-bottom: 1px solid white;
    }
    .class-wrapper {
        text-align: center;
        ul {
            text-align: left;
            display: inline-block;
            list-style: none;
            padding: 1em;
            margin: 0.5em auto 1.5em;
            li {
                font-size: 1.3em;
                label {
                    padding-left: 10px;
                }
            }
        }
    }
}
</style>
