<template>

  <div class = 'appbar appbar-margin' @click="goBack">
    <v-icon icon='$back'></v-icon>
    <p>{{navigationStore.getTabText(getTab())}}</p>  
  </div>

  <v-progress-circular v-if="loading"
      indeterminate
      color="blue"
      class='load-cycle-box'>
    </v-progress-circular>
    
  <div v-else>

  <div class='gray-section'>  

      <div class = 'top-bar'>
        <h2 class = 'highlight-text'>{{ data.name }}</h2>
        <div class = 'icons-top-right'>

          <button @click="toggleFavorite" class='favorite-button'>
            <v-icon :icon="isFavorite ? '$favfull' : '$favempty'" size='30'/>
          </button>
            
          <v-menu>
            <template v-slot:activator='{ props }'>
              <button v-bind='props'>
                <v-icon icon='$options' size='30'/>
              </button>
            </template>
            <v-list width='180'>
              <v-list-item v-for='(option, index) in menuOptions' :key='index'>
                <button class='menu-option' @click='option.function'>
                  <v-icon :icon='option.icon' class='menu-option-icon'/>
                  <v-list-item-title>{{ option.title }}</v-list-item-title>
                </button>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>

  <warning-dialog
    v-model='deleteDialog'
    title='Are you sure you want delete the routine?'
    message="If you do so, your routine will be deleted permanently, you won't be able to recover it."
    custom-button-text='Delete'
    :on-custom-action='deleteRoutine'
    :on-close='closeDeleteDialog'
    type='alert'
  />

  <warning-dialog
    v-model='shareDialog'
    title='Share routine'
    message="Press Copy Link to copy the routine's link to your clipboard."
    custom-button-text='Copy Link'
    :on-custom-action='shareRoutine'
    :on-close='closeShareDialog'
    type='informative'
  />

  <div class = 'routine-general'> 
    <div class = 'img-section'>
      <div class = 'header-info'>
        <img :src='data.user.img' alt='profile picture' height='50' width='50' class='image-profile'/>
        <p class='username'>By {{ data.user.name }}</p>
        <div class = 'total-duration'>
          <v-icon icon= '$time' color='blue'></v-icon>
          <p class='time-text'>{{ getTime() }}</p>
        </div>
      </div>
      <div class='routine-img'>
        <v-img :src='data.src' alt='Routine image' cover aspect-ratio="16/9" height='295px' width='600px' class='image'/>
      </div>
    </div>

    <div class = 'routine-info'>
      <div v-for='item in highlightsItems' :key='item.name' class='routine-info-cards'>
        <v-card
          :color='item.color'
          class='icon-card-1'
          variant='flat'>
          <v-icon :icon='item.icon' color='white' class='highlight-icon' size='30'></v-icon>
        </v-card>
        <v-card class='icon-card-2' variant='flat'>
          <p> {{ item.detail }}</p>
        </v-card>
      </div>
    </div>
  </div>

  <div class='cycles'>
    <div class='cycles-options'>
      <button v-for="(cycle, index) in cyclesOptions" :key='cycle.name'  @click="selectCycleOptionIndex(index)" :class="index == cycleOptionIndex? 'cycle-option-active':'cycle-option'">
        <label>{{ cycle.name }}</label>
        <v-icon :icon='cycle.icon' class='cycle-icon'/>
      </button>
    </div>
  </div>


  <div class='cycle'>
    <div v-for='(cycle, index) in cycles' v-show='showCycle(index)'>
    <div class='cycle-header'>
      <h2>{{ cycle.name }}</h2>
      <div class='cycle-reps'>
        <v-icon icon='$reps'/>
        {{cycle.reps}}
      </div>
    </div> 
    <div class='exercises' v-for='exercise in cycle.exercises' :key='exercise.name'>
      <div class='exercise'>
          <div class='exercise-image-box'>
            <img :src='exercise.image' :alt='exercise.name' class='exercise-image'/>
          </div>
          <label class='exercise-text'> {{ exercise.name }} </label>
          <v-icon v-show="exercise.sec!='-'" icon='$time' class='exercise-icon'/>
          <label v-show="exercise.sec!='-'" class='exercise-time'> {{ exercise.sec + 's'}} </label>
          <v-icon v-show="exercise.reps!='-'" icon='$reps' size='20' class='exercise-icon'/>
          <label v-show="exercise.reps!='-'" class='exercise-time'> {{ exercise.reps + ' reps'}} </label>
        <div class='next-icon'> 
          <RouterLink :to="`/exercise/${exercise.id}`" >
              <v-icon icon='$next' color='dark_gray' />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

