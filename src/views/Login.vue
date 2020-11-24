<template>
    <div class="auth-page">
        <div class="auth-form">
            <div class="login-signup-selector">
                <button v-on:click="register = false">Login</button>
                <button v-on:click="register = true">Signup</button>
            </div>
            <p>{{ error }}</p>
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
                <label for="displayname-register-input">Username</label>
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
import HelloWorld from '@/components/HelloWorld.vue';
import * as Models from '@/models';
import * as authServices from '@/services/auth.service';
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
        HelloWorld,
    },
    methods: {
        login: async function () {
            try {
                const res = await authServices.login(this.$data.loginQuery);
            } catch (ex) {
                this.$data.error = ex.info;
            }
            console.log('hey')
            router.push('/');
        },
        signup: async function () {
            console.log(this.$data.sigupQuery);
            try {
                const res = await authServices.signup(this.$data.sigupQuery);
            } catch (ex) {
                this.$data.error = ex.info;
            }
            router.push('/');
        }
    }
});
</script>

<style scoped lang="scss">
.auth-page {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
}
.auth-form {
    background-color: gainsboro;
    max-width: 100vw;
    width: 450px;
    display: flex;
    flex-direction: column;

    > .login-signup-selector {
        text-align: center;
    }

    > .auth-section {
        > * {
            display: block;
            width: 80%;
            margin: 0.8em auto;
        }
    }
}
</style>
