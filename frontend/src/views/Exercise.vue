<template>
  <div style="background-color: #ffffff">
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>

  <div class="grey-section">
    <h1 style="padding: 30px">Lunge</h1>
    <section class="workout-section">
      <img
        class="rounded-image"
        src="https://media.canva.com/1/image-resize/1/800_450_100_PNG_F/czM6Ly9tZWRpYS1wcml2YXRlLmNhbnZhLmNvbS84OWsxay9NQUZzckQ4OWsxay8xL3AucG5n?osig=AAAAAAAAAAAAAAAAAAAAANc26I1fhO-KjHn6U6u7u4qW11zvrRRP0LLJY9kjIelj&exp=1695968584&x-canva-quality=screen&csig=AAAAAAAAAAAAAAAAAAAAAB9yGifMXzOWZYem2_5JiWYcQiUz6W5XM3eS9JnGzDfG"
        alt="Workout image"
      />

      <div class="workout-description">
        <div class="workout-details">
          <v-container>
            <v-row>
              <v-col variant="variant" cols="6">
                <v-card>
                  <v-card
                    max-width="170"
                    height="120"
                    border-radius="10px"
                    :color="color1"
                  >
                    <v-card-item>
                      <div class="text-center">
                        <v-avatar rounded="0" color="color1">
                          <v-icon color="white" icon="mdi-flash"></v-icon>
                        </v-avatar>
                      </div>
                      <div class="text-center">
                        <div>
                          <h5 style="color: white">Medium difficulty</h5>
                        </div>
                      </div>
                    </v-card-item>
                  </v-card>
                </v-card>
              </v-col>
              <v-col variant="variant" cols="6">
                <v-card>
                  <v-card
                    class="mx-auto"
                    max-width="170"
                    height="120"
                    :color="color2"
                  >
                    <v-card-item>
                      <div class="text-center">
                        <v-avatar rounded="0" color="color2">
                          <v-icon color="white" icon="mdi-human"></v-icon>
                        </v-avatar>
                      </div>
                      <div class="text-center">
                        <div>
                          <h5 style="color: white">
                            Glutes, quads, hamstrings and calves
                          </h5>
                        </div>
                      </div>
                    </v-card-item>
                  </v-card>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col variant="variant" cols="6">
                <v-card>
                  <v-card
                    class="mx-auto"
                    max-width="170"
                    height="120"
                    :color="color3"
                  >
                    <v-card-item>
                      <div class="text-center">
                        <v-avatar rounded="0" color="color3">
                          <v-icon color="white" icon="mdi-dumbbell"></v-icon>
                        </v-avatar>
                      </div>
                      <div class="text-center">
                        <div>
                          <h5 style="color: white">Optional, not required</h5>
                        </div>
                      </div>
                    </v-card-item>
                  </v-card>
                </v-card>
              </v-col>
              <v-col variant="variant" cols="6">
                <v-card>
                  <v-card
                    class="mx-auto"
                    max-width="170"
                    height="120"
                    :color="color4"
                  >
                    <v-card-item>
                      <div class="text-center">
                        <v-avatar rounded="0" color="color4">
                          <v-icon color="white" icon="mdi-fullscreen"></v-icon>
                        </v-avatar>
                      </div>
                      <div class="text-center">
                        <div>
                          <h5 style="color: white">Ideal for reduced spaces</h5>
                        </div>
                      </div>
                    </v-card-item>
                  </v-card>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </section>
    <div class="d-flex align-center flex-column">
      <v-card width="600" title="Description">
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
    <div class="d-flex align-center flex-column">
      <v-card width="600" title="Make it easier">
        <v-card-text>
          Move slowly. Really slowly. Or do fewer reps and sets until you
          improve your balance and strength.
        </v-card-text>
      </v-card>
    </div>
    <br />
    <div class="d-flex align-center flex-column">
      <v-card width="600" title="Make it Harder">
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

  .rounded-image {
    border-radius: 24px;
  }

  .workout-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  }

  .workout-section img {
    width: 50%;
  }

  .workout-description {
    width: 800%;
  }

  .workout-details {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 10px;
  }
</style>
