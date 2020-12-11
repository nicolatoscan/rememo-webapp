<template>
<canvas ref="chart" width="400" height="400"></canvas>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import * as Models from '@/models';
import Chart from 'chart.js'


export default defineComponent({
    name: 'BarChart',
    data: () => {
        return {
            chart: null as Chart | null
        }
    },
    props: {
        dataSet: {
            type: Array,
            default: [{
                label: 'ciao',
                right: 10,
                wrong: -5
            }]
        },
    },
    render: function() {
        console.log('Render')
    },
    mounted: function () {
        console.log('Mounted')
        this.loadChart();
    },
    methods: {
        getDataset: function () {
            return this.$props.dataSet as Models.DataChart[];
        },
        loadChart: function () {
            const ctx = (this.$refs["chart"] as HTMLCanvasElement).getContext('2d');
            if (ctx) {
                this.$data.chart = new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: this.getDataset().map(d => d.label),
                        datasets: [{
                            label: 'Right',
                            data: this.getDataset().map(d => d.right),
                            backgroundColor: 'Green'
                        }, 
                        {
                            label: 'Wrong',
                            data: this.getDataset().map(d => d.wrong),
                            backgroundColor: 'Red'
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            }
        }
    }
})
</script>