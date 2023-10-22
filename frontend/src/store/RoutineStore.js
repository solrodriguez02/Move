import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getRoutine, getRoutines, routines, RoutineApi, queryGetRoutines, routinePrevInfo, routineInfo } from '@/api/routines'

/* 
  Campos que creo q deberian ir en routine: 
  id, name, img, userMade (boolean), duration (secs), difficulty, equipment, space, approach, cycles ID  

  Campos que creo q deberian ir en cycle: 
  id, name (lo definimos nosotros, no el user), reps, exercisesList
  
  soy Sol :) 
*/

export const useRoutineStore = defineStore('routine', () => {
    const routineList = ref([])
    var routineData
    const favorites = ref([])

    const filters = ref([
      { label: 'Difficulty', options: ['Easy', 'Medium', 'Difficult'], selected: ref([]), color: 'turquoise', icon: '$flash', tag:'difficulty' },
      { label: 'Elements required', options:  ['None', 'Dumbell', 'Jump rope', 'Mat', 'Resistance band', 'Step', 'Kettlebell', 'Foam roller', 'Ankle Weights' ], selected: ref([]), color:'lightblue', icon: '$dumbbell', tag: 'elements'},
      { label: 'Space required', options: ['Ideal for reduced spaces', 'Requires some space', 'Much space is needed'], selected: ref([]), color:'blue', icon: '$space', tag: 'space' },
      { label: 'Approach', options: ['Cardio', 'Strength', 'HIIT', 'Flexibility', 'Bodyweight', 'Resistance', 'CrossFit', 'Yoga', 'Pilates', 'Functional', 'Calisthenics', 'Aerobic ', 'Streching'], selected: ref([]), color:'violet', icon:'$person', tag: 'approach' }
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

    async function getApiRoutinesByCategories(categories){
      
      // carga las 2 routineList
      if ( categories==null)
        return -1

        var query 
      for ( var i; i<categories.length; i++)
        switch( categories[i] ){
          case 'new': // ORDER BY 
            query = new queryGetRoutines(0,15, "id","asc")
            break
          case 'favs':
            // llamado a api
            break
          case 'created':
            // filtro itero x user
            break
        }

     
      const apiAns = await RoutineApi.getAllRoutines( query, false)
      
      
      const ans = []
      var r
      const size = apiAns.size < apiAns.totalCount? apiAns.size : apiAns.totalCount
      console.log('Api'+ apiAns)
      for ( var i=0; i<size; i++){
        r = apiAns.content[i]
        ans.push( new routineInfo( r.id, r.name, r.detail, favorites.value.includes(r.id), r.metadata, r.user, [] ))
      } 
      routineList.value[0] = ans
      
      if ( ans == [] )
        return -1
      return 0          // fue exitosa la busqueda
    }
      
    

    async function getApiRoutinesWithFilters(filters){
      
      const query = new queryGetRoutines(0,14,null)
      const apiAns = await RoutineApi.getAllRoutines( query, true)
      // todo Fav get (meter en array favorites )
      
      const ans = []
      var r
      const size = apiAns.size < apiAns.totalCount? apiAns.size : apiAns.totalCount
      console.log('Api'+ apiAns)
      for ( var i=0; i<size; i++){
        r = apiAns.content[i]
        ans.push( new routineInfo( r.id, r.name, r.detail, favorites.value.includes(r.id), r.metadata, r.user, [] ))
      } 
      routineList.value[0] = ans
      routineList.value[1] = ans
      if ( ans == [] )
        return -1
      return 0          // fue exitosa la busqueda
    }
    
    async function fetchRoutineApiData(idRoutine) { 
      const r = await RoutineApi.getRoutineById( idRoutine, true )
      return new routineInfo( r.id, r.name, r.detail, favorites.value.includes(r.id), r.metadata, r.user, [] )
    }

    async function getRoutineApiData(id){
  
      if ( routineList.value == undefined || routineList.value.length==0 )
        routine = await fetchRoutineApiData(id)
      else {
        var routine = routineList.value[0].find((routine) => routine.id == id);
        if ( !routine && routineList.value.length > 1 )
          routine = routineList.value[1].find((routine) => routine.id == id);
        else 
          routine = await fetchRoutineApiData(id)
      }

      if ( !routine )
        return 1
      
      routineData = routine
      
      // llamar a cycles y meterlo en routineInfo
      
      
      return routine

    }

    return { getApiRoutinesByCategories, getRoutineApiData ,getApiRoutinesWithFilters, routineList, routineData, fetchRoutines, fetchRoutine, getDataCategory, searchRutine, getRoutineData, filters, secOptions, repOptions, cycleRepOptions, deleteRoutine, addRoutine }

})