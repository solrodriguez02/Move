<template>
<div class = 'appbar' @click="goBack">
  <v-icon icon='$back'></v-icon>
  <p>{{ previousTabName }}</p>  
</div>

<div class='gray-section'>  

  <div class = 'top-bar'>
    <h2 class = 'highlight-text'>Full Body Session</h2>
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
            <button class='menu-option'>
              <v-icon :icon='option.icon' class='menu-option-icon'/>
              <v-list-item-title>{{ option.title }}</v-list-item-title>
            </button>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>

  <div class = 'routine-general'> 
    <div class = 'img-section'>
      <div class = 'header-info'>
        <img src='@/assets/temporary/profile-pic.png' alt='profile picture' height='50' width='50' class='image-profile'/>
        <p class='username'>By Carolo Dominguez</p>
        <div class = 'total-duration'>
          <v-icon icon= '$time' color='blue'></v-icon>
          <p class='time-text'>30 min</p>
        </div>
      </div>
      <div class='routine-img'>
        <v-img src='@/assets/temporary/RoutineImage.png' alt='Routine image' cover aspect-ratio="16/9" height='295px' width='600px' class='image'/>
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
          <RouterLink to='/exercise'>
              <v-icon icon='$next' color='dark_gray'/>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  </div>

</div>

            
</template>
  
<script setup>

  import { ref } from 'vue'
  import millImage from '@/assets/temporary/mill.png';
  import legsUpImage from '@/assets/temporary/legsup.png';
  import leftLungeImage from '@/assets/temporary/leftlunge.png';
  import rightLungeImage from '@/assets/temporary/rightlunge.jpg';
  import LegsDownImage from '@/assets/temporary/legsdown.png';
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const previousTabName = ref(null)

  const goBack = () => {
    router.go(-1)
  }

  const cycleOptionIndex = ref(0)

  const isFavorite = ref(false)

  const selectCycleOptionIndex = (index) => {
    cycleOptionIndex.value = index
  }

  const showCycle = (index) => {
    switch(index) {
      case 0: 
        return cycleOptionIndex.value == 0
      case lastCycleIndex: 
        return cycleOptionIndex.value == lastCycleOptionIndex
      default: 
        return cycleOptionIndex.value == 1
    }
  }

  const menuOptions = ref([
    { title:'Share', icon:'$share' },
    { title:'Edit', icon:'$edit' },
    { title:'Delete', icon:'$delete' },
  ])

  const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
  };

   
  const highlightsItems = ref([
    { name:'Difficulty', detail:'Medium difficulty', icon:'$flash', color:'turquoise'},
    { name:'Muscle groups', detail:'Glutes, quads, hamstrings and calves', icon:'$person', color:'lightblue' },
    { name:'Elements required', detail:'Optional, not required', icon:'$dumbbell', color:'blue' },
    { name:'Space', detail:'Ideal for reduced spaces', icon:'$space', color:'violet' },
  ]);

  const cycleExercises = ref([
    { name:'Legs down', sec:30, reps: 10, image: LegsDownImage },
    { name:'Legs up', sec:60, reps: 15, image: legsUpImage },
    { name:'Left leg lunge', sec:'-', reps: 15, image: leftLungeImage },
    { name:'Right leg lunge', sec:'-', reps: 15, image: rightLungeImage },
    { name:'Legs down', sec:30, reps: 10, image: LegsDownImage },
  ])

  const cycleExercises1 = ref([
    { name:'Left leg lunge', sec:30, reps: '-', image: leftLungeImage },
    { name:'Right leg lunge', sec:30, reps: '-', image: rightLungeImage },
    { name:'Legs down', sec:30, reps: 15, image: LegsDownImage },
    { name:'Mill', sec:45, reps: '-', image: millImage },
    { name:'Mill', sec:30, reps: '-', image: millImage },
    { name:'Legs up', sec:60, reps: 15, image: legsUpImage },
    { name:'Left leg lunge', sec:'-', reps: 15, image: leftLungeImage },
  ])

  const cycles = ref([
    { name:'Warm up', icon:'$warm', reps:'1', exercises: cycleExercises},
    { name:'Cycle 1', icon:'$fire', reps:'2', exercises: cycleExercises1},
    { name:'Cycle 2', icon:'$fire', reps:'1', exercises: cycleExercises},
    { name:'Cooling', icon:'$cool', reps:'1', exercises: cycleExercises1}
  ])

  const cyclesOptions = ref([
    { name:'Warm up', icon:'$warm' },
    { name:'Exercise', icon:'$fire' },
    { name:'Cooling', icon:'$cool' }
  ])

  const lastCycleOptionIndex = cyclesOptions.value.length - 1
  const lastCycleIndex = cycles.value.length - 1

  </script>

  <style scoped src='@/styles/Routine.scss'></style>