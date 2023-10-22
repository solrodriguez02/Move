<template>

<div class = 'appbar appbar-margin'>
  <button @click='goBackDialog = true' class='back-button'>
      <v-icon icon='$back'></v-icon>
      <p>{{navigationStore.getTabText(getTab())}}</p>
  </button>  
</div>

<warning-dialog
    v-model='goBackDialog'
    title='Are you sure you want to quit this page?'
    message='If you do so, your exercise will be deleted. Press Cancel to continue editing and then go to "save" to save your changes.'
    custom-button-text="Quit"
    :on-custom-action="() => quitCreateExercise(getTab())"
    :on-close='closeGoBackDialog'
    type='alert'
  />

<div class='basics-max'>

  <h1>{{exerciseIsNew? 'Create Exercise':'Edit Exercise'}}</h1>
  <v-form class='form'
    v-model='form'
    @submit.prevent='onSubmit'>
      
    <div class='field-text-box'>Name</div>
      <v-text-field
      v-model='formFields[0].name'
      :readonly='loading'
      :rules='[required]'
      variant='outlined'
      clearable
      rounded
      :placeholder='formFields[0].placeholder'/>
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
        clearable
        variant='outlined'
        rounded
        :placeholder='formFields[index+3]["placeholder"]'/>
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
          :placeholder='formFields[2].placeholder'
          variant='outlined'
          clearable
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
  </v-form>
</div>
</template>
  
<script setup>
  import { ref, onBeforeMount } from 'vue'
  import { useRouter } from 'vue-router'
  import { useExerciseStore } from '@/store/ExerciseStore'
  import { exerciseInfo } from '@/api/exercises'
  import { useNavigationStore } from '@/store/NavigationStore'
  import WarningDialog from "@/components/WarningDialog.vue"

  const navigationStore= useNavigationStore()
  const exerciseStore = useExerciseStore()
  const router = useRouter()
  const loading = ref(false)
  const goBackDialog = ref(false)
  const exerciseIsNew = ref(false)
  const form = ref(false)
  const exerciseData = ref({})

  const formFields= ref([ 
    { name: null, placeholder: 'Enter the exercise name' }, 
    { detail: null, placeholder: 'What are the steps to follow the exercise? How would you describe it?' }, 
    { image: null, placeholder: 'Enter a representative image for the exercise by its URL'}, 
    { difficulty: null, placeholder: 'Enter the exercise difficulty' }, 
    { muscleGroups: [], placeholder: 'Which muscle group will be exercised?' }, 
    { elements: [], placeholder: 'Does the exercise require any element?' }, 
    { space: null, placeholder: 'How much space is it necesary?' } ])

    onBeforeMount (async () => {
    loading.value = true
    exerciseIsNew.value = isNew()
    if(!exerciseIsNew.value) {
      exerciseData.value = await exerciseStore.fetchExerciseById(getId())
      setCurrentValues(exerciseData.value)
    }
    loading.value = false
  })

  function setCurrentValues(exerciseData) {
    formFields.value[0].name = exerciseData.name
    formFields.value[1].detail = exerciseData.detail
    formFields.value[2].image = exerciseData.metadata.image
    formFields.value[3].difficulty = exerciseData.metadata.difficulty
    formFields.value[4].muscleGroups = exerciseData.metadata.muscleGroups
    formFields.value[5].elements = exerciseData.metadata.elements
    formFields.value[6].space = exerciseData.metadata.space
  }

  async function onSubmit() {
    const details = { image: formFields.value[2].image, difficulty: formFields.value[3].difficulty, muscleGroups: formFields.value[4].muscleGroups, elements: formFields.value[5].elements, space: formFields.value[6].space, creator: 'user' }
    const exerciseInformation = new exerciseInfo(formFields.value[0].name, formFields.value[1].detail, 'exercise', details)
    if(exerciseIsNew.value) {
      if(formFields.value[2].image == null) {
        exerciseInformation.metadata.image = 'https://static.vecteezy.com/system/resources/previews/006/923/598/non_2x/running-man-abstract-logo-free-vector.jpg'
      }
      await exerciseStore.addExercise(exerciseInformation)
    } else {
      await exerciseStore.modifyExercise(getId(), exerciseInformation)
    }
    router.go(-1)
  }

  function getTab() {
        return router.options.history.state.back
    }

  const closeGoBackDialog = () => {
    goBackDialog.value = false;
  }

  const quitCreateExercise = (path) => {
    router.push(path)
  }

  const required = (v) => {
    return !!v || 'Field is required'
  }

  function isNew() {
    return router.currentRoute.value.path == '/createexercise'
  }

  function getId() {
    return router.currentRoute.value.params.exerciseId
  }

</script> 
  
<style scoped src='@/styles/CreateExercise.scss'></style>
<style scoped src='@/styles/Globals.scss'></style>