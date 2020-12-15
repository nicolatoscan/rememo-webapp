<template>
    <div v-if="user" class="list-page form">
        <div class="header">
            <div class="titles">
                <h1>{{ user.displayName }}</h1>
                <p>{{ user.username }}</p>
            </div>
            <div class="titles editing-area" v-if="editingProfile">
                <label for="">Display Name</label>
                <input class="editing" type="text" v-model="editingData.displayName">
                <label for="">Email</label>
                <input class="editing" type="text" v-model="editingData.email">
                <label for="">New Password</label>
                <input class="editing" type="text" v-model="editingData.oldPassword">
                <label for="">Insert your current password *</label>
                <input class="editing" type="text" v-model="editingData.newPassword">
            </div>
            <div class="actions line">
                <p v-if="!editingProfile" @click="editingProfile = true">Edit profile</p>
                <p v-if="!editingProfile" @click="logout()">Logout</p>
                <p v-if="editingProfile" @click="editingProfile = false">Save</p>
            </div>
        </div>
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
import * as authHelpers from '@/helpers/auth.helper';

export default defineComponent({
    name: 'Profile',
    data: () => {
        return {
            editingProfile: false,
            editingData: {
                displayName: '',
                oldPassword: '',
                newPassword: '',
                email: '',
            },
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
        const user = await userServices.getUserInfo();
        this.$data.editingData.displayName = user.displayName;
        this.$data.editingData.email = user.email;
        this.$data.user = user;
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
        },
        logout: function() {
            authHelpers.logout();
            router.push('login');
        }
    }
});
</script>

<style scoped lang="scss">
@import "../style/_variables.scss";

.header {
    padding: 1em 0 3em;
    .titles {
        margin: 1em;
    }

    .editing-area {
        label {
            text-align: left;
            display: block;
            margin-left: 10%;
            font-weight: 500;
            font-size: 0.8em;
        }
        input {
            width: 80%;
            margin-bottom: 5px;
        }
    }
}
</style>