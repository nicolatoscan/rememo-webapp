<template>
    <div class="train-page">
        <CollectionsSelector
            v-if="currentStatus === EStatus.SelectingCollection"
            confirmButtonText="Next"
            :minWords="3"
            v-on:confirm="collectionsSelected($event)"
        />
        <div v-if="currentStatus === EStatus.SelectingLenght" class="lenght-selector form">
            <label for="lenghtTestInput">Test lenght</label>
            <input id="lenghtTestInput" type="number" min="0" max="100" v-model="testLenght" />
            <div class="buttons">
                <button v-on:click="startTest()">Start Test</button>
            </div>
        </div>
        <div v-if="currentStatus === EStatus.Testing && test" class="training-word">
            <div>
                <AskWord 
                    v-for="(question, index) in test.questions"
                    :key="index"
                    :word="question.question"
                    v-model="question.answer"
                />
            </div>
            <div class="buttons">
                <button v-on:click="exitTest()">X Close</button>
                <button v-on:click="check()">Check</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CollectionsSelector from '@/components/CollectionsSelector.vue';
import AskWord from '@/components/AskWord.vue';
import * as testServices from '@/services/study/test.services';
import * as Models from '@/models';

enum EStatus {
    SelectingCollection,
    SelectingLenght,
    Testing
}

export default defineComponent({
    name: 'Test',
    data: () => {
        return {
            EStatus: EStatus,
            currentStatus: EStatus.SelectingCollection,
            selectedCollectionsIds: [] as string[],
            testLenght: 10,
            test: null as Models.Test | null,
        }
    },
    components: {
        CollectionsSelector, AskWord
    },
    created: async function () {
    },
    methods: {
        collectionsSelected: function (idsSelected: string[]) {
            this.$data.selectedCollectionsIds = idsSelected;
            this.$data.currentStatus = EStatus.SelectingLenght;
        },
        startTest: async function () {
            this.$data.test = await testServices.generateTest(this.$data.selectedCollectionsIds, this.$data.testLenght);
            this.$data.currentStatus = EStatus.Testing;
        },
        exitTest: function () {
            this.$data.currentStatus = EStatus.SelectingCollection;
            this.$data.selectedCollectionsIds = [];
        },
        check: async function () {
            const test = this.$data.test;
            if (test) {
                const testResult = await testServices.checkTest(test);
                console.log(testResult);
            }

        }
    }
});
</script>

<style scoped lang="scss">
.train-page {
    padding: 1em;

    .buttons {
        margin: 1em;
        text-align: center;
    }
}
</style>