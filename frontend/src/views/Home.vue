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
          height='45px'
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

        <v-container class="app-features-icons">
          <v-row>
            <v-col
              v-for='icon in appIcons'
              :key='icon.name'
              cols='auto'>
              <v-card
                :color='icon.color'
                variant='flat'
                class='app-icons'>
                <v-card-item>
                    <div class='app-icon'>
                      <v-icon :icon='icon.icon' color='white' size='45'/>
                    </div>
                </v-card-item>
              </v-card>
              <v-card
                variant='flat'
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

<style scoped>
.home {
  height: 100vh;
  width: 100%;
}

.init {
  width: 100%;
  height: 70%;
  margin-top: 1%;
  margin-left: 10%;
  display: flex;
}
.header {
  margin-top: 5%;
  font-size: 40px;
  width: 20%;
  line-height: 90px;
  margin-right: 15%;
}

.main-image {
  max-width: 100%;
  max-height: 100%; 
  width: auto; 
  height: auto;
}

.create-account {
  padding-top: 10%;
}

.app-download {
  width: 100%;
  height: 80%;
  margin-top: 3%;
  display: flex;
}

.app {
  margin-top: 3%;
  margin-left: 6%;
  width: 45%;
  height: 75%;
}

.app-image {
  max-width: 100%;
  max-height: 100%; 
  width: auto; 
  height: auto;
}

.download-content {
  width: 100%;
  height: 100%;
  font-size: 30px;
  margin-left: 8%;
}

.download-header {
  margin-left: 3%;
  margin-bottom: 5%;
}

.app-features {
  margin-top: 2%;
}

.item {
  font-size: 18px;
  width:300px;
  display: flex;
}

.item-checkbox {
  margin-right: 10%;
}

.app-features-icons {
  margin-left: 6%;
  margin-top: 2%;
}

.app-icons {
  margin-right: 80px; 
  width: 110px;
  height: 100px;
  border-radius: 12px;
}

.app-icon {
  display: flex;
  padding: 20%;
  justify-content: center;
 
}

.icons-description {
  width: 110px;
  height: 90px;
}

.icon-description {
  font-size: 16px;
  text-align: center;
  font-weight: bold;
}
</style>