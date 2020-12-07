<template>
<div class="collections-selector">
    <div class="collection-list">
        <ul>
            <li
                v-for="coll in collections"
                :key="coll._id"
            >
                <input :id="coll._id" :value="coll._id" name="collection" type="checkbox" v-model="selectedCollectionsIds" />
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
        confirmButtonText: {
            type: String,
            default: 'Confirm'
        }
    },
    data: () => {
        return {
            collections: [] as Models.Collection[],
            selectedCollectionsIds: [] as string[],
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
            this.$emit('confirm', this.selectedCollectionsIds);
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../style/_variables.scss";
</style>
