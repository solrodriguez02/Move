<template> 
  <div className='home'> 
  
    <div class='init'>
      <div className='header'>
        <h1>Start moving now!</h1>
        <div class='create-account'>
          <RouterLink to='/signup'>
          <v-btn 
            class='text-none'
            color='violet'
            rounded
            size='large'
            height='50px'
            variant='flat'
            @click='dialog = false'>Create an account</v-btn>
          </RouterLink>
        </div>
      </div>
      <img class='main-image' src='@/assets/move.png' alt='move'/>
    </div>
  
    <div class='app-download'>
      <div class='app'>
        <img class='app-image' src='@/assets/app.png' alt='app'/>
      </div>
      <div class='download-content'>
        <h2 class='download-header'>Download the Move App for more</h2>
        <div class='app-features'>
          <v-container>
            <v-row>
              <v-col
                v-for='item in appItems'
                :key='item.headline'
                cols='auto'>
                <v-card
                  variant='flat'>
                  <v-card-item>
                      <div class='item'>
                        <div class='item-checkbox'><v-icon icon="$check" color='blue'/></div>
                        <p><strong> {{ item.headline }} </strong> <br> {{ item.description }}</p> 
                      </div>
                  </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </v-container> 
  
          <v-container class='app-features-icons'>
            <v-row>
              <v-col
                v-for='icon in appIcons'
                :key='icon.name'
                cols='auto'>
                <v-card
                  :color='icon.color'
                  variant='flat'
                  :elevation="20"
                  class='app-icons'
                  >
                  <v-card-item>
                      <div class='app-icon'>
                        <v-icon :icon='icon.icon' color='white' size='45'/>
                      </div>
                  </v-card-item>
                </v-card>
                <v-card
                  variant='outlined'
                  class='icons-description'>
                  <v-card-item>
                      <div class='icon-description'>
                        <p > {{ icon.description }} </p>
                      </div>
                  </v-card-item>
                </v-card>
                
              </v-col>
            </v-row>
          </v-container> 
        </div>
      </div>
    </div>
  
  </div>
  </template>
    
  <script setup>
    import { ref } from 'vue'
    import { RouterLink } from 'vue-router'
  
    const appItems = ref([
      { headline: 'Play routines', description: 'Exercise your own routines'},
      { headline: 'Explore new exercises', description: 'Make other\'s routines'},
      { headline: 'Track your progess', description: 'Follow your performance through time'},
      { headline: 'Share and save ', description: 'Send your routines to friends'},
    ])
  
    const appIcons = ref([
      { name: 'fire', icon: '$fire', color: 'turquoise', description: 'Choose your level' },
      { name: 'time', icon: '$time', color: 'violet', description: 'Time your exercises'},
      { name: 'dumbbell', icon: '$dumbbell', color: 'lightblue', description: 'Use your equipment'},
    ])
  </script>
  
  <style scoped src='@/styles/Home.scss'></style>