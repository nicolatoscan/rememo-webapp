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

body {
    margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    border: 0;
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 50px auto;
}
.router-wrapper {
    overflow: hidden;
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
    },
    beforeCreate: () => {
        // router.push('login');
    },
});
</script>

