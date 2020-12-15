<template>
    <div class="full-page-message">
        <div class="content">
            <p>{{ message }}</p>
            <div v-if="studyClass !== null">
                <h3>Do you want to join: {{ studyClass.name }}</h3>
                <button @click="joinClass(studyClass._id)">Join</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Models from '@/models';
import * as classServices from '@/services/class.services';
import router from '@/router';

export default defineComponent({
    name: 'JoinClass',
    data: () => {
        return {
            message: '',
            studyClass: null as (Models.StudyClass | null)
        }
    },
    created: async function () {
        const classId = this.$route.params.classId as string | undefined;
        if (typeof classId === 'string') {
            try {
                this.$data.studyClass = await classServices.getClassById(classId);
            } catch (err) {
                this.$data.message = 'Class not found';
            }
        } else {
            this.$data.message = 'Nothing to import';
        }
    },
    methods: {
        joinClass: async function (classId: string) {
            try {
                await classServices.joinClass(classId);
            } catch (err) {
                this.$data.message = 'Error joining class';
            }
            router.push('/profile');
        }
    }
});
</script>