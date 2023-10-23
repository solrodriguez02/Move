<template>
   <v-sheet class="mx-auto"  color='transparent'>
      <v-container class=" d-flex align-content-stretch flex-wrap" >
        <h4 v-if="props.items==undefined || props.items==null" class="mx-auto notFound">
          No routines were found
        </h4>
        <v-sheet v-for="r in props.items" class="ma-2 pa-2" color='transparent' v-else>
          <routine-preview :r="r" />          
        </v-sheet>
      </v-container>
   </v-sheet>
 
  
</template>

<script setup >
const props = defineProps( ["items"]);

import routinePreview from '@/components/displayRoutines/routinePreview.vue'
</script>

<style scoped src='@/styles/previewRoutine/display.css'/>
