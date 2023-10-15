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
    
<style scoped>
    .exercise {
    margin-top: 2%;
    }

    .grey-section {
    background-color: #f0f0f0;
    border-radius: 40px;
    padding: 4% 10%;
    }

    .workout-section {
    display: flex;
    margin: 2% 0;
    height: 350px;
    }

    .workout-image {
    width: 55%;
    height: 100%;
    margin: 0 2% 1% 1%;
    }

    .image {
    width: 100%;
    height: 100%;
    border-radius: 24px;
    }

    .highlights {
    margin-top: 40px;
    margin-left: 0.2%;
    }

    .highlight-item {
    width: 180px;
    height: 145px;
    border-radius: 24px;
    margin: 0 30px 12% 30px;
    }

    .highlight-text {
    text-align: center;
    color: white;
    margin-top: 5%;
    }

    .highlight-icon {
    text-align: center;
    margin-top: 10%;
    }

    .workout-description {
    width: 1000%;
    }

    .workout-details {
    display: flex;
    flex-wrap: wrap;
    }

    .exercise-item {
    margin: 3% 0;
    border-radius: 12px;
    padding: 1%;
    }

    .sec-reps-options {
    display: flex;
    align-items: center;
    margin: 40px 0 40px 0;
    }

    .secs-reps-label {
    color:#3f62fc;
    margin-left: 10px;
    font-weight: bold;
    }

    .sec-reps-input {
    width: 40px;
    height: 40px;
    padding: 5px 0;
    background-color: rgb(255, 255, 255);
    border-radius: 12px;
    color: black;
    margin: 0 10px 0 20px;
    }

    .save-button {
    background-color:#aeaeae;
    color: white;
    font-weight: bold;
    padding: 10px 40px;
    border-radius: 24px;  
    margin-left: 6%;
    }

    .edit-section {
        margin-left: 3%;
        width: 40%;
        background-color: #dcdcdc;
        border-radius: 24px;
        padding: 40px 12% 40px 12%;
        text-align: center;
    }
</style>