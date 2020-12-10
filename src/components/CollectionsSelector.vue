<template>
    <div class="collections-selector form">
        <h2>Select collections</h2>
        <div class="collection-list">
            <p class="error-message" v-if="errorMsg">{{ errorMsg }}</p>
            <ul>
                <li v-for="coll in collections" :key="coll._id">
                    <input
                        v-if="multiSelector"
                        :id="coll._id"
                        :value="coll"
                        name="collection"
                        type="checkbox"
                        v-model="selectedCollections"
                    />
                    <input
                        v-else
                        :id="coll._id"
                        :value="coll"
                        name="collection"
                        type="radio"
                        v-model="selectedCollection"
                    />
                    <label :for="coll._id">{{ coll.name }}</label>
                </li>
            </ul>
        </div>
        <div class="buttons">
            <button :disabled="!confirmEnabled()" @click="onButtonConfirm()">{{ confirmButtonText }}</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Models from '@/models';
import * as collectionServices from '@/services/collection.services';

export default defineComponent({
    name: 'CollectionsSelector',
    props: {
        multiSelector: { type: Boolean, default: true },
        confirmButtonText: { type: String, default: 'Confirm' },
        minCollections: { type: Number, default: 0 },
        minWords: { type: Number, default: 0 },
    },
    data: () => {
        return {
            collections: [] as Models.Collection[],
            selectedCollections: [] as Models.Collection[],
            selectedCollection: undefined as Models.Collection | undefined,
            errorMsg: '',
        };
    },
    created: async function() {
        try {
            this.$data.collections = await collectionServices.getMyCollections();
        } catch (err) {
            console.log(err.info);
        }
    },
    methods: {
        onButtonConfirm: function() {
            if (this.confirmEnabled()) {
                this.$emit(
                    'confirm',
                    this.$props.multiSelector ? this.$data.selectedCollections.map((c) => c._id) : (this.$data.selectedCollection?._id ?? '')
                );
            }
        },
        confirmEnabled: function() : boolean {
            if (!this.$props.multiSelector) {
                if (!this.$data.selectedCollection) {
                    this.$data.errorMsg = 'No collection selected';
                    return false;
                } 
                if (this.$data.selectedCollection.words.length < this.$props.minWords) {
                    this.$data.errorMsg = 'Not enough words selected';
                    return false;
                }
                this.$data.errorMsg = '';
                return true;

            } else {
                if (this.$data.selectedCollections.length < this.$props.minCollections) {
                    this.$data.errorMsg = 'Not enough collections selected';
                    return false;
                }
                if (this.$data.selectedCollections.map((c) => c.words.length).reduce((a, b) => a + b, 0) < this.$props.minWords) {
                    this.$data.errorMsg = 'Not enough words selected';
                    return false;
                }
                this.$data.errorMsg = '';
                return true;
            }

        }
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../style/_variables.scss';

.collections-selector {
    padding: 1em;
    .buttons {
        text-align: right;
    }
    h2 {
        text-align: center;
    }
    .collection-list {
        ul {
            list-style: none;
            padding: 0;
            margin: 1em auto;
            max-width: 600px;
            li {
                font-size: 1.3em;
                label {
                    padding-left: 10px;
                }
            }
        }
    }
}
</style>
