<template>
<canvas ref="chart" width="400" height="200"></canvas>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Chart from 'chart.js'
import * as Models from '@/models';
import * as statsServices from '@/services/stats.services';

export default defineComponent({
    name: 'ClassStatsGraph',
    data: () => {
        return {
            chart: null as Chart | null,
            classStats: null as Models.ClassStats | null
        }
    },
    props: {
        classId: String,
        selectedCollection: String
    },
    mounted: async function () {
        if (this.$props.classId) {
            this.$data.classStats = await statsServices.getClassStats(this.$props.classId);
            this.loadChart();
        }
    },
    methods: {
        loadChart: function(collectionId: string | null = null) {
            if (!this.$data.classStats)
                return;
            
            const classStats = this.$data.classStats;
            console.log(classStats);
            
            const ctx = (this.$refs["chart"] as HTMLCanvasElement).getContext('2d');
            if (ctx) {
                let labels: string[] = [];
                let xValues: number[] = [];
                let yValues: number[] = [];

                if (collectionId && classStats.collections[collectionId]) {
                    const collStats = classStats.collections[collectionId];
                    let idNamesWords = Object.keys(collStats.words).map(k => ({ id: k, name: collStats.words[k].name }));
                    labels = idNamesWords.map(x => x.name);
                    xValues = idNamesWords.map(x => collStats.words[x.id].correct);
                    yValues = idNamesWords.map(x => collStats.words[x.id].wrong);
                } else {
                    let idNamesColls = Object.keys(classStats.collections).map(k => ({ id: k, name: classStats.collections[k].name }));
                    labels = idNamesColls.map(x => x.name);
                    xValues = idNamesColls.map(x => classStats.collections[x.id].correct);
                    yValues = idNamesColls.map(x => -classStats.collections[x.id].wrong);
                }

                this.$data.chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Right',
                            data: xValues,
                            backgroundColor: 'Green'
                        }, 
                        {
                            label: 'Wrong',
                            data: yValues,
                            backgroundColor: 'Red'
                        }]
                    },
                    options: { scales: { xAxes: [{ ticks: { beginAtZero: true } } ] } }
                });
            }
        }
    },
    watch: {
        selectedCollection: function(val: string) {
            this.loadChart(val);
            
        }
    }
})
</script>