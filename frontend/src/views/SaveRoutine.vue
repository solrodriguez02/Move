<template>
  <div class='basics-max'>
    <div class = 'appbar'>
    <button @click="goBack" class="back-button">
      <v-icon icon='$back'></v-icon>
      <p>{{navigationStore.getTabText(getTab())}}</p>
    </button>  
    </div>

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
        :placeholder='formFields[0].placeholder'/>
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
          :placeholder='formFields[index+2]["placeholder"]'/>
      </div>
    </div>
      <div class='field-box'>
        <div class='field-text-box'> Image </div>
          <v-text-field
            v-model='formFields[1].image'
            variant='outlined'
            rounded
            :placeholder='formFields[1].placeholder'/>
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
    </v-form>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoutineStore } from '@/store/RoutineStore'
import { useRouter } from 'vue-router'
import { useNavigationStore } from '@/store/NavigationStore'
import { useCreateRoutineStore } from '@/store/CreateRoutineStore'
import { routinePrevInfo } from '@/api/routines'

const router = useRouter()
const navigationStore= useNavigationStore()
const routineStore = useRoutineStore()
const createRoutineStore = useCreateRoutineStore()
const loading = ref(false)
const routineIsNew = ref(false)
const routineData = ref({})

const form = ref(false)

const formFields = ref([
    {name: null, placeholder: 'Enter the routine name'},
    {image: '', placeholder: 'Attach a representative image for the routine by its URL'},
    {difficulty: null, placeholder: 'Enter the routine difficulty'},
    {elements: null, placeholder: 'Does the routine require any element?'}, 
    {space: null, placeholder: 'How much space is it necesary?'},
    {approach: null, placeholder: 'Which approach does your routine represent the most?'},
  ])

  onBeforeMount (async () => {
    loading.value = true
    routineIsNew.value = isNew()
    if(!routineIsNew.value) {
      routineData.value = await routineStore.fetchRoutineById(getId())
      setCurrentValues(routineData.value)
    }
    loading.value = false
  })

  function setCurrentValues(routineData) {
    formFields.value[0].name = routineData.name
    formFields.value[1].image = routineData.detail
    formFields.value[2].difficulty = routineData.metadata.filters.difficulty
    formFields.value[3].elements = routineData.metadata.filters.elements
    formFields.value[4].space = routineData.metadata.filters.requiredSpace
    formFields.value[5].approach = routineData.metadata.filters.approach
  }

async function onSubmit() {
  if(!routineIsNew.value) {
    const routineInfo = new routinePrevInfo(formFields.value[0].name, formFields.value[1].image, 0, formFields.value[2].difficulty, formFields.value[3].elements, formFields.value[4].space, formFields.value[5].approach)
    await createRoutineStore.sendEditRoutine(getId(), routineInfo)
  }
  else {
    if(formFields.value[1].image == ' ' || formFields.value[1].image == null ) 
      formFields.value[1].image = 'https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg'
    const routineInfo = new routinePrevInfo(formFields.value[0].name, formFields.value[1].image, 0, formFields.value[2].difficulty, formFields.value[3].elements, formFields.value[4].space, formFields.value[5].approach)
    await createRoutineStore.sendNewRoutine(routineInfo)
  }
  router.push('/myroutines')
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

function isNew() {
    return router.currentRoute.value.path == '/saveroutine'
  }

  function getId() {
    return router.currentRoute.value.params.routineId
  }
</script>

<style scoped src='@/styles/SaveRoutine.scss'></style>
<style scoped src='@/styles/Globals.scss'></style>

