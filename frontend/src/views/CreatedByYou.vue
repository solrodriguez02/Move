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
        <RouterLink to='/createroutine' class='link-decoration'>
          <button class='button create-button'>
              Create new 
              <v-icon icon='$add'/>
          </button>
        </RouterLink>
      </div>
    </div>
  
    <div class='rutines' v-for='routine in routines'>
      <HorizontalBox :items='{name: routine.name, link: getLink(routine.id), img: routine.src, deleteFunction: () => showDeleteDialog(routine.id), editFunction: () => editRoutine(routine.id)}'/>
    </div>

    <warning-dialog
      v-model='deleteDialog'
      title='Are you sure you want delete this exercise?'
      message='If you do so, you will not be able to recover it.'
      custom-button-text="Delete"
      :on-custom-action='() => deleteRoutine()'
      :on-close='closeDeleteDialog'
      type='alert'
      />
  </div>
</template>
    
<script setup>
  import { ref, onBeforeMount } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useRouter } from 'vue-router'
  import { useRoutineStore } from '@/store/RoutineStore'
  import { useNavigationStore } from '@/store/NavigationStore'
  import HorizontalBox from '@/components/HorizontalBox.vue'
  import WarningDialog from '@/components/WarningDialog.vue'
  
  const router = useRouter()
  const navigationStore= useNavigationStore()
  const routineStore = useRoutineStore()
  const loading = ref(false)
  const routines = ref([])
  const deleteDialog = ref(false)
  const toDelete = ref(null)

  onBeforeMount (async () => {
    loading.value = true
    await routineStore.getApiRoutinesByCategory('created')
    routines.value = routineStore.routineList[0]
    loading.value = false
  })

  const goBack = () => {
    router.go(-1)
  }

  function getTab() {
    return router.options.history.state.back
  }

  function editRoutine(id) {
      router.push('/editroutine/' + id)
  }

  function showDeleteDialog(routineID) {
        toDelete.value = routineID
        deleteDialog.value = true
    }

  function closeDeleteDialog() {
      deleteDialog.value = false
  }

  async function deleteRoutine() {
    await routineStore.deleteRoutine(toDelete.value)
    router.go(0)
  }

  function getLink( id){
    return '/routine/' + id
  }
</script>
  
<style scoped src='@/styles/CreatedByYou.scss'/>
<style scoped src='@/styles/Globals.scss'/>