</div>

  </div>

</div>

            
</template>
  
<script setup>

  import { ref,onBeforeMount } from 'vue'
  import { useRouter,useRoute } from 'vue-router'
  import WarningDialog from "@/components/WarningDialog.vue"
  import { useNavigationStore } from '@/store/NavigationStore'
  import { useRoutineStore } from '@/store/RoutineStore'
  import { useExerciseStore } from '@/store/ExerciseStore'
  import { RouterLink } from 'vue-router';

  const routineStore = useRoutineStore()
  
  const router = useRouter()
  const loading = ref(true)
  const route = useRoute()

  const cycleOptionIndex = ref(0)
  
  const deleteDialog = ref(false)
  const shareDialog = ref(false)

  const navigationStore= useNavigationStore()

  const data = ref([])
  const isFavorite = ref(null)
  const notFound = ref(false)

  onBeforeMount (async () => {
    console.log(route.params.routineId)
    //await routineStore.fetchRoutine( route.params.routineId )
    try {
      loading.value = true 
      data.value = await routineStore.getRoutineApiData(route.params.routineId)
      loading.value = false 
    } catch ( errorObj ){
      notFound.value = true
    }
    
  
    if ( data.value)
      loadData()
    
  }) 

  const cycles = ref([])

  function loadData(){
   
     
    console.log( 'Rutina'+ data.value.filters.difficulty)
    isFavorite.value = data.value.fav

    highlightsItems.value = [
      { name:'Difficulty', detail: data.value.filters.difficulty + " difficulty" , icon:'$flash', color:'turquoise'},
      { name:'Space', detail: data.value.filters.requiredSpace, icon:'$space', color:'violet' },
      { name:'Approach', detail: data.value.filters.approach, icon:'$person', color:'lightblue' },
      { name:'Elements required', detail:data.value.filters.elements.join(", "), icon:'$dumbbell', color:'blue' },
  ];


  cycles.value.push({ name:'Warm up', reps:1, exercises: data.value.warm})
  
  var aux
  for (var c=0; c<data.value.cycles.length ; c++) {
    aux = []
    for (var i=0; i<data.value.cycles[c].exercises.length ; i++){
      aux.push( data.value.cycles[c].exercises[i])
    }
      
    cycles.value.push({ name:'Cycle '+c, reps:data.value.cycles[c].reps, exercises: aux})
  }
  
  cycles.value.push({ name:'Cooling', reps:1, exercises: data.value.cooling})

  }

  function getTab() {
    return router.options.history.state.back
  }

  const goBack = () => {
    router.go(-1)
  }

  const selectCycleOptionIndex = (index) => {
    cycleOptionIndex.value = index
  }

  const showCycle = (index) => {
    switch(index) {
      case 0: 
        return cycleOptionIndex.value == 0
      case data.value.cycles.length+1: 
        return cycleOptionIndex.value == lastCycleOptionIndex
      default: 
        return cycleOptionIndex.value == 1
    }
  }

  const showDeleteDialog = () => {
    deleteDialog.value = true
  }

  const showShareDialog = () => {
    shareDialog.value = true
  }

  const closeDeleteDialog = () => {
    deleteDialog.value = false
  }

  const closeShareDialog = () => {
    shareDialog.value = false
  }

  const deleteRoutine = () => {
    // codigo para eliminar la rutina
    router.go(-1)
  }

  const editRoutine = () => {
    router.push('/createroutine')
  }

  const shareRoutine = async () => {
    const link = router.currentRoute.value.fullPath;
    await navigator.clipboard.writeText(link);
    closeShareDialog()
  }

  const menuOptions = ref([
    { title:'Share', icon:'$share', function: showShareDialog },
    { title:'Edit', icon:'$edit', function: editRoutine },
    { title:'Delete', icon:'$delete', function: showDeleteDialog },
  ])

  const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
    //todo post de fav
  };
   
  const highlightsItems = ref([])


  const cyclesOptions = ref([
    { name:'Warm up', icon:'$warm' },
    { name:'Exercise', icon:'$fire' },
    { name:'Cooling', icon:'$cool' }
  ])

  const lastCycleOptionIndex = cyclesOptions.value.length - 1

  function getTime(){
    // itera x cda ejercicio y estima tiempo
    const tReps = 5

    return cycles.value.length + ' m'
  }

  </script>

  <style scoped src='@/styles/Routine.scss'></style>
  <style scoped src='@/styles/Globals.scss'></style>