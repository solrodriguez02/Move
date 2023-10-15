<template>
  <v-container fill-height>
    <v-sheet class="d-flex mb-5 ma-2 pa-2 mt-0" >
      <v-sheet class="me-auto">
        <h1>Explore</h1>
      </v-sheet>
      <v-sheet width="900">
        <v-text-field 
        v-model="searchInApi"
        @keydown.enter="if(searchInApi!=='' || selectedCount>0){ searchWasMade=true; searchRutine(searchInApi,selected)}"
            density='compact'
            placeholder='Search rutine'
            prepend-inner-icon='$search'
            rounded
            variant='outlined'>
        </v-text-field>  
      </v-sheet>
    </v-sheet>
    <v-sheet class="d-flex me-4">
      <v-sheet width="700" >
      <v-row class="ms-4 text-disabled">Filter by</v-row>
        <v-container class="ms-0 ps-0" fluid>
          <v-row>
              <v-col class="d-flex align-center"     
                cols="12" min-width="80">
                <v-col v-for='filter in filters' 
                     >
                  <v-select :class='filter.headline'
                    :label='filter.headline'
                    :items='filter.items'
                    variant="solo"
                    bg-color="light-blue"          
                    v-model='filter.choice'
                    @update:model-value="addFilter(selected,filter.choice)"
                />
                </v-col>  
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    <v-sheet class="ms-3">
      <v-row class="text-disabled" >Selected filters</v-row>
      <v-row>
        <v-chip-group>
        <v-chip v-for="(s,index) in selected"
      class="ma-2"
      closable
      color="light-grey"
      text-color="white"
      :model-value="true"
      @click:close="removeChoice(selected,index)"
    >
      {{ s }}
    </v-chip>
  </v-chip-group>
  </v-row>
  </v-sheet>
    </v-sheet>
  </v-container>

  <v-sheet v-if="!searchWasMade" >
      <v-row v-for='category in categories'>
        <v-container class='title' >   
          <v-row no-gutters class="pa-0 ma-0 mb-3 align-center">
            <v-col >
              <h3>{{ category.headline }}</h3>
            </v-col>
            <v-col  cols="1">
              <v-btn flat class='viewAll' @click='changeView(category)' >{{ `View ${category.viewAll? 'less':'all'}` }}</v-btn>
            </v-col>
          </v-row>
        </v-container>
        <displaySomeRoutines :items="getDataCategory(category.headline,data)" class='display' v-if="!category.viewAll"/>
        <displayAllRoutines :items="getDataCategory(category.headline,data)" class='display' v-else />
      </v-row>
  </v-sheet>
  <displayAllRoutines :items="getData(searchInApi,selected,data)" class='display' v-else/>
  

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
  
  const filters=ref([
      { headline:'Difficulty', items: ['Difficult', 'Medium', 'Easy'], choice:null},
      { headline:'Muscle group', items: ['Front', 'Back'], choice:null},
      { headline:'Approach', items: ['Cardio', 'Strength', 'Flexibility', 'Resistance'], choice:null},    
      { headline:'Time', items: ['15 minutes', '30 minutes', '45 minutes', '1 hour'], choice:null},
  ]);

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

  const searchWasMade = ref(false);
  const searchInApi = ref('');
  var selectedCount = 0; 
  function searchRutine(searchInApi, selected){  
      // mando a api el input 
      // searchInApi tiene input/busqueda
      // selected contiene array con filtros, (hay espacios undefined => no tenerlos en cuenta)
      for ( var i=0; i<selected.length; i++){
        if ( selected[i] !== undefined ){
          // mando a api
        }
      }      
  }
  const selected = ref([]);
  function addFilter( selected,choice) {
    if ( !selected.includes(choice)){
      selected.push(choice);
      selectedCount++;
    }
  }

  function removeChoice( selected,i ){
    delete(selected[i]);
    selectedCount--;
  }

  function getDataCategory(headline,data){
    // pido a api
    return data;
  }

  function getData( headline, selected,data){
    // pido a api
    return data;
  }
</script>

<style scoped src='@/styles/MyRoutines.scss'/>