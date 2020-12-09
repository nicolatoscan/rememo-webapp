<template>
<div class="wrapper form">
    <p>{{ word }}</p>
    <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :disabled="status !== EAnswerStatus.None"
        :class="status !== EAnswerStatus.None ? (status === EAnswerStatus.Correct ? 'correct' : 'error') : ''"
        type="text" />
    <p v-if="showAnswer">The correct answer is: {{ answer }}</p>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Models from '@/models';

export default defineComponent({
    name: 'AskWord',
    props: {
        word: String,
        modelValue: String,
        answer: {
            type: String,
            default: ''
        },
        showAnswer: {
            type: Boolean,
            default: false
        },
        status: {
            type: Number,
            default: -1
        }
    },
    data: () => {
        return {
            EAnswerStatus: Models.EAnswerStatus
        }
    },
    emits: ['update:modelValue'],

});
</script>

<style scoped lang="scss">
@import "../style/_variables.scss";

.wrapper {
    padding: 1em;
    padding-bottom: 1.5em;
    text-align: center;
    p, input {
        font-size: 1.5em;
        text-align: center;
        width: 90%;
        display: inline-block;
        margin: 0.5em;
    }
    input {
        background-color: white;
        transition: background-color 0.3s ease;
        &.correct {
            background-color: #4F4;
        }
        &.error {
            background-color: #F44;
        }
    }
}

</style>
