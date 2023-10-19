<template>
    <v-container>
      <h1 style="margin-bottom: 2%;">Save Routine</h1>
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
          <div v-for='(field,index) in routineStore.filters' :key='field.label' :class="index === 0 || index === 2 ? 'field-left' : 'field-right'"> 
            <div class='field-header'>
              <v-avatar size='36px' class="avatar-card" :color='field.color'>
                <v-icon color='white' :icon='field.icon'></v-icon>
              </v-avatar>
              <div class='field-text aligned-text' > {{ field.label }} </div>
            </div>
          <v-select
            :v-model='form[field.formID]'
            :items='field.options'
            :multiple="field.label == 'Elements required' || field.label == 'Approach'"
            :chips="field.label == 'Elements required' || field.label == 'Approach'"
            :rules="[required]"
            variant='outlined'
            rounded
            :placeholder='placeholders[index]'/>
        </div>
      </div>
        <div class='field-box'>
          <div class='field-text-box'> Image </div>
            <v-file-input
              :v-model='form.image'
              label='Attach a representative image for the routine'
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
    
        <div v-show="exerciseCreated">Rutina guardada con éxito.</div>
      </v-form>
    </v-container>
    </template>

<script setup>
import { ref } from 'vue'
import { useRoutineStore } from '@/store/RoutineStore'

const routineStore = useRoutineStore()
const loading = ref(false);

const form = ref({
    name: '',
    difficulty: '',
    approach: '',
    elements: '', 
    space: '',
    image: '',
})

const placeholders = ref([
    'Enter the routine difficulty',
    'Does the routine require any element?',
    'How much space is it necesary?',
    'Which approach does your routine represent the most?'
])

const onSubmit = () => {
    // faltan hacer las funciones en RoutineStore
    //$router.push('/createdbyyou');
}

const required = (v) => {
    return !!v || 'Field is required';
}
</script>

<style scoped src='@/styles/SaveRoutine.scss'></style>

