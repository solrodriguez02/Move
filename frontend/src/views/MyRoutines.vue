<template>
  <div class='basics'>
    <div class='header'>
      <h1>My routines</h1>
      <div class='link'>
       <RouterLink to='/createroutine' class='link-decoration'>
        <button class='button new-button'>
          Create new
          <v-icon icon='$add'/>
        </button>
      </RouterLink> 
      </div>
    </div>

    <v-progress-circular v-if="loading"
    indeterminate
    color='blue'
    class='load-cycle-box'>
    </v-progress-circular>

    <div v-else>
      <v-row v-for='(category,index) in categories'>
        <v-sheet class='routines-box' width="1140">
          <v-container class='title'>   
            <v-row no-gutters class="pa-0 ma-0 mb-3 align-center">
              <v-col>
                <h3>{{ category.headline }}</h3>
              </v-col>
              <RouterLink v-show="category.headline == 'Created by you'" to='/createdbyyou'>
                  <v-icon icon='$edit' color='dark_gray' class='edit-icon'/>
                </RouterLink>
              <v-col cols='1' class='options'>
                <v-btn flat class='viewAll' @click='changeView(category)' >{{ `View ${category.viewAll? 'less':'all'}` }}</v-btn>
              </v-col>
          </v-row>
          </v-container>
          <displaySomeRoutines :items="routineStore.routineList[index]" class='display' v-if="!category.viewAll"/>
          <displayAllRoutines :items="routineStore.routineList[index]" class='display' v-else />
        </v-sheet>
      </v-row>
    </div>
    
  </div>
</template>

<script setup>
  import displaySomeRoutines from '@/components/displayRoutines/displaySomeRoutines.vue';
  import displayAllRoutines from '@/components/displayRoutines/displayAllRoutines.vue';
  import { ref, onBeforeMount } from 'vue'
  import { useRoutineStore } from '@/store/RoutineStore'

  const routineStore = useRoutineStore()
  const loading = ref(false)

  onBeforeMount (async () => {
    loading.value = true
    await routineStore.getApiRoutinesByCategory('created',0)
    //await routineStore.getApiRoutinesByCategory('favs')

    loading.value = false
  })

  const categories= ref([
      { headline:'Created by you', viewAll: false, canEdit: true },
      { headline:'Favourites', viewAll: false, canEdit: true  }, 
  ])

  function changeView( category) {
      category.viewAll = !category.viewAll;
  }

</script>

<style scoped src='@/styles/MyRoutines.scss'/>
<style scoped src='@/styles/Globals.scss'/>
