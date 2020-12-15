<template>
    <div class="learn-page">
        <CollectionsSelector
            v-if="currentStatus === AppStatus.SelectingCollection"
            :multiSelect="false"
            @collectionUpdated="receiveSelectedCollection($event)"
        />
        <div v-if="currentStatus === AppStatus.ChoosenCollection" class="form">
            <div class="buttons">
                <button @click="startLearn()">Start Learn</button>
                <button @click="resetCollectionState()">Reset</button>
            </div>
        </div>
        <div v-if="(currentStatus === AppStatus.LearningCollection)" class="training-word">
            <div>
                <AskWord 
                    :word="currentWord.original"
                    :answer="currentWord.translation"
                    :showAnswer="showingAnswer"
                    :status="currentAnswerStatus"
                    v-model="answer"
                />
            </div>
            <div class="buttons">
                <div>
                    <h3 v-if="!completed()" style="color: purple">The collection has not been studied completely</h3>
                    <h3 v-else style="color: green">The colleciton has been studied successfully</h3>
                </div>
                <button @click="exitLearn()" v-if="currentStatus === AppStatus.LearningCollection" >Close</button>
                <button @click="showAnswer()">Show answer</button>
                <button @click="checkLearn()" v-if="currentStatus === AppStatus.LearningCollection" :class="resultCSSClassColor" >Check</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CollectionsSelector from '@/components/CollectionsSelector.vue';
import AskWord from '@/components/AskWord.vue';
import * as learnServices from '@/services/study/learn.services';
import * as collectionServices from '@/services/collection.services'
import * as Models from '@/models';

enum AppStatus {
    SelectingCollection,
    ChoosenCollection,
    LearningCollection
}

export default defineComponent({
    name: 'Learn',
    data: () => {
        return {
            AppStatus: AppStatus,
            EAnswerStatus: Models.EAnswerStatus,
            currentStatus: AppStatus.SelectingCollection,
            selectedCollectionId: "" as string,
            collectionToLearn: undefined as Models.Collection | undefined,
            collectionToLearnState: [] as Models.LearnStatus[],
            currentWord: undefined as Models.Word | undefined,
            currentWordState: undefined as Models.LearnStatus | undefined,
            currentAnswerStatus: Models.EAnswerStatus.None,
            counterWrongAnswers: 0 as number,
            showingAnswer: false,
            resultCSSClassColor: '',
            answer: ''
        }
    },
    components: {
        CollectionsSelector, AskWord
    },
    created: async function () {
    },
    methods: {
        receiveSelectedCollection: function (idSelected: string) {
            this.$data.selectedCollectionId = idSelected;
            this.$data.currentStatus = AppStatus.ChoosenCollection;
        },
        startLearn: async function () {
            this.$data.collectionToLearn = await collectionServices.getCollectionById(this.$data.selectedCollectionId);
            this.$data.collectionToLearnState = await learnServices.getCollectionLearnState(this.$data.selectedCollectionId);
            this.$data.collectionToLearnState.sort((a,b) => (a.learned < b.learned) ? -1 : ((a.learned > b.learned) ? 1 : 0));
            this.$data.currentWordState = this.$data.collectionToLearnState[0];
            this.$data.currentWord = this.$data.collectionToLearn.words.find(word => word._id === this.$data.currentWordState?.wordId);
            this.$data.currentStatus = AppStatus.LearningCollection;
        },
        resetCollectionState: async function () {
            await learnServices.resetCollectionLearnState(this.$data.selectedCollectionId);
        },
        exitLearn: function () {
            this.$data.currentStatus = AppStatus.SelectingCollection;
            this.$data.selectedCollectionId = "";
            this.$data.answer = "";
            this.$data.collectionToLearn = undefined;
            this.$data.collectionToLearnState = [];
        },
        checkLearn: async function () {
            const word = this.$data.currentWord;
            const wordState = this.$data.currentWordState;
            if(this.$data.showingAnswer) {
                this.$data.showingAnswer = false;
            }
            if (word) {
                const isCorrectAnswer = word.translation.toLowerCase().trim() === this.$data.answer.toLowerCase().trim();
                this.$data.resultCSSClassColor = isCorrectAnswer ? 'correct' : 'error';
                this.$data.currentAnswerStatus = isCorrectAnswer ? this.EAnswerStatus.Correct : this.EAnswerStatus.Wrong;
                if (isCorrectAnswer) {
                    if (wordState) {
                        wordState.learned += (1/10);
                        if (wordState.learned > 1.0) {
                            wordState.learned = 1.0;
                        }
                        await learnServices.updateWordLearnState(this.$data.selectedCollectionId, wordState.wordId, wordState.learned);
                        this.$data.collectionToLearnState.push((this.$data.collectionToLearnState.shift()) as Models.LearnStatus);
                        this.$data.collectionToLearnState[this.$data.collectionToLearnState.length - 1].learned = wordState.learned;
                        this.$data.currentWordState = this.$data.collectionToLearnState[0];
                        this.$data.currentWord = this.$data.collectionToLearn?.words.find(word => word._id === this.$data.currentWordState?.wordId);
                    }
                } else {
                    if(wordState) {
                        wordState.learned -= (1/4);
                        if (wordState.learned < 0) {
                            wordState.learned = 0;
                        }
                        this.$data.counterWrongAnswers++;
                        await learnServices.updateWordLearnState(this.$data.selectedCollectionId, wordState.wordId, wordState.learned);
                        if (this.$data.counterWrongAnswers === 2) {
                            this.$data.counterWrongAnswers = 0;
                            this.$data.collectionToLearnState.push((this.$data.collectionToLearnState.shift()) as Models.LearnStatus);
                            this.$data.collectionToLearnState[this.$data.collectionToLearnState.length - 1].learned = wordState.learned;
                            this.$data.currentWordState = this.$data.collectionToLearnState[0];
                            this.$data.currentWord = this.$data.collectionToLearn?.words.find(word => word._id === this.$data.currentWordState?.wordId);
                        }
                    }
                }
                this.$data.answer = '';
                setTimeout(() => {
                    this.$data.resultCSSClassColor = '';
                    this.$data.currentAnswerStatus = this.EAnswerStatus.None;
                }, 600);
            }
        },
        showAnswer() {
            const word = this.$data.currentWord;
            if (word) {
                this.$data.showingAnswer = true;
            }
        },
        completed: function () : boolean {
            return this.$data.collectionToLearnState.every((a) => a.learned > 0.75);
        }
    }
});
</script>

<style scoped lang="scss">
.learn-page {
    padding: 1em;

    .buttons {
        margin: 1em;
        text-align: center;
    }
}
</style>