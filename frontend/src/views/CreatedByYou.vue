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
  
    <div class='rutines' v-for='routine in routines'>
      <HorizontalBox :items='{name: routine.name, link: routine.link, img: routine.img, deleteFunction: deleteRoutine, editFunction: editRoutine}'/>
    </div>
  
  </div>
  </template>
    
  <script setup>
      import { ref } from 'vue'
      import { RouterLink } from 'vue-router'
      import { useRouter } from 'vue-router'
      import { useRoutineStore } from '@/store/RoutineStore'
      import { useNavigationStore } from '@/store/NavigationStore'
      import HorizontalBox from '@/components/HorizontalBox.vue'
      
  
      import image1 from '@/assets/temporary/chillout.png'
      import image2 from '@/assets/temporary/keepmoving.png'
  
      const router = useRouter()
      const routineStore = useRoutineStore()
      const navigationStore= useNavigationStore()
  
      const goBack = () => {
        router.go(-1)
      }
  
      const routines = ref([
        { name:'Chill out', img: image1, link:'/routine' },
        { name:'Keep moving', img: image2, link:'/routine' },
      ])
  
      function getTab() {
        return router.options.history.state.back
      }
  
      function deleteRoutine(id) {
          routineStore.deleteRoutine(id)
      }
  
      function editRoutine(id) {
          //router.push({ name: 'EditExercise', params: { id: id } })
          router.push('/createroutine')
      }
  
  </script>
  
  <style scoped src='@/styles/CreatedByYou.scss'/>
  <style scoped src='@/styles/Globals.scss'/>