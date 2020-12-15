<template>
    <div class="study-page">
        <div v-if="currentStatus === EStatus.SelectingCollection" class="form">
            <CollectionsSelector
                class="option-section"
                :multiSelect="true"
                @collectionUpdated="updateSelectedCollections($event)"
            />
            <div class="option-section">
                <h2 for="lenghtTestInput">Test lenght</h2>
                <input type="number" min="0" max="100" v-model="testLenght" />
                <div class="buttons">
                    <button @click="startTest()" :disabled="selectedCollectionsIds.length === 0">Start Test</button>
                </div>
            </div>
        </div>
        <div v-if="test && (currentStatus === EStatus.Testing || currentStatus === EStatus.Checking)" class="form">
            <div class="option-section">
                <AskWord 
                    v-for="(question, index) in test.questions"
                    :key="index"
                    :word="question.question"
                    :status="currentStatus !== EStatus.Checking ? EAnswerStatus.None : (question.result ? EAnswerStatus.Correct : EAnswerStatus.Wrong)"
                    :showAnswer="!question.result && currentStatus === EStatus.Checking"
                    :answer="question.correct"
                    v-model="question.answer"
                />
            </div>
            <div class="buttons">
                <button @click="check()" :disabled="!completed()" v-if="currentStatus === EStatus.Testing" >Check</button>
                <button @click="exitTest()" v-if="currentStatus === EStatus.Checking" >Close</button>
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
    Testing,
    Checking
}

export default defineComponent({
    name: 'Test',
    data: () => {
        return {
            EStatus: EStatus,
            EAnswerStatus: Models.EAnswerStatus,
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
        updateSelectedCollections: function(ids: string[]) {
            this.$data.selectedCollectionsIds = ids;
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
                this.$data.test = testResult;
                this.$data.currentStatus = EStatus.Checking;
            }
        },
        completed: function () : boolean {
            return this.$data.test?.questions.every(q => q.answer) ?? false;
        }
    }
});
</script>

<style scoped lang="scss">
</style>