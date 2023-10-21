<template>
  <Navbar/>
  <RouterView/>
</template>

<script setup>
  import { RouterView } from 'vue-router'
  import Navbar from '@/components/Navbar.vue'
  import { useSecurityStore } from './store/SecurityStore';
  import { onBeforeMount } from 'vue';

  const securityStore = useSecurityStore()
  onBeforeMount(() => securityStore.initialize())
</script>

<style scoped>
</style>