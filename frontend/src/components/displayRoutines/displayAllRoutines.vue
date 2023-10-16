<template>
   <v-sheet class="box mx-auto"  max-width="1140">
      <v-container class=" d-flex align-content-stretch flex-wrap" >
        <v-sheet v-for="r in props.items" class="ma-3 pa-2" v-if="props.items!==null">
          <routine-preview :r="r" />          
        </v-sheet>
        <v-sheet v-else>
          No results found
        </v-sheet>
      </v-container>
   </v-sheet>
 
  
</template>

<script setup >
const props = defineProps( ["items"]);
import routinePreview from './routinePreview.vue';
</script>

<style scoped src='@/styles/previewRoutine/display.css'/>
