<template>
    <div v-if="studyClass" class="list-page form">
        <h1>{{ studyClass.name }}</h1>
        <div class="classes-wrapper">
            <h2>Student</h2>
            <ul>
                <li v-for="s of studyClass.students" :key="s._id">
                    <p>{{ s.username }}</p>
                    <div class="actions">
                        <p>kick</p>
                    </div>
                </li>
            </ul>
            <p v-if="studyClass.students.length === 0" class="info">No students</p>
            <h2>Collections<span @click.stop="showSelectCollForm = true">+</span></h2>
            <ul>
                <li v-for="c of studyClass.collections" :key="c._id">
                    <p>{{ c.name }}</p>
                    <div class="actions">
                        <p @click.stop="addCollectionFromClass(c._id)">Remove</p>
                    </div>
                </li>
            </ul>
            <p v-if="studyClass.collections.length === 0" class="info">No students</p>
        </div>
    </div>
    <div v-if="showSelectCollForm" class="popup" @click.stop="closeFrom()"> 
        <div class="wrapper form" @click.stop>
            <h3>Select collections:</h3>
            <ul>
                <li
                    v-for="coll of myCollectionsToAdd"
                    :key="coll._id">
                    <input type="checkbox" :id="coll._id" :value="coll" v-model="selectedCollectionsToAdd" />
                    <label :for="coll._id">{{ coll.name }} - {{ coll.description }}</label>
                </li>
            </ul>
            <div class="buttons">
                <button @click.stop="closeForm()">Cancel</button>
                <button @click.stop="addCollectionsToClass(selectedCollectionsToAdd)" :disabled="addingCollections || selectedCollectionsToAdd.length === 0">Add to class</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';
import * as Models from '@/models';
import * as classServices from '@/services/class.services';
import * as collectionServices from '@/services/collection.services';

export default defineComponent({
    name: 'Class',
    data: () => {
        return {
            classId: undefined as string | undefined,
            studyClass: null as Models.FullStudyClass | null,
            myCollectionsToAdd: [] as Models.CollectionMin[],
            selectedCollectionsToAdd: [] as Models.CollectionMin[],
            showSelectCollForm: false,
            addingCollections: false,
        }
    },
    created: async function() {
        this.$data.classId = this.$route.params.classId as string | undefined;
        this.loadClass();
        this.$data.myCollectionsToAdd = await collectionServices.getMyCollectionsMin();
    },
    methods: {
        loadClass: async function() {
            if (this.$data.classId) {
                const studyClass = await classServices.getFullClassById(this.$data.classId);
                this.$data.myCollectionsToAdd = (await collectionServices.getMyCollectionsMin())
                    .filter(coll => 
                        !studyClass.collections.map(c => c._id).includes(coll._id)
                    );
                this.$data.studyClass = studyClass;
            }
        },
        closeForm: function() {
            this.$data.showSelectCollForm = false;
        },
        addCollectionsToClass: async function (collections: Models.CollectionMin[]) {
            if (this.$data.classId) {
                this.$data.addingCollections = true;
                for (const collId of collections.map(c => c._id)) {
                    if (collId)
                        await classServices.addCollectionToClass(this.$data.classId, collId);
                }
                await this.loadClass();
                this.closeForm();
                this.$data.addingCollections = false;
                this.$data.selectedCollectionsToAdd = [];
            }
        },
        addCollectionFromClass: async function (collectionId: string) {
            if (this.$data.classId && collectionId) {
                await classServices.removeCollectionFromClass(this.$data.classId, collectionId);
                await this.loadClass();
            }
        }
    },
});
</script>

<style scoped lang="scss">
@import "../style/_variables.scss";

</style>