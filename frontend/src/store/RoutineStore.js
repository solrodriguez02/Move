import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getRoutine, getRoutines, routines, RoutineApi, queryGetRoutines, routineInfo } from '@/api/routines'
import { useRegisterStore } from '@/store/RegisterStore'

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
    var morePagesAvailable = false

    const secOptions = ['-', 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
    const repOptions = ['-', 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
    const cycleRepOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    
    async function fetchRoutineById(id) {
      return await RoutineApi.getRoutineById(id, true)
    }

    async function deleteRoutine(id) {
      await RoutineApi.deleteRoutine(id, true)
    }

    async function getApiRoutinesByCategory(category,searchAllPages=true, page = 0){
      
      // carga en la routineList q indique position 
      
        var query 
        
        switch( category){
          case 'new': // ORDER BY 
          query = new queryGetRoutines(null,page, 10, "id","desc")
            
            break
          case 'created':
            // filtro itero x user
            // id user de donde lo saco? 
            const registerStore = useRegisterStore()
            
            try{
              await registerStore.fetchCurrentUser()
            } catch ( error ){
              return -1
            }
            query = new queryGetRoutines( registerStore.userInfo.id , page,null, "id","desc")
            break
          default:
            return -1
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
      
      morePagesAvailable = false

      if ( ans == [] ){
        if ( apiAns.isLastPage || !searchAllPages){
          morePagesAvailable = false
          return -1
        }
        console.log('recursive era el prob') 
        morePagesAvailable = true
        return await getApiRoutinesByName(searchedByUser,page++)
      }
        
      return 0          // fue exitosa la busqueda

    }
      
    

    async function getApiRoutinesByName(searchedByUser, page=0){
      
      if ( searchedByUser.length > 200 )
        return 1
      
      const query = new queryGetRoutines(null,page,null,'id','desc')
       
      const apiAns = await RoutineApi.getAllRoutines( query, true)
      // todo Fav get (meter en array favorites )
      
      const ans = []
      var r
      const size = apiAns.size < apiAns.totalCount? apiAns.size : apiAns.totalCount
      console.log('Api'+ apiAns.isLastPage)
      for ( var i=0; i<size; i++){
        r = apiAns.content[i]
        if ( r.name.startsWith(searchedByUser))
          //for ( )
          ans.push( new routineInfo( r.id, r.name, r.detail, favorites.value.includes(r.id), r.metadata, r.user, [] ))
      } 

      routineList.value[0] = ans

      if ( ans == [] ) {
        if ( apiAns.isLastPage ){
          morePagesAvailable = false
          return -1
        }
        else {
          console.log('recursive era el prob') 
          morePagesAvailable = true
          return await getApiRoutinesByName(searchedByUser,1)
        }    

      }
      
      morePagesAvailable = false
      
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
      
      return routine

    }

    return { getApiRoutinesByCategory, getRoutineApiData ,getApiRoutinesByName, routineList, routineData, secOptions, repOptions, cycleRepOptions, deleteRoutine, fetchRoutineById }

})