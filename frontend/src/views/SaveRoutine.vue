<template>
  <div class='create-exercise'>
      <h2 class='header'>Describe your routine</h2>
      <v-form class='form'
          v-model='form'
          @submit.prevent='onSubmit'>

          <div class='field-text'> Name </div>
          <v-text-field
              :v-model='form.name'
              :readonly='loading'
              :rules='[required]'
              variant='outlined'
              density='compact'
              clearable
              rounded
              placeholder='Enter the exercise name'/>

          <div class='field' v-for='(field, index) in routineStore.filters' :key='field.label'>
              <div class='field-text'> {{ field.label }} </div>
              <v-select
                  :v-model='form[field.formID]'
                  :items='field.options'
                  :multiple="field.label == 'Elements required'"
                  :chips="field.label == 'Elements required'"
                  :rules="[required]"
                  variant='outlined'
                  density='compact'
                  rounded
                  :placeholder='placeholders[index]'/>
          </div>

          <div class='field-text-image'> Image </div>
          <v-file-input
              :v-model='form.image'
              label='Attach a representative image for the routine'
              density='compact'
              variant='outlined'
              rounded/>

            <v-btn class='save-button'
                :disabled='!form'
                :loading='loading'
                block
                rounded
                color='violet'
                size='large'
                type='submit'
                variant='elevated'> Save </v-btn>
      </v-form>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
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
    'Enter the exercise difficulty',
    'Does the exercise require any element?',
    'How much space is it necesary?',
    'Which approach does your exercise represent the most?'
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