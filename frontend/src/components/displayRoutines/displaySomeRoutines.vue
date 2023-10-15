<template>
  
  <v-sheet class="box mx-auto" elevation="3" max-width="1140">
    <v-slide-group
      class="pa-2"
      show-arrow
    >
      <v-slide-group-item
        v-for="r in props.items"
      >
        <v-card 
          :class="['ma-4', 'cardRoutine']"
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
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
 
 
  
</template>


<script setup >
import { changeFav, showRoutine } from "@/components/displayRoutines/displayRoutineScript.vue"

const props = defineProps( ["items"]);
</script>

<style scoped src='@/styles/previewRoutine/display.css'/>
