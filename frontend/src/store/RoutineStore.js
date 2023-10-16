import { ref } from 'vue'
import { defineStore } from 'pinia'
import Routines from '@/api/Routines'

export const useRoutineStore = defineStore('routine', () => {
    const routineList = ref([])

    const filters = ref([
      { label: 'Difficulty', options: ['Easy', 'Medium', 'Difficult'], selected: ref([]), color: 'turquoise' },
      { label: 'Elements required', options:  ['None', 'Dumbell', 'Jump rope', 'Mat', 'Resistance band', 'Step', 'Kettlebell', 'Foam roller', 'Ankle Weights' ], selected: ref([]), color:'lightblue' },
      { label: 'Space required', options: ['Ideal for reduced spaces', 'Requires some space', 'Much space is needed'], selected: ref([]), color:'blue' },
      { label: 'Muscle groups', options: ['Chest', 'Back', 'Shoulders', 'Arms', 'Biceps', 'Triceps', 'Legs', 'Quadriceps', 'Hamstrings', 'Calves', 'Glutes', 'Abdominals', 'Lower Back', 'Core'], selected: ref([]), color:'violet' }
    ])

    const secOptions = ['-', 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
    const repOptions = ['-', 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
    const cycleRepOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    function fetchRoutines() {
        return new Promise((resolve) => {
            Routines.getRoutines((routines) => {
              setRoutines(routines)
              resolve()
            })
        })
    }

    function setRoutines(routines) {
        routineList.value = routines
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
        const ans = Routines.routines;
        //fetchRoutines()
        console.log("searc"+searchInApi)
        if ( searchInApi=='notFound' )      
          return null;
        console.log("DEV BIEN")
        return ans;    
    }

    return { routineList, fetchRoutines, getDataCategory, searchRutine, filters, secOptions, repOptions, cycleRepOptions }
})