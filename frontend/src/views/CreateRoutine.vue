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
        variant='flat'
        @click='dialog = false'>Save</v-btn>
    </RouterLink>
  </div>

  <div class='carousel'>
  <v-sheet
    class='carousel-cycles'>
    <p class='cycle-text'>Cycles</p>
    <v-slide-group
      show-arrows>
      <v-slide-group-item>
        <button>
          <div class='carousel-cycle'>
            <v-icon :icon='cycles[0].icon' class='cycle-icon'/>
            <p> {{ cycles[0].name }} </p>
          </div>
        </button>
      </v-slide-group-item>
      <v-slide-group-item v-for="(cycle, index) in cycles" :key="cycle.name">
        <button v-show="index > 0 && index < lastCycle">
          <div class='carousel-cycle'>
            <v-icon :icon='cycle.icon' class='cycle-icon'/>
            <p> {{ cycle.name }} </p>
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
        <button>
          <div class='carousel-cycle'>
            <v-icon :icon='cycles[lastCycle].icon' class='cycle-icon'/>
            <p> {{ cycles[lastCycle].name }} </p>
          </div>
        </button>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
  </div>

  <h4>Add your exercises</h4>

  <div class='carousel'>
  <v-sheet
    color='gray'
    class='carousel-exercises'>

    <div class='carousel-reps'>
      <p class='reps-text'>Reps</p>
      <v-autocomplete
      v-model="selectedValue"
      :items="cycleReps"
      variant='flat'
      density='dense'
      menu-icon=''
      class='reps-input'/>
    </div>

    <v-slide-group
      show-arrows>
      <v-slide-group-item v-for="exercise in carouselExercises" :key='exercise.name'>
        <div class='carousel-exercise'>
          <RouterLink class='carousel-link' :to='exercise.link'>
            <div class='image-container'>
              <img
                class='carousel-image'
                :src="exercise.image"
                :alt="exercise.name"
              />
              <div class='overlay'>
                <v-icon icon='$edit' color='black' size='20' class='edit-icon'/>
                <div class='time-container'>
                  <v-icon icon='$time' color='blue' size='20' />
                  <p class='overlay-text'>{{ exercise.time }}</p>
                </div>
              </div>
            </div>
            <p class='carousel-exercise-name'> {{ exercise.name }} </p>
          </RouterLink>
        </div>
      </v-slide-group-item>
    </v-slide-group>
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

      <button class='filter-button'>
        <v-icon icon='$filter' size='26'/>
      </button>
      
      <button class='new-button'>
        <p>New exercise</p>
      </button>
  </div>

  <div class='exercise-search'>

    <div class='rest'>
      <button class='rest-item'>
        <v-icon icon='$add'/>
      </button>
      <v-icon icon='$rest' class='rest-item'/>
      <p class='rest-item'>Rest</p>
      <div class='rest-sec-rep-option'>
        <v-autocomplete
          v-model="selectedSRRestValue"
          :items="['sec']"
          variant='outlined'
          density='compact'
          menu-icon=''/>
      </div>
      <v-icon icon='$time' class='rest-time-icon'/>
      <div class='rest-secs-or-reps'>
        <v-autocomplete
          v-model="selectedSecRestValue"
          :items="secOptions"
          variant='default'
          density='compact'
          menu-icon=''/>
        </div>
    </div>

    <div class='exercises' v-for='exercise in exercises' :key='exercise.name'>
      <div class='exercise'>
        <button class='exercise-item'>
          <v-icon icon='$add'/>
        </button>
        <div class='exercise-image-box'>
          <img :src='exercise.image' :alt='exercise.name' class='exercise-image'/>
        </div>
        <p class='exercise-text'> {{ exercise.name }} </p>
        <div class='sec-rep-option'>
          <v-autocomplete
            v-model="selectedSRValue"
            :items="secOrReps"
            variant='outlined'
            density='compact'
            menu-icon='$arrow'/>
        </div>
        <v-icon icon='$time' class='exercise-time-icon'/>
        <div class='secs-or-reps'>
          <v-autocomplete
            v-model="selectedSecValue"
            :items="secOptions"
            variant='default'
            density='compact'
            menu-icon=''/>
        </div>
        <div class='next-icon'>
          <RouterLink :to='exercise.link'>
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
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import millImage from '@/assets/temporary/mill.png';
  import legsUpImage from '@/assets/temporary/legsup.png';
  import leftLungeImage from '@/assets/temporary/leftlunge.png';
  import rightLungeImage from '@/assets/temporary/rightlunge.jpg';
  import LegsDownImage from '@/assets/temporary/legsdown.png';

  const selectedValue = ref('x1');
  const selectedSRRestValue = ref('sec');
  const selectedSecRestValue = ref('30s');
  const selectedSRValue = ref('sec');
  const selectedSecValue = ref('30s');

  const secOptions = ref([
    '15s', '20s', '25s', '30s', '35s', '40s','45s', '50s', 
    '55s', '60s', '65s', '70s', '75s', '80s', '85s', '90s'
  ]);

  const repOptions = ref([
    'x5', 'x10', 'x15', 'x20', 'x25', 'x30', 'x35', 'x40', 'x45', 'x50', 
    'x55', 'x60', 'x65', 'x70', 'x75', 'x80', 'x85', 'x90', 'x95', 'x100'
  ]);

  const secOrReps = ref(['sec', 'reps']);

  const cycleReps = ref (['x1', 'x2', 'x3', 'x4', 'x5', 'x6','x7', 'x8', 'x9', 'x10']);

  const cycles = ref([
    { name:'Warm up', icon:'$warm', reps:'1'},
    { name:'Cycle 1', icon:'$fire', reps:'2'},
    { name:'Cycle 2', icon:'$fire', reps:'1'},
    { name:'Cooling', icon:'$cool', reps:'1'},
  ]);

  const carouselExercises = ref([
    { name:'Mill', time:'30s', image: millImage, link:'/exercise'},
    { name:'Legs up', time:'30s', image: legsUpImage, link:'/exercise'},
    { name:'Left leg lunge', time:'x15', image: leftLungeImage, link:'/exercise'},
    { name:'Right leg lunge', time:'x15', image: rightLungeImage, link:'/exercise'},
    { name:'Legs down', time:'x15 in 30s', image: LegsDownImage, link:'/exercise'},
    { name:'Mill', time:'30s', image: millImage, link:'/exercise'},
    { name:'Legs up', time:'30s', image: legsUpImage, link:'/exercise'},
    { name:'Left leg lunge', time:'x15', image: leftLungeImage, link:'/exercise'},
  ]);

  const exercises = ref([
    { name:'Mill', image: millImage, link:'/exercise'},
    { name:'Legs up', image: legsUpImage, link:'/exercise'},
    { name:'Left leg lunge', image: leftLungeImage, link:'/exercise'},
    { name:'Right leg lunge', image: rightLungeImage, link:'/exercise'},
    { name:'Legs down', image: LegsDownImage, link:'/exercise'},
  ]);

  const lastCycle = cycles.value.length - 1;

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

