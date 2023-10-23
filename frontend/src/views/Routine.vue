<template>

  <div class = 'appbar appbar-margin' @click="goBack">
    <v-icon icon='$back'></v-icon>
    <p>{{navigationStore.getTabText(getTab())}}</p>  
  </div>

  <v-progress-circular v-if="loading"
      indeterminate
      color="blue"
      class='load-cycle-box'>
    </v-progress-circular>
    
  <div v-else>

  <div class='gray-section'>  

      <div class = 'top-bar'>
        <h2 class = 'highlight-text'>{{ data.name }}</h2>
        <div class = 'icons-top-right'>

          <v-menu>
            <template v-slot:activator='{ props }'>
              <button v-bind='props'>
                <v-icon icon='$options' size='30'/>
              </button>
            </template>
            <v-list width='180'>
              <v-list-item v-for='(option, index) in menuOptions' :key='index'>
                <button class='menu-option' @click='option.function'>
                  <v-icon :icon='option.icon' class='menu-option-icon'/>
                  <v-list-item-title>{{ option.title }}</v-list-item-title>
                </button>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>

  <warning-dialog
    v-model='deleteDialog'
    title='Are you sure you want delete the routine?'
    message="If you do so, your routine will be deleted permanently, you won't be able to recover it."
    custom-button-text='Delete'
    :on-custom-action='() => deleteRoutine()'
    :on-close='closeDeleteDialog'
    type='alert'
  />

  <warning-dialog
    v-model='shareDialog'
    title='Share routine'
    message="Press Copy Link to copy the routine's link to your clipboard."
    custom-button-text='Copy Link'
    :on-custom-action='shareRoutine'
    :on-close='closeShareDialog'
    type='informative'
  />

  <div class = 'routine-general'> 
    <div class = 'img-section'>
      <div class = 'header-info'>
        <img :src='data.user.img' alt='profile picture' height='50' width='50' class='image-profile'/>
        <p class='username'>By {{ data.user.name }}</p>
      </div>
      <div class='routine-img'>
        <v-img :src='data.src' alt='Routine image' cover aspect-ratio="16/9" height='295px' width='600px' class='image'/>
      </div>
    </div>

    <div class = 'routine-info'>
      <div v-for='item in highlightsItems' :key='item.name' class='routine-info-cards'>
        <v-card
          :color='item.color'
          class='icon-card-1'
          variant='flat'>
          <v-icon :icon='item.icon' color='white' class='highlight-icon' size='30'></v-icon>
        </v-card>
        <v-card class='icon-card-2' variant='flat'>
          <p> {{ item.detail }}</p>
        </v-card>
      </div>
    </div>
  </div>
  </div>
</div>

            
</template>
  
<script setup>

  import { ref,onBeforeMount } from 'vue'
  import { useRouter,useRoute } from 'vue-router'
  import WarningDialog from "@/components/WarningDialog.vue"
  import { useNavigationStore } from '@/store/NavigationStore'
  import { useRoutineStore } from '@/store/RoutineStore'

  const routineStore = useRoutineStore()
  const router = useRouter()
  const loading = ref(true)
  const route = useRoute()
  const deleteDialog = ref(false)
  const shareDialog = ref(false)
  const navigationStore= useNavigationStore()
  const data = ref([])
  const notFound = ref(false)

  onBeforeMount (async () => {
    console.log(route.params.routineId)
    //await routineStore.fetchRoutine( route.params.routineId )
    try {
      loading.value = true 
      data.value = await routineStore.getRoutineApiData(route.params.routineId)
      loading.value = false 
    } catch ( errorObj ){
      notFound.value = true
    }
    if ( data.value)
      loadData() 
  }) 

  function loadData(){
    highlightsItems.value = [
      { name:'Difficulty', detail: data.value.filters.difficulty + " difficulty" , icon:'$flash', color:'turquoise'},
      { name:'Space', detail: data.value.filters.requiredSpace, icon:'$space', color:'violet' },
      { name:'Approach', detail: data.value.filters.approach.join(", "), icon:'$person', color:'lightblue' },
      { name:'Elements required', detail:data.value.filters.elements.join(", "), icon:'$dumbbell', color:'blue' },
  ];

  }

  function getTab() {
    return router.options.history.state.back
  }

  const goBack = () => {
    router.go(-1)
  }

  const showDeleteDialog = () => {
    deleteDialog.value = true
  }

  const showShareDialog = () => {
    shareDialog.value = true
  }

  const closeDeleteDialog = () => {
    deleteDialog.value = false
  }

  const closeShareDialog = () => {
    shareDialog.value = false
  }

  async function deleteRoutine() {
    await routineStore.deleteRoutine(getId())
    router.push('/createdbyyou')
  }

  const editRoutine = () => {
    router.push('/editroutine/' + getId())
  }

  const shareRoutine = async () => {
    const link = router.currentRoute.value.fullPath;
    await navigator.clipboard.writeText(link);
    closeShareDialog()
  }

  const menuOptions = ref([
    { title:'Share', icon:'$share', function: showShareDialog },
    { title:'Edit', icon:'$edit', function: editRoutine },
    { title:'Delete', icon:'$delete', function: showDeleteDialog },
  ])
   
  const highlightsItems = ref([])

  function getId() {
    return router.currentRoute.value.params.routineId
  }

  </script>

  <style scoped src='@/styles/Routine.scss'></style>
  <style scoped src='@/styles/Globals.scss'></style>