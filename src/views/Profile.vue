<template>
    <div v-if="user" class="list-page form">
        <h1>{{ user.displayName }}</h1>
        <p>{{ user.username }}</p>
        <div class="classes-wrapper">
            <h2>Class you created<span @click.stop="showCreationForm = true">+</span></h2>
            <ul class="lista clickable">
                <li
                    v-for="(cl, index) of classesCreated"
                    :key="cl._id"
                    @click="openClassPage(cl._id)"
                >
                    <p>{{ cl.name }}</p>
                    <div class="actions">
                        <p @click.stop="shareClass(cl._id, index)"
                            aria-label="Link copied to clipboard!"
                            data-balloon-pos="up"
                            :data-balloon-visible="shareBallonVisible[index] ? 'true': 'false'"
                        >Share</p>
                        <p @click.stop="deleteClass(cl._id)">Delete</p>
                    </div>
                </li>
            </ul>
            <p v-if="classesCreated.length === 0" class="info">You haven't created any classes</p>
            <h2>Class you joined</h2>
            <ul class="lista clickable">
                <li v-for="cl of classesJoined" :key="cl._id">
                    <p>{{ cl.name }}</p>
                    <div class="actions">
                        <p @click.stop="leaveClass(cl._id)">Leave</p>
                    </div>
                </li>
            </ul>
            <p v-if="classesJoined.length === 0" class="info">No haven't joined any classes</p>
        </div>
    </div>
    <div v-if="showCreationForm" class="popup" @click.stop="closeFrom()"> 
        <div class="wrapper form" @click.stop>
            <h3>Create a new class:</h3>
            <input placeholder="class name" v-model="creatingClassName" />
            <div class="buttons">
                <button @click.stop="closeFrom()">Cancel</button>
                <button :disabled="creatingClassName === ''" @click.stop="createClass()">Create</button>
            </div>
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
    name: 'Profile',
    data: () => {
        return {
            user: null as Models.User | null,
            classesCreated: [] as Models.StudyClass[],
            classesJoined: [] as Models.StudyClass[],
            creatingClassName: '' as string,
            showCreationForm: false,
            classCreation: false,
            shareBallonVisible: {} as { [index: number]: boolean }
        }
    },
    created: async function() {
        this.$data.user = await userServices.getUserInfo();
        await this.updateClasses();
    },
    methods: {
        updateClasses: async function() {
            const created: Models.StudyClass[] = [];
            const joined: Models.StudyClass[] = [];
            for (const c of await classServices.getClasses()) {
                if (c.mine)
                    created.push(c);
                else
                    joined.push(c);
            }
            this.$data.classesCreated = created;
            this.$data.classesJoined = joined;
        },
        createClass: async function() {
            if (typeof this.$data.creatingClassName === 'string') {
                this.$data.classCreation = false;
                this.$data.classCreation = true;
                await classServices.createClass(this.$data.creatingClassName);
                await this.updateClasses();
                this.closeFrom();
            }
        },
        closeFrom: async function() {
            this.$data.showCreationForm = false;
            this.$data.creatingClassName = '';
        },
        openClassPage: async function(classId: string) {
            if (!classId)
                return;
            router.push(`/class/${classId}`);
        },
        shareClass: async function(classId: string, index: number) {
            if (classId) {
                const importUrl = `${window.location.origin}/#/join/${classId}`
                navigator.clipboard.writeText(importUrl);
                this.$data.shareBallonVisible[index] = true;
                setTimeout(() => this.$data.shareBallonVisible[index] = false, 1000);
            }
        },
        deleteClass: async function(classId: string) {
            if (classId) {
                await classServices.deleteClass(classId);
                await this.updateClasses();
            }
        },
        leaveClass: async function(classId: string) {
            if (classId) {
                await classServices.leaveClass(classId);
                await this.updateClasses();
            }
        }
    }
});
</script>

<style scoped lang="scss">
@import "../style/_variables.scss";

</style>