.cycle-text {
  text-align: center;
  margin: 18px 10px 20px 25px;
  font-weight: bold;
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
  max-width: 100%;
  height: 140px;
  border-radius: 24px;
  display: flex;
}

.carousel-reps {
  height: 100%;
  width: 2%;
  margin: 2.5% 2%;
}

.reps-text {
  margin-left: 8px;
  font-weight: bold;
}

.reps-input {
  margin-top: 10px;
  width: 54px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.762);
  border-radius: 12px;
  color: #3f62fc;
  font-weight: bold;
}

.carousel-exercise {
  height: 80px;
  width: 150px;
  margin: 15px 10px;
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
  padding: 5px;
}

.carousel-exercise-name {
  margin-top: 2%;
  color: black;
  text-align: center;
  justify-content: center;
}

.searcher {
  display: flex;
  height: 43px;
  margin-top: 2.5%;
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
}

.exercise-search {
  width: 100%;
  height: 100vh;
}

.rest {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #3d3b42;
  border-radius: 6px;
  margin-top: 2%;
  margin-bottom: 1%;
}

.rest-item {
  margin: 0 3% 0 2%;
  color: white;
}

.rest-time-icon {
  color: white;
}

.rest-sec-rep-option {
  width: 65px;
  margin: 24px 3.3% 0 122px;
  color:white;
}

.rest-secs-or-reps {
  width: 65px;
  margin-top:24px;
  color:white;
}

.exercise {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: none;
  border-radius: 6px;
  margin: 1% 0;
}

.exercise-image-box {
  height: 60px;
  width: 105px;
}

.exercise-image {
  height: 100%;
  width: 100%;
}

.exercise-item {
  margin: 0 2%;
  color: #3d3b42;
}

.exercise-time-icon {
  color:#3f62fc;
}

.exercise-text {
  margin: 0 2%;
  color: #3d3b42;
  width: 140px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; 
}

.sec-rep-option {
  width: 100px;
  margin: 24px 2% 0 10px;
  color:#3d3b42;
}

.secs-or-reps {
  width: 65px;
  margin-top:24px;
  color:#3f62fc;
}

.next-icon {
  margin-left: auto; 
}

</style>