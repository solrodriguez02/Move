<template>
    <div class='not-found-text'>
        <h1>404 Not found</h1>
        <h2>Redirect to <RouterLink to='/'>home page</RouterLink></h2>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.not-found-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10%;
}
</style>