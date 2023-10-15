<template>
<div class='create-routine'>

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
      <v-slide-group-item v-for="(cycle, index) in createRoutineStore.cycleList" :key="cycle.name">
        <button v-show="index < lastCycleIndex" @click="selectCycleIndex(index)">
          <div :class="cycleIndex === index ? 'carousel-cycle-active' : 'carousel-cycle'">
            <v-icon :icon='cycle.icon' class='cycle-icon'/>
            <p class='cycle-name'> {{ cycle.name }} </p>
          </div>
        </button>
      </v-slide-group-item>
      <v-slide-group-item>
        <button>
          <div class='carousel-add'>
            <v-icon icon='$add'/>
          </div>
        </button>
      </v-slide-group-item>
      <v-slide-group-item>
        <button @click="selectCycleIndex(lastCycleIndex)">
          <div :class="cycleIndex === lastCycleIndex ? 'carousel-cycle-active' : 'carousel-cycle'">
            <v-icon :icon='createRoutineStore.cycleList[lastCycleIndex].icon' class='cycle-icon'/>
            <p class='cycle-name'> {{ createRoutineStore.cycleList[lastCycleIndex].name }} </p>
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
      <v-slide-group-item v-for="exercise in createRoutineStore.cycleList[cycleIndex].exercises" :key='exercise.name'>
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
            <p class='carousel-exercise-name'> {{ exercise.name }} </p>
          </RouterLink>
        </div>
      </v-slide-group-item>
      <v-slide-group-item>
        <div class='carousel-empty-exercise'></div>
      </v-slide-group-item>
    </v-slide-group>

    <button @click='deleteDialog = true' class='delete-exercise-button'>
      <v-icon icon='$delete'/>
    </button>

    <warning-dialog
      v-model="deleteDialog"
      title="Are you sure you want to delete this cycle?"
      message="If you delete this cycle, all the exercises will be deleted too."
      custom-button-text="Delete"
      :on-custom-action="applyDelete"
      :on-close="closeDeleteDialog"
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
          <button @click="applyFilters" class='apply-filters-button'>Apply filters</button>
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
    <div class='rest' onclick="">
      <v-icon icon='$add'/>
      <v-icon icon='$rest' class='rest-item'/>
      <p class='rest-item'>Rest</p>
    </div>

    
    <v-progress-circular v-if="loading"
      indeterminate
      color="blue"
      class='load-exercises-box'>
    </v-progress-circular>

    <div v-else class='exercises' v-for='exercise in exerciseStore.exerciseList' :key='exercise.name'>
      <div class='exercise'>
        <div class='add' onclick="">
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
  import { RouterLink } from 'vue-router'
  import { useExerciseStore } from '@/store/ExerciseStore'
  import { useCreateRoutineStore } from '@/store/CreateRoutineStore'
  import { useRoutineStore } from '@/store/RoutineStore'
  import WarningDialog from "@/views/WarningDialog.vue"

  const exerciseStore = useExerciseStore()
  const createRoutineStore = useCreateRoutineStore()
  const routineStore = useRoutineStore()

  const loading = ref(false)
  const filterDialog = ref(false);
  const deleteDialog = ref(false);
  const selectedSecValue = ref(30)
  const selectedRepValue = ref('-')
  const cycleIndex = ref(0)
  const lastCycleIndex = createRoutineStore.getLastCycleIndex()

  onBeforeMount (async () => {
    loading.value = true
    await exerciseStore.fetchExercises()
    loading.value = false
  })

  const selectCycleIndex = (index) => {
    cycleIndex.value = index
  }

  const applyDelete = () => {
    deleteDialog.value = false;
    // codigo para eliminar un ejercicio del cyclo
  };

  const closeDeleteDialog = () => {
    deleteDialog.value = false;
  };

  const applyFilters = () => {
    filterDialog.value = false;
    // codigo para aplicar los filtros
  };

</script>

<style scoped>
.create-routine {
  margin: 0 4%;
}
.header {
  display: flex;
}

.title {
  width:92%;
}

.carousel {
  margin: 1.5% 0;
}

.carousel-cycles {
  display: flex;
  width: 100%;
  height: 60px;
  border-radius: 24px;
  background-color: #8fa3ffb9;
}

.carousel-cycle {
  display: flex;
  justify-content: center;
  width: 140px;
  height: 35px;
  background-color: rgba(255, 255, 255, 0.719);
  border-radius: 20px;
  margin: 7px;
  padding: 7px 0;
  color: black;
}

.carousel-cycle-active {
  display: flex;
  justify-content: center;
  width: 140px;
  height: 40px;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  margin: 7px;
  padding: 6px 0;
  border: 3px solid #3f62fc;
  color: black;
  font-weight: bold;
}


