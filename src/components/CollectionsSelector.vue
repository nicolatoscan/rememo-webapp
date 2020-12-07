<template>
<div class="collections-selector">
    <div class="collection-list">
        <p v-if="errorMsg">{{ errorMsg }}</p>
        <ul>
            <li
                v-for="coll in collections"
                :key="coll._id"
            >
                <input :id="coll._id" :value="coll" name="collection" type="checkbox" v-model="selectedCollections" />
                <label :for="coll._id">{{ coll.name }}{{ coll._id }}</label>
            </li>
        </ul>
    </div>
    <button v-on:click="onButtonConfirm()">{{ confirmButtonText }}</button>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Models from '@/models';
import * as collectionServices from '@/services/collection.services';

export default defineComponent({
    name: 'CollectionsSelector',
    props: {
        confirmButtonText: { type: String, default: 'Confirm' },
        minCollections: { type: Number, default: 0 },
        minWords: { type: Number, default: 0 },
    },
    data: () => {
        return {
            collections: [] as Models.Collection[],
            selectedCollections: [] as Models.Collection[],
            errorMsg: ''
        }
    },
    created: async function () {
        try {
            this.$data.collections = await collectionServices.getMyCollections();
        } catch (err) {
            console.log(err.info);
        }
    },
    methods: {
        onButtonConfirm: function () {
            const selCollections = this.$data.selectedCollections;
            if (selCollections.length < this.$props.minCollections)
                this.$data.errorMsg = 'Not enough collections selected'
            else if (selCollections.map(c => c.words.length).reduce((a, b) => a + b, 0) < this.$props.minWords)
                this.$data.errorMsg = 'Not enough words selected'
            else
                this.$emit('confirm', selCollections.map(c => c._id));
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../style/_variables.scss";
</style>
