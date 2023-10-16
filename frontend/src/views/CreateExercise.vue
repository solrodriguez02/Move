<template>
<v-container>
  <h1 style="margin-bottom: 2%;">Create Exercise</h1>
  <v-form class='form'
    v-model="form"
    @submit.prevent="onSubmit">
      
    <div class='field-text-box'> Name </div>
      <v-text-field
      :v-model='form.name'
      :readonly='loading'
      :rules='[required]'
      variant='outlined'
      clearable
      rounded
      placeholder='Enter the exercise name'/>
    <div class='all-fields'>
      <div v-for='(field,index) in exerciseStore.filters' :key='field.label' :class="index === 0 || index === 2 ? 'field-left' : 'field-right'"> 
        <div class='field-header'>
          <v-avatar size='36px' class="avatar-card" :color='field.color'>
            <v-icon color='white' :icon='field.icon'></v-icon>
          </v-avatar>
          <div class='field-text aligned-text' > {{ field.label }} </div>
        </div>
      <v-select
        :v-model='form[field.formID]'
        :items='field.items'
        :multiple="field.label == 'Elements required' || field.label =='Muscle groups'"
        :chips="field.label == 'Elements required' || field.label =='Muscle groups'"
        :rules="[required]"
        variant='outlined'
        rounded
        :placeholder='placeholders[index]'/>
    </div>
  </div>
  <div class='field-text-box'> Description </div>
    <v-textarea
      :v-model='form.description'
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
          :v-model='form.image'
          label='Attach a representative image for the exercise'
          variant='outlined'
          rounded/>
    </div>

    <v-btn
      :disabled='!form'
      :loading='loading'
      block
      rounded
      color='violet'
      size='large'
      type='submit'
      variant='elevated'> Save </v-btn>

    <div v-show="exerciseCreated">Ejercicio creado con éxito.</div>
  </v-form>
</v-container>
</template>
  
<script setup>
  import { ref } from 'vue'
  import { useExerciseStore } from '@/store/ExerciseStore'

  const exerciseStore = useExerciseStore()
  const loading = ref(false);
  const exerciseCreated = ref(false);

  const form = ref({
    name: '',
    difficulty: '',
    muscleGroup: '',
    elements: '', 
    space: '',
    description: '',
    image: '',
  })

  const placeholders = ref([
    'Enter the exercise difficulty',
    'Which muscle group will be exercised?',
    'Does the exercise require any element?',
    'How much space is it necesary',
  ])

  const onSubmit = () => {
    const exerciseStore = useExerciseStore()
        exerciseStore.addExercise(form);
        exerciseCreated.value = true;
        //$router.push('/createdbyyou');
  }

  const required = (v) => {
    return !!v || 'Field is required'
  }
</script> 
  
<style scoped src='@/styles/CreateExercise.scss'></style>