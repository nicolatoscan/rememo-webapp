<template>
    <div class="stats insert-modal">
        <p>corrette = {{correct}}</p>
        <p>sbagliate = {{wrong}}</p>
        <table class="table">
            <tr>
                <th> nome </th>
                <th> corrette</th>
                <th> sbagliate</th>
            </tr>
            <tr v-for="word in words" :key="word._id">
                <td> {{word.name}}</td>
                <td> {{word.correct}}  </td>
                <td>{{word.wrong}}</td>           
            </tr> 
            
        </table>
    
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Models from '@/models';


export default defineComponent({
    name: 'PlotStats',
    props : {
        correct: Number,
        wrong: Number,
        words:  Array   
         },
    data: () => {
        return {
            
        }
    },
    methods: {
        
    },
});
</script>

<style scoped lang="scss">
    .table{
         width: 100%;
         text-align: center;
    }
</style>
