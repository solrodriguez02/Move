<template>
<div class='exercise'>
    <div class='grey-section'>
    <h1>Lunge</h1>

    <section class='workout-section'>
        <div class='workout-image'>
        <img src='@/assets/temporary/leftlunge.png' alt='Workout image' class='image'/>
        </div>
        <div class='edit-section'>
        <h4>Edit the exercise's time:</h4>   
            <div class='sec-reps-options'>
                <v-icon icon='$time' color='blue'/>
                <label class='secs-reps-label'>secs:</label>
                <v-autocomplete
                    v-model="selectedSecValue"
                    :items="secOptions"
                    variant='flat'
                    density='dense'
                    class='sec-reps-input'
                    menu-icon='$arrow'/>
            </div>
            <div class='sec-reps-options'>
                <v-icon icon='$reps' color='blue'/>
                <label class='secs-reps-label'>reps:</label>
                <v-autocomplete
                    v-model="selectedRepValue"
                    :items="repOptions"
                    variant='flat'
                    density='dense'
                    class='sec-reps-input'
                    menu-icon='$arrow'/>
            </div>
            <button class='save-button'>Save</button>
        
        </div>
        
   </section>

        <div class='workout-description'>
        <div class='workout-details'>
            <div v-for='item in exerciseItems.highlights' :key='item.name' class='highlights'>
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
 
        <v-card title='Description' variant='flat' class='exercise-item'>
        <v-card-text v-html="exerciseItems.description"/>
        </v-card>
    
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
    ])

    const exerciseItems = ref({
        name: 'lunge', 
        highlights: highlightsItems,
        description:'01. Stand tall with your feet hip-width apart and your arms by your sides, to start. <br><br> 02. Brace your core and bring your hands to your hips as you step one foot forwards. Bend both legs until they form 90-degree angles. Make sure your front knee doesn\'t extend past your toes. <br><br> 03. Keep your weight in your front leg. Your back leg should just help maintain balance, and your chest should stay tall. Press through your front foot to return to the starting position. That\'s 1 rep.' 
    })
</script>
    
<style scoped src='@/styles/EditExercise.scss'></style>