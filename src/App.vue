<template>
    <div class="header-wrapper">
        <Header />
    </div>
    <div class="router-wrapper">
        <router-view />
    </div>
</template>

<style lang="scss">
@import "./style/_variables.scss";
@import "./style/global.scss";
@import "./style/balloon.css";

body {
    margin: 0;
    background-color: #222;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    //color: #2c3e50;
    color: white;
    border: 0;
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 50px auto;
}
.router-wrapper {
    overflow: auto;
}
</style>

<script lang="ts">
import router from './router';
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';

export default defineComponent({
    name: 'Home',
    components: {
        Header
    }
});
</script>

