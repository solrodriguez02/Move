<template>
  <v-container fill-height >
    <v-sheet class="d-flex mb-5" >
      <v-sheet class="ma-2 pa-2 me-auto">
        <h1>Explore</h1>
      </v-sheet>
      <v-sheet class="ma-2 pa-2" :width="900">
        <v-text-field 
        v-model="searchInApi"
        @keydown.enter="searchRutine()"
            density='compact'
            placeholder='Search rutine'
            prepend-inner-icon='$search'
            rounded
            variant='outlined'/>  
      </v-sheet>
    </v-sheet>
  </v-container>
  
  <v-sheet v-if="!searchWasMade.val">
      <v-row v-for='category in categories' 
             :key='n' >
        <v-container class='title'>   
          <v-row no-gutters>
            <v-col class="pa-2 ma-2"   >
              <h3>{{ category.headline }}</h3>
            </v-col>
            <v-col class=' pa-2 ma-2' cols="2">
              <v-btn flat class='viewAll' @click='changeView(category)' >{{ `View ${category.viewAll? 'less':'all'}` }}</v-btn>
            </v-col>
        </v-row>
        </v-container>
        <displaySomeRoutines class='display' v-if="!category.viewAll"/>
        <displayAllRoutines class='display' v-else/>
      </v-row>
  </v-sheet>
  <displayAllRoutines class='display' v-else/>
  

</template>
  
<script setup>
  import displaySomeRoutines from '@/components/displayRoutines/displaySomeRoutines.vue';
  import displayAllRoutines from '@/components/displayRoutines/displayAllRoutines.vue';
  import { ref } from 'vue'
  const categories= ref([
      { headline:'Recent workouts', viewAll: false},
      { headline:'Featured', viewAll: false},
      { headline:'Newly added', viewAll: false}    
  ])

  function changeView( category) {
      category.viewAll = !category.viewAll;
  }
  const searchWasMade = ref({val:false});
  function searchRutine(){  
    searchWasMade.val = true;
      console.log(search.val);
      // mando a api el input 
  }
</script>

<script>
  export default {
    data: () => ({
      searchInApi: '',
    })};
</script>

<style scoped>
.header {
    display: flex;
    width: 90%;
    align-content: center;
    justify-content: center;
    
    align-items: center;
    margin: auto;
    padding-bottom: 4%;
  }
.searcher {
  display: flex;
  height: 43px;
  margin-top: 2.5%;
}


</style>