<template>
  <v-container fill-height>
    <v-sheet class="d-flex mb-5 ma-2 pa-2 mt-0" >
      <v-sheet class="me-auto">
        <h1>Explore</h1>
      </v-sheet>
      <v-sheet width="900">
        <v-text-field 
        v-model="searchInApi"
        @keydown.enter="if(searchInApi!=='' || selectedCount>0){ searchWasMade=true; routineStore.searchRutine(searchInApi,selected)}"
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
                <v-col v-for='filter in routineStore.filters'>
                  <v-autocomplete
                    :class='filter.label'
                    :label='filter.label'
                    :items='filter.options'
                    variant="solo"
                    bg-color="lightblue"      
                    v-model='filter.selected'
                    menu-icon='$arrow'
                    rounded
                    @update:model-value="addFilter(selected,filter.selected)"
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

  <v-progress-circular v-if="loading"
    indeterminate
    color="blue"
    class='load-cycle-box'>
  </v-progress-circular>

  <div v-else>
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
        <displaySomeRoutines :items="routineStore.getDataCategory(category.headline,routineStore.routineList.value)" class='display' v-if="!category.viewAll"/>
        <displayAllRoutines :items="routineStore.getDataCategory(category.headline,routineStore.routineList.value)" class='display' v-else />
      </v-row>
  </v-sheet>
  <displayAllRoutines :items="routineStore.getData(searchInApi,selected,routineStore.routineList.value)" class='display' v-else/>
</div>

</template>
  
<script setup>
  import displaySomeRoutines from '@/components/displayRoutines/displaySomeRoutines.vue';
  import displayAllRoutines from '@/components/displayRoutines/displayAllRoutines.vue';
  import { ref, onBeforeMount } from 'vue'
  import { useRoutineStore } from '@/store/RoutineStore'

  const routineStore = useRoutineStore()
  const loading = ref(false)

  const searchWasMade = ref(false);
  const searchInApi = ref('');
  const selected = ref([]);
  var selectedCount = 0; 

  const categories = ref([
      { headline:'Recent workouts', viewAll: false},
      { headline:'Featured', viewAll: false},
      { headline:'Newly added', viewAll: false}    
  ])

  onBeforeMount (async () => {
    loading.value = true
    await routineStore.fetchRoutines()
    loading.value = false
  })
  
  function changeView( category) {
      category.viewAll = !category.viewAll;
  }

  function addFilter( selected,choice) {
    if (choice==null)
      return;
    if ( !selected.includes(choice)){
      selected.push(choice);
      selectedCount++;
    }
  }

  function removeChoice( selected,i ) {
    delete(selected[i]);
    selectedCount--;
  }
</script>

<style scoped src='@/styles/MyRoutines.scss'/>