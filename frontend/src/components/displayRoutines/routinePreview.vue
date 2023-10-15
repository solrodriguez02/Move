<template>
    <v-card 
            :class="['cardRoutine', image]"
            @click="toggle, showRoutine(r)" 
            color="grey-lighten-1"> 
            <div class="text-right image-container">
              <v-img 
                    :src="`https://cdn.vuetifyjs.com/images/${r.src}`" 
                    :alt="r.name" class="imgRoutine"
                    @click="toggle" cover>
                    <v-btn :icon="r.fav ? '$favfull' : '$favempty'" @click="changeFav(r)" class="me-2 mt-2" />
              </v-img>
              <div class='overlay'>
                <v-icon icon='$favfull' color='black' size='15' />
                <p class='overlay-text'>{{ r.favs }}</p>
                <v-icon :icon='r.dif? $flash:$flash' size='15' />
                <p  class='overlay-text'>{{ difficulty[dif] + 'difficulty' }}</p>
              </div>
            </div>  
            <p class='descripRoutine' style="text-overflow: ellipsis;">{{ r.name }}</p>
          </v-card>
</template>

<script setup>
const difficulty = [ 'easy','medium','hard'];

const props = defineProps(['r']);

function changeFav(rutine){
    rutine.fav = !rutine.fav; 

}
function showRoutine(rutine) {
// ir a pag
}
</script>

<style scoped src='@/styles/previewRoutine/display.css'/>
