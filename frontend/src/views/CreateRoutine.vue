<template>
<div class='create-routine'>

  <div class='appbar'>
    <button @click='goBackDialog = true' class='button'>
      <v-icon icon='$back'></v-icon>
      <p> {{ getTab() }} </p>
    </button>  
  </div>

  <warning-dialog
    v-model='goBackDialog'
    title='Are you sure you want to quit this page?'
    message='If you do so, your routine will be deleted. Press Cancel to continue editing and then go to "next" to save your changes.'
    custom-button-text="Quit"
    :on-custom-action='quitCreateRoutine'
    :on-close='closeGoBackDialog'
  />

  <div class='header'>
    <div class='title'>
      <h2>Create your routine</h2>
    </div>
    <RouterLink to='/saveroutine'>
      <v-btn 
        class='text-none'
        color='violet'
        rounded
        size='large'
        height='40px'
        width='100px'
        variant='flat'>
          Next 
          <v-icon icon='$next'/>
        </v-btn>
    </RouterLink>
  </div>

  <div class='carousel'>
  <v-sheet
    class='carousel-cycles'>
    <p class='cycle-text'>Cycles</p>
    <v-slide-group
      show-arrows>
      <v-slide-group-item v-for='(cycle, index) in createRoutineStore.cycleList' :key='cycle.name'>
        <button @click='selectCycleIndex(index)'>
          <div :class="cycleIndex === index ? 'carousel-cycle-active' : 'carousel-cycle'">
            <v-icon :icon='cycle.icon' class='cycle-icon'/>
            <p class='cycle-name'> {{ cycle.name }} </p>
          </div>
        </button>
        <button v-show='index == createRoutineStore.getCycleLenght() - 2 && createRoutineStore.getCycleLenght() < 10' @click='addCycle'>
          <div class='carousel-add'>
            <v-icon icon='$add'/>
          </div>
        </button>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>  
  </div>

  <h4>Add your exercises</h4>

  <div class='carousel'>
  <v-sheet color='gray' class='carousel-exercises'>
    <div class='carousel-reps'>
      <p class='reps-text'>Reps</p>
      <v-autocomplete
      v-model="createRoutineStore.cycleList[cycleIndex].reps"
      :items="routineStore.cycleRepOptions"
      prepend-inner-icon='$reps'
      variant='flat'
      density='dense'
      menu-icon=''
      class='reps-input'/>
    </div>

    <v-progress-circular v-if="loading"
      indeterminate
      color="blue"
      class='load-cycle-box'>
    </v-progress-circular>

    <v-slide-group v-else show-arrows class='carousel-exercises-box'>
      <v-slide-group-item v-for="(exercise, index) in createRoutineStore.cycleList[cycleIndex].exercises" :key='exercise.name'>
        <div class='carousel-exercise'>
          <RouterLink class='carousel-link' to='/exercise'>
            <div class='image-container'>
              <img class='carousel-image' :src="exercise.image" :alt="exercise.name"/>
              <div class='overlay'>
                <v-icon icon='$edit' color='black' size='20' class='edit-icon'/>
                <div class='time-container'>
                  <v-icon v-show="exercise.sec != '-'" icon='$time' color='blue' size='20' />
                  <p v-show="exercise.sec != '-'" class='overlay-text'>{{ exercise.sec + 's' }}</p>
                  <v-icon v-show="exercise.reps != '-'" icon='$reps' color='blue' size='15' />
                  <p v-show="exercise.reps != '-'" class='overlay-text'>{{ exercise.reps + ' reps' }}</p>
                </div>
              </div>
            </div>
          </RouterLink>
          <div class='bottom-container'>
            <p class='carousel-exercise-name'> {{ exercise.name }} </p>
            <button @click='deleteExercise(cycleIndex, index)'>
              <v-icon icon='$delete' size='20' color='dark_gray'></v-icon>
            </button>
          </div>
        </div>
      </v-slide-group-item>
      <v-slide-group-item>
        <div class='carousel-empty-exercise'></div>
      </v-slide-group-item>
    </v-slide-group>

    <button v-show='cycleIndex!=0 && cycleIndex!=1 && cycleIndex!=createRoutineStore.getCycleLenght() - 1' @click='deleteDialog = true' class='delete-cycle-button'>
      <v-icon icon='$delete'/>
    </button>

    <warning-dialog
      v-model="deleteDialog"
      title='Are you sure you want to delete this cycle?'
      message='If you delete this cycle, all the exercises will be deleted too.'
      custom-button-text='Delete'
      :on-custom-action='deleteCycle'
      :on-close='closeDeleteDialog'
    />
    
  </v-sheet>
  </div>

  <div class='searcher'>
    <div class='search'>
      <v-text-field
          density='compact'
          placeholder='Search exercise'
          prepend-inner-icon='$search'
          rounded
          variant='outlined'/>
      </div>

      <button class='filter-button' @click='filterDialog = true'>
        <v-icon icon='$filter' size='26'/>
      </button>

    <v-dialog v-model='filterDialog' max-width='800'>
      <v-card>
        <v-toolbar color='gray' class='filters-header'>
          <v-toolbar-title>Filter results</v-toolbar-title>
          <button @click="filterDialog = false">
            <v-icon icon='$close'/>
          </button>
        </v-toolbar>
        <v-card-text v-for='filter in routineStore.filters' :key='filter.label'>
          <h2 class='text-h6 mb-1'>
            {{ filter.label }}
          </h2>
          <v-chip-group :v-model='filter.selected' column multiple>
            <v-chip
              v-for='(option, index) in filter.options'
              :key='index'
              :value='index'
              filter
              variant='outlined'>
              {{ option }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
        <v-card-actions>
          <button @click='applyFilters' class='apply-filters-button'>Apply filters</button>
        </v-card-actions>
      </v-card>
    </v-dialog>
      
      <RouterLink to='/createexercise' class='new-button'>
        <button >
          <p>New exercise</p>
        </button>
      </RouterLink>
  </div>
 
  <div class='sec-reps'>
    <h4>Select the exercises' time and add them</h4>
    <div class='sec-reps-options'>
      <v-icon icon='$time' class='exercise-icon'/>
      <label class='secs-reps-label'>sec:</label>
      <v-autocomplete
        v-model="selectedSecValue"
        :items="routineStore.secOptions"
        variant='flat'
        density='dense'
        class='sec-reps-input'
        menu-icon='$arrow'>
      </v-autocomplete>
      <label class='secs-reps-label'>reps:</label>
      <v-autocomplete
        v-model="selectedRepValue"
        :items="routineStore.repOptions"
        variant='flat'
        density='dense'
        class='sec-reps-input'
        menu-icon='$arrow'/>
    </div>
  </div>

  <div class='exercise-search'>
    <div class='rest' @click=''>
      <v-icon icon='$add'/>
      <v-icon icon='$rest' class='rest-item'/>
      <p class='rest-item'>Rest</p>
    </div>

    
    <v-progress-circular v-if="loading"
      indeterminate
      color='blue'
      class='load-exercises-box'>
    </v-progress-circular>

    <div v-else class='exercises' v-for='exercise in exerciseStore.exerciseList' :key='exercise.name'>
      <div class='exercise'>
        <div class='add' @click='addExercise(cycleIndex, exercise)'>
          <v-icon icon='$add'/>
          <div class='exercise-image-box'>
            <img :src='exercise.image' :alt='exercise.name' class='exercise-image'/>
          </div>
          <p class='exercise-text'> {{ exercise.name }} </p>
        </div>
        <div class='next-icon'>
          <RouterLink to='/exercise'>
              <v-icon icon='$next' color='dark_gray'/>
          </RouterLink>
        </div>
      </div>
      <v-divider/>
    </div>
  </div>

</div>
</template>
  
<script setup>
  import { ref, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
  import { RouterLink, useRouter } from 'vue-router'
  import { useExerciseStore } from '@/store/ExerciseStore'
  import { useCreateRoutineStore } from '@/store/CreateRoutineStore'
  import { useRoutineStore } from '@/store/RoutineStore'
  import WarningDialog from "@/components/WarningDialog.vue"

  const exerciseStore = useExerciseStore()
  const createRoutineStore = useCreateRoutineStore()
  const routineStore = useRoutineStore()
  const loading = ref(false)
  const filterDialog = ref(false)
  const deleteDialog = ref(false)
  const goBackDialog = ref(false);
  const selectedSecValue = ref(30)
  const selectedRepValue = ref('-')
  const cycleIndex = ref(0)

  onBeforeMount (async () => {
    loading.value = true
    createRoutineStore.init()
    await exerciseStore.fetchExercises()
    loading.value = false
  })

  const router = useRouter()

  function getTab(){
    return router.options.history.state.back 
  }

  const selectCycleIndex = (index) => {
    cycleIndex.value = index
  }

  const addCycle = () => {
    createRoutineStore.addCycle()
    selectCycleIndex(createRoutineStore.getCycleLenght() - 2) 
  }

  const deleteCycle = () => {
    deleteDialog.value = false
    createRoutineStore.deleteCycle(cycleIndex.value)
    selectCycleIndex(cycleIndex.value - 1)
  }

  const closeDeleteDialog = () => {
    deleteDialog.value = false
  }

  const closeGoBackDialog = () => {
    goBackDialog.value = false;
  }

  const quitCreateRoutine = () => {
    router.go(-1);
  }

  const applyFilters = () => {
    filterDialog.value = false
    // codigo para aplicar los filtros
  }

  const addExercise = (cycleIdx, exercise) => {
    createRoutineStore.addExercise(cycleIdx, exercise, selectedSecValue.value, selectedRepValue.value)
  }

  const deleteExercise = (cycleIdx, exerciseIdx) => {
    createRoutineStore.deleteExercise(cycleIdx, exerciseIdx)
  }
</script>

<style scoped src='@/styles/CreateRoutine.scss'></style>