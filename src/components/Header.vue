<template>
    <header>
        <h1>Rememo</h1>
        <nav>
            <router-link to="/learn">Learn</router-link>
            <router-link to="/test">Test</router-link>
            <router-link to="/train">Train</router-link>
            <router-link to="/collections">Collections</router-link>
            <router-link to="/profile">{{ getUsername() }}</router-link>
        </nav>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as authHelpers from '@/helpers/auth.helper';
export default defineComponent({
    name: 'Header',
    methods: {
        getUsername: function (): string {
            return authHelpers.getUsername();
        },
        isLogged: function (): boolean {
            return authHelpers.isLoggedIn();
        }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../style/_variables.scss";
@media screen and (max-width: 900px) {
    h1 {
        display: none !important;
    }
    a {
        margin: 0 0.3em !important;
        padding: 0.3em 0.3em !important;
    }
}
header {
    background-color: $main-color;
    text-align: left;
    display: flex;
    height: 100%;
    > h1 {
        margin: 0.2em 2em;
        display: inline-block;
    }
    > nav {
        display: flex;
        flex-grow: 1;
        align-items: center;
        justify-content: center;

        a {
            font-weight: bold;
            text-decoration: none;
            color: $text-color;
            margin: 0 1em;
            padding: 0.3em 0.6em;

            &.router-link-exact-active {
                background-color: white;
                border-radius: 5px;
            }
        }
    }
}
</style>
