<template>
    
    <div class = 'appbar'>
      <p> &lt; My routines</p>
    </div>

    <div class='gray-section'>  
      <div class = 'top-bar'>
                <h2 class = 'highlight-text'>Full Body Session</h2>
                <div class = 'icons-top-right'>
                  <v-btn icon= '$favfull' color= '#f0f0f0' class='text-none' variant='flat' rounded @click='dialog = false'></v-btn>
                  <v-btn icon= '$options' color= '#f0f0f0' class='text-none' variant='flat' rounded @click='dialog = false'></v-btn>
                </div>
      </div>

      <div class = 'routine-general'> 
            <div class = 'img-section'>
              <div class = 'header-info'>
                <div class='profile-pic'>
                  <v-img src='@/assets/temporary/profile-pic.png' alt='profile picture' class='image' height = '50px' width='50px'/>
                  <h5>By Carolo Dominguez</h5>
                </div>
                <div class = 'total-duration'>
                  <v-icon icon= '$time' color= 'blue'></v-icon>
                  <p class = 'time-text'>30 min</p>
                </div>
              </div>
              <div class = 'routine-img'>
              <v-img src='@/assets/temporary/RoutineImage.png' alt='Routine image' cover aspect-ratio="16/9" class='image' height = '300px' width = '600px'/>
              </div>
            </div>
            <div class = 'routine-info'>
              <div v-for='item in highlightsItems' :key='item.name' class = 'routine-info-cards'>
                <v-card
                  :color='item.color'
                  class='icon-card-1'
                  variant='flat'>
                  <v-card-item>
                      <v-icon :icon='item.icon' color='white' class = 'highlight-icon' size= 'x-large'></v-icon>
                  </v-card-item>
                </v-card>
                <v-card class = 'icon-card-2' variant='flat'>
                  <v-card-text>
                    <h4 class = 'highlight-icon'> {{ item.detail }}</h4>
                  </v-card-text>
                </v-card>
              </div>
            </div>
        </div>
    </div>
            
</template>
  
  <script setup>

    import { ref } from 'vue'

    
    const highlightsItems = ref([
    { name:'Difficulty', detail:'Medium difficulty', icon:'$flash', color:'turquoise'},
    { name:'Muscle groups', detail:'Glutes, quads, hamstrings and calves', icon:'$person', color:'lightblue' },
    { name:'Elements required', detail:'Optional, not required', icon:'$dumbbell', color:'blue' },
    { name:'Space', detail:'Ideal for reduced spaces', icon:'$space', color:'violet' },
  ]);


  </script>

  <style scoped>
  .routine-general {
    padding: 0 5% 0 5%;
    display: flex;
  }

  .top-bar {
    display: flex;
  }

  .profile-pic {
    display: flex;
    border-radius: 45px;
  }

  .icons-top-right {
    display: flex;
    padding-left: 45%;
  }

  .gray-section {
    background-color: #f0f0f0;
    border-radius: 40px;
  }

  .header-info {
    display: flex;
    padding: 1%;
  }

  .highlight-text {
    padding-top: 10px;
    padding-left: 28%;
    color: black;
  }
  
  .highlight-icon {
    text-align: center;
  }

  .time-text {
    color: 'lightblue';
    font-weight: bold;
  }

  .img-section {
    border-radius: 40px;
    background-color: white;
    padding: 1% 1%;
  }

  .routine-img {
    border-radius: 40px;
  }

  .routine-info{
    padding: 2%;
  }
  .routine-info-cards {
    display: flex;
    height: 100px;
  }

  .icon-card-1 {
    text-align: center;
    padding: 10px 0 10px 0;
    height: 70px;
    width: 70px;
    margin: 5% 0 0 5%;
  }

  .icon-card-2 {
    text-align: center;
    height: 70px;
    width: 250px;
    margin: 5% 0 0 0;
    border-radius: 0, 0, 12px, 12px;
  }

  .total-duration {
    display: flex;
    margin-left: 60%;
  }

</style>