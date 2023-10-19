<template>
<div class = 'appbar'>
  <button @click="goBack" class="button">
    <v-icon icon='$back'></v-icon>
    <p>{{ getTab() }}</p>
  </button>  
</div>

<div class='exercise'>
  <div class='grey-section'>
    <h1>Lunge</h1>
    <section class='workout-section'>
      <div class='workout-image'>
        <img src='@/assets/temporary/leftlunge.png' alt='Workout image' class='image'/>
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
                    <h4> {{ item.detail }}</h4>
                </div>
              </v-card-item>
            </v-card>
          </div>
        </div>
      </div>
    </section>

    <div v-for='item in exerciseItems' :key='item.title'>
      <v-card :title='item.title' variant='flat' class='exercise-item'>
        <v-card-text v-html="item.detail"/>
      </v-card>
    </div>
    
  </div>
</div>
</template>

<script setup>
  import { ref } from 'vue'

  import { useRouter } from 'vue-router'

  const router = useRouter()

  function getTab(){
    return router.options.history.state.back 
  }

  const goBack = () => {
    router.go(-1)
  }

  const exerciseItems = ref([
    { title:'Description', detail:'01. Stand tall with your feet hip-width apart and your arms by your sides, to start. <br><br> 02. Brace your core and bring your hands to your hips as you step one foot forwards. Bend both legs until they form 90-degree angles. Make sure your front knee doesn\'t extend past your toes. <br><br> 03. Keep your weight in your front leg. Your back leg should just help maintain balance, and your chest should stay tall. Press through your front foot to return to the starting position. That\'s 1 rep.' },
    { title:'Make it easier', detail:'Move slowly. Really slowly. Or do fewer reps and sets until you improve your balance and strength.' },
    { title:'Make it harder', detail:'You could do walking lunges or jump out of the bottom of your forward lunge to switch sides, both of which will spike your heart rate. To tax your muscles more, add weight in the form of dumbbells, a kettlebell, a sandbag, a barbell ... the list goes on.' },
  ])

  const highlightsItems = ref([
    { name:'Difficulty', detail:'Medium difficulty', icon:'$flash', color:'turquoise'},
    { name:'Muscle groups', detail:'Glutes, quads, hamstrings and calves', icon:'$person', color:'lightblue' },
    { name:'Elements required', detail:'Optional, not required', icon:'$dumbbell', color:'blue' },
    { name:'Space', detail:'Ideal for reduced spaces', icon:'$space', color:'violet' },
  ])
</script>

<style scoped src='@/styles/Exercise.scss'></style>