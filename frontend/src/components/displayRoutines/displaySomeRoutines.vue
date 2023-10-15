<template>
  
  <v-sheet class="box mx-auto" elevation="3" max-width="1140">
    <v-slide-group
      v-model="model"
      class="pa-2"
      show-arrow
    >
      <v-slide-group-item
        v-for="r in items"
      >
        <v-card 
          :class="['ma-4', 'cardRoutine']"
          @click="toggle, showRoutine(r)" 
          color="grey-lighten-1"
          
        >
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

<script>
export default {
  data: () => ({
      model: null,
      items: [
        {
          src: 'backgrounds/bg.jpg',
          fav: false,
          name: 'mar'
        },
        {
          src: 'backgrounds/md.jpg',
          fav: false,
          name: 'Senta senta'
        },
        {
          src: 'backgrounds/bg-2.jpg',
          fav: false,
          name: 'cielo'
        },
        {
          src: 'backgrounds/md2.jpg',
          fav: false,
          name: 'desierto'
        },
        {
          src: 'backgrounds/md.jpg',
          fav: false,
          name: 'Senta senta'
        },
        {
          src: 'backgrounds/bg-2.jpg',
          fav: false,
          name: 'cielo'
        },
        {
          src: 'backgrounds/md2.jpg',
          fav: false,
          name: 'desierto'
        },
      ],
      selection: [],
    }) 
  }

</script>
  
<script setup>
import { getCurrentInstance } from 'vue';

  function changeFav(rutine){
    rutine.fav = !rutine.fav; 
// reinicio pag para q apa cora en todos, vale la pena?
    const instance = getCurrentInstance();
    instance.proxy.$forceUpdate();

  }
  function showRoutine(rutine) {
    // ir a pag
  }
</script>

<style scoped src='@/styles/previewRoutine/display.css'/>
