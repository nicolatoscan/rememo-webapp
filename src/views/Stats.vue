<template>
    <div class="stats-page">
        <div class="stats section">            
            <h1>Test Stats</h1>
            <PlotStats :correct="collectionTestStats.correct"
                       :wrong="collectionTestStats.wrong"
                       :words="collectionTestStats.words" />

        </div>
        <div class="stats section">

            <h1>Train Stats</h1>
            <PlotStats :correct="collectionTrainStats.correct"
                       :wrong="collectionTrainStats.wrong"
                       :words="collectionTrainStats.words" />

        </div>
    </div>     
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlotStats from "@/components/PlotStats.vue";

import * as Models from "@/models";
import * as collectionServices from "@/services/collection.services";
import * as shareServices from "@/services/share.services";

export default defineComponent({
    name: "Stats",
    data: () => {
        return {
            collectionTrainStats: null as Models.CollectionStats | null,
            collectionTestStats:null as Models.CollectionStats | null,
        };
    },
    components: {
        PlotStats,
    },
    created: async function () {
        this.setta()
    },
    methods: {
        setta: function(){
  
            this.$data.collectionTrainStats = {
                                    _id: '3',
                                    index: 4,
                                    name: 'collection',
                                    wrong: 420,
                                    correct: 421,
                                    words: [{
                                        _id : '9',
                                        name: 'pippo',
                                        wrong: 4, 
                                        correct : 5
                                    },{
                                        _id : '9',
                                        name: 'pluto',
                                        wrong: 420, 
                                        correct : 530
                                    }
                                    ]
            }

            this.$data.collectionTestStats = {
                                    _id: '3',
                                    index: 4,
                                    name: 'collection',
                                    wrong: 420,
                                    correct: 421,
                                    words: [{
                                        _id : '9',
                                        name: 'pippo',
                                        wrong: 4, 
                                        correct : 5
                                    },{
                                        _id : '9',
                                        name: 'pluto',
                                        wrong: 420, 
                                        correct : 530
                                    }
                                    ]
            }
        }
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