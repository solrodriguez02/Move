<template>
  <v-container fill-height>
    <v-sheet class="d-flex mb-5 ma-2 pa-2 mt-0" >
      <v-sheet class="me-auto">
        <h1>Explore</h1>
      </v-sheet>
      <v-sheet width="900">
        <v-text-field 
        v-model="searchInApi"
        @keydown.enter="searchRutine()"
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
        <v-chip v-for="s in selected"
      class="ma-2"
      closable
      color="light-grey"
      text-color="white"
      :model-value="true"
      v-if="selected!=null"
      @click:close="removeChoice(selected,s)"
    >
      {{ s }}
    </v-chip>
  </v-chip-group>
  </v-row>
  </v-sheet>
    </v-sheet>
  </v-container>

  <v-sheet v-if="!searchWasMade.val" >
      <v-row v-for='category in categories' 
             :key='n' >
        <v-container class='title' >   
          <v-row no-gutters class="pa-0 ma-0 mb-2 align-center">
            <v-col    >
              <h3>{{ category.headline }}</h3>
            </v-col>
            <v-col  cols="2">
              <v-btn flat class='viewAll' @click='changeView(category)' >{{ `View ${category.viewAll? 'less':'all'}` }}</v-btn>
            </v-col>
          </v-row>
        </v-container>
        <displaySomeRoutines class='display' v-if="!category.viewAll"/>
        <displayAllRoutines class='display' v-else />
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

  const filters=ref([
      { headline:'Difficulty', items: ['Difficult', 'Medium', 'Easy'], choice:null},
      { headline:'Muscle group', items: ['Front', 'Back'], choice:null},
      { headline:'Approach', items: ['Cardio', 'Strength', 'Flexibility', 'Resistance'], choice:null},    
      { headline:'Time', items: ['15 minutes', '30 minutes', '45 minutes', '1 hour'], choice:null},
  ]);

  function removeChoice( selected,filter ){
    selected.filter( s => s!=filter);
    console.log(filter);
  }

  function changeView( category) {
      category.viewAll = !category.viewAll;
  }
  const searchWasMade = ref({val:false});
  
  function searchRutine(){  
    searchWasMade.val = true;
      console.log(search.val);
      // mando a api el input 
  }

  function addFilter( selected,choice) {
    
    if ( selected.lenght>0)
    for (s in selected){
      if (s==choice)
        return;
    } 
    selected.push(choice);
    //selected.push(filter.choice)
  }
</script>

<script>
  export default {
    data: () => ({
      searchInApi: '',
      selected: [],
    })};
</script>

<style scoped src='@/styles/MyRoutines.scss'/>