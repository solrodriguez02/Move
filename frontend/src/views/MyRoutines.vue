<template>
  <div class='page'>
    <div class='header'>
       <h1>My routines</h1>
        <v-btn rounded variant='flat' id='butCreate' class="text-none">
          Create new +</v-btn>
    </div>

    <div>
      <v-row v-for='category in categories' 
             :key='category.headline' >
        <v-container class='title'>   
          <v-row no-gutters>
            <v-col class="pa-2 ma-2"   >
              <h3>{{ category.headline }}</h3>
            </v-col>
            <v-col class=' pa-2 ma-2' cols="2">
              <v-icon icon="$edit" color='grey' />
              <v-btn flat class='viewAll' @click='changeView(category)' >{{ `View ${category.viewAll? 'less':'all'}` }}</v-btn>
            </v-col>
        </v-row>
        </v-container>
        <displaySomeRoutines class='display' v-if="!category.viewAll"/>
        <displayAllRoutines class='display' v-else/>
      </v-row>
    </div>
    
  </div>
</template>

<script setup>
  import displaySomeRoutines from '@/components/displayRoutines/displaySomeRoutines.vue';
  import displayAllRoutines from '@/components/displayRoutines/displayAllRoutines.vue';
  import { ref } from 'vue'
  const categories= ref([
      { headline:'Created by you', viewAll: false },
      { headline:'Favourites', viewAll: false },
      { headline:'For you', viewAll: false }    
  ])

  function changeView( category) {
      category.viewAll = !category.viewAll;
  }

</script>

<style scoped src='@/styles/MyRoutines.scss'/>
