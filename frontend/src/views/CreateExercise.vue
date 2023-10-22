<template>
<v-container>
  <h1 style="margin-bottom: 2%;">Create Exercise</h1>
  <v-form class='form'
    v-model="form"
    @submit.prevent="onSubmit">
      
    <div class='field-text-box'> Name </div>
      <v-text-field
      v-model='formFields[0].name'
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
        v-model='formFields[index+3][field.tag]'
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
      v-model='formFields[1].detail'
      auto-grow
      variant='outlined'
      rows='3'
      row-height='25'
      clearable
      placeholder='What are the steps to follow the exercise? How would you describe it?'
      shaped/>
    <div class='field-box'>
      <div class='field-text-box'> Image </div>
        <v-text-field
          v-model='formFields[2].image'
          placeholder='Enter a representative image for the exercise by its URL'
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
  import { useRouter } from 'vue-router'
  import { useExerciseStore } from '@/store/ExerciseStore'
  import { exerciseInfo } from '@/api/exercises'

  const exerciseStore = useExerciseStore()
  const router = useRouter()
  const loading = ref(false)
  const exerciseCreated = ref(false)

  const formFields= ref([ { name: '' }, { detail: '' }, { image: null }, { difficulty: null }, { muscleGroups: null }, { elements: null }, { space: null } ])

  const form = ref(false)

  const placeholders = ref([
    'Enter the exercise difficulty',
    'Which muscle group will be exercised?',
    'Does the exercise require any element?',
    'How much space is it necesary',
  ])

  async function onSubmit() {
    const details = { image: formFields.value[2].image, difficulty: formFields.value[3].difficulty, muscleGroups: formFields.value[4].muscleGroups, elements: formFields.value[5].elements, space: formFields.value[6].space, creator: 'user' }
    const exerciseData = new exerciseInfo(formFields.value[0].name, formFields.value[1].detail, 'exercise', details)
    await exerciseStore.addExercise(exerciseData)
    exerciseCreated.value = true
    router.go(-1)
  }

  const required = (v) => {
    return !!v || 'Field is required'
  }
</script> 
  
<style scoped src='@/styles/CreateExercise.scss'></style>