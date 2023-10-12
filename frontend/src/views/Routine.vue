<template>
    
    <div class = 'appbar'>
      <p>My routines</p>
    </div>

    <div class='gray-section'>  
      <div class = 'top-bar'>
                <h4 class = 'highlight-text'>Full Body Session</h4>
                <div class = 'icons-top-right'>
                  <v-btn icon= '$favfull' color= '#f0f0f0' class='text-none' variant='flat' rounded @click='dialog = false'></v-btn>
                  <v-btn icon= '$options' color= '#f0f0f0' class='text-none' variant='flat' rounded @click='dialog = false'></v-btn>
                </div>
      </div>

      <div class = 'routine-general'> 
            <div class = 'img-section'>
              <div class = 'header-info'>
                <div class = 'profile-pic'>
                  <v-img src='@/assets/temporary/profile-pic.png' alt='profile picture' class='image'/>
                </div>
                <h5>By Carolo Dominguez</h5>
                <div class = 'total-duration'>
                  <v-icon icon= '$time' color= 'blue'></v-icon>
                  <p class = 'time-text'>30 min</p>
                </div>
              </div>

              <v-img src='@/assets/temporary/RoutineImage.png' alt='Routine image' class='image'/>
            </div>
            <div class = 'routine-info'>
              <div v-for='item in highlightsItems' :key='item.name' class = 'routine-info-cards'>
                <v-card
                  :color='item.color'
                  class='icon-card-1'
                  variant='flat'>
                  <v-card-item>
                      <v-icon :icon='item.icon' color='white' class = 'highlight-icon'></v-icon>
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

  <style>
  .routine-general {
    display: flex;
  }

  .top-bar {
    display: flex;
  }

  .profile-pic {
    height: 100%;
    width: 100%;
  }

  .icons-top-right {
    display: flex;
    padding-left: 80%;
  }

  .gray-section {
    background-color: #f0f0f0;
    border-radius: 40px;
    padding: 4% 10%;
  }

  .header-info {
    display: flex;
  }

  .highlight-text {
    padding-left: 15%;
    color: black;
  }
  
  .highlight-icon {
    text-align: center;
  }

  .time-text {
    color: '$lightblue';
    font-weight: bold;
  }

  .img-section {
    border-radius: 40px;
    background-color: white;
    padding: 4% 10%;
  }

  .routine-img {
    width: 100%;
    height: 100%;
    border-radius: 25%;
    margin: 2% 2% 2% 0;
  }

  .routine-info-cards {
    display: flex;
    height: 100px;
  }

  .icon-card-1 {
    margin: 5% 0 0 5%;
  }

  .icon-card-2 {
    margin: 5% 0 0 0;
    border-radius: 0, 0, 12px, 12px;
  }

  .total-duration {
    display: flex;
    margin-left: 60%;
    color: '$lightblue';
  }

</style>