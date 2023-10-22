<template>
  <div class='basics'>
    <div class = 'appbar'>
    <button @click="goBack" class="button">
      <v-icon icon='$back'></v-icon>
      <p>{{navigationStore.getTabText(getTab())}}</p>
    </button>  
  </div>
    <div class='header'>
      <h1>Created by you</h1>
      <div class='create-new'>
        <RouterLink to='/createroutine'>
          <button class='new-button'>
              Create new 
              <v-icon icon='$add'/>
          </button>
        </RouterLink>
      </div>
    </div>
  
    <div class='rutines' v-for='r in routines'>
        <HorizontalBox :items='{name: r.name, id:r.id , img: r.src, deleteFunction: deleteRoutine, editFunction: editRoutine}'/>
    </div>
  
  </div>
  </template>
    
  <script setup>
      import { ref, onBeforeMount } from 'vue'
      import { RouterLink } from 'vue-router'
      import { useRouter } from 'vue-router'
      import { useRoutineStore } from '@/store/RoutineStore'
      import { useNavigationStore } from '@/store/NavigationStore'
      import HorizontalBox from '@/components/HorizontalBox.vue'
      
      const router = useRouter()
      const navigationStore= useNavigationStore()
  
      const routineStore = useRoutineStore()
      const loading = ref(false)
      const routines = ref([])


    onBeforeMount (async () => {
      loading.value = true
      await routineStore.getApiRoutinesByCategories(['created'])
      routines.value = routineStore.routineList[0]
      loading.value = false
    })
    
      const goBack = () => {
        router.go(-1)
      }
    
      function getTab() {
        return router.options.history.state.back
      }
  
      function deleteRoutine(id) {
          routineStore.deleteRoutine(id)
      }
  
      function editRoutine(id) {
          //router.push({ name: 'EditExercise', params: { id: id } })
          router.push('/createroutine/'+id)
      }
  
  </script>
  
  <style scoped src='@/styles/CreatedByYou.scss'/>
  <style scoped src='@/styles/Globals.scss'/>