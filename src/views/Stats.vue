<template>
    <div v-if="collectionId" class="stats-page">
        <div class="stats section">
            <h1>Test Stats</h1>
            <p>Total correct: {{ totals.test.correct }}</p>
            <p>Total wrong: {{ totals.test.wrong }}</p>
            <BarChart :dataSet="dataChartTest" />
        </div>
        <div class="stats section">
            <h1>Train Stats</h1>
            <p>Total correct: {{ totals.train.correct }}</p>
            <p>Total wrong: {{ totals.train.wrong }}</p>
            <BarChart :dataSet="dataChartTrain" />
        </div>
    </div>
    <p v-else>Loading ... </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarChart from "@/components/BarChart.vue";
import * as Models from "@/models";
import * as statsServices from "@/services/stats.services";

export default defineComponent({
    name: "Stats",
    props: {
        collecionId: String,
    },
    data: () => {
        return {
            totals: {
                test: { correct: 0, wrong: 0 },
                train: { correct: 0, wrong: 0 }
            },
            collectionId: null as string | null,
            dataChartTest: [] as Models.DataChart[],
            dataChartTrain: [] as Models.DataChart[]
        };
    },
    components: {
        BarChart,
    },
    created: async function () {
        this.createCharts();
    },
    methods: {
        createCharts: async function () {
            const collectionId = this.$route.params.idColl as string;
            if (collectionId) {
                this.$data.dataChartTest = (await statsServices
                    .getTestStats(collectionId))
                    .words
                    .map(w => {
                        return {
                            label: w.name,
                            right: w.correct,
                            wrong: w.wrong
                        } as Models.DataChart
                    })
                
                this.$data.dataChartTrain = (await statsServices
                    .getTrainStats(collectionId))
                    .words
                    .map(w => {
                        return {
                            label: w.name,
                            right: w.correct,
                            wrong: w.wrong
                        } as Models.DataChart
                    })

                this.$data.collectionId = collectionId;
            }
        },
    },
});
</script>

<style scoped lang="scss">
.stats-page {
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 50% 50%;
    height: 100%;

    h1 {
        text-align: center;
    }

    .section {
        max-width: 600px;
        width: 90%;
        margin: auto inherit;
        padding: 0 1em;
        overflow: auto;
        justify-self: center;
        .items-list {
            margin: 1em 0;
            .item {
                border-bottom: 1px solid black;
                padding: 1em;
                cursor: pointer;
                transition: 0.3s ease background-color;

                &:hover,
                &.active {
                    background-color: #333;
                }

                p {
                    margin: 0;
                    &.name {
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                }

                img {
                    width: 25px;
                    float: right;
                    padding: 0.4em;
                    cursor: pointer;
                    border-radius: 3px;
                    filter: invert(1);
                    &:hover {
                        background-color: #ddd;
                    }
                }
            }
        }
    }
}
</style>