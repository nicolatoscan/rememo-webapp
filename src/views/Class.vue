<template>
    <div v-if="studyClass" class="list-page form">
        <h1>{{ studyClass.name }}</h1>
        <div class="classes-wrapper">
            <h2>Student</h2>
            <ul>
                <li v-for="s of studyClass.students" :key="s._id">{{ s.username }}</li>
            </ul>
            <h2>Collections</h2>
            <ul>
                <li v-for="c of studyClass.collections" :key="c._id">{{ c.username }}</li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';
import * as Models from '@/models';
import * as userServices from '@/services/user.services';
import * as classServices from '@/services/class.services';

export default defineComponent({
    name: 'Class',
    data: () => {
        return {
            classId: undefined as string | undefined,
            studyClass: null as Models.FullStudyClass | null,
        }
    },
    created: async function() {
        this.$data.classId = this.$route.params.classId as string | undefined;
        this.loadClass();
    },
    methods: {
        loadClass: async function() {
            if (this.$data.classId) {
                this.$data.studyClass = await classServices.getFullClassById(this.$data.classId);
            }
        }
    }
});
</script>

<style scoped lang="scss">
@import "../style/_variables.scss";

</style>