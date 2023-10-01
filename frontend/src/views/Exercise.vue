<template>
  <div style='background-color: #ffffff'>
    <br />
    <br />
    <br />
    <br />
  </div>

  <div class='grey-section'>
    <h1 style='padding: 30px; padding-left: 60px;'>Lunge</h1>
    <section class='workout-section'>
      <img
        style='border-radius: 24px;'
        src='@/assets/workout.jpg'
        alt='Workout image'
      />
      <div class='workout-description'>
        <div class='workout-details'>
          <v-container>
            <v-row>
              <v-col variant='variant' cols='5' >
                  <v-card
                    width='100%'
                    height='100%'
                    border-radius='10px'
                    :color='color1'
                  >
                    <v-card-item>
                      <div class='text-center' padding='20%'>
                        <v-avatar class='icon-card' rounded='0' color='color1' >
                          <v-icon  color='white' icon='$flash'></v-icon>
                        </v-avatar>
                      </div>
                      <div class='text-center'>
                        <div style='margin-top: 5px;'>
                          <h4 style='color: white'>Medium difficulty</h4>
                        </div>
                      </div>
                    </v-card-item>
                </v-card>
              </v-col>
              <v-col variant='variant' cols='5'>
                  <v-card
                    class='mx-auto'
                    max-width='100%'
                    height='100%'
                    :color='color2'
                  >
                    <v-card-item>
                      <div class='text-center'>
                        <v-avatar rounded='0' color='color2'>
                          <v-icon color='white' icon='$person'></v-icon>
                        </v-avatar>
                      </div>                
                      <div class='text-center'>
                        <div style='margin-top: 5px;'>
                          <h4 style='color: white'>
                            Glutes, quads, hamstrings and calves
                          </h4>
                        </div>
                      </div>
                    </v-card-item>
                  </v-card>
              </v-col>
            </v-row>
            <br>
            <v-row>
              <v-col variant='variant' cols='5'>          
                  <v-card
                    class='mx-auto'
                    width='100%'
                    height='100%'
                    :color='color3'
                  >
                    <v-card-item>
                      <div class='text-center'>
                        <v-avatar rounded='0' color='color3'>
                          <v-icon color='white' icon='$dumbbell'></v-icon>
                        </v-avatar>
                      </div>
                      <div class='text-center'>
                        <div style='margin-top: 5px;'>
                          <h4 style='color: white'>Optional, not required</h4>
                          <br>
                        </div>
                      </div>
                    </v-card-item>
                  </v-card>        
              </v-col>
              <v-col variant='variant' cols='5'>             
                  <v-card
                    class='mx-auto'
                    max-width='100%'
                    height='100%'
                    :color='color4'
                  >
                    <v-card-item>
                      <div class='text-center'>
                        <v-avatar rounded='0' color='color4'>
                          <v-icon color='white' icon='$space'></v-icon>
                        </v-avatar>
                      </div>
                      <div class='text-center'>
                        <div style='margin-top: 5px;'>
                          <h4 style='color: white'>  Ideal for reduced spaces</h4>
                        </div>
                      </div>
                    </v-card-item>
                  </v-card>               
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </section>
    <div style='margin-top: 5px;'></div>
    <div class='d-flex align-center flex-column'>
      <v-card width='90%' title='Description'>
        <v-card-text>
          01. Stand tall with your feet hip-width apart and your arms by your
          sides, to start.<br />
          <br />
          02. Brace your core and bring your hands to your hips as you step one
          foot forwards. Bend both legs until they form 90-degree angles. Make
          sure your front knee doesn't extend past your toes.<br />
          <br />
          03. Keep your weight in your front leg. Your back leg should just help
          maintain balance, and your chest should stay tall. Press through your
          front foot to return to the starting position. That's 1 rep.
        </v-card-text>
      </v-card>
    </div>
    <br />
    <div class='d-flex align-center flex-column'>
      <v-card width='90%' title='Make it easier'>
        <v-card-text>
          Move slowly. Really slowly. Or do fewer reps and sets until you
          improve your balance and strength.
        </v-card-text>
      </v-card>
    </div>
    <br />
    <div class='d-flex align-center flex-column'>
      <v-card width='90%' title='Make it Harder'>
        <v-card-text>
          You could do walking lunges or jump out of the bottom of your forward
          lunge to switch sides, both of which will spike your heart rate. To
          tax your muscles more, add weight in the form of dumbbells, a
          kettlebell, a sandbag, a barbell ... the list goes on.
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WorkoutSection',
  }
</script>
<script setup>
  import { ref } from 'vue'

  const variant = ref('flat')
  const color1 = ref('cyan-lighten-3')
  const color2 = ref('light-blue-lighten-3')
  const color3 = ref('indigo-lighten-3')
  const color4 = ref('purple-lighten-3')
</script>

<style scoped>
  .grey-section {
    background-color: #f0f0f0;
    border-radius: 24px;
  }
  .centered-icon {
    display: flex;
    justify-content: center;
  }

  .workout-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
  }

  .workout-section img {
    width: 50%;
    margin-left: 8%; 
  }

  .icon.card {
    size: 100%;
  }

  .workout-description {
    width: 1000%;
  }

  .workout-details {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>


