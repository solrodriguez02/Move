<template>
  <v-expansion-panels >
    <v-expansion-panel elevation="0" class="box mx-auto"   :value="1">
      <v-expansion-panel-title/>
      <v-expansion-panel-text  selected-class="bg-success" > 
      <v-container class="pa-4">
        <v-row v-for="i in 2" :key="i" >
          <v-col
          v-for="n in items"   :key="n"
          cols="6"  md="3">
          <v-card 
            :class="['ma-4', selectedClass, 'cardRoutine']"
            @click="toggle" 
            color="grey-lighten-1"> 
            <v-img 
                  :src="`${n.src}`" 
                  class="text-right pa-2 imgRoutine"
                  @click="toggle">
                  <v-btn icon="$edit" @click="changeFav()"/>            </v-img>
            <p class='descripRoutine' style="text-overflow: ellipsis;">Holass sksksksksk sksksksk sksksksk sksk</p>
          </v-card>
          </v-col>
        </v-row>
        
      </v-container>
      </v-expansion-panel-text> 
  </v-expansion-panel>
</v-expansion-panels>
 
  
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
