<template>
    <Header />
    <router-view />
</template>

<style lang="scss">
@import "./style/_variables.sass";

body {
    margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    border: 0;
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

