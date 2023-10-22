<template>
  <div class = 'appbar navigate-margin'>
    <button @click="goBack" class="button">
      <v-icon icon='$back'></v-icon>
      <p>{{navigationStore.getTabText(getTab())}}</p>
    </button>  
  </div>
    <v-container>
      
      <h1 style="margin-bottom: 2%;">Save Routine</h1>
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
          placeholder='Enter the routine name'/>
        <div class='all-fields'>
          <div v-for='(field,index) in routineStore.filters' :key='field.label' :class="index === 0 || index === 2 ? 'field-left' : 'field-right'"> 
            <div class='field-header'>
              <v-avatar size='36px' class="avatar-card" :color='field.color'>
                <v-icon color='white' :icon='field.icon'></v-icon>
              </v-avatar>
              <div class='field-text aligned-text' > {{ field.label }} </div>
            </div>
          <v-select
            v-model='formFields[index+2][field.tag]'
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
            <v-text-field
              :v-model="formFields[1].image"
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
import { useRouter } from 'vue-router'
import { useNavigationStore } from '@/store/NavigationStore'
import { useCreateRoutineStore } from '@/store/CreateRoutineStore';
import { routineInfo, routinePrevInfo } from '@/api/routines';

const router = useRouter()
const navigationStore= useNavigationStore()
const routineStore = useRoutineStore()
const createRoutineStore = useCreateRoutineStore();
const loading = ref(false);

const form = ref(false)

const formFields = ref([
    {name: ''},
    {image: ' '},
    {difficulty: null},
    {elements: null}, 
    {space: null},
    {approach: null},
  ])

const placeholders = ref([
    'Enter the routine difficulty',
    'Does the routine require any element?',
    'How much space is it necesary?',
    'Which approach does your routine represent the most?'
])

async function onSubmit() {
    // faltan hacer las funciones en RoutineStore
    //$router.push('/createdbyyou');
    console.log(formFields.value[0].elements)
    console.log('imagen'+ formFields.value[1].image)
    const routineInfo = new routinePrevInfo(formFields.value[0].name, formFields.value[1].image, 0, formFields.value[2].difficulty, formFields.value[3].elements, formFields.value[4].space, formFields.value[5].approach)
    await createRoutineStore.sendNewRoutine(routineInfo)
}

function getTab() {
  return router.options.history.state.back
}

const goBack = () => {
  router.go(-1)
}

const required = (v) => {
    return !!v || 'Field is required';
}
</script>

<style scoped src='@/styles/SaveRoutine.scss'></style>
<style scoped src='@/styles/Globals.scss'></style>

