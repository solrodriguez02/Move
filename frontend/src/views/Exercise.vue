<template>
<div class = 'appbar appbar-margin'>
  <button @click="goBack" class="button">
    <v-icon icon='$back'></v-icon>
    <p>{{navigationStore.getTabText(getTab())}}</p>
  </button>  
</div>

<div class='exercise'>
  <div class='grey-section'>
    <h1>{{exerciseInfo.name }}</h1>
    <section class='workout-section'>
      <div class='workout-image'>
        <img :src='exerciseInfo.metadata.image' alt='Workout image' class='image'/>
      </div>

      <div class='workout-description'>
        <div class='workout-details'>
          <div v-for='item in highlightsItems' :key='item.name' class='highlights'>
            <v-card
              :color='item.color'
              class='highlight-item'>
              <v-card-item>
                <div class='highlight-icon'>
                  <v-icon :icon='item.icon' color='white'></v-icon>
                </div>
                <div class='highlight-text'>
                  <h3>{{ item.name }}</h3>
                  <div class='highlight-display'>
                    <h4 v-show='item.tag == "muscleGroups" || item.tag == "elements"' v-for="value in exerciseInfo.metadata[item.tag]" class='highlight-text'> {{ value + ",&nbsp" }}</h4>
                  </div>
                  <h4 v-show='item.tag != "muscleGroups" && item.tag != "elements"'> {{  exerciseInfo.metadata[item.tag] }}</h4>
                </div>
              </v-card-item>
            </v-card>
          </div>
        </div>
      </div>
    </section>

    <div>
      <v-card title='Description' variant='flat' class='exercise-item'>
        <v-card-text v-html='exerciseInfo.detail'/>
      </v-card>
    </div>
   
  </div>
</div>
</template>

<script setup>
  
  import { ref,onBeforeMount } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useNavigationStore } from '@/store/NavigationStore'
  import { useExerciseStore } from '@/store/ExerciseStore'

  const router = useRouter()
  const route = useRoute()
  const navigationStore= useNavigationStore()
  const loading = ref(false)
  const excerciseStore = useExerciseStore()
  const exerciseInfo = ref({})

  onBeforeMount (async () => {
    loading.value = true
    const id = route.params.id
    exerciseInfo.value = await excerciseStore.fetchExerciseById(id)
    loading.value = false 
  }) 

  function getTab() {
    return router.options.history.state.back
  }

  const goBack = () => {
    router.go(-1)
  }

  const highlightsItems = ref([
    { name:'Difficulty', tag:'difficulty', icon:'$flash', color:'turquoise'},
    { name:'Muscle groups', tag:'muscleGroups', icon:'$person', color:'lightblue' },
    { name:'Elements required', tag:'elements', icon:'$dumbbell', color:'blue' },
    { name:'Space', tag:'space', icon:'$space', color:'violet' },
  ])
</script>

<style scoped src='@/styles/Exercise.scss'></style>
<style scoped src='@/styles/Globals.scss'></style>