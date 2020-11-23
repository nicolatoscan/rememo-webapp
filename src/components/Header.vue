<template>
    <header>
        <h1>Rememo</h1>
        <nav>
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
        </nav>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Header'
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../style/_variables.sass";

header {
    background-color: $main-color;
    text-align: left;
    display: flex;
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
