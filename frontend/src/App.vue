<template>
  <v-app>
    <v-main>
      <Navbar/>
      <Home/>
    </v-main>
  </v-app>
</template>

<script setup>
  import Home from '@/views/Home.vue'
  import Navbar from '@/components/Navbar.vue'
</script>
