<template>
    <v-container>
      <h1 style="margin-bottom: 2%;">Create Exercise</h1>
      <v-form class='form'
      v-model="form"
      @submit.prevent="onSubmit">
          
              <div class='field-text-box'> Name </div>
                  <v-text-field
                  :readonly='loading'
                  :rules='[required]'
                  variant='outlined'
                  clearable
                  rounded
                  placeholder='Enter the exercise name'
                  />
      <div class='all-fields'>
          <div v-for='(field,index) in formFields' :key='field.name' :class="index === 0 || index === 2 ? 'field-left' : 'field-right'"> 
              <div class='field-header'>
              <v-avatar size='36px' class="avatar-card" :color='field.color'>
                <v-icon color='white' :icon='field.icon'></v-icon>
              </v-avatar>
                <div class='field-text aligned-text' > {{ field.label }} </div>
              </div>
                <v-select
                    :items='field.items'
                    :multiple="field.label == 'Elements required'"
                    :chips="field.label == 'Elements required'"
                    :rules="[required]"
                    variant='outlined'
                    rounded
                    :placeholder='field.placeholder'/>
          </div>
      </div>
      <div class='field-text-box'> Description </div>
                  <v-textarea
                      auto-grow
                      variant='outlined'
                      rows='3'
                      row-height='25'
                      clearable
                      placeholder='What are the steps to follow the exercise? How would you describe it?'
                      shaped/>
          <div class='field-box'>
            <div class='field-text-box'> Image </div>
              <v-file-input
                label='Attach a representative image for the exercise'
                variant='outlined'
                rounded/>
          </div>
    </v-form>
    </v-container>
  </template>
    
  <script setup>
    import { ref } from 'vue'
  
  const onSubmit = () => {
    if (!form.value) return;
    loading.value = true;
    setTimeout(() => (loading.value = false), 2000);
  };
  
  const required = (v) => {
    return !!v || 'Field is required';
  };
  
    const difficulties = ref(['Easy', 'Medium', 'Difficult']);
    const elements = ref(['None', 'Dumbell', 'Jump rope', 'Mat', 'Resistance band', 'Step', 'Kettlebell', 'Foam roller', 'Ankle Weights' ]);
    const space = ref(['Ideal for reduced spaces', 'Requires some space', 'Much space is needed']);
    const muscleGroups = ref(['Chest', 'Back', 'Shoulders', 'Arms', 'Biceps', 'Triceps', 'Legs', 'Quadriceps', 'Hamstrings', 'Calves', 'Glutes', 'Abdominals', 'Lower Back', 'Core']);
  
    const formFields = ref([
      { label: 'Difficulty', placeholder: 'Enter the exercise difficulty', items: difficulties, icon: '$flash', color:'turquoise' },
      { label:'Muscle groups', placeholder: 'Which muscle group will be exercised?', items: muscleGroups, icon:'$person', color:'lightblue' },
      { label: 'Elements required', placeholder: 'Does the exercise require any element?', items:  elements, icon: '$dumbbell',  color:'blue' },
      { label: 'Space requirements', placeholder: 'How much space is it necesary', items:  space, icon: '$space',  color:'violet'},
  ]);
  </script> 
    
  <style scoped>
  
  .field-text {
      margin: 2% 2%;
      width: 100%;
      font-weight: bold;
  }
  
  .field-text-box {
      margin-left: 4%;
      margin-bottom: 1%;
      font-size: 16px;
      font-weight: bold;
  }
  
  .field-box {
      margin-top: 1%;
      width: 100%;
  }
  
  .all-fields {
      margin-top: 1%;
      display: flex;
      flex-wrap: wrap;
  }
  
  .field-left {
      width: 48%;
      margin-right: 2%;
      margin-bottom: 1%;
  }
  .field-right {
      width: 48%;
      margin-left: 2%;
      margin-bottom: 1%;
  }
  
  .field-header {
      display: flex;
  }
  
  .aligned-text {
    display: flex;
    align-items: center;
  }
  
  .avatar-card {
      
      margin-top: 1%;
    }
  
  </style>