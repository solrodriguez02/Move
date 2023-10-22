<template>
<div class='basics'>
  <div>
    <v-sheet class='d-flex mb-5'>
      <v-sheet class="me-auto">
        <h1>Explore</h1>
      </v-sheet>
      <v-sheet width='900'>
        <v-text-field 
        v-model="searchInApi"
        @keydown.enter="key += searchRoutines(searchInApi, selected, searchWasMade); "
            density='compact'
            placeholder='Search rutine'
            rounded
            variant='outlined'>
            <v-btn icon="$search" flat class="mr-3 ml-0 search" size="x-small" @click="key += searchRoutines(searchInApi, selected, searchWasMade)" />
        </v-text-field>  
      </v-sheet>
    </v-sheet>
    <v-sheet class="d-flex me-4">
      <v-sheet width="700">
      <v-row class="ms-4 text-disabled">Filter by</v-row>
        <v-container class="ms-0 ps-0">
          <v-row>
              <v-col class="d-flex align-center"     
                cols="12" min-width="80">
                <v-col v-for='filter in routineStore.filters' >
                  <v-autocomplete
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
    <v-sheet class="ms-3" width="450">
      <v-row class="text-disabled" >Selected filters</v-row>
      <v-row>
        <v-chip-group>
        <v-chip v-for="(s,index) in selected"
      class="ma-2"
      closable
      color="light-grey"
      close-icon="$close"
      :model-value="true"
      @click:close="removeChoice(selected,index)"
    >
      {{ s }}
    </v-chip>
  </v-chip-group>
  </v-row>
  </v-sheet>
    </v-sheet>
  </div>

  <v-progress-circular v-if="loading"
    indeterminate
    color="blue"
    class='load-cycle-box'>
  </v-progress-circular>

  <div v-else>
  <v-sheet v-if="!searchWasMade[0]" >
      <v-row>
        <v-sheet class="routines-box" width="1140">
        <v-container class='title' >   
          <v-row no-gutters class="pa-0 ma-0 mb-3 align-center">
            <v-col >
              <h3>Newly added</h3>
            </v-col>
            <v-col  cols="1">
              <v-btn :v-show="category.hasRoutines" flat class='viewAll' @click='changeView(category)' >{{ `View ${category.viewAll? 'less':'all'}` }}</v-btn>
            </v-col>
          </v-row>
        </v-container>        
          <displaySomeRoutines :items="routineStore.routineList[0]" class='display' v-if="!category.viewAll"/>
          <displayAllRoutines :items="routineStore.routineList[0]" class='display' v-else />
      </v-sheet>
      </v-row>
  </v-sheet> 
    <displayAllRoutines v-else :items="data" class='display' :key="key" />
</div>
</div>

</template>
  
<script setup>
  import displaySomeRoutines from '@/components/displayRoutines/displaySomeRoutines.vue';
  import displayAllRoutines from '@/components/displayRoutines/displayAllRoutines.vue';
  import { ref, onBeforeMount } from 'vue'
  import { useRoutineStore } from '@/store/RoutineStore'

  const routineStore = useRoutineStore()
  const loading = ref(false)

  const searchWasMade = ref([false]);
  const searchInApi = ref('');
  const selected = ref([]);
  var data  = ref([]);
  var selectedCount = 0; 
  const key= ref(0);
  
  const category = ref([
      { viewAll: false, hasRoutines: true}    
  ])

  onBeforeMount (async () => {
    loading.value = true
    await routineStore.getApiRoutinesByCategories(['new'])
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
  
  function searchRoutines(searchInApi, selected,searchWasMade){
    if(searchInApi!=='' || selectedCount>0){ 
      
      routineStore.getApiRoutinesWithFilters()
      data = routineStore.routineList[0]
      
      searchWasMade[0] = true; 

      if ( ans == -1 )
        category.value.hasRoutines = false
      else
      category.value.hasRoutines = true
      return 1;
    }
    return 0;
  }
</script>

<style scoped src='@/styles/MyRoutines.scss'/>
<style scoped src='@/styles/Globals.scss'/>
<style scoped src='@/styles/previewRoutine/display.css'/>