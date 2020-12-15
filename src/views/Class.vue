<template>
    <div>
        <div v-if="studyClass" class="list-page form">
            <div class="header">
                <div class="titles">
                    <h1>{{ studyClass.name }}</h1>
                </div>
                <div class="titles editing-area" v-if="editingName">
                    <p v-if="editingUpdateError" class="error-message">
                        {{ editingUpdateError }}
                    </p>
                    <label for="">Display Name</label>
                    <input
                        class="editing"
                        type="text"
                        name="class-name"
                        v-model="editingNameText"
                    />
                </div>
                <div class="actions line">
                    <p v-if="!editingName" @click="editingName = true">
                        Edit Name
                    </p>
                    <p v-if="!editingName" @click="deleteClass()">Delete</p>
                    <p v-if="editingName" @click="editingName = false">
                        Cancel
                    </p>
                    <p v-if="editingName" @click="updateClassName()">Save</p>
                </div>
            </div>
            <div class="classes-wrapper">
                <h2>Student</h2>
                <ul class="lista clickable">
                    <li v-for="s of studyClass.students" :key="s._id">
                        <p>{{ s.username }}</p>
                        <div class="actions">
                            <p @click.stop="kickStudent(s._id)">kick</p>
                        </div>
                    </li>
                </ul>
                <p v-if="studyClass.students.length === 0" class="info">
                    No students
                </p>
                <h2>
                    Collections<span @click.stop="showSelectCollForm = true"
                        >+</span
                    >
                </h2>
                <ul class="lista clickable">
                    <li
                        v-for="c of studyClass.collections"
                        :key="c._id"
                        :class="{ active: selectedCollection === c._id }"
                        @click.stop="
                            selectedCollection =
                                selectedCollection === c._id ? '' : c._id
                        "
                    >
                        <p>{{ c.name }}</p>
                        <div class="actions">
                            <p @click.stop="removeCollectionFromClass(c._id)">
                                Remove
                            </p>
                        </div>
                    </li>
                </ul>
                <p v-if="studyClass.collections.length === 0" class="info">
                    No students
                </p>
            </div>
            <div class="stats-wrapper">
                <ClassStatsGraph
                    :classId="classId"
                    :selectedCollection="selectedCollection"
                    v-if="classId"
                />
            </div>
        </div>
        <div v-else class="full-screen-message">
            <p>No Class found</p>
            <router-link to="/profile">Go to your profile</router-link>
        </div>
        <div v-if="showSelectCollForm" class="popup" @click.stop="closeFrom()">
            <div class="wrapper form" @click.stop>
                <h3>Select collections:</h3>
                <ul>
                    <li v-for="coll of myCollectionsToAdd" :key="coll._id">
                        <input
                            type="checkbox"
                            :id="coll._id"
                            :value="coll"
                            v-model="selectedCollectionsToAdd"
                        />
                        <label :for="coll._id"
                            >{{ coll.name }} - {{ coll.description }}</label
                        >
                    </li>
                </ul>
                <div class="buttons">
                    <button @click.stop="closeForm()">Cancel</button>
                    <button
                        @click.stop="
                            addCollectionsToClass(selectedCollectionsToAdd)
                        "
                        :disabled="
                            addingCollections ||
                            selectedCollectionsToAdd.length === 0
                        "
                    >
                        Add to class
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ClassStatsGraph from '@/components/ClassStatsGraph.vue'
import router from '@/router';
import * as Models from '@/models';
import * as classServices from '@/services/class.services';
import * as collectionServices from '@/services/collection.services';

export default defineComponent({
    name: 'Class',
    components: { ClassStatsGraph },
    data: () => {
        return {
            classId: undefined as string | undefined,
            studyClass: null as Models.FullStudyClass | null,
            myCollectionsToAdd: [] as Models.CollectionMin[],
            selectedCollectionsToAdd: [] as Models.CollectionMin[],
            showSelectCollForm: false,
            addingCollections: false,
            selectedCollection: '',
            editingName: false,
            editingNameText: ''
        }
    },
    created: async function () {
        this.$data.classId = this.$route.params.classId as string | undefined;
        if (this.$data.classId) {
            this.loadClass();
            this.$data.myCollectionsToAdd = await collectionServices.getMyCollectionsMin();
        }

    },
    methods: {
        loadClass: async function () {
            if (this.$data.classId) {
                const studyClass = await classServices.getFullClassById(this.$data.classId);
                this.$data.editingNameText = studyClass.name;
                this.$data.myCollectionsToAdd = (await collectionServices.getMyCollectionsMin())
                    .filter(coll =>
                        !studyClass.collections.map(c => c._id).includes(coll._id)
                    );
                this.$data.studyClass = studyClass;
            }
        },
        closeForm: function () {
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
        removeCollectionFromClass: async function (collectionId: string) {
            if (this.$data.classId && collectionId) {
                await classServices.removeCollectionFromClass(this.$data.classId, collectionId);
                await this.loadClass();
            }
        },
        deleteClass: async function () {
            if (this.$data.classId) {
                await classServices.deleteClass(this.$data.classId);
            }
            router.push('/profile');
        },
        kickStudent: async function (studentId: string) {
            if (this.$data.classId && studentId) {
                await classServices.kickFromClass(this.$data.classId, studentId);
                await this.loadClass();
            }
        },
        updateClassName: async function () {
            if (this.$data.classId && this.$data.editingNameText) {
                this.$data.editingName = false;
                await classServices.renemaClass(this.$data.classId, this.$data.editingNameText);
                await this.loadClass();
            }
        }
    },
});
</script>

<style scoped lang="scss">
@import "../style/_variables.scss";

.form {
    width: 100% !important;
    max-width: 960px !important;
}
</style>