<template>
    <div class="train-page">
        <CollectionsSelector
            v-if="currentStatus === EStatus.SelectingCollection"
            confirmButtonText="Next"
            :minWords="3"
            @confirm="collectionsSelected($event)"
        />
        <div v-if="currentStatus === EStatus.Training" class="training-word">
            <div v-if="currentWord">
                <AskWord
                    :word="currentWord.original"
                    :answer="currentWord.translation"
                    :showAnswer="showingAnswer"
                    :status="currentAnswerStatus"
                    v-model="answer"
                />
            </div>
            <div class="buttons">
                <button @click="closeTraining()">X Close</button>
                <button @click="showAnswer()">Show answer</button>
                <button @click="check()" :class="resultCSSClassColor">Check</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CollectionsSelector from '@/components/CollectionsSelector.vue';
import AskWord from '@/components/AskWord.vue';
import * as trainServices from '@/services/study/train.services';
import * as Models from '@/models';

enum EStatus {
    SelectingCollection,
    Training
}

export default defineComponent({
    name: 'Train',
    data: () => {
        return {
            EStatus: EStatus,
            EAnswerStatus: Models.EAnswerStatus,
            currentStatus: EStatus.SelectingCollection,
            currentAnswerStatus: Models.EAnswerStatus.None,
            selectedCollectionsIds: [] as string[],
            currentWord: null as Models.FullWord | null,
            answer: '',
            resultCSSClassColor: '',
            firstTry: false,
            showingAnswer: false
        }
    },
    components: {
        CollectionsSelector, AskWord
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
        check: function () {
            const word = this.$data.currentWord;
            if (word) {
                const result = word.translation.toLowerCase().trim() == this.$data.answer.toLowerCase().trim();
                this.$data.resultCSSClassColor = result ? 'correct' : 'error';
                this.$data.currentAnswerStatus = result ? this.EAnswerStatus.Correct : this.EAnswerStatus.Wrong;
                if (this.$data.firstTry) {
                    trainServices.saveWord(word.collectionId, word._id!, result);
                    this.$data.firstTry = false;
                }
                if (result) {
                    this.getNextWord();
                }
                setTimeout(() => {
                    this.$data.resultCSSClassColor = '';
                    this.$data.currentAnswerStatus = this.EAnswerStatus.None;
                }, 600);
            }
        },
        showAnswer: function () {
            const word = this.$data.currentWord;
            if (word) {
                if (this.$data.firstTry) {
                    trainServices.saveWord(word.collectionId, word._id!, false);
                    this.$data.firstTry = false;
                }
                this.$data.showingAnswer = true;
            }
        },
        getNextWord: async function () {
            this.$data.currentWord = await trainServices.nextWord(this.$data.selectedCollectionsIds);
            this.$data.firstTry = true;
            this.$data.showingAnswer = false;
            this.$data.answer = '';
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