.cycle-text {
  text-align: center;
  margin: 18px 10px 20px 25px;
}

.cycle-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; 
}

.cycle-icon {
  margin-right: 5px;
  color: black;
}

.carousel-add {
  width: 80px;
  height: 35px;
  border: 1px solid rgba(0, 0, 0, 0.693);
  border-radius: 20px;
  padding: 4px 0;
  margin: 0 10px;
}

.carousel-exercises {
  height: 140px;
  border-radius: 24px;
  display: flex;
}

.carousel-exercises-box {
  margin-right: 2%;
}
.carousel-reps {
  height: 100%;
  width: 2%;
  margin: 2.5% 5% 2.5% 2.5%;
}

.reps-text {
  margin-left: 15px;
  font-weight: bold;
}

.reps-input {
  margin-top: 10px;
  width: 70px;
  height: 35px;
  padding: 3px 0;
  background-color: rgb(255, 255, 255);
  border-radius: 12px;
  color: #3f62fc;
  font-weight: bold;
}

.carousel-exercise {
  height: 80px;
  width: 140px;
  margin: 16px 20px 16px 0;
}

.carousel-empty-exercise {
  height: 90px;
  width: 140px;
  margin: 16px 20px 16px 0;
  border-radius: 12px;
  border: 2px dotted gray;
}

.carousel-link {
  text-decoration: none;
}

.carousel-image {
  border-radius: 12px;
  height: 70%;
  width: 100%;
}

.image-container {
  position: relative;
  background-color: white;
  border-radius: 12px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.877);
  display: none;
  border-radius: 12px;
}

.time-container {
  display: flex;
  align-items: center;
  margin-top: 25px;
}

.edit-icon {
  position: absolute;
  margin-bottom: 30px;
}

.image-container:hover .overlay {
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-text {
  color: #3f62fc;
  font-size: 16px;
  padding: 5px 0 5px 0;
}

.carousel-exercise-name {
  margin-top: 2%;
  color: black;
  text-align: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; 
}

.searcher {
  display: flex;
  height: 43px;
  margin: 2.5% 0;
}

.search {
  width: 82%;
}

.filter-button {
  margin: 10px 24px;
}

.new-button {
  height: 90%;
  width: 160px;
  display: flex;
  align-items: center;
  background-color: rgb(225, 225, 225);
  border-radius: 24px;
  padding: 0 30px;
  margin: 2px;
  text-decoration: none;
  color: black;
}

.exercise-search {
  width: 100%;
  height: 100vh;
}

.sec-reps {
  display: flex;
  height: 60px;
  align-items: center;
  margin: 1.5% 0;
}

.sec-reps-options {
  display: flex;
  align-items: center;
  margin-left: 14%;
}

.secs-reps-label {
  color:#3f62fc;
  margin-left: 10px;
}

.sec-reps-input {
  width: 85px;
  height: 40px;
  padding: 5px 0;
  background-color: rgb(239, 239, 239);
  border-radius: 12px;
  color: black;
  margin: 0 10px 0 10px;
}

.rest {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #3d3b42;
  border-radius: 6px;
  margin-top: 1.5%;
  margin-bottom: 1%;
  cursor: pointer;
  color: white;
  padding-left: 2%;
}

.rest-item {
  margin-left: 6%;
  color: white;
}

.exercise {
  display: flex;
  width: 100%;
  height: 55px;
  background-color: none;
  border-radius: 6px;
  margin: 1% 0;
  align-items: center;
}

.add {
  display: flex;
  align-items: center;
  margin-left: 2%;
  cursor: pointer;
  color: #3d3b42;
  width: 90%;
}

.exercise-image-box {
  height: 60px;
  width: 105px;
  margin-left: 3%;
}

.exercise-image {
  height: 100%;
  width: 100%;
}

.exercise-icon {
  color:#3f62fc;
  margin-right: 10px;
}

.exercise-text {
  margin-left: 3%;
  color: #3d3b42;
  width: 140px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; 
}

.next-icon {
  margin-left: auto; 
  margin-right: 2%;
}

.load-exercises-box {
  margin: 6% 50%;
}

.load-cycle-box {
  margin: 4% 40%;
}

.apply-filters-button {
  background-color: #5271FF;
  color: white;
  padding: 8px 30px;
  border-radius: 24px;
  margin: 10px 25px 10px 38%;
}

.filters-header {
  padding: 0 25px 0 10px;
  text-align: center;
}

.delete-exercise-button {
  color: rgb(59, 59, 59);
  margin-left: auto;
  margin-right: 3%;
  margin-bottom: 5px;
}

</style>