<template>
    <div class="auth-page">
        <div class="auth-form form">
            <div class="login-signup-selector">
                <p
                    v-on:click="register = false"
                    v-bind:class="register ? '' : 'active'"
                >
                    Login
                </p>
                <p
                    v-on:click="register = true"
                    v-bind:class="register ? 'active' : ''"
                >
                    Signup
                </p>
            </div>
            <p class="error-message" v-if="error !== ''">{{ error }}</p>
            <div class="login-section auth-section" v-if="!register">
                <label for="username-login-input">Username</label>
                <input
                    v-model="loginQuery.username"
                    id="username-login-input"
                    type="text"
                    name="username"
                />

                <label for="password-login-input">Password</label>
                <input
                    v-model="loginQuery.password"
                    id="password-login-input"
                    type="password"
                    name="password"
                />
                <button v-on:click="login()">Log In</button>
            </div>

            <div class="register-section auth-section" v-if="register">
                <label for="displayname-register-input">Display Name</label>
                <input
                    v-model="sigupQuery.displayName"
                    id="displayname-register-input"
                    type="text"
                    name="displayname"
                />

                <label for="username-register-input">Username</label>
                <input
                    v-model="sigupQuery.username"
                    id="username-register-input"
                    type="text"
                    name="username"
                />

                <label for="email-register-input">Email</label>
                <input
                    v-model="sigupQuery.email"
                    id="email-register-input"
                    type="email"
                    name="email"
                />

                <label for="password-register-input">Password</label>
                <input
                    v-model="sigupQuery.password"
                    id="password-register-input"
                    type="password"
                    name="password"
                />

                <button v-on:click="signup()">Register</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Models from '@/models';
import * as authServices from '@/services/auth.services';
import router from '@/router';

export default defineComponent({
    name: 'Home',
    data: () => {
        return {
            register: false,
            error: '',
            loginQuery: {
                username: '',
                password: ''
            } as Models.LoginQuery,
            sigupQuery: {
                username: '',
                password: '',
                displayName: '',
                email: '',
            } as Models.SignupQuery
        }
    },
    components: {
    },
    methods: {
        login: async function () {
            try {
                const res = await authServices.login(this.$data.loginQuery);
                router.push('/');
            } catch (ex) {
                this.$data.error = ex.info;
            }
        },
        signup: async function () {
            try {
                const res = await authServices.signup(this.$data.sigupQuery);
                router.push('/');
            } catch (ex) {
                this.$data.error = ex.info;
            }
        }
    }
});
</script>

<style scoped lang="scss">
@import "../style/_variables.scss";

.auth-page {
    display: flex;
    align-items: flex-start;
    height: 100%;
    justify-content: center;
}
.auth-form {
    max-width: 100vw;
    width: 270px;
    display: flex;
    flex-direction: column;
    padding: 2em;
    border-radius: 30px;
    margin-top: 10vh;

    p.error-message {
        margin-bottom: 0;
        color: red;
    }

    > .login-signup-selector {
        text-align: center;
        > p {
            display: inline-block;
            margin: 0 0.5em;
            font-size: 1.3em;
            cursor: pointer;
            color: #bbb;
            &.active {
                color: $main-color;
            }
        }
    }

    > .auth-section {
        > label,
        input {
            display: block;
            width: 100%;
            margin: auto;
        }
        > label {
            margin-bottom: 2px;
            margin-top: 1em;
        }
        > button {
            margin: 2em 0 0;
            width: 100%;
        }
    }
}
</style>
