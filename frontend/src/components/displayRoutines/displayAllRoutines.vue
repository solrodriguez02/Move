<template>
    <v-container elevation="0" class="box mx-auto">
      <v-container class=" d-flex align-content-stretch flex-wrap" >
        <v-sheet v-for="r in props.items" class="ma-2 pa-2" >
          <v-card 
            :class="['cardRoutine']"
            @click="toggle, showRoutine(r)" 
            color="grey-lighten-1"> 
            <v-img 
                  :src="`https://cdn.vuetifyjs.com/images/${r.src}`" 
                  class="text-right pa-2 imgRoutine"
                  @click="toggle" cover>
                  <v-btn :icon="r.fav ? '$favfull' : '$favempty'" @click="changeFav(r)" />
            </v-img>
            <p class='descripRoutine' style="text-overflow: ellipsis;">{{ r.name }}</p>
          </v-card>
          
        </v-sheet>
        
      </v-container>
    </v-container>
 
  
</template>

<script setup >
import { changeFav, showRoutine } from "@/components/displayRoutines/displayRoutineScript.vue"

const props = defineProps( ["items"]);
</script>

<style scoped src='@/styles/previewRoutine/display.css'/>
