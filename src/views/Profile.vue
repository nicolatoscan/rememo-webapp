<template>
    <div v-if="user" class="profile-wrapper form">
        <h1>{{ user.displayName }}</h1>
        <p>{{ user.username }}</p>
        <div class="classes-wrapper">
            <h2>Class you joined <span @click.stop="showCreationForm = true">+</span></h2>
            <ul>
                <li v-for="cl of classesCreated" :key="cl._id">{{ cl.name }}</li>
            </ul>
            <h2>Class you created</h2>
            <ul>
                <li v-for="cl of classesJoined" :key="cl._id">{{ cl.name }}</li>
            </ul>
        </div>
    </div>
    <div v-if="showCreationForm" class="create-class-popup" @click.stop="closeFrom()"> 
        <div class="form cover"  @click.stop>
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
            classCreation: false
        }
    },
    created: async function() {
        this.$data.user = await userServices.getUserInfo();
        await this.updateClasses();
    },
    methods: {
        updateClasses: async function() {
            for (const c of await classServices.getClasses()) {
                if (c.mine)
                    this.$data.classesCreated.push(c);
                else
                    this.$data.classesJoined.push(c);
            }
        },
        createClass: async function() {
            this.$data.classCreation = false;
            console.log(this.$data.creatingClassName);
            if (typeof this.$data.creatingClassName === 'string') {
                this.$data.classCreation = true;
                await classServices.createClass(this.$data.creatingClassName);
                this.closeFrom();
            }
        },
        closeFrom: async function() {
            this.$data.showCreationForm = false;
            this.$data.creatingClassName = '';
        }
    }
});
</script>

<style scoped lang="scss">
@import "../style/_variables.scss";

.create-class-popup {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba($color: #000000, $alpha: 0.8);

    .form {
        padding: 2em 0;
        text-align: center;
        margin-top: 20vh;
        max-width: 480px;
        h3 {
            margin-top: 0;
        }
        input {
            width: 70%;
            font-size: 1.3em;
            padding: 0 0.5em;
        }
        .buttons {
            width: 70%;
            margin: auto;
            text-align: right;
            margin-top: 0.6em;
            button {
                cursor: pointer;
                margin-bottom: 0;
            }
        }
    }
}

.profile-wrapper {
    max-width: 480px;
    margin: 1em auto;
    padding: 1em;
    text-align: center;

    h1 {
        margin-bottom: 5px;
    }

    p {
        margin: 0;
    }

    .classes-wrapper {
        margin-top: 2em;
        h2 {
            border-bottom: 1px solid gainsboro;
            span {
                float: right;
                padding: 0 0.5em;
                &:hover {
                    background-color: #222;
                    cursor: pointer;
                }
                &:active {
                    background-color: #111;
                    cursor: pointer;
                }
            }
        }

        ul {
            text-align: left;
            list-style: none;
            padding: 0 1em;
            li {
                font-size: 1.2em;
                padding: 10px;
                transition: 0.1s background-color ease-in;

                &:hover {
                    background-color: #222;
                }
            }
        }
    }
}
</style>