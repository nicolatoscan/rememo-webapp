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
            <div v-if="currentWord">
                <p>{{ currentWord.original }}</p>
                <input v-model="answer" type="text" />
            </div>
            <button v-on:click="check()">> Check</button>
            <button v-on:click="closeTraining()">X Close</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CollectionsSelector from '@/components/CollectionsSelector.vue';
import * as trainServices from '@/services/study/train.services';
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
            selectedCollectionsIds: [] as string[],
            currentWord: null as Models.Word | null,
            answer: ''
        }
    },
    components: {
        CollectionsSelector
    },
    created: async function () {
    },
    methods: {
        collectionsSelected: function (idsSelected: string[]) {
            this.$data.currentStatus = EStatus.Training;
            this.$data.selectedCollectionsIds = idsSelected;
            this.getNextWord();
        },
        closeTraining: function () {
            this.$data.currentStatus = EStatus.SelectingCollection;
            this.$data.selectedCollectionsIds = [];
        },
        check: async function () {
            const word = this.$data.currentWord
            if (word) {
                if (word.translation.toLowerCase().trim() == this.$data.answer.toLowerCase().trim()) {
                    trainServices.saveWord(word._id!, word._id!, true);
                    console.log('OK');
                } else {
                    trainServices.saveWord(word._id!, word._id!, false);
                    console.log('ERROR');
                }
                this.getNextWord();
                this.$data.answer = '';
            }
        },
        getNextWord: async function () {
            this.$data.currentWord = await trainServices.nextWord(this.$data.selectedCollectionsIds);
        }
    }
});
</script>

<style scoped lang="scss">
</style>