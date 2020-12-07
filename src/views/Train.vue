<template>
    <div class="train-page">
        Train page
        <CollectionsSelector
            v-if="currentStatus === EStatus.SelectingCollection"
            confirmButtonText="Next"
            :minWords="3"
            v-on:confirm="collectionsSelected($event)"
        />
        <div v-if="currentStatus === EStatus.Training" class="training-word">
            Current word

            <button v-on:click="closeTraining()">X Close</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CollectionsSelector from '@/components/CollectionsSelector.vue';
import * as Models from '@/models';

enum EStatus {
    SelectingCollection,
    Training
}

export default defineComponent({
    name: 'Home',
    data: () => {
        return {
            EStatus: EStatus,
            currentStatus: EStatus.SelectingCollection,
            selectedCollectionsIds: [] as string[]
        }
    },
    components: {
        CollectionsSelector
    },
    created: async function () {
    },
    methods: {
        collectionsSelected: function (idSelected: string[]) {
            console.log(idSelected);
            this.$data.currentStatus = EStatus.Training;
            this.$data.selectedCollectionsIds = idSelected;
        },
        closeTraining: function () {
            this.$data.currentStatus = EStatus.SelectingCollection;
            this.$data.selectedCollectionsIds = [];

        }
    }
});
</script>

<style scoped lang="scss">
</style>