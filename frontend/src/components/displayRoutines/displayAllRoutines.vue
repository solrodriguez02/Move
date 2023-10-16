<template>
   <v-sheet class="box mx-auto"  max-width="1140">
      <v-container class=" d-flex align-content-stretch flex-wrap" >
        <v-sheet v-if="props.items===null">
          No results found
        </v-sheet>
        <v-sheet v-for="r in props.items" class="ma-2 pa-2" v-else>
          <routine-preview :r="r" />          
        </v-sheet>
      </v-container>
   </v-sheet>
 
  
</template>

<script setup >
const props = defineProps( ["items"]);
import routinePreview from './routinePreview.vue';
</script>

<style scoped src='@/styles/previewRoutine/display.css'/>
