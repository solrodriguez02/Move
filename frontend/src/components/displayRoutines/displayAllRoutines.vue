<template>
    <v-container elevation="0" class="box mx-auto" 
      selected-class="bg-success">
      <v-container class=" d-flex align-content-stretch flex-wrap" >
        <v-sheet v-for="i in 15" :key="i" class="ma-2 pa-2" >
          <v-card 
            :class="[ selectedClass, 'cardRoutine']"
            @click="toggle" 
            color="grey-lighten-1"> 
            <v-img 
                  :src="`${i.src}`" 
                  class="text-right pa-2 imgRoutine"
                  @click="toggle">
                  <v-btn :icon="isSelected ? '$favfull' : '$favempty'" @click="changeFav()" />
            </v-img>
            <p class='descripRoutine' style="text-overflow: ellipsis;">Holass sksksksksk sksksksk sksksksk sksk</p>
          </v-card>
          
        </v-sheet>
        
      </v-container>
    </v-container>
 
  
</template>

<script scoped>
export default {
    data: () => ({
      model: null,
      items: [
        {
          src: 'backgrounds/bg.jpg',
        },
        {
          src: 'backgrounds/md.jpg',
        },
        {
          src: 'backgrounds/bg-2.jpg',
        },
        {
          src: 'backgrounds/md2.jpg',
        },
      ],
      selection: [],
    })
  }

function changeFav(){
  return
}

</script>

<style scoped src='@/styles/previewRoutine/display.css'/>
