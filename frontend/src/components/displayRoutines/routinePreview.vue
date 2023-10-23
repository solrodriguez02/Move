<template>
    <RouterLink :to="`routine/${r.id}`"  class='text-decoration-none'>
    <v-card 
            :class="['cardRoutine', image]"
            @click="toggle" 
            color='grey-lighten-1'> 
            <div class='text-right image-container'>
              <v-img 
                    :src="r.src" 
                    alt='Routine image' class="imgRoutine"
                    @click="toggle" cover>
                    <v-btn v-if="r.fav" icon='$favfull' class="me-2 mt-2" size="small" color="white"/>
              </v-img>
              <div class='overlay'>
                <v-container class="ml-0">
                    <v-row class="d-flex align-center">
                        <v-icon icon='$flash' size='14'  color='black'/>
                        <v-icon icon='$flash' size='14'  :color="r.filters.difficulty!=='Easy'? 'black':'grey-lighten-1'" class="ml-0"/>
                        <v-icon icon='$flash' size='14'  :color="r.filters.difficulty=='Hard'? 'black':'grey-lighten-1'" />
                        <p  class='overlay-text ml-1'>{{ r.filters.difficulty + ' difficulty' }}</p>
                    </v-row>  
        </v-container>
            </div>
            </div>  
            <p class='descripRoutine' style="text-overflow: ellipsis;">{{ r.name }}</p>
          </v-card>
        </RouterLink>   
</template>

<script setup>
import { RouterLink } from 'vue-router';
const difficulty = [ 'Easy','Medium','Hard'];

const props = defineProps(['r']);

</script>

<style scoped src='@/styles/previewRoutine/display.css'/>
