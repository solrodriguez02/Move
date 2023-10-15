<template>
  
  <v-sheet class="box mx-auto" max-width="1140">
    <v-slide-group
      class="pa-2"
      show-arrow
    >
      <v-slide-group-item
        v-for="r in props.items">
      <routine-preview :r="r" class="ma-3" />          
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>


<script setup >
import routinePreview from './routinePreview.vue';
const props = defineProps( ["items"]);
</script>

<style scoped src='@/styles/previewRoutine/display.css'/>
