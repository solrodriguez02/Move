<template>
  <div class='page'>
    <div class='header'>
       <h1>My routines</h1>
        <v-btn rounded variant='flat' id='butCreate' class="text-none">
          Create new +</v-btn>
    </div>

    <div>
      <v-row v-for='category in categories' 
             :key='n' >
        <v-container class='title'>   
          <v-row no-gutters>
            <v-col class="pa-2 ma-2"   >
              <h3>{{ category.headline }}</h3>
            </v-col>
            <v-col class=' pa-2 ma-2' cols="2">
              <v-btn  icon="$edit" size="small" color='white' flat v-if="category.canEdit"/>
            
              <v-btn flat class='viewAll' @click='changeView(category)' >{{ `View ${category.viewAll? 'less':'all'}` }}</v-btn>
            </v-col>
        </v-row>
        </v-container>
        <displaySomeRoutines :items="getDataCategory(category.headline,data)" class='display' v-if="!category.viewAll"/>
        <displayAllRoutines :items="getDataCategory(category.headline,data)" class='display' v-else />
      </v-row>
    </div>
    
  </div>
</template>

<script setup>
  import displaySomeRoutines from '@/components/displayRoutines/displaySomeRoutines.vue';
  import displayAllRoutines from '@/components/displayRoutines/displayAllRoutines.vue';
  import { ref } from 'vue'
  const categories= ref([
      { headline:'Created by you', viewAll: false, canEdit: true },
      { headline:'Favourites', viewAll: false, canEdit: true  },
      { headline:'For you', viewAll: false, canEdit: false }    
  ])

  function changeView( category) {
      category.viewAll = !category.viewAll;
  }

  function getDataCategory(headline,data){
    // pido a api
    return data;
  }
  function getData( headline, selected,data){
    // pido a api
    return data;
  }

  const data = ref([         {
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
      ]);

</script>

<style scoped src='@/styles/MyRoutines.scss'/>
