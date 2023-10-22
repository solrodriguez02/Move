<template>
  
  <v-sheet  max-width="1038" color='transparent'>
    <v-slide-group
      show-arrow
    >
    <h4 v-if="props.items==undefined" class="mx-auto notFound">
          No routines found
        </h4>
      <v-slide-group-item v-for="r in props.items" v-else>
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
