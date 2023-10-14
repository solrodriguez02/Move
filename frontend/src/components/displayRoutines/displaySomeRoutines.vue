<template>
  
  <v-sheet class="box mx-auto" elevation="3" max-width="1140">
    <v-slide-group
      v-model="model"
      class="pa-1"
      selected-class="bg-success"
      show-arrow
    >
      <v-slide-group-item
        v-for="i in 10"
        :key="n"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <v-card 
          :class="['ma-4', selectedClass, 'cardRoutine']"
          @click="toggle" 
          color="grey-lighten-1"
        >
          <v-img 
                :src="`${i.src}`" 
                class="text-right pa-2 imgRoutine"
                @click="toggle">
                <v-btn :icon="isSelected ? '$favfull' : '$favempty'" @click="changeFav()" />
          </v-img>
          <p class='descripRoutine' style="text-overflow: ellipsis;">Holass sksksksksk sksksksk sksksksk sksk</p>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
 
 
  
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
    }) }
function changeFav(){
  return
}

</script>

<style scoped src='@/styles/previewRoutine/display.css'/>
