<template>
    <div class="train-page">
        Train page
        <CollectionsSelector confirmButtonText="Next" v-on:confirm="collectionsSelected($event)" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CollectionsSelector from '@/components/CollectionsSelector.vue';
import * as Models from '@/models';

export default defineComponent({
    name: 'Home',
    data: () => {
        return {
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
        } 
    }
});
</script>

<style scoped lang="scss">
.train-page {
}
</style>