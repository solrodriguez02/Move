import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getRoutine, getRoutines, routines, RoutineApi, queryGetRoutines, routinePrevInfo } from '@/api/routines'

/* 
  Campos que creo q deberian ir en routine: 
  id, name, img, userMade (boolean), duration (secs), difficulty, equipment, space, approach, cycles ID  

  Campos que creo q deberian ir en cycle: 
  id, name (lo definimos nosotros, no el user), reps, exercisesList
  
  soy Sol :) 
*/

export const useRoutineStore = defineStore('routine', () => {
    const routineList = ref([])
    const routineData = ref(null)

    const filters = ref([
      { label: 'Difficulty', options: ['Easy', 'Medium', 'Difficult'], selected: ref([]), color: 'turquoise', icon: '$flash' },
      { label: 'Elements required', options:  ['None', 'Dumbell', 'Jump rope', 'Mat', 'Resistance band', 'Step', 'Kettlebell', 'Foam roller', 'Ankle Weights' ], selected: ref([]), color:'lightblue', icon: '$dumbbell' },
      { label: 'Space required', options: ['Ideal for reduced spaces', 'Requires some space', 'Much space is needed'], selected: ref([]), color:'blue', icon: '$space' },
      { label: 'Approach', options: ['Cardio', 'Strength', 'HIIT', 'Flexibility', 'Bodyweight', 'Resistance', 'CrossFit', 'Yoga', 'Pilates', 'Functional', 'Calisthenics', 'Aerobic ', 'Streching'], selected: ref([]), color:'violet', icon:'$person' }
    ])

    const secOptions = ['-', 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
    const repOptions = ['-', 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
    const cycleRepOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    function fetchRoutines() {
        return new Promise((resolve) => {
            getRoutines((routines) => {
              setRoutines(routines)
              resolve()
            })
        })
    }

    function fetchRoutine( routineId ) {
      return new Promise((resolve) => {
          getRoutine(routineId,(routine) => {
            setRoutine(routine)
            resolve()
          })
      })
  }

    function setRoutines(routines) {
        routineList.value = routines
    }

    function setRoutine(routineFound) {
      routineData.value = routineFound
    }
     
    function addRoutine() {
      // ToDo
    }

    function deleteRoutine() {
      // ToDo
    }

    function getDataCategory(headline,data){
        // pido a api
        return data;
      }

    function searchRutine(searchInApi, selected){  
        // mando a api el input 
        // searchInApi tiene input/busqueda
        // selected contiene array con filtros, (hay espacios undefined => no tenerlos en cuenta)
        for ( var i=0; i<selected.length; i++){
          if ( selected[i] !== undefined ){
            // mando a api
          }
        } 
        const ans = routines;
        //fetchRoutines()
        
        if ( searchInApi=='notFound' )      
          return null;
        
        return ans;    
    }


    function getRoutineData(){
      console.log('jsjs'+ routineData.value.id);
      return routineData.value;
    }

    async function getApiRoutines(){
      
      const query = new queryGetRoutines(0,7,null)
      const apiAns = await RoutineApi.getAllRoutines( query, true)
      
      
      const ans = []
      var routine
      
      for ( var i=0; i<apiAns.size; i++){
        routine = apiAns.content[i]
        ans.push( new routinePrevInfo(routine.id, routine.name, routine.detail, routine.user, routine.metadata.favs, routine.metadata.filters.difficulty , routine.metadata.filters.elements, routine.metadata.filters.requiredSpaceId, routine.metadata.filters.approachId ))
      } 
      
      return ans
    }
  

    return { getApiRoutines, routineList, routineData, fetchRoutines, fetchRoutine, getDataCategory, searchRutine, getRoutineData, filters, secOptions, repOptions, cycleRepOptions, deleteRoutine, addRoutine }

})