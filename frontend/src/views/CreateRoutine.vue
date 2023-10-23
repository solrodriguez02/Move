<template>
<div class='create-routine'>

  <div class='appbar'>
    <button @click='goBackDialog = true' class='button'>
      <v-icon icon='$back'></v-icon>
      <p> {{navigationStore.getTabText(getTab())}} </p>
    </button>  
  </div>

  <warning-dialog
    v-model='goBackDialog'
    title='Are you sure you want to quit this page?'
    message='If you do so, your routine will be deleted. Press Cancel to continue editing and then go to "next" to save your changes.'
    custom-button-text="Quit"
    :on-custom-action="() => quitCreateRoutine(getTab())"
    :on-close='closeGoBackDialog'
    type='alert'/>

  <div class='header'>
    <div class='title'>
      <h2>{{routineIsNew? 'Create your routine':'Edit your routine'}}</h2>
    </div>

      <v-btn 
        class='text-none'
        color='violet'
        rounded
        size='large'
        height='40px'
        width='100px'
        variant='flat' 
        @click="isReadyToSave()">
          Next 
          <v-icon icon='$next'/>
        </v-btn>

        <warning-dialog
        v-model='nextDialog'
        title='You cant create a routine with an empty cycle.'
        message='Please add at least one exercise to all of your cycles.'
        custom-button-text='Continue editing'
        :on-custom-action='() => closeNextDialog()'
        :on-close='() => closeNextDialog()'
        type='informative'/>
  </div>

  <div class='carousel'>
  <v-sheet
    class='carousel-cycles'>
    <p class='cycle-text'>Cycles</p>
    <v-slide-group
      show-arrows>
      <v-slide-group-item v-for='(cycle, index) in createRoutineStore.cycleList' :key='cycle.name'>
        <button @click='selectCycleIndex(index)' v-show='cycle.status != "delete" && index!=2'>
          <div :class="cycleIndex === index ? 'carousel-cycle-active' : 'carousel-cycle'">
            <v-icon :icon='cycle.icon' class='cycle-icon'/>
            <p class='cycle-name'> {{ cycle.name }} </p>
          </div>
        </button>
        <button v-show='index == createRoutineStore.getCycleLenght() - 1 && createRoutineStore.getCycleLenght() < 10' @click='addCycle'>
          <div class='carousel-add'>
            <v-icon icon='$add'/>
          </div>
        </button>
      </v-slide-group-item>
      <button @click='selectCycleIndex(2)'>
          <div :class="cycleIndex === 2 ? 'carousel-cycle-active' : 'carousel-cycle'">
            <v-icon icon='$cool' class='cycle-icon'/>
            <p class='cycle-name'> {{createRoutineStore.cycleList[2].name }} </p>
          </div>
        </button>
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
        <div class='carousel-exercise' v-show='exercise.status != "delete"'>
          <RouterLink class='carousel-link' to='/exercise'>
            <div class='image-container'>
              <img class='carousel-image' :src="exercise.image" :alt="exercise.name"/>
              <div class='overlay'>
                <v-icon icon='$edit' color='black' size='20' class='edit-icon'/>
                <div class='time-container'>
                  <v-icon v-show="exercise.sec != 0 && exercise.sec != '-'" icon='$time' color='blue' size='20' />
                  <p v-show="exercise.sec != 0 && exercise.sec != '-'" class='overlay-text'>{{ exercise.sec + 's' }}</p>
                  <v-icon v-show="exercise.reps != 0 && exercise.reps != '-'" icon='$reps' color='blue' size='15' />
                  <p v-show="exercise.reps != 0 && exercise.reps != '-'" class='overlay-text'>{{ exercise.reps + ' reps' }}</p>
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
        <div v-show='getExercisesLenght(cycleIndex) < maxExerciseCount' class='carousel-empty-exercise'></div>
      </v-slide-group-item>
    </v-slide-group>

    <button v-show='cycleIndex!=0 && cycleIndex!=1 && cycleIndex!=2' @click='deleteDialog = true' class='delete-cycle-button'>
      <v-icon icon='$delete'/>
    </button>

    <warning-dialog
      v-model="deleteDialog"
      title='Are you sure you want to delete this cycle?'
      message='If you delete this cycle, all the exercises will be deleted too.'
      custom-button-text='Delete'
      :on-custom-action='deleteCycle'
      :on-close='closeDeleteDialog'
      type='alert'
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
      
      <RouterLink to='/createexercise' class='new-exercise-button'>
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
    <v-progress-circular v-if="loading"
      indeterminate
      color='blue'
      class='load-exercises-box'>
    </v-progress-circular>

    <div v-else class='exercises' v-for='exercise in exerciseStore.exerciseList' :key='exercise.name'>
      <div class='rest' @click='addExercise(cycleIndex, exercise)' v-if='exercise.name == "rest"'>
        <v-icon icon='$add'/>
        <v-icon icon='$rest' class='rest-item'/>
        <p class='rest-item'>Rest</p>
      </div>
      <div v-else class='exercise'>
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
  import { ref, onBeforeMount } from 'vue'
  import { RouterLink, useRouter } from 'vue-router'
  import { useExerciseStore } from '@/store/ExerciseStore'
  import { useCreateRoutineStore } from '@/store/CreateRoutineStore'
  import { useRoutineStore } from '@/store/RoutineStore'
  import { useNavigationStore } from '@/store/NavigationStore'
  import WarningDialog from "@/components/WarningDialog.vue"

  const exerciseStore = useExerciseStore()
  const createRoutineStore = useCreateRoutineStore()
  const routineStore = useRoutineStore()
  const navigationStore = useNavigationStore()
  const loading = ref(false)
  const deleteDialog = ref(false)
  const nextDialog = ref(false)
  const goBackDialog = ref(false)
  const selectedSecValue = ref(30)
  const selectedRepValue = ref('-')
  const cycleIndex = ref(0)
  const maxExerciseCount = ref(15)
  const router = useRouter()
  const routineIsNew = ref(false)
  const init = ref(true)

  onBeforeMount (async () => {
    loading.value = true
    routineIsNew.value = isNew()
    if(routineIsNew.value) {
      createRoutineStore.init()
    }
    else {
      if(init.value) await createRoutineStore.setRoutine(getId())
      init.value = false
    }
    await exerciseStore.fetchExercises()
    loading.value = false
  })

  function getTab() {
    return router.options.history.state.back
  } 

  const selectCycleIndex = (index) => {
    cycleIndex.value = index
  }

  const addCycle = (id=null) => {
    if(routineIsNew.value)
      createRoutineStore.addCycle()
    else createRoutineStore.addCycle('new', false)
    selectCycleIndex(createRoutineStore.getCycleLenght() - 1) 
  }

  const deleteCycle = () => {
    deleteDialog.value = false
    if(routineIsNew.value)
      createRoutineStore.deleteCycle(cycleIndex.value)
    else createRoutineStore.deleteExistingCycle(cycleIndex.value)
    selectCycleIndex(cycleIndex.value - 1)
  }

  const closeDeleteDialog = () => {
    deleteDialog.value = false
  }

  const closeGoBackDialog = () => {
    goBackDialog.value = false;
  }

  const quitCreateRoutine = (path) => {
    router.push(path)
  }

  const showNextDialog = () => {
    nextDialog.value = true
  }

  const closeNextDialog = () => {
    nextDialog.value = false
  }

  const getExercisesLenght = (cycleIdx) => {
    return createRoutineStore.cycleList[cycleIdx].exercises.length
  }

  const addExercise = (cycleIdx, exercise) => {
    if(getExercisesLenght(cycleIdx) <= maxExerciseCount.value) 
      if(routineIsNew.value)
        createRoutineStore.addExercise(cycleIdx, exercise, selectedSecValue.value, selectedRepValue.value)
      else createRoutineStore.addExercise(cycleIdx, exercise, selectedSecValue.value, selectedRepValue.value, 'new', false)
  }

  const deleteExercise = (cycleIdx, exerciseIdx) => {
    if(routineIsNew.value) 
      createRoutineStore.deleteExercise(cycleIdx, exerciseIdx)
    else {
      createRoutineStore.deleteExistingExercise(cycleIdx, exerciseIdx)
    }
  }

  function isNew() {
    return router.currentRoute.value.path == '/createroutine'
  }

  function getId() {
    return router.currentRoute.value.params.routineId
  }

  function saveLink() {
    if(routineIsNew.value) router.push('/saveroutine')
    else router.push('/saveexistingroutine/' + getId()) 
  }

  function isReadyToSave() {
    const readyToSave = ref(true)
    for(const cycle of createRoutineStore.cycleList) 
      if(cycle.exercises == null || cycle.exercises.length == 0) readyToSave.value = false
    if(readyToSave.value) saveLink()
    else showNextDialog()
  }
</script>

<style scoped src='@/styles/CreateRoutine.scss'></style>
<style scoped src='@/styles/Globals.scss'></style>