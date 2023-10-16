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
                    <v-btn v-if="r.fav" icon='$favfull' class="me-2 mt-2" size="small"/>
              </v-img>
              <div class='overlay'>
                <v-container class="ml-1">
                    <v-row class="d-flex align-center">
                        <v-icon icon='$favfull' color='black' size='14' />
                        <p class='overlay-text'>{{ r.favs }}</p>
                    </v-row>
                    <v-row class="d-flex align-center">
                        <v-icon icon='$flash' size='14'  color='black'/>
                        <v-icon icon='$flash' size='14'  :color="r.dif>0? 'black':'grey-lighten-1'" class="ml-0"/>
                        <v-icon icon='$flash' size='14'  :color="r.dif>1? 'black':'grey-lighten-1'" />
                        <p  class='overlay-text'>{{ difficulty[r.dif] + ' difficulty' }}</p>
                    </v-row>  
        </v-container>
            </div>
            </div>  
            <p class='descripRoutine' style="text-overflow: ellipsis;">{{ r.name }}</p>
          </v-card>
</template>

<script setup>
const difficulty = [ 'Easy','Medium','Hard'];

const props = defineProps(['r']);

function changeFav(rutine){
    rutine.fav = !rutine.fav; 

}
function showRoutine(rutine) {
// ir a pag
}
</script>

<style scoped src='@/styles/previewRoutine/display.css'/>
