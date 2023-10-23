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
        @keydown.enter="searchRoutines(searchInApi); "
            density='compact'
            placeholder='Search rutine'
            rounded
            variant='outlined'>
            <v-btn icon="$search" flat class="mr-3 ml-0 search" size="x-small" @click="searchRoutines(searchInApi)" />
        </v-text-field>  
      </v-sheet>
    </v-sheet>
    </div>

  <v-progress-circular v-if="loading"
    indeterminate
    color="blue"
    class='load-cycle-box'>
  </v-progress-circular>

  <div v-else>
  <v-sheet v-if="!searchWasMade" >
      <v-row>
        <v-sheet class="routines-box" width="1140">
        <v-container class='title' >   
          <v-row no-gutters class="pa-0 ma-0 mb-3 align-center">
            <v-col >
              <h3>Newly added</h3>
            </v-col>
            <v-col  cols="1">
              <v-btn  flat class='viewAll' @click='changeView(category)' >{{ `View ${category.viewAll? 'less':'all'}` }}</v-btn>
            </v-col>
          </v-row>
        </v-container>        
          <displaySomeRoutines :items="routineStore.routineList[0]" class='display' v-if="!category.viewAll"/>
          <displayAllRoutines :items="routineStore.routineList[0]" class='display' v-else />
      </v-sheet>
      </v-row>
  </v-sheet> 
    <displayAllRoutines v-else :items="data" class='display' :key="searchWasMade" />
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

  const searchWasMade = ref(0);
  const searchInApi = ref('');
  const selected = ref([]);
  var data  = ref([]);
  var selectedCount = 0; 
  
  const category = ref([
      { viewAll: false, hasRoutines: true}    
  ])

  onBeforeMount (async () => {
    loading.value = true
    await routineStore.getApiRoutinesByCategory('new',0)
    loading.value = false
  })
  
  function changeView( category) {
      category.viewAll = !category.viewAll;
  }

  
  async function searchRoutines(searchInApi){
    if(searchInApi!=='' || selectedCount>0){ 
      
      const ans = await routineStore.getApiRoutinesByName(searchInApi,0)
      data = routineStore.routineList[0]
      
      searchWasMade.value++; 

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