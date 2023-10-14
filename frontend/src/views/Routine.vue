<template>
<div class = 'appbar'>
  <v-icon icon='$back'></v-icon>
  <p>My routines</p>
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

  <div class='cycle' v-show='cycleOptionIndex!=1'>
    <div class='cycle-header'>
      <h2>{{ cycles[cycleIndex].name }}</h2>
      <div class='cycle-reps'>
        <v-icon icon='$reps'/>
        {{cycles[cycleIndex].reps}}
      </div>
    </div> 
    <div class='exercises' v-for='exercise in cycles[cycleIndex].exercises' :key='exercise.name'>
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

  <div class='cycle' v-show='cycleOptionIndex==1'>
    <div v-for='(cycle, index) in cycles' v-show='index!=0 && index!=lastCycleIndex'>
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

  const cycleOptionIndex = ref(0)
  const cycleIndex = ref(0)

  const isFavorite = ref(false)

  const selectCycleOptionIndex = (index) => {
    cycleOptionIndex.value = index
    if(index == lastCycleOptionIndex) cycleIndex.value = lastCycleIndex
    else cycleIndex.value = index
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
    { name:'Mill', sec:30, reps: '-', image: millImage },
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

  <style scoped>

  .appbar {
    display: flex;
    margin-left: 2%;
  }

  .routine-general {
    display: flex;
    height: 400px;
  }

  .top-bar {
    display: flex;
    margin-bottom: 2.5%;
  }

  .icons-top-right {
    display: flex;
    margin-left: auto;
  }

  .gray-section {
    background-color: #f0f0f0;
    border-radius: 40px 40px 0 0;
    margin-top: 2%;
    height: 100%;
    padding: 2% 10%;
  }

  .header-info {
    display: flex;
    padding: 0 2% 2% 1%;
    align-items: center;
  }

  .username {
    font-weight: bold;
  }

  .highlight-text {
    padding-top: 10px;
    padding-left: 23%;
    color: black;
  }
  
  .highlight-icon {
    text-align: center;
  }

  .time-text {
    color: #3f62fc;
    font-weight: bold;
    font-size: 18px;
    margin-left: 10px;
  }

  .img-section {
    border-radius: 40px;
    background-color: white;
    padding: 2%;
    width: 65%;
  }

  .routine-img   {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .image {
    border-radius: 30px;
  }

  .image-profile {
    border-radius: 30px;
    margin-right: 15px; 
  }

  .routine-info {
    padding-left: 5%;
    margin-top: 1%;
  }
  .routine-info-cards {
    display: flex;
    height: 100px;
  }

  .icon-card-1 {
    display: flex;
    height: 80px;
    width: 80px;
    border-radius: 20px 0 0 20px;
    align-items: center;
    justify-content: center;
  }

  .icon-card-2 {
    display: flex;  
    text-align: center;
    height: 80px;
    width: 250px;
    border-radius: 0 20px 20px 0;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
  }

  .total-duration {
    display: flex;
    margin-left: auto;
  }

  .cycles {
    display: flex;
    justify-content: center;
    height: 45px;
    margin-top: 4%;
  }

  .cycles-options {
    display: flex;
    width: auto;
    background-color: rgb(206, 206, 206);
    border-radius: 40px;
    padding: 6px 4px;
  }

  .cycle-option {
    margin: 0 5px;
    padding: 0 15px;
    border-radius: 24px;
    font-weight: bold;
  }

  .cycle-option-active {
    margin: 0 4.9px;
    padding: 0 15px;
    border-radius: 24px;
    font-weight: bold;
    background-color: white;
    color:#3f62fc;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .cycle-icon {
    margin-left: 10px;
  }

  .cycle-header {
    display: flex;
    align-items: center;
  }

  .cycle-reps {
    display: flex;
    background-color: white;
    color:#3f62fc;
    border-radius: 12px;
    padding: 5px 18px 5px 14px;
    margin-left: 2%;
    font-weight: bold;
    align-items: center;
  }

  .exercise {
  display: flex;
  width: 100%;
  height: 55px;
  background-color: rgba(255, 255, 255, 0.853);
  border-radius: 24px;
  margin: 2% 0;
  align-items: center;
  padding: 40px 0;
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
  margin: 0 1% 0 2%;
}

.exercise-text {
  margin-left: 3%;
  margin-right: 5%;
  color: #3d3b42;
  width: 140px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; 
}

.exercise-time {
  color:#3f62fc;
  font-weight: bold;
}

.next-icon {
  margin-left: auto; 
  margin-right: 4%;
}

.menu-option {
  display: flex;
}

.menu-option-icon {
  margin-right: 15px;
}

.favorite-button {
  margin-right: 15px;
}

</style>