<template>
   <v-sheet class="box mx-auto"  max-width="1120">
      <v-container class=" d-flex align-content-stretch flex-wrap" >
        <h4 v-if="props.items===null" class="mx-auto notFound">
          No results found
        </h4>
        <v-sheet v-for="r in props.items" class="ma-2 pa-2" color='transparent' v-else>
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
